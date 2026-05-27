"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Sparkles, LayoutDashboard, PlusCircle, FolderHeart, 
  Settings, LogOut, ChevronLeft, ChevronRight, Menu, 
  Search, Bell, User, BookOpen, MessageSquare, ExternalLink, HelpCircle
} from "lucide-react";
import { useBRD } from "@/context/BRDContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, brds, loadDemoProject } = useBRD();
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Authenticate guard
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, path: "/dashboard" },
    { name: "New BRD Flow", icon: PlusCircle, path: "/dashboard/new" },
    { name: "Templates", icon: BookOpen, path: "/dashboard/templates" },
    { name: "AI Assistant", icon: MessageSquare, path: "/dashboard/assistant" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row relative">
      {/* Sidebar - Desktop */}
      <aside 
        className={`hidden lg:flex flex-col border-r border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl transition-all duration-300 relative z-30 ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Workspace Brand / Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-white/[0.05]">
          <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
            <div className="bg-primary flex items-center justify-center p-2 rounded-lg text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            {!sidebarCollapsed && (
              <span className="font-sans font-bold tracking-tight text-white select-none whitespace-nowrap">
                AutoBRD <span className="text-primary text-[10px] uppercase font-mono px-1 rounded bg-primary/10">AI</span>
              </span>
            )}
          </Link>
          
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors hidden xl:block"
          >
            {sidebarCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
          </button>
        </div>

        {/* Workspace Switcher */}
        {!sidebarCollapsed && (
          <div className="p-4">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-indigo-500 flex items-center justify-center font-bold text-xs">
                  S
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white leading-none">Startup Workspace</span>
                  <span className="text-[9px] text-zinc-500 mt-1 font-mono">Personal account</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Menu Navigation links */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1.5 overflow-y-auto">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link 
                key={idx} 
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? "sidebar-link-active text-white" 
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? "text-primary animate-pulse-slow" : ""}`} />
                {!sidebarCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Demo Button - Sidebar Quick action */}
        {!sidebarCollapsed && brds.length === 0 && (
          <div className="p-4 m-3 rounded-xl bg-gradient-to-br from-primary/10 to-indigo-500/5 border border-primary/20 flex flex-col gap-2">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Demo Ready</span>
            <span className="text-[11px] text-zinc-400">Instantly populate a hyper-detailed food delivery workspace to explore exports & charts.</span>
            <button 
              onClick={loadDemoProject}
              className="py-1.5 rounded bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-colors"
            >
              Load Demo Project
            </button>
          </div>
        )}

        {/* User Footer Profile area */}
        <div className="p-4 border-t border-white/[0.05] flex items-center justify-between gap-3 overflow-hidden">
          <div className="flex items-center gap-3">
            <img 
              src={user.avatar} 
              alt="avatar" 
              className="h-9 w-9 rounded-full bg-zinc-800 border border-white/10"
            />
            {!sidebarCollapsed && (
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white line-clamp-1">{user.name}</span>
                <span className="text-[10px] text-zinc-500 line-clamp-1">{user.email}</span>
              </div>
            )}
          </div>
          {!sidebarCollapsed && (
            <button 
              onClick={logout}
              className="text-zinc-500 hover:text-red-400 p-1.5 rounded transition-colors"
              title="Log Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden h-16 glass fixed top-0 left-0 right-0 z-40 px-6 flex items-center justify-between border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="bg-primary p-2 rounded-lg text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-bold text-sm text-white">AutoBRD</span>
        </div>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded bg-white/5 border border-white/10 text-white"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* Mobile Drawer Menu overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-64 h-full bg-zinc-950 border-l border-white/10 p-6 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-base">Navigation</span>
                <button 
                  onClick={() => setMobileOpen(false)}
                  className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-400"
                >
                  Close
                </button>
              </div>
              <nav className="flex flex-col gap-2">
                {menuItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.path;
                  return (
                    <Link 
                      key={idx} 
                      href={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium ${
                        isActive 
                          ? "bg-primary/20 text-white border-l-2 border-primary" 
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-3 border-t border-white/10 pt-4">
              <img src={user.avatar} className="h-9 w-9 rounded-full bg-zinc-800" alt="avatar" />
              <div className="flex-1 text-left min-w-0">
                <p className="text-xs font-bold text-white truncate">{user.name}</p>
                <button 
                  onClick={() => {
                    setMobileOpen(false);
                    logout();
                  }}
                  className="text-[10px] text-red-400 hover:underline"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0">
        {/* Top Navbar Header */}
        <header className="h-16 glass-card border-b border-white/[0.05] hidden lg:flex items-center justify-between px-8 relative z-20">
          {/* Left search */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search BRD drafts, code schemas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-1.5 text-xs rounded-lg glass-input"
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-primary rounded-full animate-ping" />
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-8 top-14 w-80 glass rounded-xl border border-white/10 p-4 shadow-2xl z-50 text-left">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
                  <span className="text-xs font-bold text-white">Notifications</span>
                  <button className="text-[10px] text-primary hover:underline" onClick={() => setNotificationsOpen(false)}>Dismiss all</button>
                </div>
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                  <div className="p-2 bg-white/[0.02] border border-white/5 rounded-lg text-[11px]">
                    <p className="font-bold text-white">🎉 New project preloaded</p>
                    <p className="text-zinc-400 mt-1">Try reloading or browsing QuickBite Food app workspace.</p>
                  </div>
                  <div className="p-2 bg-white/[0.02] border border-white/5 rounded-lg text-[11px]">
                    <p className="font-bold text-white">🤖 AI diagram configured</p>
                    <p className="text-zinc-400 mt-1">Mermaid dynamic architecture map loaded.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="h-6 w-px bg-white/10" />

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-zinc-300">{user.name}</span>
              <img src={user.avatar} className="h-7 w-7 rounded-full bg-zinc-800" alt="avatar" />
            </div>
          </div>
        </header>

        {/* Page Content panel */}
        <main className="flex-1 overflow-y-auto relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
