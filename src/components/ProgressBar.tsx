import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  name: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
}

const ProgressBar = ({ steps, currentStep }: ProgressBarProps) => {
  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Progress Line - Constellation Path */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-border/30 -z-10">
            <div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500 ease-out shadow-[0_0_10px_hsl(var(--primary))]"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Steps - Stars */}
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = currentStep > stepNumber;
            const isCurrent = currentStep === stepNumber;

            return (
              <div key={step.id} className="flex flex-col items-center relative">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                    isCompleted && "bg-primary/20 border-primary text-primary shadow-[0_0_20px_hsl(var(--primary))] animate-pulse",
                    isCurrent && "bg-primary/30 border-primary text-primary shadow-[0_0_30px_hsl(var(--primary))] scale-110",
                    !isCompleted && !isCurrent && "bg-card border-border/50 text-muted-foreground"
                  )}
                >
                  <Star className={cn(
                    "w-5 h-5 transition-all duration-300",
                    isCompleted && "fill-primary",
                    isCurrent && "fill-primary"
                  )} />
                </div>
                <div
                  className={cn(
                    "absolute top-12 text-xs font-medium whitespace-nowrap transition-colors duration-300",
                    isCurrent && "text-primary",
                    !isCurrent && "text-muted-foreground"
                  )}
                >
                  {step.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
