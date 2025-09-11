import React, { useEffect, useState } from 'react'
import { FaIdCard } from 'react-icons/fa';
import takeImageShower from '../../ImageProcessing/takeImageShower.js';
// import takeImageShowerMobileFriendly from '../../ImageProcessing/Testing.js';// for mobile users
import { ToastContainer } from 'react-toastify';
import Message from '../../MessageGemnaCenter/toast.js';
import { encryptData } from '../../Auth/Encryption/jsondataEncryption.js';
import sendImageToServer from '../../Communication/sendImageToserver.js';
import FullScreenLoader from '../LodingSpinners/FullScreenLoader.jsx';
import { useNavigate } from 'react-router-dom';
const ImageConnect = () => {
    const navi = useNavigate();
    const [preview, setPreview] = useState(null);
    const [uploadImage, setUploadImage] = useState(false);

    const [show, setShow] = useState({
        complete: false,
        loading: false
    });

    const handlerImageShow = async (image) => {
        setShow((e) => {
            return { ...e, loading: true }
        })

        const result = await takeImageShower(image.target.files[0], setPreview);

        const message = new Message(result);
        message.setMessage();

        if (result.success) {
            setShow((e) => {
                return { ...e, complete: true }
            })
        } else {
            setPreview(null);
            setShow({
                complete: false,
                loading: false
            })
        }
    }


    const ClearHandler = () => {
        setShow({
            complete: false,
            loading: false
        })
        setPreview(null);
    }

    const UploadImageToServer = async () => {
        const encypte = encryptData({
            time: new Date(),
            image: preview.result,
            image_format: localStorage.getItem("image_format"),
            image_size: localStorage.getItem("image_size")
        });

        localStorage.setItem("uploaded_log", encypte);
        setUploadImage(true);
        setShow(() => {
            return {
                complete: false,
                loading: false
            }
        })
        const response = await sendImageToServer();
        if (response?.success) {
            const message = new Message(response);
            message.setMessage();
            localStorage.removeItem("uploaded_log");
            localStorage.setItem("gemnaIDLog", encryptData(response))

            setTimeout(() => {
                if (response.redirect_path === '/gemna.success') {
                    navi('/validation');
                }
            }, 2000);
        } else {
            localStorage.removeItem("uploaded_log");
            const message = new Message(response);
            message.setMessage();
            setUploadImage(true);
            setTimeout(() => {
                navi("/error_page");
            }, 4000)
        }
    }

    return (
        <>
            {
                uploadImage ? <FullScreenLoader /> :
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <FaIdCard className="mr-2 text-blue-600" />
                            Verify with Student ID
                        </h3>

                        <p className="text-gray-600 mb-4">
                            Upload a clear photo of your student ID card to automatically fill your information.
                        </p>
                        {
                            preview && <img className='md:w-[40%] md:h-[10%] w-[100%] h-[30%] object-contain overflow-hidden' src={preview.result} alt='uploaded image' />
                        }
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                        >
                            {
                                show.loading ? <button disabled={!show.complete} onClick={UploadImageToServer} className='px-6 hover:bg-green-400 text-white font-medium bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg'>{show.complete ? "next" : "uploading..."}
                                </button> :
                                    <input
                                        type="file"
                                        accept="image/jpeg image/png"
                                        className=""
                                        onChange={(e) => handlerImageShow(e)}
                                        disabled={false}
                                    />

                            }

                        </div>

                        <div className="mt-4 text-xs text-gray-500">
                            <p><mark>Caution : </mark>All student first are convert PDF into <mark>JPEG/PNG </mark>
                                format '500kb' then upload at Gemna.upload <mark>Gemna PDF has not supported</mark>
                            </p>
                            <p className='flex gap-x-3 md:flex-row flex-col'>✓ We'll extract your name, ID number, and other details automatically
                                {
                                    show.complete && <button onClick={ClearHandler} className='px-6 hover:bg-green-400 text-white font-medium bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg'>
                                        Re-upload
                                    </button>
                                }

                            </p>

                            <p>✓ Your ID is only used for verification and is stored securely</p>
                        </div>


                    </div>
            }

            <ToastContainer />

        </>
    )
}

export default ImageConnect;