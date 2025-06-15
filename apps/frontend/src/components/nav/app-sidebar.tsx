"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import AuthButton from "@/components/auth/auth-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

const FloatingTrigger = () => {
  const { state, isMobile, openMobile } = useSidebar();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (isMobile && openMobile) return null;
  if (!isMobile && state === "expanded") return null;

  return (
    <div className="fixed top-4 left-4 z-50 transition-all duration-300 ease-in-out animate-in fade-in-0 slide-in-from-left-5">
      <SidebarTrigger className="bg-background/50 backdrop-blur-sm border shadow-lg transition-all duration-200 cursor-pointer" />
    </div>
  );
};

export const AppSidebar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <FloatingTrigger />
      <Sidebar>
        <SidebarHeader className="flex flex-row items-center justify-between px-4 py-2 w-full">
          <SidebarTrigger className="cursor-pointer  transition-colors duration-200" />
          <div className="font-semibold text-lg">T3 Chat</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <div className="px-4 py-2">
              <Link href="/">
                <Button className="w-full mb-4 items-center justify-center flex gap-2">
                  <Plus className="w-4 h-4" />
                  New Chat
                </Button>
              </Link>

              <div className="mb-4 flex flex-row rounded-lg border-[1px] border-gray-200 items-center justify-between px-2 bg-white">
                <Search className="w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search your threads..."
                  className=" border-none text-sm"
                />
              </div>

              {/* Sidebar Chat List */}
              {children}
            </div>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <AuthButton />
        </SidebarFooter>
      </Sidebar>
    </>
  );
};
