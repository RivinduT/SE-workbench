import { TrendingUp, Clock, Building2, DollarSign, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface BusinessDrivers {
  primaryGoal: "time-to-market" | "long-term-scale" | "cost-control" | null;
  budget: string;
  launchDate: string;
}

interface Step3BusinessDriversProps {
  values: BusinessDrivers;
  onChange: (values: BusinessDrivers) => void;
}

const Step3BusinessDrivers = ({ values, onChange }: Step3BusinessDriversProps) => {
  const goalCards = [
    {
      id: "time-to-market" as const,
      icon: Clock,
      title: "Time-to-Market",
      description: "Get it built ASAP",
      color: "from-primary to-primary/80",
    },
    {
      id: "long-term-scale" as const,
      icon: Building2,
      title: "Long-Term Scale",
      description: "Build a 10-year platform",
      color: "from-secondary to-secondary/80",
    },
    {
      id: "cost-control" as const,
      icon: DollarSign,
      title: "Cost Control",
      description: "Keep hosting costs low",
      color: "from-accent to-accent/80",
    },
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
          <TrendingUp className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground">What's the 'Why' behind the project? 📈</h2>
          <p className="text-muted-foreground mt-1">Help us understand your business goals</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Primary Goal Cards */}
        <div>
          <Label className="text-base font-semibold mb-4 block">
            What's your primary business goal?
          </Label>
          <div className="grid gap-4 md:grid-cols-3">
            {goalCards.map((card) => {
              const Icon = card.icon;
              const isSelected = values.primaryGoal === card.id;

              return (
                <button
                  key={card.id}
                  onClick={() => onChange({ ...values, primaryGoal: card.id })}
                  className={cn(
                    "p-6 rounded-xl border-2 text-left transition-all hover:shadow-lg group",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-lg mb-4 flex items-center justify-center transition-all",
                      isSelected
                        ? `bg-gradient-to-br ${card.color}`
                        : "bg-muted group-hover:bg-primary/10"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-6 h-6 transition-colors",
                        isSelected ? "text-primary-foreground" : "text-foreground group-hover:text-primary"
                      )}
                    />
                  </div>
                  <h3
                    className={cn(
                      "text-lg font-bold mb-2 transition-colors",
                      isSelected ? "text-primary" : "text-foreground"
                    )}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Budget and Launch Date */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="budget" className="text-base font-semibold">
                Budget
              </Label>
              <InfoTooltip content="Estimated monthly operational expenses (OpEx) or capital budget (CapEx) for this project" />
            </div>
            <Input
              id="budget"
              value={values.budget}
              onChange={(e) => onChange({ ...values, budget: e.target.value })}
              placeholder="e.g., $5,000/month or $50,000 one-time"
              className="text-base"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="launch-date" className="text-base font-semibold">
                Target Launch Date (MVP)
              </Label>
              <InfoTooltip content="When do you need the minimum viable product ready?" />
            </div>
            <Input
              id="launch-date"
              type="date"
              value={values.launchDate}
              onChange={(e) => onChange({ ...values, launchDate: e.target.value })}
              className="text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3BusinessDrivers;
