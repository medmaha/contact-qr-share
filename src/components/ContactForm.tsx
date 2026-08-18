import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RepeatableList from "@/components/RepeatableList";
import InfoField from "@/components/InfoField";
import { useContactStorage } from "@/hooks/useContactStorage";
import { ContactData, emptyContact } from "@/lib/vcard";
import { toast } from "sonner";

export default function ContactForm() {
  const { contact, setContact } = useContactStorage();

  const set = <K extends keyof ContactData>(key: K, value: ContactData[K]) =>
    setContact({ ...contact, [key]: value });

  const reset = () => {
    setContact(emptyContact);
    toast.success("Form cleared");
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <InfoField
          label="First name"
          placeholder="..."
          value={contact.firstName}
          onChange={(e) => set("firstName", e.target.value)}
        />
        <InfoField
          label="Last name"
          placeholder="..."
          value={contact.lastName}
          onChange={(e) => set("lastName", e.target.value)}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-y-5 gap-x-3">
        <InfoField
          label="Profession"
          placeholder="Software Engineer"
          value={contact.profession}
          onChange={(e) => set("profession", e.target.value)}
        />
        <InfoField
          label="Company"
          placeholder="..."
          value={contact.organization}
          onChange={(e) => set("organization", e.target.value)}
        />
      </div>

      <RepeatableList
        title="Phone numbers"
        items={contact.phones}
        labels={["CELL", "WORK", "HOME", "FAX"]}
        placeholder="+220 000 0000"
        inputMode="tel"
        onChange={(v) => set("phones", v)}
      />

      <RepeatableList
        title="Emails"
        items={contact.emails}
        labels={["WORK", "HOME", "OTHER"]}
        placeholder="you@example.com"
        inputMode="email"
        onChange={(v) => set("emails", v)}
      />

      <RepeatableList
        title="Links"
        items={contact.links}
        labels={["Website", "LinkedIn", "GitHub", "X", "Instagram"]}
        placeholder="example.com"
        inputMode="url"
        onChange={(v) => set("links", v)}
      />

      <div className="space-y-3 text-left">
        <InfoField
          label="Address"
           placeholder="Street"
          value={contact.street}
          onChange={(e) => set("street", e.target.value)}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder="City"
            value={contact.city}
            onChange={(e) => set("city", e.target.value)}
          />
          <Input
            placeholder="Region"
            value={contact.region}
            onChange={(e) => set("region", e.target.value)}
          />
          <Input
            placeholder="Postal code"
            value={contact.postalCode}
            onChange={(e) => set("postalCode", e.target.value)}
          />
          <Input
            placeholder="Country"
            value={contact.country}
            onChange={(e) => set("country", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Note
        </Label>
        <Textarea
          rows={2}
          placeholder="Anything else worth saving"
          value={contact.note}
          className="resize-none min-h-12"
          onChange={(e) => set("note", e.target.value)}
        />
      </div>

      <Button variant="ghost" className="w-full text-muted-foreground" onClick={reset}>
        <RotateCcw /> Clear saved details
      </Button>
    </div>
  );
}
