"use client";

import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/sections/Hero';
import { LiveStats } from '../components/sections/Stats';
import { Ecosystem } from '../components/sections/Ecosystem';
import { Features } from '../components/sections/Features';
import { Tokenomics } from '../components/sections/Tokenomics';
import { FAQ } from '../components/sections/FAQ';
import { Footer } from '../components/sections/Footer';

export default function Home() {
  return (
    <div className="bg-brand-bg-primary min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <LiveStats />
        <Ecosystem />
        <Features />
        <Tokenomics />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
