import React from 'react'
import Error404 from '../../../Components/ErrorPages/Error404.jsx';

const G_chatApp = ({ renderPart }) => {


    if (!renderPart) {
        localStorage.clear();
        return (
            <>
                <Error404 />
            </>
        )
    } else {
        return (
            <div>
                <h1 className='text-black'>hello</h1>
            </div>
        )
    }
}

export default G_chatApp;