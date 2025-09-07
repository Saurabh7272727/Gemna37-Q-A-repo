import React, { useState } from 'react'
import { FaIdCard } from 'react-icons/fa';
import takeImageShower from '../../ImageProcessing/takeImageShower.js';
import takeImageShowerMobileFriendly from '../../ImageProcessing/Testing.js';// for mobile users

const ImageConnect = () => {
    const [preview, setPreview] = useState(null);
    const [show, setShow] = useState({
        complete: false,
        loading: false
    });

    const handlerImageShow = async (image) => {
        setShow((e) => {
            return { ...e, loading: true }
        })
        const result = await takeImageShower(image.target.files[0], setPreview)
        console.log(result);

        //  { message: "upload successfully", status: 200, success: true };

        if (result.success) {
            //  show messages // handles result output;;;
            setShow((e) => {
                return { ...e, complete: true }
            })
        } else {
            setPreview(null);
        }
    }


    const ClearHandler = () => {
        setShow({
            complete: false,
            loading: false
        })
        setPreview(null);
    }
    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaIdCard className="mr-2 text-blue-600" />
                    Verify with Student ID
                </h3>

                <p className="text-gray-600 mb-4">
                    Upload a clear photo of your student ID card to automatically fill your information.
                </p>
                {
                    preview && <img className='md:w-[40%] md:h-[20%] w-[100%] h-[30%] object-contain' src={preview} alt='uploaded image (only share jpeg & png formate)' />
                }
                <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                >
                    {
                        show.loading ? <button disabled={!show.complete} onClick={() => alert('hello')} className='px-6 hover:bg-green-400 text-white font-medium bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg'>{show.complete ? "next" : "uploading..."}
                        </button> :
                            <input
                                type="file"
                                accept="image/jpg"
                                className=""
                                onChange={(e) => handlerImageShow(e)}
                                disabled={false}
                            />

                    }

                </div>

                <div className="mt-4 text-xs text-gray-500">
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
        </>
    )
}

export default ImageConnect;