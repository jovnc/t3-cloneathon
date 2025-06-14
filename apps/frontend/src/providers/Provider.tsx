import { SessionProvider } from "next-auth/react";
import React from "react";

// Main provider component
function Provider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Provider;
