"use client";

import { useState, useEffect, useCallback } from "react";

import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
  Edge,
  Node,
  OnConnect,
  NodeChange,
  EdgeChange,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import TextNode from "./nodes/TextNode";
import LLMNode from "./nodes/LLMNode";

export default function Canvas() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const nodeTypes = {
    textNode: TextNode,
    llmNode: LLMNode,
  };

  
  useEffect(() => {
    const addTextNode = () => {
      const id = Date.now().toString();

      const newNode: Node = {
        id,
        position: {
          x: Math.random() * 400,
          y: Math.random() * 400,
        },
        data: {
          text: "",
          setText: (nodeId: string, value: string) => {
            setNodes((nds) =>
              nds.map((n) =>
                n.id === nodeId
                  ? { ...n, data: { ...n.data, text: value } }
                  : n
              )
            );
          },
        },
        type: "textNode",
      };

      setNodes((prev) => [...prev, newNode]);
    };

    const addLLMNode = () => {
      const id = Date.now().toString();

      const newNode: Node = {
        id,
        position: {
          x: Math.random() * 400,
          y: Math.random() * 400,
        },
        data: {
          output: "",
        },
        type: "llmNode",
      };

      setNodes((prev) => [...prev, newNode]);
    };

    window.addEventListener("add-text-node", addTextNode);
    window.addEventListener("add-llm-node", addLLMNode);

    return () => {
      window.removeEventListener("add-text-node", addTextNode);
      window.removeEventListener("add-llm-node", addLLMNode);
    };
  }, []);


  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  
  const onConnect: OnConnect = (params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  };

  
  const runFlow = async () => {
    console.log("Running flow...");
    console.log("Nodes:", nodes);
    console.log("Edges:", edges);

    const updatedNodes = await Promise.all(
      nodes.map(async (node) => {
        if (node.type === "llmNode") {
          const edge = edges.find((e) => e.target === node.id);

          if (!edge) {
            console.log("No connection found");
            return node;
          }

          const sourceNode = nodes.find((n) => n.id === edge.source);

          if (!sourceNode) {
            console.log("No source node");
            return node;
          }

          console.log("Sending to API:", sourceNode.data?.text);

          try {
            const res = await fetch("/api/ai", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                prompt: sourceNode.data?.text,
              }),
            });

            const data = await res.json();

            return {
              ...node,
              data: {
                ...node.data,
                output: data.output,
              },
            };
          } catch (error) {
            return {
              ...node,
              data: {
                ...node.data,
                output: "Error calling AI",
              },
            };
          }
        }

        return node;
      })
    );

    setNodes(updatedNodes);
  };

  return (
    <div className="flex-1 h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
      
      
      <button
        onClick={() => {
          console.log("BUTTON CLICKED ✅");
          runFlow();
        }}
        className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-lg text-white font-semibold shadow-lg hover:scale-105 transition z-50"
      >
        Run ▶
      </button>

      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        />
      </ReactFlowProvider>
    </div>
  );
}