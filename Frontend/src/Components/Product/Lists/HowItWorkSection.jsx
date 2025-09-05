// 5. HowItWorksSection.jsx
import React from 'react';
import { FaLink, FaSlidersH, FaUsers } from 'react-icons/fa';

const HowItWorksSection = () => {
    const steps = [
        {
            icon: <FaLink className="text-4xl text-blue-600" />,
            title: "Connect",
            description: "Integrate Gemna with your existing systems in days, not months."
        },
        {
            icon: <FaSlidersH className="text-4xl text-blue-600" />,
            title: "Configure",
            description: "Customize modules, roles, and permissions to fit your institution's unique workflow."
        },
        {
            icon: <FaUsers className="text-4xl text-blue-600" />,
            title: "Collaborate",
            description: "Watch as students, faculty, and staff connect and thrive on a single platform."
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        How Gemna Works
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        A simple 3-step process to transform your campus management
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center p-8 bg-gray-50 rounded-2xl">
                            <div className="flex justify-center mb-6">
                                {step.icon}
                            </div>
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                                {index + 1}
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                {step.title}
                            </h3>
                            <p className="text-gray-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;