import React from 'react'

const WorkSpaceContainerSize = ({ children, css }) => {
    return (
        <>
            <div className={`w-screen h-screen overflow-y-auto scrollbar-none pt-[71px] pb-[71px] ${css} scroll-smooth`}>
                {children}
            </div>
        </>
    )
}

export default WorkSpaceContainerSize;