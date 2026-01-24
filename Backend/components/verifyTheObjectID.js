import mongoose from "mongoose";


const verifyTheMongoDBID = (id) => {
    const result = mongoose.Types.ObjectId.isValid(id);
    if (result) {
        return result;
    }

    return result;
}

export { verifyTheMongoDBID };