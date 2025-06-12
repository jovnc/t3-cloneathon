'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import MessageList from './message-list';
import InputBar from './input-bar';

export default function ChatWindow() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });

  const [selectedModel, setSelectedModel] = useState('Gemini 2.5 Flash');
  const [searchEnabled, setSearchEnabled] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <MessageList messages={messages} />
        <InputBar
          input={input}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          searchEnabled={searchEnabled}
          toggleSearch={() => setSearchEnabled((prev) => !prev)}
        />
      </div>
    </div>
  );
}
