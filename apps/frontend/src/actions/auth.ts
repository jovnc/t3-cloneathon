"use server";

import { createClient } from "@/lib/supabase/server";
import { getURL } from "@/lib/supabase/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signIn() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: getURL(),
    },
  });

  if (error) {
    redirect("/auth/error");
  }

  // The OAuth flow will handle the redirect to Google,
  // so we redirect to the OAuth URL instead of manually redirecting
  if (data.url) {
    redirect(data.url);
  }
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
