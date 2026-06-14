import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader, FrameBox } from '../ui';
import { ArrowDown, Coins, Zap, Shield, Repeat, ArrowRight, Lock, Layers, Activity } from 'lucide-react';

const FlowNode = ({ icon: Icon, title, desc, delay, isDark = false }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ margin: "-100px" }}
    transition={{ duration: 0.5, delay }}
    className={`flex flex-col items-center text-center p-6 clip-edges border ${isDark ? 'bg-brand-bg-primary border-brand-border/50' : 'bg-brand-surface-2 border-brand-accent-base/30'}`}
  >
    <div className={`p-4 rounded-full mb-4 ${isDark ? 'bg-brand-surface-2 text-brand-text-3' : 'bg-brand-accent-base/10 text-brand-accent-base'}`}>
      <Icon className="w-6 h-6" />
    </div>
    <h4 className="font-mono text-sm tracking-widest text-brand-text-1 uppercase mb-2">{title}</h4>
    <p className="text-xs text-brand-text-3 font-sans max-w-[200px]">{desc}</p>
  </motion.div>
);

const FlowArrow = ({ direction = "down", delay }: { direction?: "down" | "right", delay: number }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    className={`flex items-center justify-center text-brand-accent-base/50 ${direction === 'down' ? 'h-16' : 'w-16'} relative`}
  >
    <div className={`absolute border-t-2 border-dashed border-brand-accent-base/30 ${direction === 'down' ? 'border-l-2 border-t-0 h-full' : 'w-full'} -z-10`} />
    <motion.div
      animate={direction === 'down' ? { y: [0, 10, 0] } : { x: [0, 10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      {direction === 'down' ? <ArrowDown className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
    </motion.div>
  </motion.div>
);

export const Ecosystem = () => {
  return (
    <section className="py-32 bg-brand-bg-primary relative" id="ecosystem">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-1/3 h-1/2 bg-brand-accent-base/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-1/3 h-1/2 bg-blue-500/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader 
          badge="ARCHITECTURE"
          title="Dual Engine Ecosystem"
          subtitle="A symbiotic protocol design aligning long-term holders with liquidity providers to stabilize markets and generate sustainable yields."
        />

        <div className="mt-20 grid lg:grid-cols-2 gap-16 lg:gap-8">
          
          {/* Yield Staking Visualizer */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-surface-1/50 to-transparent border border-brand-border rounded-xl -z-10" />
            <div className="p-8 pb-0">
              <h3 className="text-2xl font-display text-brand-text-1 mb-8 flex items-center gap-3">
                <span className="text-brand-accent-base font-mono text-sm0">01.</span>
                Yield Staking
              </h3>
              
              <div className="flex flex-col items-center">
                <FlowNode icon={Coins} title="Deposit DYNA" desc="User allocates tokens to the secure vault" delay={0.1} />
                <FlowArrow delay={0.3} />
                <FlowNode icon={Lock} title="Tokens Locked" desc="Smart contract enforces time-weighted lock" delay={0.5} isDark />
                <FlowArrow delay={0.7} />
                <FlowNode icon={Repeat} title="Rewards Engine" desc="Protocol generates continuous emission yield" delay={0.9} isDark />
                <FlowArrow delay={1.1} />
                <FlowNode icon={Zap} title="Claim Rewards" desc="Auto-compounding or manual liquid claim" delay={1.3} />
              </div>
            </div>
            
            {/* Ambient Base */}
            <div className="h-32 mt-4 relative overflow-hidden flex items-end justify-center">
               <div className="w-[80%] h-1 bg-brand-accent-base shadow-[0_0_20px_#00FF66] relative z-10" />
               <div className="absolute bottom-1 w-[80%] h-16 bg-gradient-to-t from-brand-accent-base/20 to-transparent blur-md" />
            </div>
          </div>

          {/* LP Staking Visualizer */}
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-b from-brand-surface-1/50 to-transparent border border-brand-border rounded-xl -z-10" />
             <div className="p-8 pb-0">
              <h3 className="text-2xl font-display text-brand-text-1 mb-8 flex items-center gap-3">
                <span className="text-brand-accent-base font-mono text-sm0">02.</span>
                LP Staking
              </h3>
              
              <div className="flex flex-col items-center pb-8">
                <div className="flex items-center gap-4 w-full justify-center">
                  <FlowNode icon={Coins} title="DYNA" desc="Protocol Token" delay={0.1} isDark />
                  <span className="text-brand-text-3 font-mono">+</span>
                  <FlowNode icon={Coins} title="USDC / ETH" desc="Pair Asset" delay={0.2} isDark />
                </div>
                <FlowArrow delay={0.4} />
                <FlowNode icon={Layers} title="Liquidity Contribution" desc="Pool depth increases, slippage decreases" delay={0.6} />
                <FlowArrow delay={0.8} />
                
                <div className="w-full flex justify-between relative mt-4">
                   <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-brand-text-3/30 -z-10" />
                   <div className="w-1/2 pr-4 flex flex-col items-center">
                     <span className="bg-brand-bg-primary text-[10px] font-mono text-brand-text-3 px-2 py-1 border border-brand-border mb-2">Platform Fees</span>
                     <FlowNode icon={Activity} title="Trading Volume" desc="Generate swap fees" delay={1.0} isDark />
                   </div>
                   <div className="w-1/2 pl-4 flex flex-col items-center">
                     <span className="bg-brand-bg-primary text-[10px] font-mono text-brand-accent-base px-2 py-1 border border-brand-accent-base/30 mb-2">Protocol Boost</span>
                     <FlowNode icon={Shield} title="LP Rewards" desc="Bonus DYNA emitted" delay={1.2} isDark />
                   </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
