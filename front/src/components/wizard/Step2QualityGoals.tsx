import { Rocket, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
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
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export interface QualityGoals {
  responseTime: string;
  throughput: string;
  expectedUsers: number;
  dataVolume: string;
  growthRate: string;
  uptime: "standard" | "high" | "critical";
  downtimeTolerance: string;
  disasterRecovery: string;
  securityNeeds: string[];
  authNeeds: string;
  deployFrequency: "weekly" | "monthly" | "quarterly";
  teamStructure: "single" | "multiple";
  audience: "public" | "business" | "internal";
  accessibilityNeeds: string;
}

interface Step2QualityGoalsProps {
  values: QualityGoals;
  onChange: (values: QualityGoals) => void;
}

const Step2QualityGoals = ({ values, onChange }: Step2QualityGoalsProps) => {
  const scalabilityLabels = ["1,000s", "10,000s", "100,000s", "1 Million+"];
  
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

  const handleSecurityToggle = (value: string, checked: boolean) => {
    const newSecurity = checked
      ? [...values.securityNeeds, value]
      : values.securityNeeds.filter((s) => s !== value);
    onChange({ ...values, securityNeeds: newSecurity });
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary))]">
          <Rocket className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground">Quality Goals</h2>
          <p className="text-muted-foreground mt-1">These 'Quality Goals' decide how your system will exist and behave.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Performance Card */}
        <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            Performance
            <InfoTooltip content="Non-Functional Requirement: How fast and responsive your system needs to be" />
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="response-time" className="text-sm font-medium">
                Expected Response Time
              </Label>
              <Input
                id="response-time"
                value={values.responseTime}
                onChange={(e) => onChange({ ...values, responseTime: e.target.value })}
                placeholder="e.g., < 200ms"
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="throughput" className="text-sm font-medium">
                Expected Throughput
              </Label>
              <Input
                id="throughput"
                value={values.throughput}
                onChange={(e) => onChange({ ...values, throughput: e.target.value })}
                placeholder="e.g., 5,000 requests/sec"
                className="text-base"
              />
            </div>
          </div>
        </Card>

        {/* Scalability Card */}
        <Card className="p-6 border-secondary/20 bg-card/50 backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            Scalability
            <InfoTooltip content="How your system will grow and handle increasing loads" />
          </h3>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Expected Users</Label>
                <span className="text-sm text-primary font-semibold">
                  {scalabilityLabels[values.expectedUsers]}
                </span>
              </div>
              <Slider
                value={[values.expectedUsers]}
                onValueChange={(vals) => onChange({ ...values, expectedUsers: vals[0] })}
                max={3}
                step={1}
                className="w-full"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="data-volume" className="text-sm font-medium">
                  Expected Data Volume
                </Label>
                <Input
                  id="data-volume"
                  value={values.dataVolume}
                  onChange={(e) => onChange({ ...values, dataVolume: e.target.value })}
                  placeholder="e.g., 10TB in year 1"
                  className="text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="growth-rate" className="text-sm font-medium">
                  Expected Growth Rate
                </Label>
                <Input
                  id="growth-rate"
                  value={values.growthRate}
                  onChange={(e) => onChange({ ...values, growthRate: e.target.value })}
                  placeholder="e.g., Double users YoY"
                  className="text-base"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Availability, Security, Maintainability, Usability Cards */}
        <Card className="p-6 border-accent/20 bg-card/50 backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            Availability
            <InfoTooltip content="How 'always-on' your system needs to be" />
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="uptime" className="text-sm font-medium">Uptime Requirement</Label>
              <Select value={values.uptime} onValueChange={(val: "standard" | "high" | "critical") => onChange({ ...values, uptime: val })}>
                <SelectTrigger id="uptime" className="text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard (99.9%)</SelectItem>
                  <SelectItem value="high">High (99.99%)</SelectItem>
                  <SelectItem value="critical">Mission-Critical (99.999%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="downtime-tolerance" className="text-sm font-medium">Downtime Tolerance</Label>
                <Input id="downtime-tolerance" value={values.downtimeTolerance} onChange={(e) => onChange({ ...values, downtimeTolerance: e.target.value })} placeholder="e.g., 1 hour/month" className="text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="disaster-recovery" className="text-sm font-medium">Disaster Recovery Goal</Label>
                <Input id="disaster-recovery" value={values.disasterRecovery} onChange={(e) => onChange({ ...values, disasterRecovery: e.target.value })} placeholder="e.g., Recover in < 1 hour" className="text-base" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">Security <InfoTooltip content="What level of security is required for your system" /></h3>
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Data Sensitivity</Label>
              <div className="space-y-2">
                {[{ value: "pii", label: "Basic User Info (PII)", tooltip: "Personally Identifiable Information" }, { value: "payments", label: "Payments (PCI-DSS)", tooltip: "Payment Card Industry Data Security Standard" }, { value: "health", label: "Medical Data (HIPAA)", tooltip: "Health Insurance Portability and Accountability Act" }, { value: "other", label: "Other (please specify)", tooltip: "Other sensitive data types" }].map((item) => (
                  <div key={item.value} className="flex items-center space-x-2">
                    <Checkbox id={item.value} checked={values.securityNeeds.includes(item.value)} onCheckedChange={(checked) => handleSecurityToggle(item.value, checked as boolean)} />
                    <Label htmlFor={item.value} className="text-sm font-normal cursor-pointer flex items-center gap-2">{item.label} <InfoTooltip content={item.tooltip} /></Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="auth-needs" className="text-sm font-medium">Authentication Needs</Label>
              <Input id="auth-needs" value={values.authNeeds} onChange={(e) => onChange({ ...values, authNeeds: e.target.value })} placeholder="e.g., SSO with Okta, 2FA" className="text-base" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-secondary/20 bg-card/50 backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">Maintainability <InfoTooltip content="How the system will be built and updated over time" /></h3>
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Update Frequency</Label>
              <RadioGroup value={values.deployFrequency} onValueChange={(val: "weekly" | "monthly" | "quarterly") => onChange({ ...values, deployFrequency: val })}>
                <div className="flex items-center space-x-2"><RadioGroupItem value="weekly" id="weekly" /><Label htmlFor="weekly" className="font-normal cursor-pointer">Weekly Deploys</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="monthly" id="monthly" /><Label htmlFor="monthly" className="font-normal cursor-pointer">Monthly Deploys</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="quarterly" id="quarterly" /><Label htmlFor="quarterly" className="font-normal cursor-pointer">Quarterly Deploys</Label></div>
              </RadioGroup>
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium">Team Structure</Label>
              <RadioGroup value={values.teamStructure} onValueChange={(val: "single" | "multiple") => onChange({ ...values, teamStructure: val })}>
                <div className="flex items-center space-x-2"><RadioGroupItem value="single" id="single" /><Label htmlFor="single" className="font-normal cursor-pointer">One team will build this.</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="multiple" id="multiple" /><Label htmlFor="multiple" className="font-normal cursor-pointer">Multiple teams will build different parts.</Label></div>
              </RadioGroup>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-accent/20 bg-card/50 backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">Usability <InfoTooltip content="Who will use this system and how" /></h3>
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Target Audience</Label>
              <RadioGroup value={values.audience} onValueChange={(val: "public" | "business" | "internal") => onChange({ ...values, audience: val })}>
                <div className="flex items-center space-x-2"><RadioGroupItem value="public" id="public" /><Label htmlFor="public" className="font-normal cursor-pointer">Public (B2C)</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="business" id="business" /><Label htmlFor="business" className="font-normal cursor-pointer">Business Users (B2B)</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="internal" id="internal" /><Label htmlFor="internal" className="font-normal cursor-pointer">Internal Employees</Label></div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accessibility" className="text-sm font-medium flex items-center gap-2">Accessibility Needs <InfoTooltip content="WCAG: Web Content Accessibility Guidelines" /></Label>
              <Input id="accessibility" value={values.accessibilityNeeds} onChange={(e) => onChange({ ...values, accessibilityNeeds: e.target.value })} placeholder="e.g., WCAG 2.1 AA" className="text-base" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Step2QualityGoals;
