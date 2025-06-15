import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DEFAULT_AI_MODEL } from "@/constants";
import { Chat } from "@/components/chat/chat";
import { auth } from "@/server/auth";
import { getChat } from "@/lib/db/ai";
import type { UIMessage } from "ai";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    query?: string;
  }>;
}

export default async function page({ params, searchParams }: PageProps) {
  const cookieStore = await cookies();
  const modelIdFromCookie =
    cookieStore.get("chat-model")?.value || DEFAULT_AI_MODEL;

  const { id } = await params;
  const { query } = await searchParams;

  const session = await auth();
  const userId = session?.user?.id;

  // If user is not authenticated, redirect to auth
  if (!session || !userId) {
    redirect("/auth/signin");
  }

  try {
    const chat = await getChat(id, userId);

    // Chat doesnt exist yet
    if (!chat) {
      return (
        <Chat
          id={id}
          initialMessages={[]}
          initialChatModel={modelIdFromCookie}
          autoResume={!!query}
        />
      );
    }

    if (chat.userId !== userId) {
      console.warn(`User ${userId} doesn't have access to chat ${id}`);
      redirect("/");
    }

    const initialMessages = chat.messages.map((msg) => ({
      id: msg.id,
      role: (msg.parts as any)?.role || "assistant",
      content: (msg.parts as any)?.content || "",
    })) as UIMessage[];

    return (
      <Chat
        id={id}
        initialMessages={initialMessages}
        initialChatModel={modelIdFromCookie}
        autoResume={!!query}
      />
    );
  } catch (error) {
    console.error(`Error loading chat ${id}:`, error);
    return (
      <Chat
        id={id}
        initialMessages={[]}
        initialChatModel={modelIdFromCookie}
        autoResume={!!query}
      />
    );
  }
}
