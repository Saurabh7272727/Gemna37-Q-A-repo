

const convertMapToArray = (usersList) => {

    // ================= old =============================
    // const obj = Object.fromEntries(map);
    const temp_online_user = []
    // for (let key in obj) {
    //     temp_online_user.push({ socketId: key, ...obj[key].ref_id, GSS: true })
    // }


    // ====================new version - 29/03/2026 - saurabh ===================
    for (let value of usersList) {
        temp_online_user.push({ ...value, GSS: true });
    }

    return temp_online_user
}

export default convertMapToArray;