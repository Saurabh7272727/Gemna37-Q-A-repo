import { motion } from "framer-motion";
import React, { Suspense } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Section = ({ children }) => (
    <section className="px-6 md:px-16 py-20 bg-gray-900 text-gray-100">
        {children}
    </section>
);

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

const features = [
    {
        title: "AI Study Companion",
        desc: "Personalized AI that helps students understand concepts, summarize lectures, and prepare for exams.",
        img: "https://res.cloudinary.com/dqbjfmyce/image/upload/v1766139531/Screenshot_2025-12-19_154659_lypmas.png",
    },
    {
        title: "Smart Attendance System",
        desc: "Automated attendance tracking with prediction insights powered by AI analytics.",
        img: "https://res.cloudinary.com/dqbjfmyce/image/upload/v1766139580/Screenshot_2025-12-12_135943_qyzdyr.png",
    },
    {
        title: "Real-time Chat & Collaboration",
        desc: "Low-latency chat with translation support and secure real-time collaboration.",
        img: "https://res.cloudinary.com/dqbjfmyce/image/upload/v1766139514/Screenshot_2025-12-19_154634_mglccg.png",
    },
    {
        title: "Faculty Analytics Dashboard",
        desc: "Data-driven dashboards for performance tracking, reports, and student insights.",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    },
];


export const Hero = () => (
    <Section>
        <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
        >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                All Your Campus Tools.
                <span className="block text-indigo-400">One Unified AI Platform.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-400">
                Gemna.ai helps colleges manage students, faculty, classes, communication,
                and AI-powered workflows — all from one dashboard.
            </p>
            <div className="mt-8 flex justify-center gap-4">
                <button className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition">
                    Get Started
                </button>
                <button className="px-6 py-3 rounded-xl border border-gray-600 hover:bg-gray-800 transition">
                    Request Demo
                </button>
            </div>
        </motion.div>
    </Section>
);


export const Features = () => {
    return (
        <section className="bg-gray-900 text-white py-20 px-6">
            <div className="max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">
                        Powerful Features of <span className="text-indigo-400">Gemnaworld</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        An all-in-one AI powered campus management ecosystem designed for students, faculty, and institutions.
                    </p>
                </motion.div>


                <div className="grid md:grid-cols-2 gap-12">
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-gray-800 rounded-2xl px-3  flex flex-col justify-center items-center gap-2 overflow-hidden shadow-lg hover:shadow-indigo-500/20 transition"
                        >

                            <LazyLoadImage
                                src={item.img}
                                alt={item.title}
                                effect="blur"
                                className="w-[100%] h-[100%] object-contain rounded-md"
                            />

                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-400">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};


export const Workflow = () => (
    <Section>
        <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            className="text-3xl font-semibold text-center"
        >
            How Gemna.ai Works
        </motion.h2>

        <div className="mt-14 grid md:grid-cols-5 gap-6 text-center">
            {["Connect Campus", "Select Role", "Join Classes", "Build Teams", "Collaborate"].map(
                (step, i) => (
                    <motion.div
                        key={i}
                        initial="hidden"
                        whileInView="visible"
                        variants={fadeUp}
                        transition={{ delay: i * 0.08 }}
                        className="bg-gray-800 p-4 rounded-xl"
                    >
                        <div className="text-indigo-400 font-bold text-lg">{i + 1}</div>
                        <p className="mt-2 text-sm text-gray-300">{step}</p>
                    </motion.div>
                )
            )}
        </div>
    </Section>
);


export const TechStack = () => (
    <Section>
        <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            className="text-3xl font-semibold text-center"
        >
            Technology Used
        </motion.h2>

        <div className="mt-12 grid md:grid-cols-4 gap-6">
            {["React", "Node.js", "MongoDB", "Socket.io", "Inngest", "AI APIs", "Tailwind", "Framer Motion"].map(
                (tech, i) => (
                    <motion.div
                        key={i}
                        initial="hidden"
                        whileInView="visible"
                        variants={fadeUp}
                        transition={{ delay: i * 0.05 }}
                        className="bg-gray-800 text-center p-4 rounded-xl"
                    >
                        <p className="text-gray-200 font-medium">{tech}</p>
                    </motion.div>
                )
            )}
        </div>
    </Section>
);


export const CTA = () => (
    <Section>
        <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            className="text-center"
        >
            <h2 className="text-4xl font-bold">Ready to modernize your campus?</h2>
            <p className="mt-4 text-gray-400">Built for scalability, security, and Indian education systems.</p>
            <button className="mt-8 px-8 py-4 bg-indigo-600 rounded-xl hover:bg-indigo-500 transition">
                Start with Gemna.ai
            </button>
        </motion.div>
    </Section>
);


export default function LandingPage() {
    return (
        <Suspense fallback={<div className="bg-gray-900 text-center py-40">Loading Gemna.ai…</div>}>
            <Features />
            <Workflow />
            <TechStack />
            <CTA />
        </Suspense>
    );
}
