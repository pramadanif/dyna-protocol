import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { NeonButton, TypewriterText, ShinyText } from '../ui';
import { Terminal, Database, Activity, ChevronRight } from 'lucide-react';

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  
  const [systemLog, setSystemLog] = useState<string[]>([]);
  
  useEffect(() => {
    const logs = [
      "INITIALIZING DYNA_CORE_V2",
      "ESTABLISHING SECURE PROTOCOL LINK...",
      "VERIFYING LIQUIDITY POOLS",
      "NODE SYNC: 100%",
      "SYSTEM DECRYPTED. READY."
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setSystemLog(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center pt-24 pb-20 overflow-hidden bg-brand-bg-primary aurora-bg">
      {/* Complex Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-accent-base/10 rounded-full blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute inset-0 scanlines opacity-40" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <motion.div 
            style={{ y: y1, opacity }}
            className="flex flex-col items-start gap-8"
          >
            <div className="flex items-center gap-3 px-4 py-2 border border-brand-accent-base/20 bg-brand-accent-base/5 backdrop-blur-sm text-brand-accent-base font-mono text-xs uppercase tracking-widest clip-edges">
              <div className="w-2 h-2 bg-brand-accent-base rounded-full animate-pulse shadow-[0_0_8px_#00FF66]" />
              Protocol v2.4.1 Online
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium uppercase tracking-tighter leading-[0.9]">
              <motion.span 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block text-brand-text-1"
              >
                Securing
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-accent-base to-emerald-400 text-glow select-none"
              >
                Real Value
              </motion.span>
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-lg md:text-xl max-w-xl font-sans font-light leading-relaxed"
            >
              <ShinyText text="DYNA transforms staking and liquidity into a sustainable ecosystem designed for long-term value creation. Advanced infrastructure for the next generation of DeFi." />
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <NeonButton variant="primary" className="group">
                Launch App
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </NeonButton>
              <NeonButton variant="outline">
                Read Whitepaper
              </NeonButton>
            </motion.div>
          </motion.div>

          {/* Right Side Terminal Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full aspect-[4/3] lg:aspect-square flex items-center justify-center lg:justify-end"
          >
             {/* Abstract Hologram Representation */}
             <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
                {/* Rotating Rings */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-dashed border-brand-accent-base/30"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[30px] rounded-full border border-brand-border/50"
                />
                
                {/* Core Element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded bg-brand-surface-1/80 border border-brand-accent-base/50 backdrop-blur-xl clip-edges flex flex-col items-center justify-center shadow-[0_0_40px_rgba(0,255,102,0.15)] overflow-hidden">
                    <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent-base to-transparent opacity-50" />
                    <Terminal className="w-10 h-10 text-brand-accent-base mb-3 opacity-80" />
                    <span className="font-display font-bold text-2xl tracking-widest text-brand-text-1">DYNA</span>
                    <span className="text-[10px] font-mono text-brand-accent-base mt-1">CORE.SYS</span>
                  </div>
                </div>

                {/* Floating Data Nodes */}
                {[
                  { icon: Database, label: "L1.SYNC", delay: 0, pos: "top-[-20px] left-1/4" },
                  { icon: Activity, label: "TX.VOL", delay: 1, pos: "bottom-1/4 -right-8" },
                ].map((node, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
                    className={`absolute ${node.pos} bg-brand-surface-2 border border-brand-border p-3 clip-edges backdrop-blur-md flex items-center gap-3`}
                  >
                    <node.icon className="w-4 h-4 text-brand-text-3" />
                    <span className="font-mono text-xs text-brand-text-1">{node.label}</span>
                  </motion.div>
                ))}
             </div>

             {/* Terminal Boot Sequence log overlay */}
             <div className="absolute bottom-0 left-0 right-0 lg:-left-20 lg:bottom-10 bg-brand-bg-primary/90 border border-brand-border/50 p-4 font-mono text-[10px] md:text-xs text-brand-accent-base/70 backdrop-blur-md clip-edges max-w-sm pointer-events-none">
                <div className="flex justify-between items-center mb-2 pb-2 border-b border-brand-border/50">
                  <span>TERMINAL_OUTPUT</span>
                  <span className="text-white/50">0x00A8</span>
                </div>
                <div className="space-y-1">
                  {systemLog.map((log, i) => (
                    <div key={i} className="flex gap-2">
                       <span className="text-white/30">{`>`}</span>
                       <TypewriterText text={log} delay={0} />
                    </div>
                  ))}
                  {systemLog.length === 5 && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                      className="text-brand-text-1 mt-2 flex gap-2"
                    >
                      <span className="text-brand-accent-base animate-pulse">_</span>
                    </motion.div>
                  )}
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
