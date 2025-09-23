import createAGEMID from '../components/createAGEMID.js';
import StudentModel from '../model/student.form.schema.js';

const verifyStudentFormSubmit = async (req, res, next) => {

    const { email, branch, collegeID, course,
        fatherName, firstName, lastName, motherName, rollNumber, status, year
    } = req.body;

    if (!email || !branch || !firstName) {
        res.status(422).json({ message: "not valid(email,branch,firstName)", success: false, status: "VALIDATION_ERROR" });
        return;
    }

    if (rollNumber.length !== 13) {
        res.status(422).json({ message: "not valid(rollnumber)", success: false, status: "VALIDATION_ERROR" });
        return;
    }

    if (email.slice(-10) !== '@gmail.com') {
        res.status(422).json({ message: "not valid(email)", success: false, status: "VALIDATION_ERROR" });
        return;
    }

    const find = await StudentModel.findOne({ email: email });
    const rollNumberfind = await StudentModel.findOne({ rollNumber: rollNumber });
    if (find || rollNumberfind) {
        return res.status(404).json({ message: "student are already have account", success: false });
    }


    const GEMID = createAGEMID(year.value, branch.value, course.value, collegeID);
    req.body.GEMID = GEMID;
    next();
}

export { verifyStudentFormSubmit };