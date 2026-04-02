"use client";

import { Handle, Position } from "@xyflow/react";

export default function LLMNode({ data }: any) {
  return (
    <div className="w-full bg-gray-800 hover:bg-gray-700 p-2 rounded transition">
      <p className="text-sm font-bold mb-2">LLM Node 🤖</p>

      <p className="text-xs mt-2 text-gray-700 break-words">
  {data?.output || "⏳ Processing..."}
</p>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}