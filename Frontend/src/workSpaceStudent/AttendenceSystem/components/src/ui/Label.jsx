import React from 'react'

const Label = ({ text, css }) => {
    return (
        <>
            <h1 className={`py-2 px-4 ring-2 ring-blue-500  text-white
             font-semibold  ${css}`}>
                {text}
            </h1>
        </>
    )
}

export default Label