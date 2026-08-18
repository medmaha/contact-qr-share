import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type LabeledValue } from "@/lib/vcard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RepeatableListProps = {
  title: string;
  items: LabeledValue[];
  labels: string[];
  placeholder: string;
  inputMode?: "tel" | "email" | "url";
  onChange: (items: LabeledValue[]) => void;
};

export default function RepeatableList({
  title,
  items,
  labels,
  placeholder,
  inputMode,
  onChange,
}: RepeatableListProps) {
  const update = (i: number, patch: Partial<LabeledValue>) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {title}
        </Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 gap-1 text-primary"
          onClick={() => onChange([...items, { label: labels[0] ?? "OTHER", value: "" }])}
        >
          <Plus /> Add
        </Button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Select
            aria-label={`${title} type`}
            value={item.label}
            onValueChange={(v) => update(i, { label: v })}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {}
              {labels.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex-1">
            <Input
              inputMode={inputMode}
              placeholder={placeholder}
              value={item.value}
              onChange={(e) => update(i, { value: e.target.value })}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Remove"
            className="h-9 w-11 shrink-0 text-muted-foreground hover:text-destructive"
            onClick={() => {
              const f =
                items.length > 1
                  ? items.filter((_, idx) => idx !== i)
                  : [{ label: labels[0] ?? "OTHER", value: "" }];
              onChange(
                items.length > 1
                  ? items.filter((_, idx) => idx !== i)
                  : [{ label: labels[0] ?? "OTHER", value: "" }],
              );
            }}
          >
            <Trash2 />
          </Button>
        </div>
      ))}
    </div>
  );
}
