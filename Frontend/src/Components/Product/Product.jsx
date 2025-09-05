import React, { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import ShowSectionList from './ShowSectionList';
const Product = () => {
    const { pathname } = useLocation();
    // set querys on tap bar
    const [query, setQuery] = useSearchParams();


    const [section, setSection] = useState({
        pathname,
        queryData: null
    });
    const [sectionData, setSectionData] = useState(null);

    useEffect(() => {
        setQuery({
            querySection: "Hero Section"
        })
        setSection((data) => {
            return { ...data, queryData: query.get("querySection") };
        });
        return () => {
            setSection(null);
            setSectionData(null);
            console.log("products are unmount");
        }
    }, []);

    useEffect(() => {
        const sectionArray = [
            "Hero Section",
            "The Problem Section",
            "The Solution Section",
            "Core Features Section(The Pillars of Gemna",
            "How it Works Section",
            "Benefits & Value Proposition",
            "Social Proof Section",
            "Technical Specification & Integration",
            "Pricing & Plans"
        ]
        setSectionData(sectionArray);
        return () => {
            setSectionData(null);
        }
    }, [])




    return (
        <>
            <div className='w-[100vw] md:h-[100vh] h-auto  pt-[100px] bg-gray-900 flex justify-center items-center gap-x-4 md:pt-8'>
                <div className='md:w-[28%] w-[100%] h-[90%] md:h-[90%]  
                rounded-md flex justify-center items-center flex-col gap-7 md:gap-6 '>
                    {
                        sectionData?.map((sec, index) => {
                            return (
                                <ShowSectionList key={sec} index={index}
                                    sectionName={sec} setQuery={setQuery} ChangeSections={setSection} section={section} />
                            )
                        })
                    }
                </div>
                <div className='md:w-[60%] h-[90%] hidden md:inline bg-white rounded-md'>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default Product;