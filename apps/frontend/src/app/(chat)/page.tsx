import { Chat } from "../../components/chat/chat";
import { cookies } from "next/headers";
import { DEFAULT_AI_MODEL } from "@/constants";
import { generateUUID } from "@/lib/utils";

export default async function page() {
  const cookieStore = await cookies();

  // TODO: implement saving model selection in cookies
  const modelIdFromCookie =
    cookieStore.get("chat-model")?.value || DEFAULT_AI_MODEL;

  // Generate a new chat ID for this session
  const chatId = generateUUID();

  return (
    <Chat
      id={chatId}
      initialMessages={[]}
      initialChatModel={modelIdFromCookie}
      autoResume={false}
    />
  );
}
