"use client";

import React, { useState } from "react";
import { 
  Settings, Key, Sparkles, HardDrive, ShieldCheck, 
  HelpCircle, Trash2, CheckCircle, Info
} from "lucide-react";
import { useBRD } from "@/context/BRDContext";
import confetti from "canvas-confetti";

export default function SettingsPage() {
  const { apiKey, setApiKey, user } = useBRD();
  const [localKey, setLocalKey] = useState(apiKey);
  const [dbConnected, setDbConnected] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(localKey);
    setSavedSuccess(true);
    confetti({
      particleCount: 50,
      spread: 40,
      colors: ["#8b5cf6", "#06b6d4"]
    });
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleConnectDb = () => {
    setDbConnected(true);
    alert("Simulated Connection: Supabase instance successfully linked to active workspace schemas.");
  };

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto w-full flex flex-col gap-8 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Workspace Settings</h1>
        <p className="text-zinc-500 text-sm mt-1">Configure Gemini LLM API connections, developer database tunnels, and workspace credentials.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Left Settings Panel */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* API Key Configuration Form */}
          <form onSubmit={handleSaveKey} className="p-5 rounded-2xl bg-zinc-950/60 border border-white/5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <Key className="h-4.5 w-4.5 text-primary" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">AI API Credentials</h3>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Gemini API Key</label>
              <input 
                type="password" 
                placeholder="AIzaSy..."
                value={localKey}
                onChange={(e) => setLocalKey(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl glass-input font-mono"
              />
              <span className="text-[9px] text-zinc-500 mt-1">
                Your key is stored locally in your browser's <code>localStorage</code> and never shared with our servers.
              </span>
            </div>

            <button 
              type="submit"
              className="py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-xs font-bold text-white shadow-lg shadow-primary/20 flex items-center justify-center gap-1.5 transition-all self-end px-6"
            >
              {savedSuccess ? "Credentials Saved!" : "Save Credentials"}
            </button>
          </form>

          {/* Database Integration */}
          <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <HardDrive className="h-4.5 w-4.5 text-cyan-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Cloud Database Sync</h3>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed">
              Connect external databases to store generative output specs dynamically across team workspaces.
            </p>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
                <span className="text-xs font-bold text-white">Local Storage Active</span>
              </div>
              
              <button 
                onClick={handleConnectDb}
                className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold text-zinc-300 transition-colors"
              >
                {dbConnected ? "Linked to Supabase" : "Link Cloud Database"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Settings panel (Profile overview) */}
        <div className="flex flex-col gap-6">
          {/* User profile details */}
          {user && (
            <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/5 flex flex-col gap-4 items-center text-center shadow-xl">
              <img 
                src={user.avatar} 
                alt="avatar" 
                className="h-16 w-16 rounded-full bg-zinc-800 border border-white/10"
              />
              <div>
                <span className="text-sm font-extrabold text-white block">{user.name}</span>
                <span className="text-xs text-zinc-500 mt-0.5 block">{user.email}</span>
              </div>
              <div className="w-full h-px bg-white/5" />
              <div className="flex items-center justify-around w-full text-[10px] font-mono text-zinc-400">
                <div>
                  <span className="block font-bold text-white">Role:</span>
                  <span>Developer</span>
                </div>
                <div>
                  <span className="block font-bold text-white">Plan:</span>
                  <span className="text-primary font-bold">Growth Pro</span>
                </div>
              </div>
            </div>
          )}

          {/* Guidelines info */}
          <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col gap-3">
            <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              <span>Security Protocols</span>
            </div>
            <p className="text-[10.5px] text-zinc-400 leading-relaxed">
              AutoBRD AI implements SOC2 encryption standard frameworks. AI interactions run through strict sandbox filters to ensure data privacy parameters are kept at 100% security levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
