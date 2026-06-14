import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader, FrameBox } from '../ui';

const allocations = [
  { label: "Community & Ecosystem", percent: 45, color: "bg-brand-accent-base" },
  { label: "Liquidity Provisions", percent: 20, color: "bg-emerald-400" },
  { label: "Core Contributors", percent: 15, color: "bg-brand-text-3" },
  { label: "Treasury", percent: 10, color: "bg-brand-surface-2" },
  { label: "Private Sale (Vested)", percent: 10, color: "bg-brand-bg-primary" },
];

export const Tokenomics = () => {
  return (
    <section className="py-32 bg-brand-bg-primary relative overflow-hidden" id="tokenomics">
      {/* HUD Background elements */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-[1px] h-2/3 bg-gradient-to-b from-transparent via-brand-border to-transparent hidden xl:block" />
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[1px] h-2/3 bg-gradient-to-b from-transparent via-brand-border to-transparent hidden xl:block" />
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader 
          badge="ECONOMIC MODEL"
          title="Data-Driven Tokenomics"
          subtitle="A transparent distribution model prioritizing community ownership and sustained liquidity depth."
        />

        <div className="mt-16 grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Chart Area */}
          <div className="lg:col-span-7">
            <FrameBox className="p-8 relative min-h-[400px] flex flex-col justify-end">
               {/* Grid Background inside chart */}
               <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />
               
               <div className="absolute top-6 left-6 text-brand-text-3 font-mono text-xs uppercase tracking-widest border border-brand-border px-2 py-1 bg-brand-bg-primary">
                 Distribution.SYS
               </div>
               
               <div className="space-y-6 relative z-10 mt-16">
                 {allocations.map((item, i) => (
                   <div key={i} className="group">
                     <div className="flex justify-between items-end mb-2 font-mono text-sm">
                       <span className="text-brand-text-1 tracking-wider">{item.label}</span>
                       <span className="text-brand-accent-base">{item.percent}.0%</span>
                     </div>
                     <div className="h-4 w-full bg-brand-surface-2 border border-brand-border/50 clip-edges overflow-hidden relative">
                       <motion.div 
                         initial={{ maxWidth: 0 }}
                         whileInView={{ maxWidth: `${item.percent}%` }}
                         viewport={{ once: true, margin: "-50px" }}
                         transition={{ duration: 1.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                         className={`absolute top-0 bottom-0 left-0 ${item.color} ${item.color === 'bg-brand-bg-primary' || item.color === 'bg-brand-surface-2' ? 'border-r border-brand-border' : ''}`}
                       >
                         {/* Scanline effect over bars */}
                         <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_2s_infinite_linear]" />
                       </motion.div>
                     </div>
                   </div>
                 ))}
               </div>
            </FrameBox>
          </div>

          {/* Data Side Panel */}
          <div className="lg:col-span-5 space-y-6">
            <FrameBox className="bg-brand-surface-2/30 border-l-4 border-l-brand-accent-base">
               <h4 className="text-brand-text-3 font-mono text-xs mb-2 uppercase tracking-widest">Initial Supply</h4>
               <div className="text-4xl font-display text-brand-text-1">1,000,000,000</div>
               <div className="text-brand-accent-base font-mono mt-1 text-sm">DYNA</div>
            </FrameBox>

            <FrameBox className="bg-brand-surface-2/30">
               <h4 className="text-brand-text-3 font-mono text-xs mb-4 uppercase tracking-widest">Emission Schedule</h4>
               <div className="h-[100px] w-full border-b border-l border-brand-border relative">
                  {/* Decorative curved SVG mimicking an emission curve */}
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full absolute bottom-0 left-0 overflow-visible opacity-50">
                     <motion.path 
                       initial={{ pathLength: 0 }}
                       whileInView={{ pathLength: 1 }}
                       transition={{ duration: 2, ease: "easeInOut" }}
                       d="M0,100 C20,90 40,50 100,20" 
                       fill="none" 
                       stroke="var(--color-brand-accent-base)" 
                       strokeWidth="2"
                     />
                     <motion.path 
                       initial={{ opacity: 0 }}
                       whileInView={{ opacity: 0.1 }}
                       transition={{ duration: 2, ease: "easeInOut" }}
                       d="M0,100 C20,90 40,50 100,20 L100,100 Z" 
                       fill="var(--color-brand-accent-base)" 
                     />
                  </svg>
                  <div className="absolute bottom-[-20px] left-0 text-[10px] font-mono text-brand-text-3">YEAR 0</div>
                  <div className="absolute bottom-[-20px] right-0 text-[10px] font-mono text-brand-text-3">YEAR 4</div>
               </div>
            </FrameBox>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-brand-border bg-brand-bg-primary p-4 clip-edges">
                <div className="text-brand-text-3 text-[10px] uppercase font-mono mb-1">Contract</div>
                <div className="text-brand-text-1 font-mono text-xs truncate">0x7F...c9A1</div>
              </div>
              <div className="border border-brand-border bg-brand-bg-primary p-4 clip-edges">
                <div className="text-brand-text-3 text-[10px] uppercase font-mono mb-1">Network</div>
                <div className="text-brand-text-1 font-mono text-xs truncate">Ethereum Mainnet</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
