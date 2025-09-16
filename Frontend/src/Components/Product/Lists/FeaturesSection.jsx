// 4. FeaturesSection.jsx
import React from 'react';

const FeaturesSection = () => {
    const features = [
        {
            icon: "👨‍🎓",
            title: "Student Hub",
            description: "Centralized profiles with academic history, documents, and performance metrics.",
            benefit: "Get a 360° view of every student."
        },
        {
            icon: "📅",
            title: "Smart Attendance",
            description: "QR-code and biometric-based tracking with automated reports and alerts.",
            benefit: "Save 10+ hours per month on manual entry."
        },
        {
            icon: "📊",
            title: "Performance Analytics",
            description: "AI-driven insights and visual dashboards to track progress and predict outcomes.",
            benefit: "Identify at-risk students early and intervene."
        },
        {
            icon: "🎥",
            title: "Live Class Integration",
            description: "Built-in virtual classroom with recording, whiteboard, and breakout rooms.",
            benefit: "Teach from anywhere without switching apps."
        },
        {
            icon: "🤝",
            title: "Team Collaboration",
            description: "Real-time chat, file sharing, and project management tools for faculty and staff.",
            benefit: "Streamline communication and project tracking."
        },
        {
            icon: "⏰",
            title: "Task Scheduler",
            description: "A unified calendar for assignments, deadlines, meetings, and institutional events.",
            benefit: "Never miss a critical deadline again."
        }
    ];

    return (
        <section className="py-20 bg-gray-50 w-full h-full">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        The Pillars of Gemna
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Comprehensive features designed to address every aspect of campus management
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group">
                            <div className="text-4xl mb-6">{feature.icon}</div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {feature.description}
                            </p>
                            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg inline-block">
                                {feature.benefit}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;