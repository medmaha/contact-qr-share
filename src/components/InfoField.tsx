
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function InfoField({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5 text-left">
      <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </Label>
      <Input className="h-9 bg-card" {...props} />
    </div>
  );
}