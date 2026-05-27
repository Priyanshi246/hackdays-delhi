"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Mail, Lock, ArrowRight, User } from "lucide-react";
import { useBRD } from "@/context/BRDContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useBRD();
  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      login(email || "innovator@autobrd.ai", name || "Demo Innovator");
      setLoading(false);
      router.push("/dashboard");
    }, 1200);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login("google.innovator@autobrd.ai", "Google Innovator");
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background bg-grid-glow text-foreground flex items-center justify-center p-6 relative">
      <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] rounded-full glow-gradient pointer-events-none opacity-40" />

      <div className="w-full max-w-md glass rounded-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden relative z-10">
        <div className="p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-2 rounded-lg text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                AutoBRD AI
              </span>
            </Link>
            <h2 className="text-2xl font-extrabold text-white">
              {isSignUp ? "Create your workspace" : "Welcome back"}
            </h2>
            <p className="text-zinc-500 text-sm mt-2">
              {isSignUp 
                ? "Get started building enterprise requirements in seconds" 
                : "Sign in to access your generative dashboard"
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isSignUp && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input 
                    type="text" 
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl glass-input"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl glass-input"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl glass-input"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 rounded-xl bg-primary hover:bg-primary-dark text-sm font-bold text-white shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.06]" />
            </div>
            <span className="relative px-3 bg-zinc-950 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
              Or continue with
            </span>
          </div>

          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-bold text-white flex items-center justify-center gap-2.5 transition-all"
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Demo Bypass for Judge */}
        <div className="bg-primary/5 border-t border-primary/20 p-4 flex flex-col items-center gap-2 text-center">
          <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Hackathon Quick Link</span>
          <button 
            onClick={() => {
              login("judge@hackdays.delhi", "Delhi Hackathon Judge");
              router.push("/dashboard");
            }}
            className="text-xs text-white hover:text-primary font-bold flex items-center gap-1 transition-colors"
          >
            Skip Authentications & Enter Dashboard as Guest
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
