"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  FileText, Sparkles, Languages, Zap, Shield, Play, 
  ArrowRight, MessageSquare, Terminal, Award, HelpCircle, 
  MapPin, CheckCircle2, Mic, Activity, Layers, Star
} from "lucide-react";
import { useBRD } from "@/context/BRDContext";

export default function LandingPage() {
  const router = useRouter();
  const { loadDemoProject, login } = useBRD();
  const [activeTab, setActiveTab] = useState<"input" | "processing" | "output">("input");

  const handleStartBuilding = () => {
    // Automatically perform a quick login if not done, and push to dashboard
    login("innovator@autobrd.ai", "Demo Innovator");
    router.push("/dashboard");
  };

  const handleTryDemo = () => {
    login("innovator@autobrd.ai", "Demo Innovator");
    loadDemoProject();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background bg-grid-glow text-foreground overflow-hidden flex flex-col">
      {/* Ambient background glow elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full glow-gradient pointer-events-none opacity-60" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full glow-gradient-cyan pointer-events-none opacity-40" />

      {/* Header */}
      <header className="glass fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <div className="bg-primary flex items-center justify-center p-2 rounded-lg text-white shadow-lg shadow-primary/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-sans font-bold text-xl tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            AutoBRD <span className="text-primary font-mono text-xs px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">AI</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#demo" className="hover:text-white transition-colors">Demo</a>
          <a href="#templates" className="hover:text-white transition-colors">Templates</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-sm font-medium text-zinc-300 hover:text-white transition-colors hidden sm:block"
          >
            Sign In
          </Link>
          <button 
            onClick={handleStartBuilding}
            className="relative group overflow-hidden px-4 py-2 rounded-lg text-sm font-bold bg-white text-black hover:bg-zinc-100 transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            Start Building
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-6 hover:bg-primary/10 transition-colors cursor-pointer"
          onClick={handleTryDemo}
        >
          <Award className="h-3.5 w-3.5" />
          <span>Hackdays Delhi winner nominee — Try Live Demo</span>
          <ArrowRight className="h-3 w-3" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none"
        >
          Turn Conversations Into{" "}
          <span className="bg-gradient-to-r from-primary via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Professional BRDs
          </span>{" "}
          Using AI
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto font-sans leading-relaxed"
        >
          AutoBRD AI converts voice notes, meetings, chats, and raw ideas into structured, enterprise-grade Business Requirement Documents in seconds.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center w-full"
        >
          <button 
            onClick={handleStartBuilding}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-primary hover:bg-primary-dark text-white flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(139,92,246,0.35)] transition-all transform hover:-translate-y-0.5"
          >
            Start Building
            <ArrowRight className="h-5 w-5" />
          </button>
          
          <button 
            onClick={handleTryDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Play className="h-4 w-4 text-primary fill-primary" />
            Try Demo Project
          </button>
        </motion.div>
      </section>

      {/* Demo Workflow Showcased */}
      <section id="demo" className="py-12 px-6 max-w-6xl mx-auto w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass rounded-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Mockup Title bar */}
          <div className="bg-zinc-950/80 px-4 py-3 flex items-center justify-between border-b border-white/[0.05]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs text-zinc-500 ml-4 font-mono">demo_workflow.brd</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-mono">Live Demo</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
            {/* Steps Left Panel */}
            <div className="lg:col-span-4 bg-zinc-950/50 p-6 border-r border-white/[0.05] flex flex-col gap-3 justify-center">
              <button 
                onClick={() => setActiveTab("input")}
                className={`flex items-start gap-4 p-4 rounded-xl text-left transition-all ${
                  activeTab === "input" ? "bg-white/5 border border-white/10" : "hover:bg-white/[0.02] border border-transparent"
                }`}
              >
                <div className={`p-2 rounded-lg ${activeTab === "input" ? "bg-primary text-white" : "bg-zinc-800 text-zinc-400"}`}>
                  <Mic className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">1. Input Conversation</h4>
                  <p className="text-xs text-zinc-500 mt-1">Upload unstructured voice recordings or notes.</p>
                </div>
              </button>

              <button 
                onClick={() => setActiveTab("processing")}
                className={`flex items-start gap-4 p-4 rounded-xl text-left transition-all ${
                  activeTab === "processing" ? "bg-white/5 border border-white/10" : "hover:bg-white/[0.02] border border-transparent"
                }`}
              >
                <div className={`p-2 rounded-lg ${activeTab === "processing" ? "bg-cyan-500 text-white" : "bg-zinc-800 text-zinc-400"}`}>
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">2. AI Requirements Sync</h4>
                  <p className="text-xs text-zinc-500 mt-1">Real-time feature & goal extraction.</p>
                </div>
              </button>

              <button 
                onClick={() => setActiveTab("output")}
                className={`flex items-start gap-4 p-4 rounded-xl text-left transition-all ${
                  activeTab === "output" ? "bg-white/5 border border-white/10" : "hover:bg-white/[0.02] border border-transparent"
                }`}
              >
                <div className={`p-2 rounded-lg ${activeTab === "output" ? "bg-green-500 text-white" : "bg-zinc-800 text-zinc-400"}`}>
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">3. Finished BRD Output</h4>
                  <p className="text-xs text-zinc-500 mt-1">Structured PDF/Word with flow diagrams.</p>
                </div>
              </button>
            </div>

            {/* Steps Visual Right Panel */}
            <div className="lg:col-span-8 p-6 flex flex-col justify-between bg-zinc-900/20">
              {activeTab === "input" && (
                <div className="flex flex-col h-full justify-between gap-6">
                  <div>
                    <h5 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Input Playground</h5>
                    <p className="text-sm text-zinc-300">"Hey, we need an app for our local organic grocery delivery. Customers should be able to scan UPI codes directly on checkout. Riders must get real-time maps. Make sure it supports both English and Hindi voice outputs."</p>
                  </div>
                  <div className="border border-dashed border-white/10 rounded-xl p-8 bg-black/40 flex flex-col items-center justify-center text-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary animate-pulse-slow">
                      <Mic className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold">Voice Recording Active</span>
                    <span className="text-[10px] text-zinc-500">Audio feedback wave is animating...</span>
                  </div>
                </div>
              )}

              {activeTab === "processing" && (
                <div className="flex flex-col h-full justify-between gap-6">
                  <div>
                    <h5 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">AI Agent Extraction</h5>
                    <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg p-2.5 text-xs text-primary mb-4 font-mono">
                      <Sparkles className="h-4 w-4 animate-spin" />
                      <span>Extracting scope definitions, timeline models, user stories...</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">Goals Identified</span>
                      <span className="text-xs font-bold text-white mt-1 block">Headless UPI Checkout</span>
                    </div>
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">Target Persona</span>
                      <span className="text-xs font-bold text-cyan-400 mt-1 block">Suburban Shoppers</span>
                    </div>
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">Integrations</span>
                      <span className="text-xs font-bold text-indigo-400 mt-1 block">Razorpay Webhooks</span>
                    </div>
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">System Architecture</span>
                      <span className="text-xs font-bold text-green-400 mt-1 block">Next.js App Router</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "output" && (
                <div className="flex flex-col h-full justify-between gap-6">
                  <div>
                    <h5 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Generated BRD Document</h5>
                    <div className="bg-black/60 border border-white/10 rounded-xl p-4 font-mono text-[11px] leading-relaxed max-h-[220px] overflow-y-auto text-zinc-300">
                      <h6 className="text-xs font-bold text-white mb-2"># Business Requirements Document (BRD)</h6>
                      <p className="text-zinc-500 mb-2">// Created under Project: Organic Grocery Hub</p>
                      <div className="text-white block mt-2 font-bold">1. Executive Summary</div>
                      <p>The Organic Grocery Platform is a reactive Web marketplace designed to connect local farmers directly to community shoppers with instant checkout options...</p>
                      <div className="text-white block mt-2 font-bold">2. Functional Requirements</div>
                      <p>FR-1: Instant UPI Dynamic Checkout Integration.<br/>FR-2: GPS rider route dispatch with live maps update.</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Language: <strong className="text-zinc-300">English / Hindi</strong></span>
                    <button 
                      onClick={handleStartBuilding}
                      className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      Open Interactive Workspace
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Engineered For Modern Business Development
          </h2>
          <p className="text-zinc-400 mt-4">
            Powerful generative systems replacing weeks of meetings with robust, actionable, developer-ready documents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
            <div className="bg-primary/10 border border-primary/20 text-primary h-12 w-12 rounded-xl flex items-center justify-center shadow-inner">
              <Mic className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Voice-to-BRD Generator</h3>
              <p className="text-zinc-400 text-sm mt-2">
                Speak details directly inside your browser. Our system transcribes multi-language audio files and structures bullet points instantly.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
            <div className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 h-12 w-12 rounded-xl flex items-center justify-center shadow-inner">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Interactive Clarification Agent</h3>
              <p className="text-zinc-400 text-sm mt-2">
                A dedicated conversational co-pilot that interviews you about ambiguity, payment frameworks, scope gaps, and updates documents in real time.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
            <div className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 h-12 w-12 rounded-xl flex items-center justify-center shadow-inner">
              <Terminal className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Automated Architecture Diagrams</h3>
              <p className="text-zinc-400 text-sm mt-2">
                Produces dynamic system architecture flowcharts, database layouts, and API routing structures using native Mermaid.js integration.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
            <div className="bg-purple-500/10 border border-purple-500/20 text-purple-400 h-12 w-12 rounded-xl flex items-center justify-center shadow-inner">
              <Languages className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Indian Multilingual Translations</h3>
              <p className="text-zinc-400 text-sm mt-2">
                Translate complete Business Requirements documents instantly to Hindi, Tamil, Gujarati, Marathi, or Bengali with single-click translation.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 h-12 w-12 rounded-xl flex items-center justify-center shadow-inner">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Agile Backlog Conversion</h3>
              <p className="text-zinc-400 text-sm mt-2">
                Converts product requirements instantly into visual Kanban boards, standard User Stories, and Jira-compatible issue formats.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 h-12 w-12 rounded-xl flex items-center justify-center shadow-inner">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI Project Risk Prediction</h3>
              <p className="text-zinc-400 text-sm mt-2">
                Identifies delivery bottleneck risks, technical integration challenges, and estimates project budget ranges (low/high limits).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prebuilt Templates Carousel / Preview */}
      <section id="templates" className="py-16 bg-zinc-950/40 border-y border-white/[0.03] px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Prebuilt Blueprint Catalogs</h2>
              <p className="text-zinc-400 mt-2">Kickstart your generation with high-fidelity, tailormade startup blueprints.</p>
            </div>
            <button 
              onClick={handleStartBuilding}
              className="mt-4 md:mt-0 text-sm text-primary hover:text-white font-bold flex items-center gap-1.5 transition-colors"
            >
              Browse all templates
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["E-commerce App", "Food Delivery App", "Healthcare Platform", "EdTech App"].map((temp, idx) => (
              <div 
                key={idx} 
                className="glass-card border border-white/[0.04] p-5 rounded-2xl flex flex-col justify-between min-h-[180px] cursor-pointer"
                onClick={handleTryDemo}
              >
                <div>
                  <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <FileText className="h-4 w-4 text-zinc-300" />
                  </div>
                  <h4 className="font-bold text-white text-sm">{temp}</h4>
                  <p className="text-xs text-zinc-500 mt-2">Complete structure with custom user stories, timelines, and budgets.</p>
                </div>
                <div className="text-[10px] text-primary font-bold tracking-wider uppercase flex items-center gap-1 mt-4">
                  Select Blueprint
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold">Loved by Innovators Globally</h2>
          <p className="text-zinc-400 mt-3">See how product designers, agencies, and startup founders are creating scopes in seconds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { quote: "AutoBRD AI changed how we scope agency projects. We save over 12 hours of discovery meetings per client. The dynamic Mermaid flowcharts generated instantly blow our clients away.", auth: "Pranav M.", role: "CEO, Pixelcraft Agency" },
            { quote: "Writing BRDs was my least favorite part of founding a startup. With this tool, I simply recorded an 8-minute Hinglish speech notes and got an enterprise-grade document ready for developers.", auth: "Sneha G.", role: "Founder, QuickMed" },
            { quote: "The multilingual Indian translation support is a gamechanger. We coordinate building hyper-local logistics apps with teams across Tamil Nadu and Gujarat seamlessly now.", auth: "Arun K.", role: "CTO, AgroCart Logistics" }
          ].map((test, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between gap-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed italic">"{test.quote}"</p>
              <div>
                <span className="text-sm font-bold text-white block">{test.auth}</span>
                <span className="text-xs text-zinc-500">{test.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-zinc-950/40 border-t border-white/[0.03] px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold">Predictable, Scalable Pricing</h2>
            <p className="text-zinc-400 mt-3">Unlock high-volume AI scope generation for your business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between min-h-[450px]">
              <div>
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Starter</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">$0</span>
                  <span className="text-zinc-500 text-sm">/month</span>
                </div>
                <p className="text-xs text-zinc-500 mt-2">Ideal for testing, hackathons, and small side ideas.</p>
                
                <ul className="mt-8 flex flex-col gap-3 text-sm text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    3 Generative BRDs
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Standard AI Processing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    PDF exports
                  </li>
                </ul>
              </div>
              <button 
                onClick={handleStartBuilding}
                className="w-full mt-8 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-bold text-white transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Tier 2 - Popular */}
            <div className="p-8 rounded-2xl bg-primary/5 border-2 border-primary relative flex flex-col justify-between min-h-[450px] shadow-[0_0_40px_rgba(139,92,246,0.15)]">
              <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                Most Popular
              </div>
              <div>
                <span className="text-xs text-primary font-bold uppercase tracking-wider">Growth Pro</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">$49</span>
                  <span className="text-zinc-500 text-sm">/month</span>
                </div>
                <p className="text-xs text-zinc-400 mt-2">For freelancers, designers, and scaling startups.</p>
                
                <ul className="mt-8 flex flex-col gap-3 text-sm text-zinc-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Unlimited Documents
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Mermaid System Flowcharts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    All Indian Translations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Agile Story boards / DOCX exports
                  </li>
                </ul>
              </div>
              <button 
                onClick={handleStartBuilding}
                className="w-full mt-8 py-3 rounded-xl bg-primary hover:bg-primary-dark text-sm font-bold text-white shadow-lg shadow-primary/30 transition-colors"
              >
                Start Pro Trial
              </button>
            </div>

            {/* Tier 3 */}
            <div className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between min-h-[450px]">
              <div>
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Agency Enterprise</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">$149</span>
                  <span className="text-zinc-500 text-sm">/month</span>
                </div>
                <p className="text-xs text-zinc-500 mt-2">For software agencies and product design companies.</p>
                
                <ul className="mt-8 flex flex-col gap-3 text-sm text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Dedicated API key usage
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Full collaboration suite
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Whitelabel exports
                  </li>
                </ul>
              </div>
              <button 
                onClick={handleStartBuilding}
                className="w-full mt-8 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-bold text-white transition-colors"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto w-full text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold">Ready to Supercharge Your Scoping?</h2>
        <p className="text-zinc-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
          Join thousands of designers and product managers writing specs with generative intelligence.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={handleStartBuilding}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 transition-colors"
          >
            Start Generative Session
          </button>
          <button 
            onClick={handleTryDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold border border-white/10 hover:bg-white/5 text-white transition-colors"
          >
            Try Free Demo Project
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/[0.04] bg-black/40 py-10 px-6">
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-bold text-sm">AutoBRD AI</span>
          </div>
          <span className="text-xs text-zinc-500">© 2026 AutoBRD AI. Made for AutoBRD hackdays. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
