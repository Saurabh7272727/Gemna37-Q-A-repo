import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AiFillFire } from 'react-icons/ai';
import { PulseLoadingSpinner } from '../Components/LodingSpinners/LoadingDemo.jsx';
const GemnaLogoDisplay = () => {
    const navi = useNavigate();


    // navigate the page to landing automatic in 2sec upon 
    const idTime = setTimeout(() => {
        navi('/landing');
    }, 3000);


    // to clear the setTimer and remove the key form local storage , when component are unmound;
    useEffect(() => {

        document.title = 'gemna.ai';
        // if user first time clear the cyle , then it will no show again-again logo demo;
        if (localStorage.getItem('firstTime') === 'false') {
            clearTimeout(idTime);
            return navi("/landing");
        }

        return () => {
            console.log("geman unmount", typeof localStorage.getItem("firstTime"));
            localStorage.setItem("firstTime", false);
            clearTimeout(idTime);
        }
    }, [])

    return (
        <>
            <div className="w-screen h-screen bg-white flex justify-center items-start pt-10 md:items-center md:pt-0 flex-col">
                <img
                    src="../../gg.png"
                    alt="logo of company"
                    className="w-full max-w-md mx-auto md:max-w-lg md:h-3/5"
                />
                <br />
                <PulseLoadingSpinner /><br />
                <h2 className="text-black font-medium flex justify-center items-center shadow-xl shadow-blue-300/40 gap-2 mx-auto">
                    Geman AI Manager <AiFillFire className="text-red-500" />
                    <p>v-37.0.01</p>
                </h2>
            </div>
        </>
    )
}

export default GemnaLogoDisplay;