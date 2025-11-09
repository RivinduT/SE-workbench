import { FileCheck, Lightbulb, Rocket, TrendingUp, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { QualityGoals } from "./Step2QualityGoals";
import type { BusinessDrivers } from "./Step3BusinessDrivers";
import type { TechnicalRules } from "./Step4TechnicalRules";

interface Step5ReviewProps {
  projectDescription: string;
  qualityGoals: QualityGoals;
  businessDrivers: BusinessDrivers;
  technicalRules: TechnicalRules;
}

const Step5Review = ({
  projectDescription,
  qualityGoals,
  businessDrivers,
  technicalRules,
}: Step5ReviewProps) => {
  const scalabilityLabels = ["100s", "1,000s", "10,000s", "Millions+"];
  
  const performanceLabels = {
    good: "Good is Good Enough",
    fast: "Fast & Snappy",
    realtime: "Real-Time/Instant",
  };

  const availabilityLabels = {
    standard: "Standard (99.9%)",
    high: "High (99.99%)",
    critical: "Mission Critical (99.999%)",
  };

  const goalLabels = {
    "time-to-market": "Time-to-Market",
    "long-term-scale": "Long-Term Scale",
    "cost-control": "Cost Control",
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <FileCheck className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground">Does this look right? 📋</h2>
          <p className="text-muted-foreground mt-1">Review your project blueprint before we generate the architecture</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Project Description */}
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">The Big Idea</h3>
              <p className="text-muted-foreground leading-relaxed">{projectDescription || "No description provided"}</p>
            </div>
          </div>
        </Card>

        {/* Quality Goals */}
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <Rocket className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">Quality Goals</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Scalability</div>
                  <Badge variant="secondary" className="text-sm">
                    {scalabilityLabels[qualityGoals.scalability]} users
                  </Badge>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Performance</div>
                  <Badge variant="secondary" className="text-sm">
                    {performanceLabels[qualityGoals.performance]}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Availability</div>
                  <Badge variant="secondary" className="text-sm">
                    {availabilityLabels[qualityGoals.availability]}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Security Requirements</div>
                  {qualityGoals.security.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {qualityGoals.security.map((sec) => (
                        <Badge key={sec} variant="secondary" className="text-xs">
                          {sec === "pii" ? "PII" : sec === "payments" ? "Payments" : "Health Data"}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <Badge variant="outline" className="text-sm">None specified</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Business Drivers */}
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">Business Drivers</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Primary Goal</div>
                  <Badge variant="secondary" className="text-sm">
                    {businessDrivers.primaryGoal ? goalLabels[businessDrivers.primaryGoal] : "Not specified"}
                  </Badge>
                </div>
                <Separator />
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Budget</div>
                    <p className="text-sm">{businessDrivers.budget || "Not specified"}</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Target Launch Date</div>
                    <p className="text-sm">
                      {businessDrivers.launchDate
                        ? new Date(businessDrivers.launchDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Technical Rules */}
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">Technical Rules</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-2">Mandatory Technologies</div>
                  {technicalRules.mandatoryTech.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {technicalRules.mandatoryTech.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">None specified</p>
                  )}
                </div>
                <Separator />
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Team Skills</div>
                  <p className="text-sm">{technicalRules.teamSkills || "Not specified"}</p>
                </div>
                <Separator />
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Required Integrations</div>
                  <p className="text-sm">{technicalRules.integrations || "Not specified"}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Step5Review;
