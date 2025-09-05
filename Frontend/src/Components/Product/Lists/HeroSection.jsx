import React from 'react';
import { FaPlay, FaCalendarCheck } from 'react-icons/fa';

const HeroSection = () => {
    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-800 text-white flex items-center">
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Gemna: The Connected Campus Experience
                        </h1>
                        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                            Unify student management, attendance, performance tracking, team collaboration,
                            and virtual learning in one intelligent platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-white text-blue-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center">
                                <FaCalendarCheck className="mr-2" />
                                Book a Demo
                            </button>
                            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                                <FaPlay className="mr-2" />
                                Watch Overview (1:30 min)
                            </button>
                        </div>
                    </div>
                    <div className="lg:flex justify-center hidden">
                        <div className="relative">
                            <div className="absolute -inset-8 bg-blue-600 rounded-2xl rotate-3 opacity-20"></div>
                            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                                <img
                                    src="/api/placeholder/500/400"
                                    alt="Gemna Dashboard Preview"
                                    className="rounded-xl shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;