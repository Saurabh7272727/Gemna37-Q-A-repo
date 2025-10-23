import StudentModelMain from '../model/Students.js';
import StudentModel from '../model/student.form.schema.js';

const fetchActiveUsers = async (req, res) => {
    // console.log(req.userDetails);
    try {
        if (req?.userDetails) {
            const findAllActiveUser = await StudentModel.find({
                "course.value": `${req.userDetails.ref_id.course.value}`,
                "branch.value": `${req.userDetails.ref_id.branch.value}`,
                "year.value": `${req.userDetails.ref_id.year.value}`,
                "status.value": `${req.userDetails.ref_id.status.value}`
            }).sort({ rollNumber: 1 });

            if (findAllActiveUser) {
                return res.status(200).json({ message: "find active students", success: true, data: [...findAllActiveUser] })
            }
        }
    } catch (error) {
        if (error) {
            console.log("Error on controller 8 ", error);
            return res.status(401).json({ message: "Internal server Error log- 22", success: false });
        }
    }

}



export { fetchActiveUsers };