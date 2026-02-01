import React, { useState } from 'react';
import { 
  Box, 
  LayoutDashboard, 
  Search, 
  Settings, 
  Scan, 
  Plus, 
  MoreHorizontal,
  Bell,
  User,
  Package,
  Wrench,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Filter,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

// --- Shared Components ---

const Button = ({ children, variant = 'primary', className = '' }: any) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    secondary: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50",
    ghost: "text-slate-500 hover:bg-slate-100"
  };
  return <button className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}>{children}</button>;
};

const NavTab = ({ icon: Icon, label, active }: any) => (
  <div className={`flex flex-col items-center gap-1 p-2 cursor-pointer ${active ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
    <Icon size={20} />
    <span className="text-[10px] font-medium">{label}</span>
  </div>
);

const GlobalBottomNav = ({ activeTab = 'Home' }) => (
  <div className="bg-white border-t border-slate-200 px-6 py-2 flex justify-between items-center sticky bottom-0 z-20">
    <NavTab icon={LayoutDashboard} label="Home" active={activeTab === 'Home'} />
    <NavTab icon={Package} label="Assets" active={activeTab === 'Assets'} />
    <div className="-mt-8 bg-emerald-600 p-3 rounded-full shadow-lg text-white cursor-pointer hover:bg-emerald-700 transition-colors">
      <Scan size={24} />
    </div>
    <NavTab icon={Wrench} label="Maint." active={activeTab === 'Maint.'} />
    <NavTab icon={Settings} label="Settings" active={activeTab === 'Settings'} />
  </div>
);

const GlobalHeader = ({ title, showBack = false }: { title: string, showBack?: boolean }) => (
  <div className="bg-white border-b border-slate-200 px-4 py-3 flex justify-between items-center sticky top-0 z-20 shadow-sm shrink-0">
    <div className="flex items-center gap-3">
      {showBack && (
        <button className="p-1 -ml-1 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100">
          <ChevronLeft size={22} />
        </button>
      )}
      <h2 className="font-bold text-slate-800 text-base">{title}</h2>
    </div>
    <div className="flex gap-3">
       <Bell size={20} className="text-slate-400" />
       {!showBack && <User size={20} className="text-slate-400" />}
    </div>
  </div>
);

const DesktopNavItem = ({ icon: Icon, label, active, isOpen }: any) => (
  <div className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-l-4 ${active ? 'bg-emerald-50 text-emerald-700 border-emerald-600' : 'border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200'}`}>
    <Icon size={20} className="shrink-0" />
    {isOpen && <span className="font-medium text-sm whitespace-nowrap overflow-hidden transition-opacity duration-300">{label}</span>}
  </div>
);

const StandardLayout = ({ children, title, activeTab, isDesktop, showBack }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (isDesktop) {
    return (
      <div className="h-full flex bg-slate-50" onWheel={(e) => e.stopPropagation()}>
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col shrink-0`}>
          <div className="h-16 flex items-center justify-center border-b border-slate-100 px-4">
             <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">
                <Box size={20} />
             </div>
             {sidebarOpen && <span className="ml-3 font-bold text-slate-800 text-lg whitespace-nowrap overflow-hidden">Asset Manager</span>}
          </div>
          
          <div className="flex-1 py-6 space-y-1 overflow-y-auto no-scrollbar">
             <DesktopNavItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Home'} isOpen={sidebarOpen} />
             <DesktopNavItem icon={Package} label="Inventory" active={activeTab === 'Assets'} isOpen={sidebarOpen} />
             <DesktopNavItem icon={Scan} label="Scanner" active={activeTab === 'Scan'} isOpen={sidebarOpen} />
             <DesktopNavItem icon={Wrench} label="Maintenance" active={activeTab === 'Maint.'} isOpen={sidebarOpen} />
             <DesktopNavItem icon={Settings} label="Settings" active={activeTab === 'Settings'} isOpen={sidebarOpen} />
          </div>

          <div className="p-4 border-t border-slate-100">
             <button 
               onClick={() => setSidebarOpen(!sidebarOpen)}
               className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
             >
               {sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
             </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col min-w-0">
           <GlobalHeader title={title} showBack={showBack} />
           <div className="flex-1 overflow-y-auto no-scrollbar p-6">
              {children}
           </div>
        </div>
      </div>
    );
  }

  // Mobile Layout
  return (
    <div className="h-full flex flex-col bg-slate-50">
       <GlobalHeader title={title} showBack={showBack} />
       <div className="flex-1 overflow-y-auto no-scrollbar p-4" onWheel={(e) => e.stopPropagation()}>
         {children}
       </div>
       <GlobalBottomNav activeTab={activeTab} />
    </div>
  );
};

// --- Screen 1: Login ---

export const LoginScreen = ({ isDesktop }: { isDesktop?: boolean }) => (
  <div className={`h-full flex flex-col justify-center bg-white ${isDesktop ? 'items-center bg-slate-50' : 'px-8'}`} onWheel={(e) => e.stopPropagation()}>
    <div className={`w-full ${isDesktop ? 'max-w-md bg-white p-10 rounded-2xl shadow-sm border border-slate-200' : ''}`}>
      <div className="mb-8 text-center">
        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Box className="text-emerald-600" size={28} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Asset Manager</h1>
        <p className="text-slate-500 text-sm mt-1">Enterprise Inventory Control</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Work Email</label>
          <input type="email" defaultValue="demo@assetmanager.io" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Password</label>
          <input type="password" defaultValue="••••••••" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>
        <Button className="w-full mt-2">Sign In</Button>
      </div>
      
      <div className="mt-6 text-center">
        <span className="text-xs text-slate-400">SSO Login enabled for organization</span>
      </div>
    </div>
  </div>
);

// --- Screen 2: Dashboard ---

const data = [
  { name: 'Active', value: 450, color: '#10b981' }, // emerald-500
  { name: 'Maint', value: 120, color: '#f59e0b' }, // amber-500
  { name: 'Retired', value: 80, color: '#64748b' }, // slate-500
];

const barData = [
  { name: 'Mon', val: 40 },
  { name: 'Tue', val: 30 },
  { name: 'Wed', val: 55 },
  { name: 'Thu', val: 45 },
  { name: 'Fri', val: 60 },
];

export const DashboardScreen = ({ isDesktop }: { isDesktop?: boolean }) => (
  <StandardLayout title="Dashboard" activeTab="Home" isDesktop={isDesktop}>
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Total Assets</p>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-slate-800">650</span>
            <span className="text-emerald-500 text-xs flex items-center"><TrendingUp size={12} className="mr-0.5"/> +12%</span>
          </div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Total Value</p>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-slate-800">$1.2M</span>
            <span className="text-slate-400 text-xs">USD</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-slate-700">Asset Status</h3>
          <MoreHorizontal size={16} className="text-slate-400" />
        </div>
        <div className="h-32 flex items-center">
          <div className="h-full w-1/2">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} innerRadius={25} outerRadius={40} paddingAngle={5} dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/2 space-y-2">
             {data.map((d) => (
               <div key={d.name} className="flex items-center gap-2 text-xs">
                 <div className="w-2 h-2 rounded-full" style={{backgroundColor: d.color}}></div>
                 <span className="text-slate-600">{d.name}</span>
                 <span className="text-slate-400 ml-auto">{d.value}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
      
       {/* Activity Chart */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700 mb-2">Check-ins/outs</h3>
        <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <Bar dataKey="val" fill="#10b981" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  </StandardLayout>
);

// --- Screen 3: Inventory List ---

const assets = [
  { id: 'AST-001', name: 'MacBook Pro M2', cat: 'Laptop', status: 'active' },
  { id: 'AST-002', name: 'Dell UltraSharp', cat: 'Monitor', status: 'active' },
  { id: 'AST-003', name: 'Herman Miller', cat: 'Furniture', status: 'maint' },
  { id: 'AST-004', name: 'iPad Pro 12.9', cat: 'Tablet', status: 'retired' },
  { id: 'AST-005', name: 'Logitech MX', cat: 'Peripheral', status: 'active' },
  { id: 'AST-006', name: 'Conference TV', cat: 'Monitor', status: 'active' },
];

export const InventoryScreen = ({ isDesktop }: { isDesktop?: boolean }) => (
  <StandardLayout title="Inventory" activeTab="Assets" isDesktop={isDesktop} showBack={true}>
    {/* Search Bar */}
    <div className="mb-4">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
        <input placeholder="Search assets..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500" />
        <div className="absolute right-2 top-2 p-0.5 bg-slate-100 rounded text-slate-500"><Filter size={14}/></div>
      </div>
    </div>

    {/* List */}
    <div className="space-y-3">
      {assets.map((item) => (
        <div key={item.id} className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between shadow-sm hover:border-emerald-300 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
              <Package size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">{item.name}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wide">{item.id} • {item.cat}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <span className={`w-2 h-2 rounded-full ${item.status === 'active' ? 'bg-emerald-500' : item.status === 'maint' ? 'bg-amber-500' : 'bg-slate-300'}`}></span>
             <ArrowRight size={14} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
          </div>
        </div>
      ))}
    </div>

    {/* Floating Action Button (Only show on mobile or corner for desktop) */}
    {!isDesktop && (
      <div className="absolute bottom-20 right-4">
        <button className="bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 transition-colors">
          <Plus size={24} />
        </button>
      </div>
    )}
    {isDesktop && (
       <div className="fixed bottom-8 right-8 z-30">
        <button className="bg-emerald-600 text-white p-4 rounded-full shadow-xl hover:bg-emerald-700 transition-colors flex items-center gap-2">
          <Plus size={24} />
          <span className="font-semibold pr-2">New Asset</span>
        </button>
      </div>
    )}
  </StandardLayout>
);

// --- Screen 4: Asset Details ---

export const AssetDetailScreen = ({ isDesktop }: { isDesktop?: boolean }) => (
  <StandardLayout title="AST-001" activeTab="Assets" isDesktop={isDesktop} showBack={true}>
    <div className="space-y-4 pb-20">
      {/* Image / Header */}
      <div className="bg-white p-6 flex flex-col items-center border border-slate-200 rounded-xl shadow-sm">
        <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
          <img src="https://picsum.photos/100/100" alt="Asset" className="w-full h-full object-cover rounded-2xl opacity-80" />
        </div>
        <h1 className="text-xl font-bold text-slate-800">MacBook Pro M2</h1>
        <div className="flex gap-2 mt-2">
           <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">Assigned</span>
           <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">Electronics</span>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-lg border border-slate-200">
          <p className="text-xs text-slate-400 mb-1">Purchase Date</p>
          <p className="text-sm font-semibold text-slate-700">Oct 24, 2023</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-200">
          <p className="text-xs text-slate-400 mb-1">Warranty</p>
          <p className="text-sm font-semibold text-emerald-600">Valid (2025)</p>
        </div>
      </div>

      {/* Assigned To */}
      <div className="bg-white p-4 rounded-lg border border-slate-200">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Currently Assigned To</h3>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">JD</div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Jane Doe</p>
              <p className="text-xs text-slate-500">Engineering Dept</p>
            </div>
            <Button variant="secondary" className="ml-auto text-xs px-2 py-1 h-8">History</Button>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Button variant="secondary" className="w-full text-xs">Report Issue</Button>
        <Button variant="primary" className="w-full text-xs">Audit Check</Button>
      </div>
    </div>
  </StandardLayout>
);

// --- Screen 5: Scanner ---

export const ScannerScreen = ({ isDesktop }: { isDesktop?: boolean }) => {
  // For desktop, usually we wouldn't show the full screen camera UI in the same way,
  // but for the blueprint visualization, we can keep it contained or use the layout.
  // Using StandardLayout for desktop to maintain nav context.
  
  const content = (
    <div className="h-full flex flex-col relative overflow-hidden rounded-xl bg-slate-900">
      <div className="relative z-10 flex-1 flex flex-col">
        {!isDesktop && (
          <div className="p-4 flex justify-between items-center text-white">
              <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md hover:bg-white/20 transition-colors">
                <ChevronLeft size={20} />
              </button>
              <span className="font-semibold tracking-wide text-sm">Scan QR / Barcode</span>
              <div className="w-8 h-8"></div>
          </div>
        )}

        {/* Scanner Reticle */}
        <div className="flex-1 flex items-center justify-center relative">
            <div className="w-64 h-64 border-2 border-emerald-500 rounded-3xl relative shadow-[0_0_0_1000px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-emerald-500 -mt-1 -ml-1 rounded-tl-xl"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-emerald-500 -mt-1 -mr-1 rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-emerald-500 -mb-1 -ml-1 rounded-bl-xl"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-emerald-500 -mb-1 -mr-1 rounded-br-xl"></div>
              
              {/* Static Scan Line */}
              <div className="absolute left-4 right-4 h-0.5 bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] top-1/2 -mt-0.5"></div>
            </div>
            <p className="absolute mt-80 text-white/70 text-xs font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">Align code within frame</p>
        </div>

        {/* Controls */}
        <div className="p-8 pb-12 bg-black/40 backdrop-blur-sm flex justify-center items-center gap-12">
            <Button variant="ghost" className="text-white hover:bg-white/10 flex-col gap-2 h-auto py-2 w-16">
              <Box size={20} />
              <span className="text-[10px] font-medium opacity-80">Input</span>
            </Button>
            <div className="w-16 h-16 rounded-full border-4 border-white/20 flex items-center justify-center cursor-pointer active:scale-95 transition-transform bg-white">
              <div className="w-1 h-1 bg-black rounded-full"></div>
            </div>
            <Button variant="ghost" className="text-white hover:bg-white/10 flex-col gap-2 h-auto py-2 w-16">
              <AlertCircle size={20} />
              <span className="text-[10px] font-medium opacity-80">Help</span>
            </Button>
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <StandardLayout title="Scanner" activeTab="Scan" isDesktop={true}>
        {content}
      </StandardLayout>
    );
  }

  return <div className="h-full flex flex-col bg-slate-900">{content}</div>;
};

// --- Screen 6: Add Item Form (Desktop Optimized) ---

export const AddItemScreen = ({ isDesktop }: { isDesktop?: boolean }) => (
  <StandardLayout title="Add New Asset" activeTab="Assets" isDesktop={isDesktop} showBack={true}>
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider border-b border-slate-100 pb-2">Core Information</h3>
      
      <div className="space-y-4 mb-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Asset Name</label>
            <input type="text" placeholder="e.g. MacBook Pro 16" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Category</label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
              <option>Laptop</option>
              <option>Monitor</option>
              <option>Furniture</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Serial Number</label>
            <input type="text" placeholder="S/N..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Purchase Cost</label>
            <input type="number" placeholder="0.00" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50" />
          </div>
      </div>

      <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider border-b border-slate-100 pb-2 mt-8">Assignment</h3>
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500"><User size={20}/></div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-700">Assign to User</p>
            <p className="text-xs text-slate-500">Search for an employee...</p>
          </div>
          <Button variant="secondary" className="text-xs">Select</Button>
      </div>
    </div>
    
    <div className="mt-4 p-4 bg-white border-t border-slate-200 rounded-xl">
         <Button variant="primary" className="w-full">Save Asset</Button>
    </div>
  </StandardLayout>
);