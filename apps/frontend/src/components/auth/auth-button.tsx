"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { signOut } from "@/actions/auth";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

export default function AuthButton() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center justify-between border-t-[0.5px] border-secondary py-2">
        <div className="flex items-center space-x-2 min-w-0 ">
          {session.user.user_metadata?.avatar_url && (
            <img
              src={session.user.user_metadata.avatar_url}
              alt={session.user.user_metadata?.full_name || "User"}
              className="h-8 w-8 rounded-full"
            />
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">
              {session.user.user_metadata?.full_name ||
                session.user.email?.split("@")[0] ||
                "User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {session.user.email}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => signOut()}
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
