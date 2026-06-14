import React from 'react';
import { motion } from 'motion/react';

export const CodeBlock = ({ code, language = "bash" }: { code: string; language?: string }) => {
  return (
    <div className="relative group rounded-md overflow-hidden bg-black/40 border border-brand-border/50 backdrop-blur-sm clip-edges">
      <div className="flex items-center justify-between px-4 py-2 bg-brand-surface-2/30 border-b border-brand-border/30">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-border/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-brand-border/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-brand-border/50" />
        </div>
        <span className="text-[10px] font-mono text-brand-text-3 uppercase tracking-widest">{language}</span>
      </div>
      <div className="p-4 overflow-x-auto text-sm font-mono text-brand-text-2 leading-relaxed">
        <code>{code}</code>
      </div>
    </div>
  );
};

export const NeonButton = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' }) => {
  const baseClasses = "relative inline-flex items-center justify-center font-mono text-sm tracking-widest uppercase overflow-hidden transition-all duration-300 clip-edges px-8 py-4 cursor-pointer";
  
  const variants = {
    primary: "bg-brand-accent-base text-black hover:bg-brand-accent-bright hover:shadow-[0_0_20px_rgba(0,255,102,0.4)]",
    secondary: "bg-brand-surface-1 text-brand-text-1 border border-brand-border hover:border-brand-accent-base hover:text-brand-accent-base",
    outline: "bg-transparent border border-brand-accent-base/50 text-brand-accent-base hover:bg-brand-accent-base/10 shadow-[0_0_10px_rgba(0,255,102,0.1)_inset]"
  };

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button 
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseClasses} ${variants[variant]} ${className}`} 
      {...props as any}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 z-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />
      )}
    </motion.button>
  );
};

export const FrameBox = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative bg-brand-surface-1/40 border border-brand-border/60 backdrop-blur-md p-6 clip-edges group overflow-hidden ${className}`}
    >
      {/* Spotlight Effect */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,255,102,0.1), transparent 40%)`,
        }}
      />
      
      {/* Corner acccents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-accent-base/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-accent-base/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-accent-base/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-accent-base/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-brand-accent-base/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export const TypewriterText = ({ text = "", delay = 0, className = '' }: { text?: string, delay?: number, className?: string }) => {
  const characters = text?.split("") || [];
  
  return (
    <div className={`font-mono ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.1,
            delay: delay + index * 0.03,
            ease: "easeIn"
          }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-2 h-[1em] bg-brand-accent-base ml-1 align-baseline"
      />
    </div>
  );
};

export const ShinyText = ({ text, className = '' }: { text: string, className?: string }) => {
  return (
    <span className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-text-3 via-white to-brand-text-3 bg-[length:200%_auto] animate-[shiny_3s_linear_infinite] ${className}`}>
      {text}
    </span>
  );
};

export const SectionHeader = ({ title = "", subtitle, badge }: { title?: string, subtitle?: string, badge?: string }) => {
  return (
    <div className="flex flex-col items-start gap-4 mb-16">
      {badge && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-3 py-1 text-xs font-mono tracking-widest text-brand-accent-base border border-brand-accent-base/30 rounded-full bg-brand-accent-base/5"
        >
          {badge}
        </motion.div>
      )}
      <motion.h2 
        className="text-3xl md:text-5xl font-display font-medium text-brand-text-1 uppercase tracking-tight"
        style={{ perspective: "1000px" }}
      >
        {title?.split(' ').map((word, i) => (
          <motion.span 
            initial={{ opacity: 0, y: 20, rotateX: -60 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'inline-block', transformOrigin: 'top' }}
            key={i} 
            className={i % 2 !== 0 ? 'text-brand-text-3 font-light mr-3' : 'mr-3'}
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg font-sans max-w-2xl"
        >
          <ShinyText text={subtitle} />
        </motion.p>
      )}
    </div>
  );
};
