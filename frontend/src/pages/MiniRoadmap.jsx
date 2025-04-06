import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "react-flow-renderer";
import "../components/miniRoadmap.css";

const initialNodes = [
  {
    id: "1",
    data: { label: "Start Here" },
    position: { x: 250, y: 0 },
    style: { background: "#7f9cf5", color: "#fff", padding: 10, borderRadius: 10 },
  },
  {
    id: "2",
    data: { label: "HTML & CSS" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    data: { label: "JavaScript" },
    position: { x: 400, y: 100 },
  },
  {
    id: "4",
    data: { label: "React.js" },
    position: { x: 250, y: 200 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e3-4", source: "3", target: "4" },
];

const MiniRoadmap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );

  return (
    <div className="roadmap-wrapper">
      <h2>Mini Skill Roadmap</h2>
      <p>Click nodes and explore how skills connect.</p>
      <div className="roadmap-flow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default MiniRoadmap;
