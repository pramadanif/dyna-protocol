import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader, FrameBox } from '../ui';
import { Cpu, ShieldAlert, LineChart, Globe } from 'lucide-react';

const features = [
  {
    icon: ShieldAlert,
    title: "Reduced Sell Pressure",
    desc: "Time-weighted lockup mechanics combined with high-yield LP incentives drastically limit circulating supply circulation."
  },
  {
    icon: LineChart,
    title: "Deep Liquidity",
    desc: "By heavily rewarding LP stakers, the protocol ensures market depth that can absorb large maneuvers without extreme volatility."
  },
  {
    icon: Cpu,
    title: "Sustainable Rewards",
    desc: "Dynamic emission algorithms adjust APY based on total staked ratio, preventing hyperinflation common in Gen-1 DeFi."
  },
  {
    icon: Globe,
    title: "Long-Term Alignment",
    desc: "Governance power scales with lock duration, ensuring protocol decisions are made by committed ecosystem participants."
  }
];

export const Features = () => {
  return (
    <section className="py-32 bg-brand-bg-secondary relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader 
          badge="PROTOCOL PILLARS"
          title="Not Just Another Yield Farm"
          subtitle="Built from first principles, DYNA's architecture solves the 'mercenary capital' problem inherent in decentralized finance."
        />

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <FrameBox className="h-full group hover:bg-brand-surface-1/80 transition-colors duration-500 cursor-default flex flex-col relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-brand-accent-base/5 rounded-full blur-2xl group-hover:bg-brand-accent-base/10 transition-colors duration-500" />
                
                <div className="mb-6 relative">
                  <div className="p-3 inline-block bg-brand-border/30 border border-brand-border clip-edges group-hover:border-brand-accent-base/50 transition-colors">
                    <feature.icon className="w-6 h-6 text-brand-text-1 group-hover:text-brand-accent-base transition-colors" />
                  </div>
                  
                  {/* Stylized index number */}
                  <div className="absolute top-0 right-0 font-mono text-6xl text-brand-border/30 group-hover:text-brand-accent-base/10 transition-colors font-bold tracking-tighter select-none">
                    0{i + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-display text-brand-text-1 mb-3 group-hover:text-brand-accent-base transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-brand-text-3 font-sans leading-relaxed text-sm md:text-base flex-grow">
                  {feature.desc}
                </p>
                
                {/* Techy bottom border */}
                <div className="mt-8 flex gap-1 h-1">
                   <div className="w-8 h-full bg-brand-accent-base/30 group-hover:bg-brand-accent-base/80 transition-colors duration-500" />
                   <div className="w-2 h-full bg-brand-accent-base/20 group-hover:bg-brand-accent-base/60 transition-colors duration-500 delay-75" />
                   <div className="w-full h-full bg-brand-border/30" />
                </div>
              </FrameBox>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
