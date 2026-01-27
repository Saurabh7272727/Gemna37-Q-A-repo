import React from 'react'
import { Outlet } from 'react-router-dom'
const HomePage = () => {
    return (
        <div>
            <h1 className='mt-[300px]'>Home</h1>
            <Outlet />
        </div>
    )
}

export default HomePage