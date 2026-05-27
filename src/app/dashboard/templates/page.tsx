"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  BookOpen, FileText, Search, PlusCircle, ArrowRight,
  TrendingUp, ShoppingCart, ShoppingBag, ShieldAlert, Cpu, HeartPulse
} from "lucide-react";
import { useBRD } from "@/context/BRDContext";

export default function TemplatesPage() {
  const router = useRouter();
  const { createNewBRD } = useBRD();
  const [searchQuery, setSearchQuery] = useState("");

  const templatesList = [
    { 
      name: "E-commerce App", 
      icon: ShoppingCart, 
      color: "text-primary bg-primary/10",
      description: "Optimized storefront blueprint featuring dynamic checkouts, multi-vendor cart allocations, and advanced coupon logic sheets.",
      complexity: "Medium",
      timeline: "6 weeks"
    },
    { 
      name: "Food Delivery App", 
      icon: ShoppingBag, 
      color: "text-cyan-400 bg-cyan-500/10",
      description: "On-demand hyper-localized delivery maps with client sockets, driver dispatch allocations, and dining menu customizers.",
      complexity: "High",
      timeline: "8 weeks"
    },
    { 
      name: "Healthcare Platform", 
      icon: HeartPulse, 
      color: "text-rose-400 bg-rose-500/10",
      description: "HIPAA-aligned doctor consulting portal containing patient telemetry records, live video feeds, and localized billing portals.",
      complexity: "High",
      timeline: "10 weeks"
    },
    { 
      name: "EdTech App", 
      icon: BookOpen, 
      color: "text-indigo-400 bg-indigo-500/10",
      description: "LMS course organizer featuring live streaming class rooms, quiz compilation modules, and student subscription bills.",
      complexity: "Medium",
      timeline: "7 weeks"
    },
    { 
      name: "SaaS Platform", 
      icon: Cpu, 
      color: "text-purple-400 bg-purple-500/10",
      description: "Multi-tenant developer dashboard containing payment models, seat allocation plans, and system analytics graphs.",
      complexity: "Medium",
      timeline: "5 weeks"
    },
    { 
      name: "AI Product", 
      icon: TrendingUp, 
      color: "text-green-400 bg-green-500/10",
      description: "Generative model fine-tuning tool with file vector database indexes, token billing calculators, and key integrations.",
      complexity: "High",
      timeline: "9 weeks"
    }
  ];

  const handleLaunchTemplate = async (templateName: string) => {
    const defaultInputs: Record<string, string> = {
      "E-commerce App": "I want to build a modern headless e-commerce store with credit card payment integrations, order status updates, and local product directories.",
      "Food Delivery App": "Create a Swiggy-like food ordering application with live driver map trackers, dynamic menu cards, and instant UPI checkout.",
      "Healthcare Platform": "Build an online medical hub where patient consultation records are secured, and doctors can issue prescription lists directly.",
      "EdTech App": "Need an educational video streaming platform where students can purchase single courses and take automated tests.",
      "SaaS Platform": "Develop a multi-tenant business portal with user billing tiers and team management control panels.",
      "AI Product": "Build a generative model client wrapper allowing users to fine-tune vector data sets easily."
    };

    const input = defaultInputs[templateName] || "Create a modern startup application.";
    const createdId = await createNewBRD(
      `Baseline ${templateName}`,
      input,
      templateName
    );

    // Send straight to new flow with active document
    router.push(`/dashboard/new?id=${createdId}`);
  };

  const filtered = templatesList.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Blueprint Library</h1>
        <p className="text-zinc-500 text-sm mt-1">Kickstart development utilizing high-fidelity, sector-approved product scope blueprints.</p>
      </div>

      {/* Search and Filters */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <input 
          type="text" 
          placeholder="Filter blueprints (e-commerce, SaaS, mobile)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl glass-input"
        />
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((temp, index) => {
          const Icon = temp.icon;
          return (
            <div 
              key={index}
              onClick={() => handleLaunchTemplate(temp.name)}
              className="glass-card rounded-2xl p-6 border border-white/[0.04] flex flex-col justify-between min-h-[220px] cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl shrink-0 ${temp.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">Complexity: {temp.complexity}</span>
                  </div>
                </div>

                <h3 className="font-bold text-base text-white group-hover:text-primary transition-colors text-left">{temp.name}</h3>
                <p className="text-zinc-400 text-xs mt-2 text-left leading-relaxed">{temp.description}</p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.04]">
                <span className="text-[10px] text-zinc-500">Estimates: <strong>{temp.timeline}</strong></span>
                <span className="text-[10px] text-primary font-bold tracking-wider uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Launch Flow
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
