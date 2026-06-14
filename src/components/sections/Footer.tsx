import React from 'react';
import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-bg-primary pt-20 border-t border-brand-border relative overflow-hidden">
      {/* Background glow terminal feel */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-accent-base to-transparent opacity-20" />
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-1/2 h-32 bg-brand-accent-base/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Terminal className="w-8 h-8 text-brand-accent-base" />
              <span className="font-display font-bold text-2xl tracking-widest text-brand-text-1">DYNA</span>
            </div>
            <p className="text-brand-text-3 font-sans text-sm mb-6 max-w-xs">
              Futuristic liquidity infrastructure. Decentralized, secure, and built for the next generation of digital finance.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-accent-base animate-pulse" />
              <span className="text-xs font-mono text-brand-accent-base tracking-widest uppercase">Systems Operational</span>
            </div>
          </div>

          {/* Links Cols */}
          {[
            {
              title: "Protocol",
              links: ["Yield Staking", "LP Modules", "Governance", "Analytics"]
            },
            {
              title: "Developers",
              links: ["Documentation", "GitHub", "Smart Contracts", "Bug Bounty"]
            },
            {
              title: "Network",
              links: ["Community", "Discord", "Twitter / X", "Medium Blog"]
            }
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-mono text-sm tracking-widest text-brand-text-1 uppercase mb-6">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-brand-text-3 hover:text-brand-accent-base transition-colors font-sans text-sm block w-fit relative group">
                      {link}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-accent-base transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-brand-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-brand-text-3 font-mono text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} DYNA Protocol. All rights reserved.
          </div>
          <div className="text-brand-text-3 font-mono text-xs uppercase tracking-widest flex gap-4">
            <a href="#" className="hover:text-brand-text-1 transition-colors">Privacy Policy</a>
            <span className="text-brand-border">|</span>
            <a href="#" className="hover:text-brand-text-1 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
