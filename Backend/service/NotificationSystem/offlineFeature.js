
import connectionModel from '../../model/connection.model.js';
import messagemodel from '../../model/message.model.js';
import { inngest } from '../Inngest/client.js';
import StudentModelMain from '../../model/Students.js';


const acceptOfflineMessages = async (data) => {
    const { senderId, receiverId, message, index, type, r_email, language, s_fullName } = data;

    try {
        const findConnection = await connectionModel.findOne({
            id: {
                $in: [
                    `${senderId}/${receiverId}`,
                    `${receiverId}/${senderId}`
                ]
            }
        });

        // connection exits ===================>
        if (findConnection && Object.keys(findConnection).length > 0) {
            const messagePayload = {
                type,
                senderId,
                receiverId,
                message: message,
                saveID: true,
                language
            };
            const savedataMessage = new messagemodel(messagePayload);
            await savedataMessage.save();
            findConnection.messages.push({ ref_id: savedataMessage._id });
            await findConnection.save();

            // FCM_TOKEN, userName, messageTitle, type, email
            const findFCMTOEKN = await StudentModelMain.findOne({ ref_id: receiverId });
            if (findFCMTOEKN?.FCM_TOKEN) {
                await inngest.send({
                    name: "phase_1_notify",
                    data: {
                        email: r_email,
                        userName: s_fullName,
                        messageTitle: message.length > 40 ? "Sending a long message" : message,
                        type: "user by",
                        FCM_TOKEN: findFCMTOEKN?.FCM_TOKEN === 'token are unregistered' ||
                            findFCMTOEKN?.FCM_TOKEN === 'empty' ? null : findFCMTOEKN?.FCM_TOKEN
                    },
                });
            }
            return { notify: "successfully send your message", index, message: savedataMessage, distination: findConnection?.id };
        } else {
            const createNewConnection = new connectionModel({
                type: "direct",
                id: `${senderId}/${receiverId}`,
                member_one: senderId,
                member_two: receiverId,
            });
            const messagePayload = {
                type,
                senderId,
                receiverId,
                message,
                saveID: true,
                language
            };
            const savedataMessage = new messagemodel(messagePayload);
            const instanceMessage = await savedataMessage.save();
            createNewConnection.messages.push({ ref_id: instanceMessage._id });
            await createNewConnection.save();

            const findFCMTOEKN = await StudentModelMain.findOne({ ref_id: receiverId });

            if (findFCMTOEKN?.FCM_TOKEN) {
                await inngest.send({
                    name: "phase_1_notify",
                    data: {
                        email: r_email,
                        userName: s_fullName,
                        messageTitle: message.length > 20 ? "Sending a long message" : message,
                        type: "user by",
                        FCM_TOKEN: findFCMTOEKN?.FCM_TOKEN
                    },
                });
            }
            return { notify: "successfully send your message first time", index, message: savedataMessage, distination: createNewConnection?.id, senderId, receiverId };
        }
    } catch (error) {
        console.log("Error on offlinefeature file ===============>", error);
        throw new Error(error.message);
    }
}


export { acceptOfflineMessages };