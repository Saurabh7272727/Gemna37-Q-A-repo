import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import JavascriptIcon from "@mui/icons-material/Javascript";
import PythonIcon from "@mui/icons-material/IntegrationInstructions";
import CodeIcon from "@mui/icons-material/Code";
import CloseIcon from "@mui/icons-material/Close";
import { Copy, Check } from "lucide-react";
import { createPortal } from "react-dom";

const languageIcon = (lang) => {
    switch (lang) {
        case "javascript":
            return <JavascriptIcon className="text-yellow-400" />;
        case "python":
            return <PythonIcon className="text-blue-400" />;
        default:
            return <CodeIcon className="text-gray-400" />;
    }
};

const CodeShareCard = ({ code = "", language = "javascript", ShowCodeInBlackBox }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return createPortal(

        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-3 md:px-6">
            <div className="w-full max-w-4xl bg-[#0d1117] rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-300 capitalize">
                        {languageIcon(language)}
                        <span>{language}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleCopy}
                            className="text-gray-400 hover:text-white transition"
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>

                        <button onClick={() => ShowCodeInBlackBox({})}>
                            <CloseIcon className="text-gray-400 hover:text-white transition" />
                        </button>
                    </div>
                </div>
                <div className="max-h-[70vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    <SyntaxHighlighter
                        language={language}
                        style={vscDarkPlus}
                        showLineNumbers
                        wrapLines
                        customStyle={{
                            margin: 0,
                            background: "#0d1117",
                            fontSize: "13px",
                            lineHeight: "1.6",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                        }}
                        codeTagProps={{
                            style: {
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                            },
                        }}
                    >
                        {code}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default CodeShareCard;
