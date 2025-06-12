"use client"

import { useChat } from "@ai-sdk/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Paperclip, Send } from "lucide-react"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  })

  const [selectedModel, setSelectedModel] = useState("Gemini 2.5 Flash")
  const [searchEnabled, setSearchEnabled] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto pb-40">
          <div className="max-w-3xl mx-auto px-4 py-6">
            {messages.length === 0 ? (
              <div className="text-center text-gray-600 mt-20">Hi there! How can I help you today?</div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-6 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-2xl px-4 py-3 rounded-2xl text-sm ${
                      message.role === "user"
                        ? "bg-gray-200 text-gray-900 rounded-br-md"
                        : "bg-white border border-gray-200 text-gray-900 rounded-bl-md"
                    }`}
                  >
                    {message.parts?.map((part, i) => {
                      if (part.type === "text") {
                        return <div key={`${message.id}-${i}`}>{part.text}</div>
                      }
                      return null
                    }) || message.content}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Input Area - With border around the entire group */}
        <div className="fixed bottom-0 left-0 right-0 ml-[var(--sidebar-width)] bg-white border-t border-gray-200">
          <div className="max-w-3xl mx-auto p-4">
            <form onSubmit={handleSubmit}>
              {/* Entire input group with border */}
              <div className="border border-gray-300 rounded-lg p-3 flex flex-col gap-3">
                {/* Text Input - No individual border */}
                <Input
                  className="w-full border-none shadow-none p-0 text-sm placeholder:text-gray-500 focus-visible:ring-0"
                  value={input}
                  placeholder="Type your message here..."
                  onChange={handleInputChange}
                />

                {/* Controls Row */}
                <div className="flex items-center justify-between">
                  {/* Model Selector */}
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-40 text-sm border-none shadow-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Gemini 2.5 Flash">Gemini 2.5 Flash</SelectItem>
                      <SelectItem value="GPT-4">GPT-4</SelectItem>
                      <SelectItem value="Claude">Claude</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Right Controls */}
                  <div className="flex items-center gap-2">
                    {/* Search Toggle */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={`text-xs px-2 py-1 h-7 ${
                        searchEnabled ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setSearchEnabled(!searchEnabled)}
                    >
                      <Search className="w-3 h-3 mr-1" />
                      Search
                    </Button>

                    {/* Attachment Button */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="p-1 h-7 w-7 text-gray-600 hover:bg-gray-100"
                    >
                      <Paperclip className="w-4 h-4" />
                    </Button>

                    {/* Send Button */}
                    <Button
                      type="submit"
                      size="sm"
                      className="p-1 h-7 w-7 bg-purple-600 hover:bg-purple-700 text-white rounded-full"
                    >
                      <Send className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
