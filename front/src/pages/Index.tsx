import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Rocket, Loader2 } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import Step1BigIdea from "@/components/wizard/Step1BigIdea";
import Step2QualityGoals, { QualityGoals } from "@/components/wizard/Step2QualityGoals";
import Step3BusinessDrivers, { BusinessDrivers } from "@/components/wizard/Step3BusinessDrivers";
import Step4TechnicalRules, { TechnicalRules } from "@/components/wizard/Step4TechnicalRules";
import Step5AdditionalInfo, { AdditionalInfo } from "@/components/wizard/Step5AdditionalInfo";
import Step6Review from "@/components/wizard/Step6Review";
import Step7Results from "@/components/wizard/Step7Results";
import { useToast } from "@/hooks/use-toast";
import { generateArchitecture, type ArchitectureResponse } from "@/lib/api";

const steps = [
  { id: 1, name: "The Spark" },
  { id: 2, name: "The Orbit" },
  { id: 3, name: "The Mission" },
  { id: 4, name: "The Vessel" },
  { id: 5, name: "The Extras" },
  { id: 6, name: "The Blueprint" },
  { id: 7, name: "The Result" },
];

const Index = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [architectureResult, setArchitectureResult] = useState<ArchitectureResponse | null>(null);
  
  const [projectDescription, setProjectDescription] = useState("");
  const [qualityGoals, setQualityGoals] = useState<QualityGoals>({
    responseTime: "",
    throughput: "",
    expectedUsers: 1,
    dataVolume: "",
    growthRate: "",
    uptime: "standard",
    downtimeTolerance: "",
    disasterRecovery: "",
    securityNeeds: [],
    authNeeds: "",
    deployFrequency: "monthly",
    teamStructure: "single",
    audience: "public",
    accessibilityNeeds: "",
  });
  const [businessDrivers, setBusinessDrivers] = useState<BusinessDrivers>({
    primaryGoal: null,
    devBudget: "",
    opsBudget: "",
    launchDate: "",
    geography: "single",
  });
  const [technicalRules, setTechnicalRules] = useState<TechnicalRules>({
    mandatoryTech: [],
    teamSkills: "",
    integrations: "",
    regulations: "",
    dataResidency: "none",
  });
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo>({
    additionalRequirements: "",
  });

  const handleNext = () => {
    if (currentStep === 1 && !projectDescription.trim()) {
      toast({
        title: "Description Required",
        description: "Please describe your project before continuing.",
        variant: "destructive",
      });
      return;
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const data = {
      projectDescription,
      qualityGoals,
      businessDrivers,
      technicalRules,
      additionalInfo,
    };
    
    setIsGenerating(true);
    
    try {
      console.log("Sending request to backend:", data);
      
      // Send data to backend
      const result = await generateArchitecture(data);
      
      setArchitectureResult(result);
      
      console.log("Generated Architecture:", result);
      
      toast({
        title: "Constellation Charted! 🌠",
        description: "Your architecture has been successfully generated!",
      });
      
      // Move to a results view
      setCurrentStep(7); // Add a results step
    } catch (error) {
      console.error("Error generating architecture:", error);
      
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate architecture. Please check if the backend is running.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BigIdea
            value={projectDescription}
            onChange={setProjectDescription}
          />
        );
      case 2:
        return (
          <Step2QualityGoals
            values={qualityGoals}
            onChange={setQualityGoals}
          />
        );
      case 3:
        return (
          <Step3BusinessDrivers
            values={businessDrivers}
            onChange={setBusinessDrivers}
          />
        );
      case 4:
        return (
          <Step4TechnicalRules
            values={technicalRules}
            onChange={setTechnicalRules}
          />
        );
      case 5:
        return (
          <Step5AdditionalInfo
            values={additionalInfo}
            onChange={setAdditionalInfo}
          />
        );
      case 6:
        return (
          <Step6Review
            projectDescription={projectDescription}
            qualityGoals={qualityGoals}
            businessDrivers={businessDrivers}
            technicalRules={technicalRules}
            additionalInfo={additionalInfo}
          />
        );
      case 7:
        return architectureResult ? (
          <Step7Results 
            result={architectureResult} 
            onStartOver={() => {
              setCurrentStep(1);
              setArchitectureResult(null);
            }}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="border-b bg-card/30 backdrop-blur-md sticky top-0 z-50 border-primary/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary))]">
              <span className="text-primary-foreground font-bold text-lg">SA</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Solution Architect Workbench</h1>
              <p className="text-sm text-muted-foreground">Charting Your Constellation 🌠</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar steps={steps} currentStep={currentStep} />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 pb-32">
        <div className="bg-card/40 backdrop-blur-md rounded-2xl shadow-2xl border border-primary/10 p-8 md:p-12">
          {renderStep()}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-md border-t border-primary/10 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handleBack}
              disabled={currentStep === 1 || currentStep === 7}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </div>

            {currentStep < 6 ? (
              <Button
                size="lg"
                onClick={handleNext}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : currentStep === 6 ? (
              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity shadow-[0_0_30px_hsl(var(--primary)/0.6)] animate-pulse disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4" />
                    Let's Generate My Architecture!
                  </>
                )}
              </Button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
