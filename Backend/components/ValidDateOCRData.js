import StudentModel from '../model/student.form.schema.js';


const ValidDateOCRData = async (OCR_TEXT_DATA) => {

    const UserGemIDCard = OCR_TEXT_DATA[0]?.LineText;
    const splitId = UserGemIDCard.split("-");

    try {
        const findStudentGemId = await StudentModel.findOne({ GEMID: splitId[1].trim() });
        if (!findStudentGemId) {
            return { message: "NOT_FOUND in if blocks", status: 404, success: false };
        }
        const data = {
            GEMID: findStudentGemId?.GEMID,
            NAME: `${findStudentGemId?.firstName} ${findStudentGemId?.lastName}`,
            FATHERNAME: findStudentGemId?.fatherName,
            MOTHERNAME: findStudentGemId?.motherName,
            COURSE: findStudentGemId?.course.label,
            BRANCH: findStudentGemId?.branch.label,
            EMAIL: findStudentGemId?.email
        }
        return { message: "FOUNDED DATA", status: 202, success: true, data: data };
    } catch (error) {
        return { message: "NOT_FOUND catch block", status: 404, success: false };
    }

}

export { ValidDateOCRData };

