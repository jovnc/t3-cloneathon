import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Paperclip, Send } from 'lucide-react';
import ModelSelector from './model-selector';

export default function InputBar({
  input,
  onInputChange,
  onSubmit,
  selectedModel,
  onModelChange,
  searchEnabled,
  toggleSearch,
}: {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
  searchEnabled: boolean;
  toggleSearch: () => void;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 ml-[var(--sidebar-width)] bg-white border-t border-gray-200">
      <div className="max-w-3xl mx-auto p-4">
        <form onSubmit={onSubmit}>
          <div className="border border-gray-300 rounded-lg p-3 flex flex-col gap-3">
            <Input
              className="w-full border-none shadow-none p-0 text-sm placeholder:text-gray-500 focus-visible:ring-0"
              value={input}
              placeholder="Type your message here..."
              onChange={onInputChange}
            />

            <div className="flex items-center justify-between">
              <ModelSelector
                selectedModel={selectedModel}
                onChange={onModelChange}
              />
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={`text-xs px-2 py-1 h-7 ${
                    searchEnabled
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={toggleSearch}
                >
                  <Search className="w-3 h-3 mr-1" />
                  Search
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="p-1 h-7 w-7 text-gray-600 hover:bg-gray-100"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>

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
  );
}
