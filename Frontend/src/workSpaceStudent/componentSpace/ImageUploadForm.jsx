import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaTrash, FaUser } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { UpdateUserInfo } from '../../ReduxStore/Slices/UserInfoSlice.js';
import { useDispatch } from 'react-redux';
import Message from '../../MessageGemnaCenter/toast.js';


const ImageUploadForm = ({ dropDownBtn, setError }) => {
    const dispatch = useDispatch()
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    // handlers to handler operation upload images to change student profile image;
    const handleFileSelect = (file) => {
        if (file && file.type.startsWith('image/jpeg') || file.type.startsWith('image/png')) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file (JPEG, PNG, GIF, etc.)');
        }
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setPreviewUrl('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };


    const handleSubmit = async (e) => {
        console.log(Cookies.get("GASID"));
        e.preventDefault();
        setLoading(true);
        if (!selectedImage) {
            alert('Please select an image to upload');
            return;
        }


        const payload = {
            time: selectedImage.lastModified,
            image: previewUrl,
            image_format: selectedImage.type.split("/")[1],
            image_size: selectedImage.size

        }
        console.log(selectedImage.size / 1024 / 1024);
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/student/upload/profile/image`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${Cookies.get("GASID")}`
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            const { success, message, imageURL } = result;

            if (!success) {
                // dropDownBtn(false);
                setLoading(false);
                // Cookies.remove("GASID");
                Cookies.set("ErrorMessage", message);
                const messageW = new Message(result);
                messageW.setMessage();
                return;
            }


            Cookies.remove("GASID");
            Cookies.remove("ErrorMessage");

            if (imageURL) {
                dropDownBtn(false);
                dispatch(UpdateUserInfo(imageURL));
                setLoading(false);
            }
            setSelectedImage(null);
            setPreviewUrl('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            if (error) {
                setLoading(false);
                // Cookies.remove("GASID");
                Cookies.set("ErrorMessage", "Please provide under 3.8MB size of image");
                const messageW = new Message({ message: "image size are too long", success: false });
                messageW.setMessage();
                return;
            }
        }

    };

    return (
        <>
            <div className="md:w-[50%] w-[100%] z-21 h-[80%]  bg-gray-50">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-8">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                            Upload Profile Image
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">

                                {previewUrl ? (
                                    <div className="relative group">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-500 shadow-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="absolute top-0 right-1/2 translate-x-16 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                                        >
                                            <FaTrash className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex justify-center">
                                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-dashed border-gray-300">
                                            <FaUser className="w-12 h-12 text-gray-400" />
                                        </div>
                                    </div>
                                )}
                                <div
                                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${isDragging
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                                        }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        type="file"
                                        name='image'
                                        ref={fileInputRef}
                                        onChange={handleFileInputChange}
                                        accept="image/*"
                                        className="hidden"
                                        id="file-upload"
                                    />

                                    <label
                                        htmlFor="file-upload"
                                        className="cursor-pointer block"
                                    >
                                        <FaCloudUploadAlt className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                                        <div className="space-y-2">
                                            <p className="text-lg font-medium text-gray-700">
                                                {isDragging ? 'Drop image here' : 'Choose an image or drag & drop'}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                fileInputRef.current.click();
                                            }}
                                            type="button"
                                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                                        >
                                            Browse Files
                                        </button>
                                    </label>
                                </div>

                                {/* Selected File Info */}
                                {selectedImage && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <p className="text-green-800 text-sm">
                                            <span className="font-medium">Selected:</span> {selectedImage.name}
                                        </p>
                                        <p className="text-green-600 text-xs mt-1">
                                            Size: {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!selectedImage || loading}
                                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${selectedImage
                                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {loading ? "Uploading Image..." : "Upload Image"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Instructions */}
                <div className="max-w-md mx-auto mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Supported formats: JPEG, PNG
                    </p>
                    <p className="text-sm text-gray-600">
                        Maximum file size: 3.8MB
                    </p>
                </div>
            </div>

        </>

    );
};

export default ImageUploadForm;