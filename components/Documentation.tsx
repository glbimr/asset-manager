import React from 'react';
import { FileText, Link as LinkIcon, Calendar, CheckSquare, Target, AlertTriangle } from 'lucide-react';

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">{title}</h2>
);

const SubHeader = ({ title }: { title: string }) => (
  <h3 className="text-lg font-bold text-slate-800 mb-3 mt-8">{title}</h3>
);

const InfoRow = ({ label, value }: { label: string, value: string | React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 py-3 border-b border-slate-100 last:border-0">
    <div className="font-semibold text-slate-600 text-sm md:text-base">{label}</div>
    <div className="md:col-span-3 text-slate-800 text-sm md:text-base">{value}</div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Problem Space': 'bg-emerald-100 text-emerald-800',
    'Solution Space': 'bg-blue-100 text-blue-800',
    'We are here': 'bg-red-100 text-red-800'
  };
  return <span className={`px-2 py-1 rounded text-xs font-bold ${styles[status] || 'bg-gray-100'}`}>{status}</span>;
};

interface DocumentationProps {
  onOpenFigma?: () => void;
}

export const Documentation: React.FC<DocumentationProps> = ({ onOpenFigma }) => (
  <div className="max-w-5xl mx-auto bg-white min-h-screen shadow-lg my-0 md:my-8 rounded-none md:rounded-xl border-x-0 md:border border-slate-200 font-sans">
    
    {/* PRD Header */}
    <div className="p-6 md:p-12 pb-8">
      <div className="bg-pink-100 inline-block px-3 py-1 rounded mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">PRD Template</h1>
      </div>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-2">Asset Manager - Enterprise Inventory Control</h1>
          <p className="text-slate-500 text-sm md:text-base">Direct questions to: <span className="text-emerald-600 font-medium">@ankur.madan</span> or <span className="text-emerald-600 font-medium">#proj-assetmanager</span></p>
          <p className="text-slate-500 text-sm md:text-base">Last updated: <span className="font-medium">May 15, 2024</span></p>
        </div>

        <div className="space-y-6 mt-8">
          <div>
            <SubHeader title="What" />
            <p className="text-slate-700 leading-relaxed text-sm md:text-base">
              A cross-platform (Mobile & Desktop) asset lifecycle management system designed to streamline inventory tracking, reduce equipment loss, and provide real-time analytics for enterprise IT and operations teams.
            </p>
          </div>
          
          <div>
            <SubHeader title="Why" />
            <p className="text-slate-700 leading-relaxed text-sm md:text-base">
              Current spreadsheet-based solutions are error-prone and lack real-time visibility, leading to a 12% annual asset loss rate. This initiative aligns with the company's Q3 Operational Efficiency goal to reduce overhead costs by automating manual tracking workflows.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Success Criteria */}
    <div className="px-6 md:px-12 py-8 bg-slate-50 border-y border-slate-200">
      <SectionHeader title="Success Criteria" />
      <p className="text-slate-600 mb-6 text-sm md:text-base">What does success look like? Include quant and qual metrics as appropriate.</p>
      
      <div className="overflow-x-auto rounded-lg border border-slate-300 bg-white">
        <table className="w-full text-sm text-left min-w-[600px]">
          <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
            <tr>
              <th className="px-6 py-3">Metric</th>
              <th className="px-6 py-3">Baseline (Q1 2024)</th>
              <th className="px-6 py-3">Target (Q4 2024)</th>
              <th className="px-6 py-3">Latest (May 15)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="px-6 py-4">Asset Loss Rate</td>
              <td className="px-6 py-4 text-slate-500">12%</td>
              <td className="px-6 py-4 font-medium text-emerald-600">&lt; 5%</td>
              <td className="px-6 py-4">10.5%</td>
            </tr>
            <tr>
              <td className="px-6 py-4">Audit Completion Time</td>
              <td className="px-6 py-4 text-slate-500">14 Days</td>
              <td className="px-6 py-4 font-medium text-emerald-600">3 Days</td>
              <td className="px-6 py-4">On Track</td>
            </tr>
            <tr>
              <td className="px-6 py-4">System Adoption</td>
              <td className="px-6 py-4 text-slate-500">0 Users</td>
              <td className="px-6 py-4 font-medium text-emerald-600">250 Active Users</td>
              <td className="px-6 py-4">45 Beta Users</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* Overview & Team */}
    <div className="px-6 md:px-12 py-10 space-y-12">
      
      <section>
        <SectionHeader title="[Optional] Overview" />
        
        <div className="border border-slate-300 rounded-lg overflow-hidden mb-8 min-w-[600px] overflow-x-auto">
           <div className="grid grid-cols-4 bg-slate-800 text-white text-sm font-semibold text-center py-2 min-w-[600px]">
              <div className="flex items-center justify-center gap-2">Problem Space</div>
              <div className="flex items-center justify-center gap-2">Solution Space</div>
              <div className="flex items-center justify-center gap-2">Observing</div>
              <div className="flex items-center justify-center gap-2">Archived</div>
           </div>
           <div className="grid grid-cols-4 text-center text-sm border-t border-slate-200 divide-x divide-slate-200 min-w-[600px]">
              <div className="py-2 bg-slate-50 text-slate-500">Discover</div>
              <div className="py-2 bg-slate-50 text-slate-500">Define</div>
              <div className="py-2 bg-slate-50 text-slate-500">Explore</div>
              <div className="py-2 bg-slate-50 text-slate-500">Deliver</div>
           </div>
           <div className="grid grid-cols-4 text-center text-sm border-t border-slate-200 divide-x divide-slate-200 bg-white min-w-[600px]">
              <div className="py-3 font-medium text-red-500 flex items-center justify-center gap-2">📍 We are here</div>
              <div className="py-3 text-slate-400">Product Spec</div>
              <div className="py-3 text-slate-400">Design Exploration</div>
              <div className="py-3 text-slate-400">Epic / Issues</div>
           </div>
        </div>
        {/* Helper for mobile horizontal scroll */}
        <p className="md:hidden text-xs text-slate-400 text-center -mt-6 mb-8 italic">Swipe table to see more →</p>

        <SubHeader title="Team" />
        <div className="bg-slate-50 rounded-xl p-4 md:p-6 border border-slate-200">
           <InfoRow label="Product Management" value="Ankur Madan" />
           <InfoRow label="Product Design" value="Ankur Madan" />
           <InfoRow label="User Research" value="Market Research Team" />
           <InfoRow label="Analytics" value="DataOps Team" />
           <InfoRow label="Engineering" value="Frontend: React Team, Backend: Node Team" />
        </div>
      </section>

      {/* Product Spec */}
      <section>
        <SectionHeader title="Product Spec" />
        <p className="italic text-slate-500 mb-6 text-sm md:text-base">This section gives us a consistent way of making sure we’re working on the right problems before diving into solutions.</p>

        <div className="space-y-8">
          <div>
            <SubHeader title="Alignment" />
            <p className="text-slate-700 text-sm md:text-base">This initiative directly ties to the broader "Digital Transformation 2.0" company strategy, specifically the pillar regarding automation of manual back-office processes.</p>
          </div>

          <div>
            <SubHeader title="Key Insights and Inspiration" />
            <p className="text-slate-700 mb-4 text-sm md:text-base">During Q1 field research, we observed that:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm md:text-base">
               <li>Field technicians spend 15% of their weekly time manually searching for tools.</li>
               <li>Barcode scanning is preferred over RFID due to lower infrastructure costs.</li>
               <li>Competitor analysis of "TrackItAll" shows a gap in seamless mobile-to-desktop handoff.</li>
            </ul>
          </div>

          <div>
            <SubHeader title="Problem Statement" />
            <p className="text-slate-700 p-4 bg-red-50 border-l-4 border-red-400 rounded-r text-sm md:text-base">
              <span className="font-bold">The Underlying Problem:</span> Equipment visibility is siloed. We know this is true because physical audits consistently show a variance of &gt; 10% against the central ledger, and support tickets for "lost item replacement" have increased 20% YoY.
            </p>
          </div>

          <div>
            <SubHeader title="Hypothesis & Impact" />
            <p className="text-slate-700 text-sm md:text-base">
              We believe <span className="font-semibold">implementing a unified mobile scanning workflow</span> will lead to <span className="font-semibold">accurate real-time inventory data</span>, which will result in <span className="font-semibold">reducing asset loss to under 5%</span> by <span className="font-semibold">Q4 2024</span>.
            </p>
          </div>

          <div>
            <SubHeader title="Constraints" />
            <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm md:text-base">
              <li>Must support offline mode for warehouses with poor connectivity.</li>
              <li>Must integrate with existing legacy ERP (SAP) via nightly batch CSV.</li>
              <li>Deadline: Beta release by August 1st.</li>
            </ul>
          </div>

          <div>
             <SubHeader title="Non-Goals" />
             <p className="text-slate-700 text-sm md:text-base">Are there any related problems that we want to explicitly ignore for now?</p>
             <ul className="list-disc pl-5 space-y-2 text-slate-700 mt-2 text-sm md:text-base">
                <li>Vehicle fleet tracking (out of scope for MVP).</li>
                <li>Automated procurement ordering (planned for v3.0).</li>
             </ul>
          </div>
        </div>
      </section>

      {/* Design Exploration */}
      <section>
        <SectionHeader title="Design Exploration" />
        <p className="italic text-slate-500 mb-6 text-sm md:text-base">This section helps us ensure a collaborative and divergent design process.</p>
        
        <button 
          onClick={onOpenFigma} 
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium mb-8 hover:underline text-sm md:text-base"
        >
           <LinkIcon size={16} /> Link to Figma Board
        </button>

        <div className="space-y-8">
           <div>
              <SubHeader title="Initial Ideas" />
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                 <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                       <tr>
                          <th className="px-4 py-3 text-left font-bold text-slate-700">Ideas</th>
                          <th className="px-4 py-3 text-left font-bold text-slate-700">Description</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       <tr>
                          <td className="px-4 py-3 font-medium">QR Code Stickers</td>
                          <td className="px-4 py-3 text-slate-600">Pre-print rolls of QR codes for rapid tagging of legacy assets.</td>
                       </tr>
                       <tr>
                          <td className="px-4 py-3 font-medium">GPS Geofencing</td>
                          <td className="px-4 py-3 text-slate-600">Alerts when high-value items leave the campus perimeter.</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </div>

           <div>
              <SubHeader title="User Stories" />
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                 <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                       <tr>
                          <th className="px-4 py-3 text-left font-bold text-slate-700">User Stories</th>
                          <th className="px-4 py-3 text-left font-bold text-slate-700">Importance</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       <tr>
                          <td className="px-4 py-3 text-slate-700">As a <span className="font-bold">Warehouse Manager</span>, I want to <span className="font-bold">scan items in bulk</span>, so that <span className="font-bold">I can finish audits faster</span>.</td>
                          <td className="px-4 py-3"><span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold">Must have</span></td>
                       </tr>
                       <tr>
                          <td className="px-4 py-3 text-slate-700">As a <span className="font-bold">IT Admin</span>, I want to <span className="font-bold">see warranty status</span>, so that <span className="font-bold">I know when to replace laptops</span>.</td>
                          <td className="px-4 py-3"><span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-bold">Nice to have</span></td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </div>

           <div>
              <SubHeader title="Explored Directions" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-bold text-slate-800 mb-2">Direction A: "Mobile First"</h4>
                    <p className="text-sm text-slate-600 mb-2">Focus purely on the mobile scanner app, leaving admin tasks to the legacy system.</p>
                    <span className="text-xs text-red-500 font-bold">Discarded due to legacy API limits.</span>
                 </div>
                 <div className="p-4 border border-emerald-200 bg-emerald-50 rounded-lg">
                    <h4 className="font-bold text-slate-800 mb-2">Direction B: "Hybrid Suite"</h4>
                    <p className="text-sm text-slate-600 mb-2">A balanced approach with a React Native scanner and a React admin dashboard.</p>
                    <span className="text-xs text-emerald-600 font-bold">Selected Direction.</span>
                 </div>
              </div>
           </div>

           <div>
              <SubHeader title="Key Decisions" />
              <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm md:text-base">
                 <li><span className="font-bold">Auth Provider:</span> Decided to use Auth0 for SSO integration ease.</li>
                 <li><span className="font-bold">Database:</span> PostgreSQL chosen over NoSQL for strict schema relation requirements in asset assignment.</li>
              </ul>
           </div>
        </div>
      </section>

    </div>
  </div>
);