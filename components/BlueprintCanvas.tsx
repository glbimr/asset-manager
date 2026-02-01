import React, { useMemo } from 'react';
import { DeviceType, ModuleNode, Connection, Coordinates } from '../types';
import { AppShell } from './AppShell';

interface BlueprintCanvasProps {
  nodes: ModuleNode[];
  connections: Connection[];
  device: DeviceType;
  zoom: number;
  pan: Coordinates;
}

export const BlueprintCanvas: React.FC<BlueprintCanvasProps> = ({ nodes, connections, device, zoom, pan }) => {
  
  // Dimensions based on device type for accurate connection points
  const shellDimensions = useMemo(() => {
    return device === DeviceType.MOBILE 
      ? { width: 320, height: 640 }
      : { width: 800, height: 540 };
  }, [device]);

  const getNodeCenter = (node: ModuleNode): Coordinates => {
    return {
      x: node.position.x + shellDimensions.width / 2,
      y: node.position.y + shellDimensions.height / 2
    };
  };

  const getAnchorPoint = (node: ModuleNode, type: 'start' | 'end'): Coordinates => {
     // Simple anchor logic: 
     // For "start" (source), we often want the right side or bottom.
     // For "end" (target), we want top or left.
     // Let's use Right-to-Left flow mainly.
     
     if (type === 'start') {
       return { x: node.position.x + shellDimensions.width, y: node.position.y + shellDimensions.height / 2 };
     } else {
       return { x: node.position.x, y: node.position.y + shellDimensions.height / 2 };
     }
  };

  const calculatePath = (conn: Connection) => {
    const startNode = nodes.find(n => n.id === conn.from);
    const endNode = nodes.find(n => n.id === conn.to);
    
    if (!startNode || !endNode) return '';

    const start = getAnchorPoint(startNode, 'start');
    const end = getAnchorPoint(endNode, 'end');

    const dist = Math.abs(end.x - start.x);
    // Control points for a smooth cubic bezier
    // cp1 pulls to the right of start
    // cp2 pulls to the left of end
    const cp1 = { x: start.x + dist * 0.5, y: start.y };
    const cp2 = { x: end.x - dist * 0.5, y: end.y };

    return `M ${start.x} ${start.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`;
  };

  return (
    <div 
      className="absolute inset-0 origin-top-left transition-transform duration-300 ease-out"
      style={{
        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
      }}
    >
      {/* SVG Connection Layer */}
      <svg className="absolute top-0 left-0 w-[6000px] h-[6000px] pointer-events-none z-0">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
          </marker>
        </defs>
        {connections.map(conn => (
          <g key={conn.id}>
            {/* Removed static gray path */}
            
            {/* Animated Flow Line on top with Arrowhead */}
             <path
              d={calculatePath(conn)}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              className="flow-line opacity-100"
              markerEnd="url(#arrowhead)"
            />
            {conn.label && (
               <foreignObject 
                 x={(getNodeCenter(nodes.find(n => n.id === conn.from)!).x + getNodeCenter(nodes.find(n => n.id === conn.to)!).x) / 2 - 50}
                 y={(getNodeCenter(nodes.find(n => n.id === conn.from)!).y + getNodeCenter(nodes.find(n => n.id === conn.to)!).y) / 2 - 15}
                 width="100" height="30">
                 <div className="bg-white/90 backdrop-blur text-emerald-700 text-[10px] font-bold px-2 py-1 rounded border border-emerald-200 text-center shadow-sm">
                    {conn.label}
                 </div>
               </foreignObject>
            )}
          </g>
        ))}
      </svg>

      {/* Nodes Layer */}
      {nodes.map(node => (
        <div
          key={node.id}
          className="absolute transition-all duration-500 ease-in-out z-10"
          style={{
            transform: `translate(${node.position.x}px, ${node.position.y}px)`
          }}
        >
          {/* Label for the module */}
          <div className="absolute -top-10 left-0 bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
             {node.title}
          </div>
          
          <AppShell title={node.title} device={device} className="hover:scale-[1.02] hover:shadow-2xl hover:z-50 cursor-grab active:cursor-grabbing">
            {node.component}
          </AppShell>
        </div>
      ))}
    </div>
  );
};