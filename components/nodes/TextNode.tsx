"use client";

import { Handle, Position } from "@xyflow/react";

export default function TextNode({ id, data }: any) {
  return (
    <div className="w-full bg-gray-800 hover:bg-gray-700 p-2 rounded mb-2 transition">
      <p className="text-sm font-bold mb-2">Text Node 📝</p>

      <textarea
        className="w-full border border-gray-300 rounded p-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter text..."
        value={data.text || ""}
        onChange={(e) => {
          console.log("Typing:", e.target.value); 
          data.setText(id, e.target.value);       
        }}
      />

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}