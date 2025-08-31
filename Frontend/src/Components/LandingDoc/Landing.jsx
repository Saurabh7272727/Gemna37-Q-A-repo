import React, { useEffect } from 'react'
import Home from '../../Pages/Home.jsx';

const Landing = () => {
    useEffect(() => {
        document.title = 'gemna.landing.ai'
    }, [])
    return (
        <>
            <div className='bg-[#030712] w-screen h-screen flex flex-col justify-around items-center'>
                <Home />
                <div className='w-[70%] h-[50px] bg-slate-100/90 rounded-sm'>

                </div>
            </div>

        </>
    )
}

export default Landing;