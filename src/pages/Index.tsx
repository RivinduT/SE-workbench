import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import Step1BigIdea from "@/components/wizard/Step1BigIdea";
import Step2QualityGoals, { QualityGoals } from "@/components/wizard/Step2QualityGoals";
import Step3BusinessDrivers, { BusinessDrivers } from "@/components/wizard/Step3BusinessDrivers";
import Step4TechnicalRules, { TechnicalRules } from "@/components/wizard/Step4TechnicalRules";
import Step5Review from "@/components/wizard/Step5Review";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, name: "The Big Idea" },
  { id: 2, name: "Quality Goals" },
  { id: 3, name: "Business Drivers" },
  { id: 4, name: "Technical Rules" },
  { id: 5, name: "Review & Submit" },
];

const Index = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  
  const [projectDescription, setProjectDescription] = useState("");
  const [qualityGoals, setQualityGoals] = useState<QualityGoals>({
    scalability: 1,
    performance: "fast",
    availability: "standard",
    security: [],
  });
  const [businessDrivers, setBusinessDrivers] = useState<BusinessDrivers>({
    primaryGoal: null,
    budget: "",
    launchDate: "",
  });
  const [technicalRules, setTechnicalRules] = useState<TechnicalRules>({
    mandatoryTech: [],
    teamSkills: "",
    integrations: "",
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

  const handleSubmit = () => {
    const data = {
      projectDescription,
      qualityGoals,
      businessDrivers,
      technicalRules,
    };
    
    console.log("Project Blueprint Data:", data);
    
    toast({
      title: "Blueprint Created! 🎉",
      description: "Your architecture is being generated. Check the console for details.",
    });
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
          <Step5Review
            projectDescription={projectDescription}
            qualityGoals={qualityGoals}
            businessDrivers={businessDrivers}
            technicalRules={technicalRules}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">SW</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Software Design Workbench</h1>
              <p className="text-sm text-muted-foreground">Create your project blueprint</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar steps={steps} currentStep={currentStep} />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 pb-32">
        <div className="bg-card rounded-2xl shadow-lg border p-8 md:p-12">
          {renderStep()}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </div>

            {currentStep < steps.length ? (
              <Button
                size="lg"
                onClick={handleNext}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-gradient-to-r from-success to-accent hover:opacity-90 transition-opacity"
              >
                <CheckCircle className="w-4 h-4" />
                Generate My Architecture!
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
