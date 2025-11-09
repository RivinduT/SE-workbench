import { Settings, X, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface TechnicalRules {
  mandatoryTech: string[];
  teamSkills: string;
  integrations: string;
}

interface Step4TechnicalRulesProps {
  values: TechnicalRules;
  onChange: (values: TechnicalRules) => void;
}

const Step4TechnicalRules = ({ values, onChange }: Step4TechnicalRulesProps) => {
  const [techInput, setTechInput] = useState("");

  const handleAddTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && techInput.trim()) {
      e.preventDefault();
      if (!values.mandatoryTech.includes(techInput.trim())) {
        onChange({
          ...values,
          mandatoryTech: [...values.mandatoryTech, techInput.trim()],
        });
      }
      setTechInput("");
    }
  };

  const handleRemoveTech = (tech: string) => {
    onChange({
      ...values,
      mandatoryTech: values.mandatoryTech.filter((t) => t !== tech),
    });
  };

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
          <Settings className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground">What are the rules of the road? ⚙️</h2>
          <p className="text-muted-foreground mt-1">Technical constraints and requirements</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column - Constraints */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl border bg-card">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="mandatory-tech" className="text-base font-semibold">
                  Mandatory Technologies
                </Label>
                <InfoTooltip content="Any specific technologies, platforms, or tools that must be used? (e.g., AWS, Java, PostgreSQL)" />
              </div>
              <Input
                id="mandatory-tech"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleAddTech}
                placeholder="Type a technology and press Enter..."
                className="text-base"
              />
              {values.mandatoryTech.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {values.mandatoryTech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="pl-3 pr-1 py-1.5 text-sm flex items-center gap-1"
                    >
                      {tech}
                      <button
                        onClick={() => handleRemoveTech(tech)}
                        className="ml-1 hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="p-6 rounded-xl border bg-card">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="team-skills" className="text-base font-semibold">
                  Team Skills
                </Label>
                <InfoTooltip content="What technologies is your team already proficient in? This helps us recommend appropriate solutions." />
              </div>
              <Textarea
                id="team-skills"
                value={values.teamSkills}
                onChange={(e) => onChange({ ...values, teamSkills: e.target.value })}
                placeholder="e.g., Expert in Python and React, new to Kubernetes..."
                className="min-h-[120px] text-base resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Integrations */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl border bg-card h-full">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="integrations" className="text-base font-semibold">
                  Required Integrations
                </Label>
                <InfoTooltip content="What external systems, APIs, or services does this project need to connect with?" />
              </div>
              <Textarea
                id="integrations"
                value={values.integrations}
                onChange={(e) => onChange({ ...values, integrations: e.target.value })}
                placeholder="e.g., Salesforce CRM, Stripe payments, SendGrid email, internal analytics API..."
                className="min-h-[280px] text-base resize-none"
              />
              <p className="text-sm text-muted-foreground">
                List any third-party services, legacy systems, or APIs you need to integrate with.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4TechnicalRules;
