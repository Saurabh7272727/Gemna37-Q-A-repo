


const takeImageShower = async (image, setfun) => {   // image : files[0], useState: set function and return img src
    if (!image) return { message: ".jpeg are not upload please *provide file* gemna.upload", status: 404, success: false };

    if (image.type !== 'image/jpeg' && image.type !== 'image/png') { // only upload (jpeg/png) format change by saurabh dev
        return {
            message: "upload a image only jpeg and png format",
            status: 404,
            success: false
        };
    } else {
        const reader = new FileReader(image);
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