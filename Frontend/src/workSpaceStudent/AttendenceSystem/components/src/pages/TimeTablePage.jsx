import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

// Pure React + Tailwind (NO Next.js, NO shadcn)
// Works in Vite / CRA / any React setup

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const sampleCollegeTimetable = {
    Mon: [
        { subject: "DBMS", time: "10:00 - 11:00" },
        { subject: "OS", time: "12:00 - 01:00" },
    ],
    Tue: [
        { subject: "CN", time: "09:00 - 10:00" },
        { subject: "Maths", time: "01:00 - 02:00" },
    ],
};

export default function TimetablePage() {
    const [customSlots, setCustomSlots] = useState([]);

    const addSlot = () => {
        setCustomSlots([
            ...customSlots,
            { subject: "New Subject", day: "Mon", time: "10:00 - 11:00" },
        ]);
    };

    return (
        <div className="p-4 md:p-8 bg-gray-900 min-h-screen">
            {/* Header */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-4xl font-bold mb-6"
            >
                Student Timetable
            </motion.h1>

            {/* Tabs */}
            <div className="flex gap-4 mb-6">
                <button className="px-5 py-2 rounded-xl bg-black text-white">
                    College Timetable
                </button>
                <button className="px-5 py-2 rounded-xl bg-white shadow">
                    Custom Timetable
                </button>
            </div>

            {/* College Timetable */}
            <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4">College Timetable</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {days.map((day) => (
                        <div
                            key={day}
                            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
                        >
                            <div className="font-semibold text-lg mb-4">{day}</div>

                            <div className="space-y-3">
                                {sampleCollegeTimetable[day]?.length ? (
                                    sampleCollegeTimetable[day].map((slot, idx) => (
                                        <div
                                            key={idx}
                                            className="p-3 bg-slate-100 rounded-xl flex justify-between"
                                        >
                                            <span>{slot.subject}</span>
                                            <span className="text-sm text-gray-500">
                                                {slot.time}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400 text-sm">No classes</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Timetable */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Create Your Timetable</h2>
                    <button
                        onClick={addSlot}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-2xl"
                    >
                        <Plus size={16} /> Add Slot
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {customSlots.map((slot, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
                        >
                            <div className="font-semibold text-lg mb-2">
                                {slot.subject}
                            </div>
                            <div className="text-sm text-gray-500">
                                {slot.day} • {slot.time}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
