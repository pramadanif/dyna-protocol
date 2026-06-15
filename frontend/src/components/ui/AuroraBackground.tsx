"use client";

import React, { ReactNode } from "react";
import { motion } from "motion/react";

interface AuroraBackgroundProps {
  children: ReactNode;
}

export const AuroraBackground = ({ children }: AuroraBackgroundProps) => {
  return (
    <div className="relative flex flex-col h-[100vh] items-center justify-center bg-brand-bg-primary text-brand-text-1 transition-bg overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-brand-bg-primary z-0" />
        
        {/* Dynamic aurora glow effects modeled after ReactBits */}
        <div className="absolute -inset-[10px] opacity-40">
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(ellipse at 100% 0%, rgba(102, 255, 102, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 0% 100%, rgba(0, 153, 51, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(102, 255, 102, 0.05) 0%, transparent 100%)",
              filter: "blur(60px)",
              backgroundSize: "200% 200%",
            }}
          />
          
          <motion.div
            animate={{
              transform: ["translateY(0%) rotate(0deg)", "translateY(-10%) rotate(5deg)", "translateY(0%) rotate(0deg)"],
            }}
            transition={{
              duration: 15,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%]"
            style={{
              background: "conic-gradient(from 180deg at 50% 50%, rgba(102,255,102,0.1) 0deg, transparent 60deg, transparent 300deg, rgba(102,255,102,0.1) 360deg)",
              filter: "blur(80px)",
              opacity: 0.8,
            }}
          />
        </div>

        {/* CSS Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
