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
  primaryGoal: "speed" | "stability" | "efficiency" | null;
  devBudget: string;
  opsBudget: string;
  launchDate: string;
  geography: "single" | "global";
}

interface Step3BusinessDriversProps {
  values: BusinessDrivers;
  onChange: (values: BusinessDrivers) => void;
}

const Step3BusinessDrivers = ({ values, onChange }: Step3BusinessDriversProps) => {
  const goalCards = [
    {
      id: "speed" as const,
      icon: Clock,
      title: "SPEED",
      description: "Get to market as fast as possible",
      color: "from-primary to-primary/80",
    },
    {
      id: "stability" as const,
      icon: Building2,
      title: "STABILITY",
      description: "Build a rock-solid, 10-year platform",
      color: "from-secondary to-secondary/80",
    },
    {
      id: "efficiency" as const,
      icon: DollarSign,
      title: "EFFICIENCY",
      description: "Minimize all operational costs",
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
          <h2 className="text-3xl font-bold text-foreground">What's the ultimate goal of this mission? 🎯</h2>
          <p className="text-muted-foreground mt-1">This 'Why' is key to making the right trade-offs.</p>
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

        {/* Budget Card */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">What's the mission budget?</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="dev-budget" className="text-base font-semibold">
                  Development Budget
                </Label>
                <InfoTooltip content="Upfront capital expenses (CapEx) for building the system" />
              </div>
              <Input
                id="dev-budget"
                value={values.devBudget}
                onChange={(e) => onChange({ ...values, devBudget: e.target.value })}
                placeholder="e.g., $100,000 upfront"
                className="text-base"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="ops-budget" className="text-base font-semibold">
                  Monthly Ops Budget
                </Label>
                <InfoTooltip content="Ongoing operational expenses (OpEx) for running and maintaining the system" />
              </div>
              <Input
                id="ops-budget"
                value={values.opsBudget}
                onChange={(e) => onChange({ ...values, opsBudget: e.target.value })}
                placeholder="e.g., $5,000/month"
                className="text-base"
              />
            </div>
          </div>
        </div>

        {/* Timeline Card */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">When do we launch?</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="launch-date" className="text-base font-semibold">
                  Target MVP Launch Date
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

            <div className="space-y-3">
              <Label className="text-base font-semibold">Geography</Label>
              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => onChange({ ...values, geography: "single" })}
                  className={cn(
                    "flex-1 p-4 rounded-lg border-2 text-center transition-all",
                    values.geography === "single"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  <div className="font-semibold">Single Country</div>
                </button>
                <button
                  onClick={() => onChange({ ...values, geography: "global" })}
                  className={cn(
                    "flex-1 p-4 rounded-lg border-2 text-center transition-all",
                    values.geography === "global"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  <div className="font-semibold">Global (Multi-Region)</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3BusinessDrivers;
