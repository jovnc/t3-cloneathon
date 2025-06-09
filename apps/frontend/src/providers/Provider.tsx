import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

// Main provider component
function Provider({ children }: { children: React.ReactNode }) {
  return <SidebarProvider>{children}</SidebarProvider>;
}

export default Provider;
