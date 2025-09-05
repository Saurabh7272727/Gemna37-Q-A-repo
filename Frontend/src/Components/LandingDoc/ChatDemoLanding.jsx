import React from 'react'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';


const ChatDemoLanding = () => {
    const gallery = [
        "https://res.cloudinary.com/dqbjfmyce/image/upload/v1756922289/two-young-entrepreneurs-working-coffee-shop_f9feuc.jpg",
        "https://res.cloudinary.com/dqbjfmyce/image/upload/v1756922288/6nd2_y04y_230125_xf0dyy.jpg",
        "https://res.cloudinary.com/dqbjfmyce/image/upload/v1756922287/62352_dyqged.jpg",
        "https://res.cloudinary.com/dqbjfmyce/image/upload/v1756922287/2680195_zizuzf.jpg"
    ]
    return (
        <>
            <div className='w-screen  bg-gray-900 flex justify-center items-center pt-5 md:pt-[50px] flex-col'>
                <br />
                <h1 className='md:text-[40px] text-[22px] font-bold text-white'>Chatting with your team & share task</h1>
                <br />
                <div className='w-screen md:mt-5 md:h-[500px] h-auto flex md:flex-row flex-col md:justify-center items-center'>
                    <div className='text-white md:w-[30%] w-[100%] md:h-full h-[400px] flex justify-center items-center'>
                        <Timeline position="left">
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <h1 className='text-white text-[10px] md:text-[19px] font-medium bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg'>Connect with Gemna.ai</h1>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <h1 className='text-white text-[10px] md:text-[19px] font-medium bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg'>Select role</h1>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <h1 className='text-white text-[10px] md:text-[19px] font-medium bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg'>join classes</h1>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <h1 className='text-white text-[10px] md:text-[19px] font-medium bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg'>select team</h1>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <h1 className='text-white text-[10px] md:text-[19px] font-medium bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg'>share task and issuse</h1>
                                </TimelineContent>
                            </TimelineItem>
                        </Timeline>
                    </div>
                    <div className='md:w-[50%] w-screen  md:h-[570px] h-auto grid md:grid-cols-3 grid-cols-2 overflow-hidden gap-2'>
                        {
                            gallery?.map((pic, index) => {
                                return (
                                    <img className={`${index == 3 ? 'col-span-2' : ''}`} src={pic} alt="gallery image" />
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default ChatDemoLanding;