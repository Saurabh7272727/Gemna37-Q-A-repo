import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Home from './pages/Home';
const WorkSpace = () => {
    const [query, setQuery] = useSearchParams();
    useEffect(() => {
        setQuery({
            role: "student"
        });
    })
    return (
        <>
            <div className='w-screen h-screen bg-gray-900 fixed top-[60px] overflow-y-scroll scrollbar-none'>
                <Home />
            </div>
        </>
    )
}

export default WorkSpace;