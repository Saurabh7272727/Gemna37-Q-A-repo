import React from 'react'
import { Outlet } from 'react-router-dom'
const HomePage = () => {
    return (
        <div className='mt-[60px]'>
            <Outlet />
        </div>
    )
}

export default HomePage