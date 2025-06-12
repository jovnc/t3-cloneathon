import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
  
  export default function ModelSelector({
    selectedModel,
    onChange,
  }: {
    selectedModel: string;
    onChange: (value: string) => void;
  }) {
    return (
      <Select value={selectedModel} onValueChange={onChange}>
        <SelectTrigger className="w-40 text-sm border-none shadow-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Gemini 2.5 Flash">Gemini 2.5 Flash</SelectItem>
          <SelectItem value="GPT-4">GPT-4</SelectItem>
          <SelectItem value="Claude">Claude</SelectItem>
        </SelectContent>
      </Select>
    );
  }
  