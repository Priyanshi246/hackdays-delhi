"use client";

import React from "react";
import { BRDProvider } from "@/context/BRDContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <BRDProvider>{children}</BRDProvider>;
}
