

const convertMapToArray = (map) => {
    const obj = Object.fromEntries(map);
    const temp_online_user = []
    for (let key in obj) {
        temp_online_user.push({ socketId: key, ...obj[key].ref_id, GSS: true })
    }

    return temp_online_user
}

export default convertMapToArray;