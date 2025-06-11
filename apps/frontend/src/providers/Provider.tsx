import { SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";
import React from "react";

// Main provider component
function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SidebarProvider defaultOpen={true}>{children}</SidebarProvider>
    </SessionProvider>
  );
}

export default Provider;
