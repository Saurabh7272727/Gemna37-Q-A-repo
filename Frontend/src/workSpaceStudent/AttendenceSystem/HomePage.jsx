import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from './components/src/ui/Sidebar.jsx';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ renderPart }) => {
    const navi = useNavigate();

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (!renderPart) {
            navi('/');
        }
    }, [renderPart])
    return (
        <div className="mt-[60px] mb-12 md:mb-0 flex min-h-screen bg-slate-900 text-white">
            <Sidebar expanded={expanded} setExpanded={setExpanded} />
            <Outlet />
        </div>
    )
}

export default HomePage;