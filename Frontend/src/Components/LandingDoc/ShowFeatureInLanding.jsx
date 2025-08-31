import React, { useEffect, useState } from 'react'

const ShowFeatureInLanding = React.memo(({ dataSet }) => {
    const [innerWidth, setInnerWidth] = useState(null);
    useEffect(() => {
        setInnerWidth(window.innerWidth);
        return () => {
            setInnerWidth(null);
        }
    }, [])
    return (
        <>
            {
                innerWidth <= 475 ? <div className='w-screen flex flex-col justify-center items-center gap-3 bg-[#111827]'>

                    {
                        dataSet.map((item) => {
                            return (
                                <div key={item.title} className='w-full h-[350px] flex flex-col gap-4 justify-center items-center'>
                                    <div className='w-[90%] h-[56%] overflow-hidden'>
                                        <img className='w-full h-full ' src={item.pictureSource} alt="picture demo" />
                                    </div>
                                    <div className='w-[80%] h-[42%] text-start'>
                                        <h1 className='text-[19px] font-bold text-white'>{item.title}</h1>
                                        <p className='text-gray-400 text-[14px]'>{item.text}</p>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div> :
                    <div className='w-screen h-full bg-[#111827] overflow-hidden  flex items-center justify-center gap-2 flex-col'>
                        {
                            dataSet.map((item) => {
                                return (
                                    <div key={item.title} className='md:w-[70%] w-[100%] h-[450px] md:h-[300px] flex items-center rounded-md  md:justify-around md:odd:flex-row-reverse'>
                                        <div className='md:w-[40%] w-[90%] h-full overflow-hidden'>
                                            <img className='w-full h-full ' src={item.pictureSource} alt="picture demo" />
                                        </div>
                                        <div className='md:w-[40%] w-[100%] h-full text-white flex flex-col justify-center items-center md:gap-4'>
                                            <h1 className='md:text-[34px] text-[21px] font-bold'>{item.title}</h1>
                                            <p className='text-gray-400'>{item.text}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
            }

        </>
    )
})

export default ShowFeatureInLanding;