import React from "react";

// Professional promo/info component for Custom Timetable feature
// Text-first, modern SaaS style, Gemna.ai branding
// Responsive, no animation, clean marketing + product explanation

export default function GemnaTimetablePromo() {
    return (
        <section className="w-full bg-slate-900 text-white py-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-10 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        <div className="inline-flex items-center gap-2 bg-indigo-600/20 border border-indigo-500 text-indigo-400 px-3 py-1 rounded-full text-xs font-medium mb-4">
                            GEMNA.AI FEATURE
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                            Build Your Personal Weekly Timetable
                            <span className="text-indigo-400"> Effortlessly</span>
                        </h1>

                        <p className="text-slate-300 text-base md:text-lg mb-6 leading-relaxed">
                            Design your own academic schedule using your linked subjects. Assign periods,
                            balance theory and lab sessions, and let the system optimize your weekly flow.
                            Gemna intelligently adapts to your learning pattern and helps you stay consistent
                            with attendance and subject planning.
                        </p>

                        <div className="space-y-4">
                            <FeatureItem
                                title="Smart Subject Mapping"
                                desc="Automatically use your linked subjects and assign them to weekly slots without manual setup."
                            />

                            <FeatureItem
                                title="Theory + Lab Optimization"
                                desc="System understands lab continuity and distributes theory subjects across the week."
                            />

                            <FeatureItem
                                title="Attendance Ready"
                                desc="Your timetable directly integrates with daily attendance — no repeated selection required."
                            />

                            <FeatureItem
                                title="Editable & Flexible"
                                desc="Modify, swap or rebuild your timetable anytime without losing saved progress."
                            />
                        </div>
                    </div>

                    {/* RIGHT PANEL - PRODUCT CARD */}
                    <div className="bg-slate-800/70 backdrop-blur border border-slate-700 rounded-3xl p-6 md:p-8 shadow-xl">
                        <h3 className="text-xl font-semibold mb-4">
                            Why Custom Timetable Matters
                        </h3>

                        <p className="text-slate-300 mb-6 leading-relaxed">
                            Every student studies differently. Gemna lets you personalize your academic
                            week — plan subjects, manage workload, and maintain consistent attendance.
                        </p>

                        <div className="space-y-5">
                            <StatBlock label="Auto Attendance Mapping" value="Enabled" />
                            <StatBlock label="Weekly Subject Balance" value="Optimized" />
                            <StatBlock label="Manual Control" value="Full" />
                            <StatBlock label="Future AI Suggestions" value="Coming Soon" />
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-700">
                            <p className="text-sm text-slate-400 mb-3">
                                Powered by
                            </p>

                            <div className="text-2xl font-bold tracking-wide">
                                GEMNA.AI
                            </div>

                            <p className="text-xs text-slate-500 mt-2">
                                Smart campus automation for students, faculty and institutions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureItem({ title, desc }) {
    return (
        <div className="flex gap-3">
            <div className="h-2 w-2 mt-2 rounded-full bg-indigo-400" />
            <div>
                <p className="font-semibold text-sm md:text-base">{title}</p>
                <p className="text-slate-400 text-xs md:text-sm">{desc}</p>
            </div>
        </div>
    );
}

function StatBlock({ label, value }) {
    return (
        <div className="flex items-center justify-between bg-slate-700/60 border border-slate-600 rounded-xl px-4 py-3">
            <span className="text-slate-300 text-sm">{label}</span>
            <span className="font-semibold text-indigo-400 text-sm">{value}</span>
        </div>
    );
}
