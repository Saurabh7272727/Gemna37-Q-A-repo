// const hljs = require("highlight.js");

import hljs from 'highlight.js';

function detectLanguage(code) {
    const result = hljs.highlightAuto(code);
    return result.language || "plaintext";
}

// module.exports = { detectLanguage };

export { detectLanguage }
