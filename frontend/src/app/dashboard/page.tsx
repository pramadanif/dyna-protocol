"use client";

import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { NeonButton } from '../../components/ui';
import { Wallet, TrendingUp, Coins, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  
  const [activeTab, setActiveTab] = useState<'yield' | 'lp'>('yield');
  
  const [stakeAmount, setStakeAmount] = useState("");

  const handleConnect = () => {
    connect({ connector: injected() });
  };

  const handleStake = () => {
    // Implement Wagmi writeContract here for staking
    alert(`Staking ${stakeAmount} DYNA`);
  };

  return (
    <div className="bg-brand-bg-primary min-h-screen text-brand-text-1 pt-24 pb-12 font-sans relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent-base/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <Link href="/" className="text-brand-accent-base hover:underline text-sm font-mono mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl font-display font-bold uppercase tracking-wider mb-2 text-glow">Terminal Access</h1>
            <p className="text-brand-text-3 font-mono text-sm">Secure Yield & Liquidity Protocol Interface</p>
          </div>
          
          <div className="bg-brand-surface-1 border border-brand-border p-4 clip-edges">
            {isConnected ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-accent-base animate-pulse" />
                  <span className="font-mono text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                </div>
                <NeonButton variant="outline" className="!py-1.5 !px-3 text-xs" onClick={() => disconnect()}>Disconnect</NeonButton>
              </div>
            ) : (
              <NeonButton variant="primary" onClick={handleConnect}>Connect Wallet</NeonButton>
            )}
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Value Locked", value: "$4,204,592", icon: Activity },
            { label: "DYNA Price", value: "$1.42", icon: Coins },
            { label: "Total Stakers", value: "3,142", icon: ShieldCheck },
            { label: "Your Wallet Balance", value: isConnected ? "1,000 DYNA" : "---", icon: Wallet }
          ].map((stat, i) => (
            <div key={i} className="bg-brand-surface-2/50 border border-brand-border p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-brand-accent-base/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-start mb-4">
                <span className="text-brand-text-3 font-mono text-xs uppercase tracking-widest">{stat.label}</span>
                <stat.icon className="w-4 h-4 text-brand-accent-base" />
              </div>
              <div className="text-2xl font-display font-medium text-glow">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Tabs & Interaction Panel */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex gap-4 border-b border-brand-border/50 pb-px">
              <button 
                onClick={() => setActiveTab('yield')}
                className={`pb-4 font-mono uppercase tracking-widest text-sm relative transition-colors ${activeTab === 'yield' ? 'text-brand-accent-base' : 'text-brand-text-3 hover:text-brand-text-2'}`}
              >
                Yield Staking
                {activeTab === 'yield' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-accent-base box-glow" />}
              </button>
              <button 
                onClick={() => setActiveTab('lp')}
                className={`pb-4 font-mono uppercase tracking-widest text-sm relative transition-colors ${activeTab === 'lp' ? 'text-brand-accent-base' : 'text-brand-text-3 hover:text-brand-text-2'}`}
              >
                LP Staking
                {activeTab === 'lp' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-accent-base box-glow" />}
              </button>
            </div>

            <div className="bg-brand-surface-1 border border-brand-border p-8 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent-base/5 blur-3xl pointer-events-none" />
              
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-1">{activeTab === 'yield' ? 'Stake DYNA' : 'Stake LP Tokens'}</h2>
                  <p className="text-brand-text-3 text-sm">Earn {activeTab === 'yield' ? 'up to 12.5% APY' : 'up to 45% APY'} in DYNA rewards</p>
                </div>
                <div className="bg-brand-bg-primary border border-brand-accent-base/20 px-4 py-2 text-brand-accent-base font-mono text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {activeTab === 'yield' ? '12.5% APY' : '45% APY'}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-brand-text-2">Amount to Stake</span>
                    <span className="text-brand-text-3 font-mono">Balance: {isConnected ? '1000' : '0'}</span>
                  </div>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="0.0"
                      className="w-full bg-brand-bg-primary border border-brand-border focus:border-brand-accent-base/50 outline-none p-4 font-mono text-xl text-brand-text-1 transition-colors"
                    />
                    <button 
                      onClick={() => setStakeAmount("1000")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-brand-accent-base hover:text-brand-accent-bright uppercase"
                    >
                      Max
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <NeonButton 
                    variant="primary" 
                    className="flex-1 justify-center"
                    onClick={handleStake}
                  >
                    {activeTab === 'yield' ? 'Stake DYNA' : 'Stake LP'}
                  </NeonButton>
                  <NeonButton variant="outline" className="flex-1 justify-center">Unstake</NeonButton>
                </div>
              </div>
            </div>
          </div>

          {/* User Position Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="bg-brand-surface-1 border border-brand-border p-6 clip-edges">
              <h3 className="font-display font-semibold text-lg mb-6 border-b border-brand-border pb-4">Your Position</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-brand-text-3 text-xs uppercase tracking-wider mb-1">Currently Staked</div>
                  <div className="text-2xl font-mono text-glow">0.00 <span className="text-sm text-brand-text-3">{activeTab === 'yield' ? 'DYNA' : 'LP'}</span></div>
                </div>
                
                <div>
                  <div className="text-brand-text-3 text-xs uppercase tracking-wider mb-1">Pending Rewards</div>
                  <div className="text-2xl font-mono text-brand-accent-base">0.00 <span className="text-sm text-brand-accent-base/50">DYNA</span></div>
                </div>

                <NeonButton variant="outline" className="w-full justify-center group mt-4">
                  Claim Rewards
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </NeonButton>
              </div>
            </div>

            <div className="bg-brand-bg-secondary border border-brand-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-brand-accent-base" />
                <h4 className="font-display font-medium text-sm">Audited & Secure</h4>
              </div>
              <p className="text-xs text-brand-text-3 leading-relaxed">
                Our smart contracts have been thoroughly audited by top security firms. Staking carries risk. Read our documentation before participating.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
