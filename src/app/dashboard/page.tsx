"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Plus, FileText, Sparkles, Languages, Users, 
  Download, ArrowRight, Trash2, Calendar, Layout, Info
} from "lucide-react";
import { useBRD } from "@/context/BRDContext";

export default function DashboardOverview() {
  const router = useRouter();
  const { brds, deleteBRD, loadDemoProject } = useBRD();

  const handleCreateNew = () => {
    router.push("/dashboard/new");
  };

  const handleOpenProject = (id: string) => {
    // Redirect to the new flow page with active BRD ID
    router.push(`/dashboard/new?id=${id}`);
  };

  // Compute analytics
  const totalBRDs = brds.length;
  const completedBRDs = brds.filter(b => b.status === "completed").length;
  const totalStories = brds.reduce((acc, curr) => acc + curr.userStories.length, 0);
  const totalGenerations = totalBRDs * 4 + completedBRDs * 6 + (totalStories ? 5 : 0); // simulated activity scale

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Workspace Overview</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage project scoping sessions, draft specifications, and export system codeboards.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={loadDemoProject}
            className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold text-zinc-300 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Try Demo Project
          </button>
          <button 
            onClick={handleCreateNew}
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-xs font-bold text-white shadow-lg shadow-primary/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            New BRD Flow
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/[0.05] flex items-center justify-between">
          <div>
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest block">Total BRD Projects</span>
            <span className="text-2xl font-extrabold text-white mt-1 block">{totalBRDs}</span>
            <span className="text-[10px] text-zinc-400 mt-2 block">
              <strong className="text-green-400">{completedBRDs}</strong> active completions
            </span>
          </div>
          <div className="p-3 bg-white/5 rounded-xl text-zinc-300">
            <FileText className="h-5 w-5" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/[0.05] flex items-center justify-between">
          <div>
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest block">AI Generations</span>
            <span className="text-2xl font-extrabold text-white mt-1 block">{totalGenerations}</span>
            <span className="text-[10px] text-zinc-400 mt-2 block">
              <strong className="text-primary font-mono">+12</strong> instances today
            </span>
          </div>
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/[0.05] flex items-center justify-between">
          <div>
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest block">Team members</span>
            <span className="text-2xl font-extrabold text-white mt-1 block">4</span>
            <span className="text-[10px] text-zinc-400 mt-2 block">
              Active dashboard seats
            </span>
          </div>
          <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
            <Users className="h-5 w-5" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/[0.05] flex items-center justify-between">
          <div>
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest block">User Stories Map</span>
            <span className="text-2xl font-extrabold text-white mt-1 block">{totalStories}</span>
            <span className="text-[10px] text-zinc-400 mt-2 block">
              Jira convertible units
            </span>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
            <Layout className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Graph placeholder and projects list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graph / Chart Placeholder */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-zinc-950/40 border border-white/[0.05] flex flex-col justify-between min-h-[350px]">
          <div>
            <h3 className="text-sm font-bold text-white">Scoping Velocity (Mock Graph)</h3>
            <p className="text-xs text-zinc-500 mt-1">Simulated weekly generation activity across AI workflows.</p>
          </div>
          
          {/* SVG Animated Chart representation */}
          <div className="h-44 w-full flex items-end justify-between gap-1.5 pt-4">
            {[40, 20, 65, 30, 85, 45, 95].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-gradient-to-t from-primary/20 to-primary rounded-t-md relative transition-all group-hover:brightness-125"
                  style={{ height: `${val}%` }}
                >
                  <span className="absolute top-[-25px] left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/10 px-1.5 py-0.5 rounded text-[9px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {val} specs
                  </span>
                </div>
                <span className="text-[9px] text-zinc-600 font-mono">Day {idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="p-6 rounded-2xl bg-zinc-950/40 border border-white/[0.05] flex flex-col justify-between min-h-[350px]">
          <div>
            <h3 className="text-sm font-bold text-white">Workspace Activity Log</h3>
            <p className="text-xs text-zinc-500 mt-1">Real-time compilation logs for current project generations.</p>
          </div>

          <div className="flex flex-col gap-3 py-4 overflow-y-auto max-h-[220px]">
            <div className="flex items-start gap-3 text-xs leading-relaxed">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
              <div>
                <p className="font-bold text-white">BRD Created successfully</p>
                <p className="text-zinc-500 text-[10px]">Loaded: QuickBite Express food app dashboard.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs leading-relaxed">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
              <div>
                <p className="font-bold text-white">Agile stories transformed</p>
                <p className="text-zinc-500 text-[10px]">Generated 3 swimlane story boards for checkout.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs leading-relaxed">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5" />
              <div>
                <p className="font-bold text-white">Translation triggered</p>
                <p className="text-zinc-500 text-[10px]">Document schema mapped into Hindi translations.</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center gap-2 text-[10px] text-zinc-500">
            <Info className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            <span>AI pipeline compiler is active on node servers.</span>
          </div>
        </div>
      </div>

      {/* Projects Directory List */}
      <div className="p-6 rounded-2xl bg-zinc-950/30 border border-white/[0.05]">
        <h3 className="text-base font-bold text-white mb-6">Recent Project Drafts</h3>

        {brds.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-4 border border-dashed border-white/10 rounded-xl bg-black/20">
            <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-500">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-300">No project drafts identified yet</p>
              <p className="text-xs text-zinc-500 mt-1">Start by converting raw ideas into structured specifications.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={loadDemoProject}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-white transition-colors"
              >
                Try Demo Project
              </button>
              <button 
                onClick={handleCreateNew}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-xs font-bold text-white transition-colors"
              >
                Create new BRD
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {brds.map((brd, index) => (
              <div 
                key={brd.id}
                className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group cursor-pointer"
                onClick={() => handleOpenProject(brd.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <FileText className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-primary transition-colors">{brd.title}</h4>
                    <div className="flex items-center gap-3 text-zinc-500 text-[10px] mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {brd.createdAt}
                      </span>
                      <span>•</span>
                      <span>Type: {brd.templateType}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  {brd.status === "completed" && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-mono">
                      Completed
                    </span>
                  )}
                  {brd.status === "processing" && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono animate-pulse">
                      Analyzing...
                    </span>
                  )}
                  {brd.status === "clarification" && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 font-mono">
                      Clarification Agent
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenProject(brd.id);
                      }}
                      className="p-1.5 rounded hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                      title="Open Project"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBRD(brd.id);
                      }}
                      className="p-1.5 rounded hover:bg-white/5 text-zinc-500 hover:text-red-400 transition-colors"
                      title="Delete Draft"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
