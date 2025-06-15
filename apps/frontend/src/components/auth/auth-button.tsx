"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
        <div className="h-4 w-20 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center justify-between border-t-[0.5px] border-secondary py-2">
        <div className="flex items-center space-x-2 min-w-0 ">
          {session.user.image && (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="h-8 w-8 rounded-full"
            />
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">
              {session.user.name || "User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {session.user.email}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="h-8 w-8 p-0"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Link href="/auth/signin">
      <Button variant="ghost" size="sm" className="w-full">
        <LogIn /> Login
      </Button>
    </Link>
  );
}
