import { cookies } from "next/headers";
import { DEFAULT_AI_MODEL } from "@/constants";
import { Chat } from "@/components/chat/chat";

interface PageProps {
  params: {
    id: string;
  };
  searchParams: {
    query?: string;
  };
}

export default async function page({ params, searchParams }: PageProps) {
  const cookieStore = await cookies();
  const modelIdFromCookie =
    cookieStore.get("chat-model")?.value || DEFAULT_AI_MODEL;

  // TODO: fetch initial messages from the server or database based on the chat ID
  const initialMessages: any[] = [];

  return (
    <Chat
      id={params.id}
      initialMessages={initialMessages}
      initialChatModel={modelIdFromCookie}
      autoResume={!!searchParams.query}
    />
  );
}
