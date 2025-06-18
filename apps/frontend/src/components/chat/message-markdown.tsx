import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

function MessageMarkdown({ message }: { message: string }) {
  console.log("Rendering message markdown:", message);
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
    >
      {message}
    </ReactMarkdown>
  );
}

export default MessageMarkdown;
