"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Brain } from "lucide-react";

interface ReasoningDisplayProps {
  reasoningParts: any[];
}

export default function ReasoningDisplay({
  reasoningParts,
}: ReasoningDisplayProps) {
  const [showReasoning, setShowReasoning] = useState(false);

  if (!reasoningParts.length) return null;

  return (
    <div className="mt-3 border-t border-gray-100 pt-3">
      <button
        onClick={() => setShowReasoning(!showReasoning)}
        className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition-colors group"
      >
        {showReasoning ? (
          <ChevronDown className="w-3 h-3" />
        ) : (
          <ChevronRight className="w-3 h-3" />
        )}
        <Brain className="w-3 h-3 text-blue-500" />
        <span className="group-hover:text-blue-600">View reasoning</span>
      </button>

      {showReasoning && (
        <div className="mt-3 space-y-2">
          {reasoningParts.map((part: any, i: number) => (
            <div
              key={i}
              className="bg-blue-50 border border-blue-100 rounded-lg p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-3 h-3 text-blue-600" />
                <span className="text-xs font-medium text-blue-700">
                  Model Reasoning
                </span>
              </div>
              <div className="text-xs text-gray-700 font-mono bg-white p-3 rounded border border-blue-100 overflow-x-auto">
                <pre className="whitespace-pre-wrap">
                  {part.details
                    ?.map((detail: any, j: number) =>
                      detail.type === "text" ? detail.text : "<redacted>"
                    )
                    .join("") || "No reasoning details available"}
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
