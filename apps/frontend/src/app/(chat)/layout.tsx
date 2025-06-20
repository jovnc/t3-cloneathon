import { AppSidebar } from "@/components/nav/app-sidebar";
import { ChatList } from "@/components/nav/chat-list";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ApiKeyProvider } from "@/components/auth/api-key-provider";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/signin");
  }

  return (
    <ApiKeyProvider>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar>
          <ChatList />
        </AppSidebar>
        <SidebarInset>
          <main className="flex-1">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ApiKeyProvider>
  );
}
