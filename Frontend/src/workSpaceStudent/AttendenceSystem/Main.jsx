import React from "react";
import { motion } from "framer-motion";
import { Users, Brain, CalendarCheck, ShieldCheck, Layers, Sparkles } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const MagicButton = ({ text = "Click Me" }) => {
    return (
        <button
            className="
        relative 
        px-6 py-3 
        bg-gradient-to-r from-purple-500 to-indigo-500 
        text-white font-semibold 
        rounded-xl 
        shadow-lg 
        overflow-hidden
        transition-all duration-300
        transform hover:scale-105
        hover:from-pink-500 hover:to-yellow-500
        focus:outline-none focus:ring-4 focus:ring-purple-300
        w-full md:w-auto float-right select-none
      "
        >
            <span className="relative">{text}</span>
        </button>
    );
};




const Card = ({ icon: Icon, title, desc }) => (
    <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 15px 35px rgba(99,102,241,0.3)" }}
        className="group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-5 shadow-lg transition-all duration-300"
    >
        {
            Icon ? <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="h-14 w-14 flex items-center justify-center rounded-2xl bg-indigo-500/10 mb-2"
            >
                <Icon className="h-7 w-7 text-indigo-400" />
            </motion.div> : <MagicButton text="Use me" />
        }

        <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-semibold mb-1"
        >
            {title}
        </motion.h3>
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-sm leading-relaxed"
        >
            {desc}
        </motion.p>
    </motion.div>
);

export default function AttendancePage() {

    const chartData = [
        { week: 'Week 1', attendance: 85 },
        { week: 'Week 2', attendance: 90 },
        { week: 'Week 3', attendance: 78 },
        { week: 'Week 4', attendance: 88 },
        { week: 'Week 5', attendance: 92 },
    ];

    const teamMembers = [
        { name: 'Alice Johnson', role: 'Frontend Developer', img: '/placeholder1.png' },
        { name: 'Bob Smith', role: 'Backend Developer', img: '/placeholder2.png' },
        { name: 'Carol Lee', role: 'AI Engineer', img: '/placeholder3.png' },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 overflow-hidden">

            <section className="relative max-w-7xl mx-auto px-6 py-32 text-center overflow-hidden">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, type: "spring", stiffness: 80 }}
                    className="text-4xl md:text-6xl font-bold"
                >
                    Student-First Attendance System
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-6 max-w-3xl mx-auto text-gray-400 select-none"
                >
                    Gemna allows students to manage their attendance by subjects, predict attendance risks using AI, and track progress—all in a student-friendly environment.
                </motion.p><br />
                <hr />
                <section className="max-w-7xl mx-auto px-6 py-10">
                    <Card title="Gemna Attendence = Student-first attendence philosophy" desc="Timetable change hota rehta hai subject nahi change hota." />
                </section>
            </section>


            <section className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
                <Card icon={CalendarCheck} title="Subject-Based Attendance" desc="Track attendance per subject regardless of timetable changes." />
                <Card icon={Users} title="Self-Managed" desc="Students can update attendance comfortably from home after classes." />
                <Card icon={Brain} title="AI Prediction" desc="AI analyzes attendance patterns and predicts risks, suggesting recovery paths." />
            </section>

            <section className="max-w-7xl mx-auto px-6 py-10">
                <motion.h2 className="text-3xl font-bold text-center mb-12">How It Works</motion.h2>
                <div className="grid gap-8 md:grid-cols-4">
                    <Card icon={Layers} title="Choose Subjects" desc="Select only subjects at semester start, timetable handled by system." />
                    <Card icon={CalendarCheck} title="System Generates Sessions" desc="Gemna generates learning sessions automatically for tracking." />
                    <Card icon={ShieldCheck} title="Confidence Validation" desc="Attendance entries validated with consistency signals." />
                    <Card icon={Sparkles} title="Insights & Recovery" desc="AI gives actionable insights and recovery suggestions." />
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-10">
                <motion.h2 className="text-3xl font-bold text-center mb-12">AI Timeline & Flow</motion.h2>
                <motion.div className="bg-gray-800 rounded-3xl p-8 shadow-lg">
                    <img src="/placeholder-flow.svg" loading="lazy" alt="AI Flow Diagram" className="mx-auto w-full max-w-4xl" />
                </motion.div>
            </section>


            <section className="max-w-7xl mx-auto px-6 py-10">
                <motion.h2 className="text-3xl font-bold text-center mb-12">Attendance Prediction</motion.h2>
                <motion.div className="bg-gray-800 rounded-3xl p-8 shadow-lg">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="week" stroke="#e5e7eb" />
                            <YAxis domain={[0, 100]} stroke="#e5e7eb" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="attendance" stroke="#6366f1" fill="rgba(99,102,241,0.2)" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-10">
                <motion.h2 className="text-3xl font-bold text-center mb-12">Meet the Development Team</motion.h2>
                <div className="grid gap-8 md:grid-cols-3">
                    {teamMembers.map(member => (
                        <motion.div key={member.name} className="bg-gray-800 rounded-3xl p-6 shadow-lg flex flex-col items-center">
                            <img src={member.img} alt={member.name} className="h-24 w-24 rounded-full mb-4" loading="lazy" />
                            <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                            <p className="text-gray-400 text-sm text-center">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    );
}
