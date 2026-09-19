'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import UniqueBackground from '@/components/UniqueBackground';
import LaptopHero from '@/components/LaptopHero';
import HeroContent from '@/components/HeroContent';
import WhySKYX from '@/components/WhySKYX';
import Journey from '@/components/Journey';
import Services from '@/components/Services';
import CapabilitiesGallery from '@/components/CapabilitiesGallery';
import Testimonials from '@/components/Testimonials';
import Careers from '@/components/Careers';
import BlogsSection from '@/components/BlogsSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
export default function Home() {
  return (
    <main className="relative min-h-screen text-slate-800 selection:bg-orange-400/20 selection:text-slate-900 bg-[#F8FAFD]">
      {/* Signature Royal Architectural & Stardust Background */}
      <UniqueBackground />

      {/* Bespoke Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Floating Minimal Glass Navigation Bar */}
      <Navbar />

      {/* Flagship Hero Presentation: Immediate Grand Landing Experience */}
      <section id="home" className="relative pt-28 pb-16 border-b border-slate-200 bg-transparent">
        <HeroContent isEmbedded={false} />
      </section>


      {/* SIGNATURE 3D EXPERIENCE: 16:9 Laptop Zoom that dives directly into the Verified Metrics Page */}
      <LaptopHero />

      {/* Strategic Architecture / Why SKYX */}
      <WhySKYX />

      {/* Milestones That Define Our Legacy (2023 - 2026) */}
      <Journey />

      {/* 6 Core Capabilities / Interactive Services Showcase */}
      <Services />

      {/* Architectural Works & Digital Deployments (Projects Gallery) */}
      <CapabilitiesGallery />

      {/* Verified Partner Success Stories & Trust Bar */}
      <Testimonials />

      {/* Digital Innovator Career Opportunities */}
      <Careers />

      {/* Knowledge & Strategic Insights (Articles & Blogs) */}
      <BlogsSection />

      {/* Cinematic Final Call To Action & Interactive Inquiry Terminal */}
      <Contact />

      {/* Ultra-Luxury Editorial Footer */}
      <Footer />
    </main>
  );
}
