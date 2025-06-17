import { TRPCReactProvider } from "@/trpc/react";
import React from "react";

// Main provider component
function Provider({ children }: { children: React.ReactNode }) {
  return <TRPCReactProvider>{children}</TRPCReactProvider>;
}

export default Provider;
