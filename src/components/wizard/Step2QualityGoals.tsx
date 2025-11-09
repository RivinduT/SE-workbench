import { Rocket, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface QualityGoals {
  scalability: number;
  performance: "good" | "fast" | "realtime";
  availability: "standard" | "high" | "critical";
  security: string[];
}

interface Step2QualityGoalsProps {
  values: QualityGoals;
  onChange: (values: QualityGoals) => void;
}

const Step2QualityGoals = ({ values, onChange }: Step2QualityGoalsProps) => {
  const scalabilityLabels = ["100s", "1,000s", "10,000s", "Millions+"];
  
  const performanceOptions = [
    { value: "good" as const, label: "Good is Good Enough", description: "Standard response times" },
    { value: "fast" as const, label: "Fast & Snappy", description: "Quick interactions" },
    { value: "realtime" as const, label: "Real-Time/Instant", description: "Immediate updates" },
  ];

  const securityOptions = [
    { id: "pii", label: "User PII (Names, Emails)" },
    { id: "payments", label: "Payments (PCI)" },
    { id: "health", label: "Health Data (HIPAA)" },
  ];

  const InfoTooltip = ({ content }: { content: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="w-4 h-4 text-muted-foreground cursor-help inline-block" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Rocket className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground">How well should this system perform? 🚀</h2>
          <p className="text-muted-foreground mt-1">Set your quality benchmarks</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Scalability Card */}
        <div className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label className="text-base font-semibold">Scalability</Label>
              <InfoTooltip content="How many concurrent users do you expect your system to handle?" />
            </div>
            <div className="space-y-4">
              <Slider
                value={[values.scalability]}
                onValueChange={([val]) => onChange({ ...values, scalability: val })}
                min={0}
                max={3}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                {scalabilityLabels.map((label, idx) => (
                  <span
                    key={idx}
                    className={cn(
                      "transition-colors",
                      values.scalability === idx ? "text-primary font-semibold" : "text-muted-foreground"
                    )}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Card */}
        <div className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label className="text-base font-semibold">Performance</Label>
              <InfoTooltip content="How fast should your application respond to user interactions?" />
            </div>
            <div className="space-y-2">
              {performanceOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={values.performance === option.value ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => onChange({ ...values, performance: option.value })}
                >
                  <div>
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-xs opacity-80">{option.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Availability Card */}
        <div className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label className="text-base font-semibold">Availability</Label>
              <InfoTooltip content="How much uptime do you need? Higher availability requires more infrastructure." />
            </div>
            <Select
              value={values.availability}
              onValueChange={(val: QualityGoals["availability"]) =>
                onChange({ ...values, availability: val })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard (99.9% - ~8hrs downtime/year)</SelectItem>
                <SelectItem value="high">High (99.99% - ~52min downtime/year)</SelectItem>
                <SelectItem value="critical">Mission Critical (99.999% - ~5min downtime/year)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Security Card */}
        <div className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label className="text-base font-semibold">Security</Label>
              <InfoTooltip content="What type of sensitive data will your system handle? This affects compliance requirements." />
            </div>
            <div className="space-y-3">
              {securityOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={option.id}
                    checked={values.security.includes(option.id)}
                    onCheckedChange={(checked) => {
                      const newSecurity = checked
                        ? [...values.security, option.id]
                        : values.security.filter((s) => s !== option.id);
                      onChange({ ...values, security: newSecurity });
                    }}
                  />
                  <label
                    htmlFor={option.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2QualityGoals;
