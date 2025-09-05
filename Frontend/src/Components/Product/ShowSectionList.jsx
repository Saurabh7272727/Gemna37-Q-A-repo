import React, { lazy, useState, Suspense } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
// import { lazy } from 'react';

const HeroSection = lazy(() => import('./Lists/HeroSection.jsx'));
const ProblemSection = lazy(() => import('./Lists/ProblemSection.jsx'))
const SolutionSection = lazy(() => import('./Lists/SolutionSection.jsx'));
const FeaturesSection = lazy(() => import('./Lists/FeaturesSection.jsx'))
const ShowSectionList = ({ sectionName, setQuery, ChangeSections, index, section }) => {

    const [showSlider, setShowSlider] = useState(false);

    const ShowSliderMain = () => {
        setShowSlider(!showSlider);
    }
    const SwitchHandlerFunction = () => {
        switch (section.queryData) {
            case "Hero Section":
                return <HeroSection />
                break;
            case "The Problem Section":
                return <ProblemSection />
                break;
            case "The Solution Section":
                return <SolutionSection />
                break;
            case "Core Features Section(The Pillars of Gemna":
                return <FeaturesSection />
                break;
            case "How it Works Section":
                return <HowItWorksSection />
                break;

        }
    }
    return (
        <>
            <div onClick={() => ChangeSections((sec) => {
                setQuery({
                    querySection: sectionName
                })
                return { ...sec, queryData: sectionName }
            })}
                className='w-[90%] md:h-[50px] h-auto rounded-md font-inter text-gray-900 subpixel-antialiased
                 flex items-center flex-col pl-4 odd:bg-gray-200 even:bg-slate-300 cursor-pointer hover:bg-white' >
                <div className='w-[100%] h-[45px] flex justify-between items-center'>
                    <h1 className='md:text-[16px] text-[14px] font-semibold tracking-wide'>{`${index + 1})  ${sectionName}`}</h1>
                    <span className='text-2xl md:w-[30%] h-[100%] text-gray-600 flex justify-end items-center pr-2'>
                        {section.queryData === sectionName ? <FaArrowLeft /> : ""}
                        <span onClick={() => ShowSliderMain()} className='text-2xl md:hidden'>{showSlider ? <FaCaretDown /> : <FaCaretUp />}</span>
                    </span>
                </div>
                {
                    showSlider && <div className='w-[90%] h-auto'>
                        <Suspense fallback={<div>loading....</div>}>
                            {
                                SwitchHandlerFunction()
                            }
                        </Suspense>
                    </div>
                }
            </div>
        </>
    )
}

export default ShowSectionList