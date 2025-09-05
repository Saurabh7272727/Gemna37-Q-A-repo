// 2. ProblemSection.jsx
import React from 'react';
import { FaTools, FaClock, FaUserGraduate, FaLaptopHouse } from 'react-icons/fa';

const ProblemSection = () => {
    const problems = [
        {
            icon: <FaTools className="text-3xl text-red-500" />,
            text: "Administrators juggle multiple software tools that don't communicate."
        },
        {
            icon: <FaClock className="text-3xl text-red-500" />,
            text: "Professors waste time on manual attendance and grading."
        },
        {
            icon: <FaUserGraduate className="text-3xl text-red-500" />,
            text: "Students miss important updates and lack clarity on their academic progress."
        },
        {
            icon: <FaLaptopHouse className="text-3xl text-red-500" />,
            text: "Remote and hybrid learning models create new communication gaps."
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Is Your Campus Struggling with Disconnected Systems?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Educational institutions face numerous challenges with fragmented technology solutions
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {problems.map((problem, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="flex justify-center mb-6">
                                {problem.icon}
                            </div>
                            <p className="text-gray-700 text-center">{problem.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProblemSection;