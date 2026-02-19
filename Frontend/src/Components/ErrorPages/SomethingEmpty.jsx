import React from "react";

// Empty-only state component (shows image + message when array empty)
// bg-slate-900 themed, responsive, no animation

export default function EmptySubjectsState({ subjects = [], message, submessage }) {
    const isEmpty = !subjects || subjects.length === 0;

    if (!isEmpty) return null; // Only render when array is empty

    return (
        <div className="h-fit w-fit bg-slate-900 flex items-center justify-center p-6">
            <div className="max-w-lg w-full text-center">
                <div className="bg-slate-800/60 border border-slate-700 rounded-2xl shadow-xl p-8">
                    <img
                        src="https://illustrations.popsy.co/gray/web-design.svg"
                        alt="No data"
                        className="w-full max-w-xs mx-auto mb-6"
                    />

                    <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
                        {message}
                    </h2>

                    <p className="text-slate-400 text-sm md:text-base">
                        {submessage}
                    </p>
                </div>
            </div>
        </div>
    );
}
