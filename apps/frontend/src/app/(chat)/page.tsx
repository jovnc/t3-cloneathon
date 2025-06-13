import MessageList from "../../components/chat/message-list";
import InputBar from "../../components/chat/input-bar";
import { ChatProvider } from "@/providers/ChatProvider";

export default async function page() {
  return (
    <div className="flex h-screen flex-col">
      <ChatProvider>
        <div className="flex-1 overflow-y-auto">
          <MessageList />
        </div>
        <InputBar />
      </ChatProvider>
    </div>
  );
}
