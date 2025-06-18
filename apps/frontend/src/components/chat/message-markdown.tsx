import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import ReasoningDisplay from "./reasoning-display";

function MessageMarkdown({ message }: { message: string }) {
  // Extract the reasoning text between ◁think▷ and ◁/think▷
  const thinkBlockRegex = /◁think▷([\s\S]*?)◁\/think▷/g;
  const match = thinkBlockRegex.exec(message);
  let reasoningText = "";
  if (match && match[1]) {
    reasoningText = match[1].trim();
  }

  // Only render markdown after the last ◁/think▷
  let finalContent = message;
  if (match) {
    const lastThinkEnd = match.index + match[0].length;
    finalContent = message.slice(lastThinkEnd).trim();
  }

  return (
    <div>
      {reasoningText && (
        <ReasoningDisplay reasoningParts={[{ content: reasoningText }]} />
      )}
      {finalContent && (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {finalContent}
        </ReactMarkdown>
      )}
    </div>
  );
}

export default MessageMarkdown;
