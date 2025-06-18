import { cookies } from "next/headers";
import { DEFAULT_AI_MODEL } from "@/constants";
import { Chat } from "@/components/chat/chat";
import { getChat } from "@/lib/db/ai";
import type { UIMessage } from "ai";
import { supabase } from "@/lib/supabase/client";
import { createClient } from "@/lib/supabase/server";

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

  const supabase = await createClient();
  const { data: session, error } = await supabase.auth.getSession();

  const userId = session.session?.user.id;

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

    console.log(`Loaded chat ${id} for user ${userId}`);

    // if (chat.userId !== userId) {
    //   console.warn(`User ${userId} doesn't have access to chat ${id}`);
    //   redirect("/");
    // }

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
