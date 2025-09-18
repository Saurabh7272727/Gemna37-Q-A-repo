// 3. SolutionSection.jsx
import React from 'react';

const SolutionSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-center items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Introducing Gemna: One Platform, Endless Possibilities
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Gemna brings every aspect of college management together into a single, seamless,
                            and powerful ecosystem. We connect the dots between students, faculty, and administration.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Seamless integration with existing systems",
                                "Intuitive interface designed for all user types",
                                "Scalable architecture for institutions of any size",
                                "Continuous updates based on user feedback"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="bg-green-100 p-2 rounded-full mr-4">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SolutionSection;