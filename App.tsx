import React, { useState, useMemo } from 'react';
import { Layers, Smartphone, Monitor, FileText, ZoomIn, ZoomOut, MousePointer2, Figma } from 'lucide-react';
import { DeviceType, ViewType, ModuleNode, Connection } from './types';
import { BlueprintCanvas } from './components/BlueprintCanvas';
import { Documentation } from './components/Documentation';
import { 
  LoginScreen, 
  DashboardScreen, 
  InventoryScreen, 
  AssetDetailScreen, 
  ScannerScreen, 
  AddItemScreen 
} from './components/ModuleScreens';

const App: React.FC = () => {
  // State
  const [device, setDevice] = useState<DeviceType>(DeviceType.MOBILE);
  const [view, setView] = useState<ViewType>(ViewType.BLUEPRINT);
  const [zoom, setZoom] = useState(0.4); // Zoom out a bit initially to see more nodes
  const [pan, setPan] = useState({ x: 100, y: 100 });
  
  // Dragging Logic
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Data Definition
  const nodes: ModuleNode[] = useMemo(() => {
    const isMobile = device === DeviceType.MOBILE;
    const isDesktop = device === DeviceType.DESKTOP;
    // Desktop frames are 800px wide, so we need more spacing (e.g., 1200px)
    // Mobile frames are 320px wide, so 800px spacing is fine.
    const spacingX = isMobile ? 800 : 1200; 

    return [
      { 
        id: 'login', 
        title: 'Authentication', 
        component: <LoginScreen isDesktop={isDesktop} />, 
        position: { x: 0, y: 400 } 
      },
      { 
        id: 'dashboard', 
        title: 'Exec Dashboard', 
        component: <DashboardScreen isDesktop={isDesktop} />, 
        position: { x: spacingX, y: 400 } 
      },
      { 
        id: 'list', 
        title: 'Inventory List', 
        component: <InventoryScreen isDesktop={isDesktop} />, 
        position: { x: spacingX * 2, y: 100 } 
      },
      { 
        id: 'detail', 
        title: 'Asset Detail', 
        component: <AssetDetailScreen isDesktop={isDesktop} />, 
        position: { x: spacingX * 3, y: 100 } 
      },
      { 
        id: 'scan', 
        title: 'Barcode Scanner', 
        component: <ScannerScreen isDesktop={isDesktop} />, 
        position: { x: spacingX * 2, y: isMobile ? 900 : 1000 } 
      },
      {
        id: 'add',
        title: 'Add Asset', 
        component: <AddItemScreen isDesktop={isDesktop} />,
        position: { x: spacingX * 3, y: isMobile ? 900 : 1000 }
      }
    ];
  }, [device]);

  const connections: Connection[] = useMemo(() => [
    { id: 'c1', from: 'login', to: 'dashboard', label: 'Success' },
    { id: 'c2', from: 'dashboard', to: 'list', label: 'View All' },
    { id: 'c3', from: 'list', to: 'detail', label: 'Select Item' },
    { id: 'c4', from: 'dashboard', to: 'scan', label: 'Quick Action' },
    { id: 'c5', from: 'scan', to: 'add', label: 'Code Detected' },
  ], []);

  // Handlers
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.2));
  
  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (view !== ViewType.BLUEPRINT) return;
    
    const target = e.target as HTMLElement;
    if (['INPUT', 'BUTTON', 'SELECT', 'TEXTAREA', 'A'].includes(target.tagName)) return;
    if (e.button !== 0 && e.button !== 1) return;
    
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setPanStart({ x: pan.x, y: pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setPan({ x: panStart.x + dx, y: panStart.y + dy });
  };

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (view !== ViewType.BLUEPRINT) return;
    const target = e.target as HTMLElement;
    if (['INPUT', 'BUTTON', 'SELECT', 'TEXTAREA', 'A'].includes(target.tagName)) return;

    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setPanStart({ x: pan.x, y: pan.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStart.x;
    const dy = e.touches[0].clientY - dragStart.y;
    setPan({ x: panStart.x + dx, y: panStart.y + dy });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    if (view !== ViewType.BLUEPRINT) return;
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomSensitivity = 0.002;
      const newZoom = Math.min(Math.max(zoom - e.deltaY * zoomSensitivity, 0.2), 2.0);
      setZoom(newZoom);
    } else {
      const panSpeed = 1.0;
      setPan(prev => ({ x: prev.x - e.deltaX * panSpeed, y: prev.y - e.deltaY * panSpeed }));
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      
      {/* Header / Toolbar */}
      <header className="bg-white border-b border-slate-200 h-16 px-4 md:px-6 flex items-center justify-between z-50 shadow-sm shrink-0 relative">
        {/* Left: Brand */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <div className="bg-emerald-600 text-white p-2 rounded-lg">
             <Layers size={20} />
          </div>
          <div className="hidden md:block">
            <h1 className="font-bold text-slate-800 leading-tight">Asset Manager Blueprint</h1>
            <p className="text-xs text-slate-500">v2.4 • by Ankur Madan</p>
          </div>
          <div className="md:hidden">
             <h1 className="font-bold text-slate-800 leading-tight">Asset Manager</h1>
          </div>
        </div>

        {/* Center: View Switcher - Responsive Positioning */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
          <div className="bg-slate-100 p-1 rounded-lg flex gap-1">
            <button 
              onClick={() => setView(ViewType.BLUEPRINT)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${view === ViewType.BLUEPRINT ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <MousePointer2 size={14} /> Blueprint
            </button>
            <button 
              onClick={() => setView(ViewType.DOCUMENTATION)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${view === ViewType.DOCUMENTATION ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <FileText size={14} /> Documentation
            </button>
             <button 
              onClick={() => setView(ViewType.FIGMA)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${view === ViewType.FIGMA ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Figma size={14} /> Figma
            </button>
          </div>
        </div>
        
        {/* Mobile View Switcher (Icon Only) */}
        <div className="md:hidden flex gap-2">
            <button 
              onClick={() => setView(ViewType.BLUEPRINT)}
              className={`p-2 rounded-md ${view === ViewType.BLUEPRINT ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500'}`}
            >
              <MousePointer2 size={18} />
            </button>
             <button 
              onClick={() => setView(ViewType.DOCUMENTATION)}
              className={`p-2 rounded-md ${view === ViewType.DOCUMENTATION ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500'}`}
            >
              <FileText size={18} />
            </button>
             <button 
              onClick={() => setView(ViewType.FIGMA)}
              className={`p-2 rounded-md ${view === ViewType.FIGMA ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500'}`}
            >
              <Figma size={18} />
            </button>
        </div>

        {/* Right: Tools (Hidden on small mobile for simplicity, or just simplified) */}
        <div className="hidden md:flex items-center gap-4">
          {view === ViewType.BLUEPRINT && (
            <>
              <div className="bg-slate-100 p-1 rounded-lg flex gap-1">
                 <button 
                  onClick={() => setDevice(DeviceType.MOBILE)}
                  className={`p-2 rounded-md transition-all ${device === DeviceType.MOBILE ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
                >
                  <Smartphone size={18} />
                </button>
                <button 
                  onClick={() => setDevice(DeviceType.DESKTOP)}
                  className={`p-2 rounded-md transition-all ${device === DeviceType.DESKTOP ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
                >
                  <Monitor size={18} />
                </button>
              </div>

              <div className="h-6 w-px bg-slate-200"></div>

              <div className="flex items-center gap-2">
                <button onClick={handleZoomOut} className="p-2 hover:bg-slate-100 rounded-full text-slate-500"><ZoomOut size={18} /></button>
                <span className="text-xs font-mono w-12 text-center text-slate-600">{Math.round(zoom * 100)}%</span>
                <button onClick={handleZoomIn} className="p-2 hover:bg-slate-100 rounded-full text-slate-500"><ZoomIn size={18} /></button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden bg-slate-50">
        
        {view === ViewType.BLUEPRINT && (
          <div 
            className={`w-full h-full blueprint-grid overflow-hidden select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            onWheel={handleWheel}
          >
            {/* The Canvas */}
            <BlueprintCanvas 
              nodes={nodes}
              connections={connections}
              device={device}
              zoom={zoom}
              pan={pan}
            />
          </div>
        )}

        {view === ViewType.DOCUMENTATION && (
          <div className="w-full h-full overflow-y-auto">
            <Documentation onOpenFigma={() => setView(ViewType.FIGMA)} />
          </div>
        )}

        {view === ViewType.FIGMA && (
          <div className="w-full h-full flex items-center justify-center bg-slate-100 p-0 md:p-10">
            <div className="w-full h-full md:max-w-[1200px] shadow-none md:shadow-2xl md:rounded-xl overflow-hidden bg-white">
              <iframe 
                style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }} 
                width="100%" 
                height="100%" 
                src="https://embed.figma.com/board/ozGf3JlsoNiKNNx6ia0bXd/Asset---Inventory-Management-%E2%80%93-Decision-Based-Sub-Flow?node-id=0-1&embed-host=share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;