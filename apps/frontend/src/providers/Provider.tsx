import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";
import React from "react";

// Main provider component
function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </SessionProvider>
  );
}

export default Provider;
