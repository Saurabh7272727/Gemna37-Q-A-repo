


const takeImageShower = async (image, setfun) => {   // image : files[0], useState: set function and return img src
    if (!image) return alert("file not upload **");
    console.log(image.type);
    if (image.type !== 'image/jpeg' && image.type !== 'image/png') {
        return {
            message: "upload a image in .jpeg & .png format",
            status: 404,
            success: false
        };
    } else {
        const reader = new FileReader();
        try {
            reader.onload = (e) => setfun(e.target.result);
            reader.readAsDataURL(image);
            return { message: "upload successfully", status: 200, success: true };
        } catch (error) {
            return { message: "image are not upload => ", status: 404, success: false, error }
        }

    }


}

export default takeImageShower;