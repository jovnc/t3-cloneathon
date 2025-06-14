import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AI_MODELS } from "@/constants";

export default function ModelSelector({
  selectedModel,
  onChange,
}: {
  selectedModel: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={selectedModel} onValueChange={onChange}>
      <SelectTrigger className="w-40 text-xs border-none">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {AI_MODELS.map((model) => (
          <SelectItem key={model.value} value={model.value}>
            {model.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
