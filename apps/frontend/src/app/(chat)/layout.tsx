import { AppSidebar } from "@/components/nav/app-sidebar";
import { ChatList } from "@/components/nav/chat-list";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar_state")?.value;
  const defaultOpen = sidebarState !== "false";

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/signin");
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar>
        <ChatList />
      </AppSidebar>
      <SidebarInset>
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
