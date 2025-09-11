import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { decryptData } from '../Encryption/jsondataEncryption';
// import NextStepOfVerification from './NextStepOfVerification.jsx';
const NextStepOfVerification = lazy(() => import('./NextStepOfVerification.jsx'));
import LazyLaodingDemo from '../../Components/LodingSpinners/LazyLaodingDemo';

const StepCircle = () => {
    const [active, setActive] = useState(false);
    const [formData, setFormDaat] = useState(null);
    const navi = useNavigate();

    const fetchData = async (data) => {
        // console.log(data);
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/student/gemnaId/validation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            return result
        } catch (error) {
            console.log(error);
            return navi("/error_page");
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("gemnaIDLog")) {
            return navi("/error_page");
        }
        const data = localStorage.getItem("gemnaIDLog");
        fetchData(decryptData(data)).then((result) => {
            if (result?.success) {
                setActive(true);
                return setFormDaat(result);
            }

            localStorage.setItem('message_local', result.message);
            setTimeout(() => {
                return navi("/connectGemnaPage");
            }, 1000)
        });

        return () => {
            setActive(false)
            setFormDaat(null)
        }
    }, []);

    return (
        <>
            {
                active ? <div className='bg-gray-900 pt-[80px]'>
                    <Suspense fallback={<LazyLaodingDemo />}>
                        <NextStepOfVerification responseData={formData} />
                    </Suspense>
                </div> :
                    <div className="flex justify-center items-center h-screen bg-gray-900">
                        <div
                            className={`
          w-24 h-24 md:w-32 md:h-32 rounded-full 
          flex items-center justify-center 
          text-white text-xl font-bold
          transition-colors duration-[5000ms]
          ${active ? 'bg-gray-900' : 'bg-gray-400'}
        `}
                        >
                            {active ? 'Done' : 'checking...'}
                        </div>
                    </div>
            }
        </>
    );
};

export default StepCircle;
