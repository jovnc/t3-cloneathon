"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Brain, Sparkles } from "lucide-react";

interface ReasoningDisplayProps {
  reasoningParts: any[];
}

export default function ReasoningDisplay({
  reasoningParts,
}: ReasoningDisplayProps) {
  const [showReasoning, setShowReasoning] = useState(false);

  if (!reasoningParts.length) return null;

  return (
    <div className="mb-4">
      <button
        onClick={() => setShowReasoning(!showReasoning)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200 group border border-gray-200"
      >
        {showReasoning ? (
          <ChevronDown className="w-4 h-4 transition-transform duration-200" />
        ) : (
          <ChevronRight className="w-4 h-4 transition-transform duration-200" />
        )}
        <Sparkles className="w-4 h-4 text-purple-500" />
        <span className="font-medium">
          {showReasoning ? "Hide" : "Show"} thinking process
        </span>
        <span className="text-xs text-gray-400 ml-1">
          ({reasoningParts.length} step{reasoningParts.length !== 1 ? "s" : ""})
        </span>
      </button>

      {showReasoning && (
        <div className="mt-3 space-y-3 animate-in slide-in-from-top-2 duration-300">
          {reasoningParts.map((part: any, i: number) => (
            <div
              key={i}
              className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <Brain className="w-3 h-3 text-purple-600" />
                </div>
                <span className="text-sm font-semibold text-purple-800">
                  Thinking
                </span>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-100 shadow-sm">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
                  {part.content ||
                    part.details
                      ?.map((detail: any) =>
                        detail.type === "text" ? detail.text : "<redacted>"
                      )
                      .join("") ||
                    "No reasoning details available"}
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
