"use client"

import * as React from "react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import AuthButton from "@/components/auth/AuthButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

// Simulated chat history from DB
const MOCK_CHATS = [
  { id: "1", title: "Test title generation", createdAt: new Date() },
  { id: "2", title: "Chat about React hooks", createdAt: new Date() },
  { id: "3", title: "AI model comparison", createdAt: new Date() },
]

const FloatingTrigger = () => {
  const { state, isMobile, openMobile } = useSidebar()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Show the floating trigger when:
  // - Component is mounted
  // - On mobile and sidebar is not open, OR
  // - On desktop and sidebar is collapsed
  if (!mounted) return null
  if (isMobile && openMobile) return null
  if (!isMobile && state === "expanded") return null

  return (
    <div className="fixed top-4 left-4 z-50 transition-all duration-300 ease-in-out animate-in fade-in-0 slide-in-from-left-5">
      <SidebarTrigger className="bg-background/50 backdrop-blur-sm border shadow-lg hover:shadow-xl hover:bg-background/20 transition-all duration-200 cursor-pointer" />
    </div>
  )
}

export const AppSidebar = () => {
  return (
    <>
      <FloatingTrigger />
      <Sidebar>
        <SidebarHeader className="flex flex-row items-center justify-between p-4">
          <div className="font-semibold text-lg">T3 Chat</div>
          <SidebarTrigger className="ml-auto cursor-pointer hover:bg-background/20 transition-colors duration-200" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <div className="p-4">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg mb-4">
                <Plus className="w-4 h-4 mr-2" />
                New Chat
              </Button>

              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search your threads..." className="pl-10 bg-gray-50 border-gray-200 text-sm" />
              </div>

              <div className="text-xs font-medium text-gray-500 mb-2">Today</div>
              <div className="space-y-1">
                {MOCK_CHATS.map((chat) => (
                  <Link
                    key={chat.id}
                    href={`/chat/${chat.id}`}
                    className="block p-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    {chat.title}
                  </Link>
                ))}
              </div>
            </div>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <AuthButton />
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
