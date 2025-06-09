"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const FloatingTrigger = () => {
  const { state } = useSidebar();

  if (state === "expanded") return null;

  return (
    <div className="fixed top-4 left-4 z-50 transition-all duration-300 ease-in-out animate-in fade-in-0 slide-in-from-left-5">
      <SidebarTrigger className="bg-background/50 backdrop-blur-sm border shadow-lg hover:shadow-xl hover:bg-background/20 transition-all duration-200 cursor-pointer" />
    </div>
  );
};

// TODO: fetch chats from server, create new chat, etc.
export const AppSidebar = () => {
  return (
    <>
      <FloatingTrigger />
      <Sidebar>
        <SidebarHeader className="flex flex-row items-center justify-between p-4">
          <div className="font-semibold text-lg">T3 Chat</div>
          <SidebarTrigger className="ml-auto cursor-pointer bg-background/20 p-4" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </>
  );
};
