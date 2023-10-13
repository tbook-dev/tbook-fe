import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import DevDco from "./developDocumention.md";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./github-markdown-dark.css";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";

export default function DevDoc() {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-2 w-full markdown-body" data-theme="dark">
      <div className="flex justify-end w-full">
        <button
          onClick={() => {
            setOpen((v) => !v);
          }}
        >
          <DownOutlined className={open && "rotate-180"}/>
        </button>
      </div>
      {open && (
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
          {DevDco}
        </ReactMarkdown>
      )}
    </div>
  );
}
