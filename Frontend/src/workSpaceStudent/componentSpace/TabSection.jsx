import React, { useState } from 'react';


export default function TabsSection() {
    const [active, setActive] = useState('Overview');
    const tabs = ['Overview', 'Experience', 'Education', 'Portfolio', 'Performance', 'Reward'];


    return (
        <div className="flex space-x-6 border-b border-gray-700 pb-2 overflow-x-auto">
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={`${active === tab ? 'text-white border-b-2 border-purple-500' : 'text-gray-400'} pb-1 text-sm font-medium`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}