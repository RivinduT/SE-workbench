import { Plus, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface AdditionalInfo {
  additionalRequirements: string;
}

interface Step5AdditionalInfoProps {
  values: AdditionalInfo;
  onChange: (values: AdditionalInfo) => void;
}

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

const Step5AdditionalInfo = ({ values, onChange }: Step5AdditionalInfoProps) => {

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary))]">
          <Plus className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground">Any other details we should know? ✨</h2>
          <p className="text-muted-foreground mt-1">Share any additional requirements, preferences, or special considerations.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="p-8 rounded-xl border bg-card/50 backdrop-blur border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="additional-requirements" className="text-lg font-semibold">
                Additional Requirements
              </Label>
              <InfoTooltip content="Any other specific requirements, preferences, or constraints that weren't covered in the previous steps? This could include special features, integrations, performance needs, or any other important considerations for your project." />
            </div>
            <Textarea
              id="additional-requirements"
              value={values.additionalRequirements}
              onChange={(e) => onChange({ ...values, additionalRequirements: e.target.value })}
              placeholder="e.g., Must support real-time notifications, needs offline capabilities, requires AI/ML features, special reporting requirements, specific third-party integrations not mentioned earlier..."
              className="min-h-[200px] text-base resize-none"
            />
            <p className="text-sm text-muted-foreground">
              💡 This is optional but can help us create a more tailored architecture recommendation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5AdditionalInfo;