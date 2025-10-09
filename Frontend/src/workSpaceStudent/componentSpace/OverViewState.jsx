import React from 'react';


export default function OverviewStats({ stats }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
            {stats?.map((item, index) => (
                <div key={index} className="bg-[#1a1a1a] p-6 rounded-2xl text-center ring-[0.5px] ring-gray-400">
                    <p className="text-2xl font-bold">{item.value}</p>
                    <p className="text-gray-400 text-sm">{item.label}</p>
                </div>
            ))}
        </div>
    );
}