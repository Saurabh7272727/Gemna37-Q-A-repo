
import hljs from 'highlight.js';

function detectLanguage(code) {
    const result = hljs.highlightAuto(code);
    return result.language || "plaintext";
}


export { detectLanguage }
