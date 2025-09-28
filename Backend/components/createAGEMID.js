import generateSecureOTP from './uniqueNumberGen.js';


const createAGEMID = (year, branch, course, collegeID) => {

    const GEMID_RANDOM = generateSecureOTP();

    const string_GEMID = `${year}${branch}${course}9797GEM${GEMID_RANDOM}`;
    return string_GEMID;
}

export default createAGEMID;