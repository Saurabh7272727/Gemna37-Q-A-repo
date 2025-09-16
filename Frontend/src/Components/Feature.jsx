import React from 'react';
import { motion } from 'framer-motion';

import {
    FaUserGraduate,
    FaChalkboardTeacher,
    FaClipboardCheck,
    FaChartLine,
    FaComments,
    FaVideo,
    FaUsers,
    FaTasks,
    FaBrain,
    FaMobileAlt,
    FaShieldAlt,
    FaDatabase,
    FaBell,
    FaCalendarAlt,
    FaFileExport,
    FaCloud
} from 'react-icons/fa';

const Feature = () => {

    const features = [
        {
            icon: FaUserGraduate,
            title: "Student Profile Management",
            description: "Comprehensive student profiles with academic records, personal information, and progress tracking.",
            status: "live",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: FaClipboardCheck,
            title: "Attendance System",
            description: "QR code and biometric based attendance tracking with real-time notifications and reports.",
            status: "live",
            gradient: "from-green-500 to-emerald-600"
        },
        {
            icon: FaChartLine,
            title: "Performance Analytics",
            description: "Advanced analytics and visualization of student performance with predictive insights.",
            status: "live",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: FaComments,
            title: "Team Chat Feature",
            description: "Real-time messaging with file sharing, groups, and channels for seamless collaboration.",
            status: "live",
            gradient: "from-indigo-500 to-blue-500"
        },
        {
            icon: FaVideo,
            title: "Live Classes Integration",
            description: "Virtual classroom integration with screen sharing, whiteboard, and recording capabilities.",
            status: "development",
            gradient: "from-red-500 to-orange-500"
        },
        {
            icon: FaUsers,
            title: "Team Management Tools",
            description: "Role-based access control, task delegation, and team performance monitoring.",
            status: "live",
            gradient: "from-teal-500 to-green-500"
        },
        {
            icon: FaTasks,
            title: "Task Scheduler & Planner",
            description: "Smart scheduling system with reminders, deadlines, and progress tracking for all activities.",
            status: "live",
            gradient: "from-yellow-500 to-amber-500"
        },
        {
            icon: FaBrain,
            title: "AI-Powered Insights",
            description: "Machine learning algorithms to predict student performance and suggest interventions.",
            status: "planning",
            gradient: "from-purple-600 to-blue-600"
        },
        {
            icon: FaMobileAlt,
            title: "Mobile Application",
            description: "Cross-platform mobile app for students and faculty with all core features.",
            status: "development",
            gradient: "from-cyan-500 to-blue-500"
        },
        {
            icon: FaShieldAlt,
            title: "Advanced Security",
            description: "End-to-end encryption, role-based access controls, and compliance with education data regulations.",
            status: "live",
            gradient: "from-gray-700 to-gray-900"
        },
        {
            icon: FaDatabase,
            title: "Data Management",
            description: "Centralized database with backup, recovery, and data migration capabilities.",
            status: "live",
            gradient: "from-indigo-600 to-purple-600"
        },
        {
            icon: FaBell,
            title: "Notification System",
            description: "Customizable alerts and notifications via email, SMS, and in-app messaging.",
            status: "live",
            gradient: "from-orange-500 to-red-500"
        },
        {
            icon: FaCalendarAlt,
            title: "Academic Calendar",
            description: "Interactive calendar with events, deadlines, and sync capabilities with personal calendars.",
            status: "live",
            gradient: "from-lime-500 to-green-500"
        },
        {
            icon: FaFileExport,
            title: "Report Generation",
            description: "Customizable report templates with export to PDF, Excel, and other formats.",
            status: "live",
            gradient: "from-blue-600 to-indigo-600"
        },
        {
            icon: FaCloud,
            title: "Cloud Integration",
            description: "Seamless integration with cloud storage providers for document management.",
            status: "development",
            gradient: "from-lightBlue-500 to-cyan-500"
        }
    ];


    return (
        <div className="min-h-screen bg-gradient-to-br pt-10 from-gray-900 via-gray-800 to-gray-900 text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">
                            Gemna.console Features
                        </h1>
                        <p className="text-[13px] md:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                            Imagine a platform where every aspect of college management—student profiles, attendance, performance tracking, live classes, team collaboration, and task scheduling—is seamlessly integrated into one intuitive system. That’s what Gemna is all about.
                        </p>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent pointer-events-none"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>

                {/* Stats Section */}
                <div className="mt-32 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Trusted by Global Leaders</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <StatItem number="Q&A Test" label="Daily Users" />
                        <StatItem number="99.9%" label="Uptime" />
                        <StatItem number="India" label="Countries" />
                        <StatItem number="24/7" label="Live access" />
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 py-20">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
                    <p className="text-xl text-blue-100 mb-8">Join thousands of companies already using Gemini AI</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105">
                            Start Free Trial
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-200">
                            Schedule Demo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ feature, index }) => {
    const Icon = feature.icon;

    return (
        <motion.div
            initial={{ opacity: 0.2, x: 150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="group relative cursor-not-allowed">
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl ${feature.gradient} blur-xl"></div>

            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 h-full border border-gray-700/50 group-hover:border-transparent transition-all duration-500 group-hover:scale-105">
                <div className={`inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-500">
                    {feature.title}
                </h3>

                <p className="text-gray-300 mb-4 leading-relaxed">
                    {feature.description}
                </p>

                <div className="flex items-center mt-4">
                    <span className="text-sm font-semibold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">
                        {feature.stats}
                    </span>
                </div>

                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
        </motion.div>
    );
};

const StatItem = ({ number, label }) => (
    <div className="text-center">
        <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
            {number}
        </div>
        <div className="text-gray-400 font-semibold uppercase text-sm tracking-wider">
            {label}
        </div>
    </div>
);

export default Feature;