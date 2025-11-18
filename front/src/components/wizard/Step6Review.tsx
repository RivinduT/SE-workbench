import { FileCheck, Lightbulb, Rocket, TrendingUp, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { QualityGoals } from "./Step2QualityGoals";
import type { BusinessDrivers } from "./Step3BusinessDrivers";
import type { TechnicalRules } from "./Step4TechnicalRules";

interface Step6ReviewProps {
  projectDescription: string;
  qualityGoals: QualityGoals;
  businessDrivers: BusinessDrivers;
  technicalRules: TechnicalRules;
  additionalInfo: { additionalRequirements: string };
}

const Step6Review = ({
  projectDescription,
  qualityGoals,
  businessDrivers,
  technicalRules,
  additionalInfo,
}: Step6ReviewProps) => {
  const scalabilityLabels = ["1,000s", "10,000s", "100,000s", "1 Million+"];
  
  const uptimeLabels = {
    standard: "Standard (99.9%)",
    high: "High (99.99%)",
    critical: "Mission-Critical (99.999%)",
  };

  const goalLabels = {
    speed: "SPEED",
    stability: "STABILITY",
    efficiency: "EFFICIENCY",
  };

  const audienceLabels = {
    public: "Public (B2C)",
    business: "Business Users (B2B)",
    internal: "Internal Employees",
  };

  const deployLabels = {
    weekly: "Weekly Deploys",
    monthly: "Monthly Deploys",
    quarterly: "Quarterly Deploys",
  };

  const teamLabels = {
    single: "One team",
    multiple: "Multiple teams",
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary))]">
          <FileCheck className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground">Your full constellation, charted. 🗺️</h2>
          <p className="text-muted-foreground mt-1">Review your complete blueprint before we generate the architecture</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Project Description */}
        <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">The Spark</h3>
              <p className="text-muted-foreground leading-relaxed">{projectDescription || "No description provided"}</p>
            </div>
          </div>
        </Card>

        {/* Quality Goals */}
        <Card className="p-6 border-secondary/20 bg-card/50 backdrop-blur">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <Rocket className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">The Orbit (Quality Goals)</h3>
              
              {/* Performance */}
              <div className="mb-4">
                <div className="text-sm font-medium text-secondary mb-2">Performance</div>
                <div className="grid gap-2 md:grid-cols-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Response Time:</span>{" "}
                    {qualityGoals.responseTime || "Not specified"}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Throughput:</span>{" "}
                    {qualityGoals.throughput || "Not specified"}
                  </div>
                </div>
              </div>
              
              <Separator className="my-3" />
              
              {/* Scalability */}
              <div className="mb-4">
                <div className="text-sm font-medium text-secondary mb-2">Scalability</div>
                <div className="grid gap-2 md:grid-cols-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Users:</span>{" "}
                    <Badge variant="secondary" className="text-xs ml-1">
                      {scalabilityLabels[qualityGoals.expectedUsers]}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Data Volume:</span>{" "}
                    {qualityGoals.dataVolume || "Not specified"}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Growth:</span>{" "}
                    {qualityGoals.growthRate || "Not specified"}
                  </div>
                </div>
              </div>
              
              <Separator className="my-3" />
              
              {/* Availability */}
              <div className="mb-4">
                <div className="text-sm font-medium text-secondary mb-2">Availability</div>
                <div className="grid gap-2 md:grid-cols-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Uptime:</span>{" "}
                    <Badge variant="secondary" className="text-xs ml-1">
                      {uptimeLabels[qualityGoals.uptime]}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Downtime Tolerance:</span>{" "}
                    {qualityGoals.downtimeTolerance || "Not specified"}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Recovery:</span>{" "}
                    {qualityGoals.disasterRecovery || "Not specified"}
                  </div>
                </div>
              </div>
              
              <Separator className="my-3" />
              
              {/* Security */}
              <div className="mb-4">
                <div className="text-sm font-medium text-secondary mb-2">Security</div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Data Sensitivity:</span>{" "}
                    {qualityGoals.securityNeeds.length > 0 ? (
                      <div className="flex flex-wrap gap-1 mt-1">
                      {qualityGoals.securityNeeds.map((sec) => {
                        let label = sec;
                        if (sec === "pii") label = "PII";
                        else if (sec === "payments") label = "PCI-DSS";
                        else if (sec === "health") label = "HIPAA";
                        
                        return (
                          <Badge key={sec} variant="secondary" className="text-xs">
                            {label}
                          </Badge>
                        );
                      })}
                      </div>
                    ) : (
                      "None specified"
                    )}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Authentication:</span>{" "}
                    {qualityGoals.authNeeds || "Not specified"}
                  </div>
                </div>
              </div>
              
              <Separator className="my-3" />
              
              {/* Maintainability */}
              <div className="mb-4">
                <div className="text-sm font-medium text-secondary mb-2">Maintainability</div>
                <div className="grid gap-2 md:grid-cols-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Deploy Frequency:</span>{" "}
                    <Badge variant="secondary" className="text-xs ml-1">
                      {deployLabels[qualityGoals.deployFrequency]}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Team Structure:</span>{" "}
                    <Badge variant="secondary" className="text-xs ml-1">
                      {teamLabels[qualityGoals.teamStructure]}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <Separator className="my-3" />
              
              {/* Usability */}
              <div>
                <div className="text-sm font-medium text-secondary mb-2">Usability</div>
                <div className="grid gap-2 md:grid-cols-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Audience:</span>{" "}
                    <Badge variant="secondary" className="text-xs ml-1">
                      {audienceLabels[qualityGoals.audience]}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Accessibility:</span>{" "}
                    {qualityGoals.accessibilityNeeds || "Not specified"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Business Drivers */}
        <Card className="p-6 border-accent/20 bg-card/50 backdrop-blur">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">The Mission (Business Drivers)</h3>
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
                    <div className="text-sm font-medium text-muted-foreground mb-1">Dev Budget (CapEx)</div>
                    <p className="text-sm">{businessDrivers.devBudget || "Not specified"}</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Ops Budget (OpEx)</div>
                    <p className="text-sm">{businessDrivers.opsBudget || "Not specified"}</p>
                  </div>
                </div>
                <Separator />
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Target Launch</div>
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
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Geography</div>
                    <Badge variant="secondary" className="text-sm">
                      {businessDrivers.geography === "single" ? "Single Country" : "Global (Multi-Region)"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Technical Rules */}
        <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">The Vessel (Technical Constraints)</h3>
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
                  <div className="text-sm font-medium text-muted-foreground mb-1">External Integrations</div>
                  <p className="text-sm">{technicalRules.integrations || "Not specified"}</p>
                </div>
                <Separator />
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Regulations</div>
                    <p className="text-sm">{technicalRules.regulations || "Not specified"}</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Data Residency</div>
                    <Badge variant="secondary" className="text-sm">
                      {technicalRules.dataResidency === "none" ? "No rules" : "Required"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Additional Information */}
        <Card className="p-6 border-accent/20 bg-card/50 backdrop-blur">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-3">Additional Requirements</h3>
              <p className="text-muted-foreground leading-relaxed">
                {additionalInfo.additionalRequirements || "No additional requirements specified"}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Step6Review;
