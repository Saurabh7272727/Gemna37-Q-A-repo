import React from 'react'

const Input = ({ type, placeholder, required, ...props }) => {
    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                required={required}
                {...props}
            />
        </>
    )
}

export default Input;