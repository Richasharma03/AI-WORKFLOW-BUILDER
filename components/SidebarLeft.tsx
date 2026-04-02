"use client";

export default function SidebarLeft() {
  return (
    <div className="w-60 bg-gray-900 text-white p-4 border-r border-gray-700">
      
      <h2 className="text-lg font-bold mb-4">
        Nodes
      </h2>

      {/* Text Node */}
      <button
        onClick={() => window.dispatchEvent(new Event("add-text-node"))}
        className="w-full mb-2 p-2 bg-gray-700 hover:bg-gray-600 rounded"
      >
        Text Node 📝
      </button>

      {/* LLM Node */}
      <button
        onClick={() => window.dispatchEvent(new Event("add-llm-node"))}
        className="w-full mb-2 p-2 bg-gray-700 hover:bg-gray-600 rounded"
      >
        LLM Node 🤖
      </button>

    </div>
  );
}