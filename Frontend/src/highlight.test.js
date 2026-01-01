// import { detectLanguage } from './functions/highlight.js';

const { detectLanguage } = require('./functions/highlight.js');


test('test highlight shot', () => {
    expect(detectLanguage(`import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeMessage = ({ code, language }) => {
  return (
    <div className="bg-black rounded-lg p-3 text-sm relative">
      <SyntaxHighlighter
        language={language || "javascript"}
        style={oneDark}
        customStyle={{ background: "black" }}
      >
        {code}
      </SyntaxHighlighter>

      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="absolute top-2 right-2 text-xs bg-gray-700 px-2 py-1 rounded"
      >
        Copy
      </button>
    </div>
  );
};
`)).toBe("javascript");
})

