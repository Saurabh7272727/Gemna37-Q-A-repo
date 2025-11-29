import StudentModelMain from '../model/Students.js';
import StudentModel from '../model/student.form.schema.js';
import connectionModel from '../model/connection.model.js'


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


const fetchAllConnections = async (req, res) => {
    if (!req?.userDetails?.email) {
        return res.status(402).json({ message: "unauthorized access", success: false });
    }


    try {
        const findAllconnections = await connectionModel.find({
            $or: [
                {
                    member_one: req?.userDetails?.ref_id?._id
                }, {
                    member_two: req?.userDetails?.ref_id?._id
                }
            ],
            type: 'direct'
        }).sort({ updatedAt: -1 }).populate('member_one').populate('member_two');

        return res.status(200).json({ message: "get are successfully", success: true, data: findAllconnections })
    } catch (error) {
        return res.status(402).json({ message: `Data fetching Error - ${error.message}`, success: false });
    }

}

const fetchAllMessage = async (req, res) => {
    if (!req?.userDetails?.email) {
        return res.status(402).json({ message: "unauthorized access", success: false });
    }

    const { message, message2 } = req.params;
    try {
        const findAllconnections = await connectionModel.findOne({ id: `${message}/${message2}` }).populate('messages.ref_id');
        return res.status(200).json({ message: "get are successfully", success: true, data: findAllconnections?.messages, id: findAllconnections?._id })
    } catch (error) {
        return res.status(402).json({ message: `Data fetching Error - ${error.message}`, success: false });
    }
}



export { fetchActiveUsers, fetchAllConnections, fetchAllMessage };