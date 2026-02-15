import React from "react";
import { motion } from "framer-motion";

export default function ExeDownloadPage() {
    const downloadFile = () => {
        const link = document.createElement("a");
        link.href = `${import.meta.env.VITE_APP_BACKEND_URL}/files/GemnaAI.zip`;
        link.download = "software.zip";
        link.click();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center p-6">
            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Download Windows EXE Installer
                    </h1>

                    <p className="text-lg text-gray-300">
                        Fast, secure and lightweight installer. One click download and
                        install on your system , famous for GEMNA EXAM TOOL.
                    </p>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={downloadFile}
                            className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg"
                        >
                            Download ZIP
                        </button>

                        <span className="text-gray-400">Version 1.0 • 84MB</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 text-center">
                        <div className="bg-slate-800 p-4 rounded-2xl">
                            <p className="text-2xl font-bold">Secure</p>
                            <p className="text-gray-400 text-sm">Virus Checked</p>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-2xl">
                            <p className="text-2xl font-bold">Fast</p>
                            <p className="text-gray-400 text-sm">Quick Install</p>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-2xl">
                            <p className="text-2xl font-bold">Free</p>
                            <p className="text-gray-400 text-sm">No Cost</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <img
                        src="../../ff.png"
                        alt="software"
                        className="rounded-3xl shadow-2xl"
                    />

                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="absolute -bottom-6 -left-6 bg-blue-600 p-6 rounded-2xl shadow-xl"
                    >
                        <p className="text-lg font-semibold">ZIP File Ready</p>
                        <p className="text-sm text-blue-100">Click download to start</p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
