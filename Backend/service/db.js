import mongoose from "mongoose"

const connectDataBaseURL = async () => {
    try {
        console.log("connecting....")
        await mongoose.connect(`${process.env.BATABASE_URL}`);
        console.log("connected with mongodb");
    } catch (error) {
        console.log("ERROR", error.message);
    }
}


export default connectDataBaseURL;