import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const ShowSectionList = ({ sectionData, setSection }) => {
    const [query, setQuery] = useSearchParams();
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleSectionClick = (sectionName) => {
        setQuery({ querySection: sectionName });
        setSection((prev) => ({ ...prev, queryData: sectionName }));

        // Optional: Scroll to preview on mobile
        if (isMobile) {
            const preview = document.getElementById('section-preview');
            if (preview) {
                preview.scrollIntoView({ behavior: 'smooth' });
            }
            setIsOpen(false); // Close mobile menu
        }
    };

    return (
        <div className="w-full">
            {isMobile && (
                <button
                    className="bg-indigo-600 text-white w-full py-2 rounded-md mb-4"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? 'Support in desktop' : 'Open Sections'}
                </button>
            )}

            {(isOpen || !isMobile) && (
                <ul className="w-full space-y-2 overflow-y-auto max-h-[70vh] px-2">
                    {sectionData?.map((section, index) => (
                        <li
                            key={index}
                            className="cursor-pointer bg-white w-full text-gray-700 hover:bg-indigo-100 py-2 px-3 rounded transition duration-150 ease-in-out text-sm text-start md:text-left"
                            onClick={() => handleSectionClick(section)}
                        >
                            {section}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ShowSectionList;
