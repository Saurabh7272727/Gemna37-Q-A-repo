const OCRRegisterUSer = [
    {
        GEMID: "2313054GEM453255",
        NAME: "SAURABH SHARMA",
        FATHERNAME: 'ANIL SHARMA',
        MOTHERNAME: 'SANGITA SHARMA',
        COURSE: 'B.TECH',
        BRANCH: 'IT',
        EMAIL: 'saurabhsharma63679383@gmail.com'
    },
    {
        GEMID: "23130ITBIT-23/IT/C/88",
        NAME: "SAURABH SHARMA",
        FATHERNAME: 'ANIL SHARMA',
        MOTHERNAME: 'SANGITA SHARMA',
        COURSE: 'B.TECH',
        BRANCH: 'IT',
        EMAIL: 'saurabhsharma63679383@gmail.com'
    },
    {
        GEMID: "23130ITBIT-23/IT/C/87",
        NAME: "SAURABH SHARMA",
        FATHERNAME: 'ANIL SHARMA',
        MOTHERNAME: 'SANGITA SHARMA',
        COURSE: 'B.TECH',
        BRANCH: 'IT',
        EMAIL: 'saurabhsharma63679383@gmail.com'
    }

]

const mapUser = new Map(OCRRegisterUSer.map((item) => [item.GEMID, item]));

const ValidDateOCRData = (OCR_TEXT_DATA) => {

    try {
        const checkPresent = mapUser.has(OCR_TEXT_DATA[0]?.Words[2]?.WordText);

        if (!checkPresent) {
            return { message: "NOT_FOUND", status: 404, success: false };
        }

        const data = mapUser.get(OCR_TEXT_DATA[0].Words[2].WordText)
        return { message: "FOUNDED DATA", status: 202, success: true, data: data };
    } catch (error) {
        return { message: "NOT_FOUND", status: 404, success: false };
    }

}

export { ValidDateOCRData };

