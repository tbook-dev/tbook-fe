import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./github-markdown-light.css";



export default function Markdown({ children }) {
  return (
    <ReactMarkdown
      className="markdown-body"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              style={coldarkDark}
              language={match[1]}
              PreTag="div"
              showLineNumbers={false}
              {...props}
            />
          ) : (
            <code className={className} {...props} children={children} />
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
