import React from 'react';
import { motion } from 'motion/react';
import { FrameBox } from '../ui';
import { ArrowUpRight, BarChart2, Coins, Layers, Users } from 'lucide-react';

const stats = [
  { label: "Total Value Locked", value: "$428.5M", change: "+12.4%", icon: Layers },
  { label: "Current APY", value: "24.8%", change: "+2.1%", icon: BarChart2 },
  { label: "Total Staked (DYNA)", value: "1.2B", change: "+5.1%", icon: Coins },
  { label: "Active Nodes", value: "8,241", change: "+143", icon: Users },
];

export const LiveStats = () => {
  return (
    <section className="relative py-24 bg-brand-bg-secondary border-y border-brand-border/50">
      <div className="absolute inset-0 bg-grid-pattern-light opacity-5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-brand-border/30 pb-6">
          <div>
            <h2 className="text-2xl font-display uppercase tracking-widest text-brand-text-3 font-light mb-2">
              Network Status
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-accent-base shadow-[0_0_10px_#00FF66] animate-pulse" />
              <span className="text-brand-text-1 font-mono uppercase tracking-widest">Live Telemetry</span>
            </div>
          </div>
          <div className="text-brand-text-3 font-mono text-sm mt-4 md:mt-0 flex gap-4">
            <span>EPOCH: 482</span>
            <span>BLOCK: 14.8M</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <FrameBox className="h-full bg-brand-bg-primary/50">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-2 bg-brand-surface-2 border border-brand-border/50 rounded text-brand-text-3">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono text-brand-accent-base bg-brand-accent-base/10 px-2 py-1 rounded">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-4xl font-display font-medium text-brand-text-1 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-mono text-brand-text-3 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
                
                {/* Decorative data lines */}
                <div className="mt-6 flex h-8 items-end gap-1 opacity-30">
                  {[...Array(20)].map((_, j) => (
                    <motion.div 
                      key={j}
                      animate={{ height: ['20%', `${Math.random() * 100}%`, '20%'] }}
                      transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-full bg-brand-text-3"
                    />
                  ))}
                </div>
              </FrameBox>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
