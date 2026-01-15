import { inngest } from '../client.js';
import StudentModel from '../../../model/student.form.schema.js';
import emailSender from '../../Email/email.genration.js';

const EmailSenderByInngest = inngest.createFunction(
    {
        id: "Email_sender", idempotency: "event.data.emailID"
    },
    {
        event: "mail-sender-by-gemna",
    },

    async ({ event, step }) => {
        const isValid = await step.run(
            'check event.data are valid or not',
            async () => {
                if (!event?.data || typeof event.data !== 'object') return false;

                for (let key in event.data) {
                    if (
                        event.data[key] === undefined ||
                        event.data[key] === null ||
                        event.data[key] === ''
                    ) {
                        return false;
                    }
                }
                return true;
            }
        );

        const changeStatus_Acc_isValid = await step.run(
            "if isValidation is failed",
            async () => {
                try {
                    const findUserLog = await StudentModel.findOne({
                        _id: event?.data?.id,
                    });

                    if (!findUserLog) {
                        return {
                            message: "User not found",
                            status: 404,
                            success: false,
                            repeat: false,
                        };
                    }
                    if (!isValid) {
                        const isNew =
                            findUserLog.createdAt.getTime() ===
                            findUserLog.updatedAt.getTime();

                        if (isNew) {
                            findUserLog.emailAreSendStatus = 'failed';
                            await findUserLog.save();

                            return {
                                message:
                                    "event body data are incorrect and change status - failed",
                                status: 400,
                                success: false,
                                repeat: false,
                            };
                        }

                        return {
                            message: "event body data are incorrect",
                            status: 400,
                            success: false,
                            repeat: true,
                        };
                    }

                    return {
                        message: "Checkpoints are clearded",
                        status: 200,
                        success: true,
                        repeat: false,
                        personData: findUserLog,
                    };
                } catch (error) {
                    return {
                        message: error.message,
                        status: 500,
                        success: false,
                        repeat: true,
                    };
                }
            }
        );


        if (!changeStatus_Acc_isValid?.success) {
            return {
                message: changeStatus_Acc_isValid?.message,
                status: changeStatus_Acc_isValid?.status || 400,
                success: false,
                repeat: changeStatus_Acc_isValid?.repeat ?? true,
            };
        }

        const lastStep = await step.run('sending email', async () => {
            const personData = await StudentModel.findOne({
                _id: event?.data?.id,
            });

            try {
                if (!personData?.email) {
                    throw new Error("personData are not found");
                }

                const person = await emailSender(
                    personData.email,
                    "We are supporting your goal and provide a enivorment to work with real world problem",
                    event?.data?.OTP,
                    personData
                );

                if (!person) {
                    throw new Error("message are not send - internal problem");
                }

                const isNew =
                    personData.createdAt.getTime() ===
                    personData.updatedAt.getTime();

                if (isNew) {
                    personData.emailAreSendStatus = 'successed';
                    await personData.save();
                }

                return {
                    message: `email are send -- on ${event?.data?.emailID}`,
                    status: 202,
                    success: true,
                    isNew,
                };
            } catch (error) {
                try {
                    personData.emailAreSendStatus = 'failed';
                    await personData.save();
                } catch (_) { }

                return {
                    message: error.message,
                    status: 500,
                    success: false,
                };
            }
        });

        // final result - show in dev server / inngest cloud
        if (lastStep?.success) {
            return {
                message: "successed",
                email: event?.data?.emailID,
                success: true,
            };
        }

        return {
            message: "failed",
            email: event?.data?.emailID,
            success: false,
        };
    }
);

export default EmailSenderByInngest;
