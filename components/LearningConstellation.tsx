"use client";

import { useRef } from "react";

const nodes = [
  { label: "Language", className: "constellation-node node-language" },
  { label: "Science", className: "constellation-node node-science" },
  { label: "Math", className: "constellation-node node-math" },
  { label: "History", className: "constellation-node node-history" },
];

export default function LearningConstellation() {
  const scene = useRef<HTMLDivElement>(null);

  function trackPointer(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    scene.current?.style.setProperty("--rx", `${y * -8}deg`);
    scene.current?.style.setProperty("--ry", `${x * 10}deg`);
    scene.current?.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    scene.current?.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  }

  return (
    <div className="constellation-wrap" onPointerMove={trackPointer} onPointerLeave={() => scene.current?.removeAttribute("style")} aria-hidden="true">
      <div className="constellation" ref={scene}>
        <div className="constellation-grid" />
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="core-halo" />
        <div className="mentor-core"><span>M</span><small>Adaptive core</small></div>
        {nodes.map((node) => <div className={node.className} key={node.label}><i />{node.label}</div>)}
        <div className="signal signal-a" /><div className="signal signal-b" />
      </div>
    </div>
  );
}
