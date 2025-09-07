const takeImageShowerMobileFriendly = (image, setfun) => {
    return new Promise((resolve, _) => {
        if (!image) {
            resolve({
                message: "No file selected",
                status: 400,
                success: false
            });
            return;
        }

        // Check file type
        const allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp'
        ];

        const fileType = image.type.toLowerCase();
        const isAllowedType = allowedTypes.some(type => fileType.includes(type.split('/')[1]));

        if (!isAllowedType) {
            resolve({
                message: "Please upload an image in JPG, PNG, or WEBP format",
                status: 400,
                success: false
            });
            return;
        }

        // Check file size
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const maxSize = isMobile ? 2 * 1024 * 1024 : 5 * 1024 * 1024;

        if (image.size > maxSize) {
            resolve({
                message: `Image size must be less than ${isMobile ? '2MB' : '5MB'}`,
                status: 400,
                success: false
            });
            return;
        }

        try {
            // Use createObjectURL for better mobile performance
            const objectUrl = URL.createObjectURL(image);
            setfun(objectUrl);

            resolve({
                message: "Upload successful",
                status: 200,
                success: true
            });
        } catch (error) {
            resolve({
                message: "Failed to process the image",
                status: 500,
                success: false,
                error: error.message
            });
        }
    });
};


export default takeImageShowerMobileFriendly;