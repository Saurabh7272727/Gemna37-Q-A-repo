import React from 'react'

const Form = ({ children, action }) => {
    return (
        <>
            <form action={action}>
                {children}
            </form>
        </>
    )
}

export default Form;