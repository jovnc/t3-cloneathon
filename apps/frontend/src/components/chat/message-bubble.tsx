export default function MessageBubble({ message }: { message: any }) {
    return (
      <div
        className={`mb-6 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`max-w-2xl px-4 py-3 rounded-2xl text-sm ${
            message.role === 'user'
              ? 'bg-gray-200 text-gray-900 rounded-br-md'
              : 'bg-white border border-gray-200 text-gray-900 rounded-bl-md'
          }`}
        >
          {message.parts?.map((part: any, i: number) =>
            part.type === 'text' ? <div key={i}>{part.text}</div> : null
          ) || message.content}
        </div>
      </div>
    );
  }
  