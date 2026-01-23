import React, { useEffect } from 'react'

const WorkSpaceContainerSize = ({ children, css, renderPart }) => {

    useEffect(() => {
        if (!renderPart) {
            navi('/')
        }
    }, [renderPart])
    return (
        <>
            <div

                className={`w-screen bg-gray-900 h-screen overflow-y-auto scrollbar-none pt-[60px] pb-[60px] ${css} scroll-smooth`}>
                {children}
            </div>
        </>
    )
}

export default WorkSpaceContainerSize;