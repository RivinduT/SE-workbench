import { Lightbulb } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Step1BigIdeaProps {
  value: string;
  onChange: (value: string) => void;
}

const Step1BigIdea = ({ value, onChange }: Step1BigIdeaProps) => {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Lightbulb className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground">Let's start with the big idea! 💡</h2>
          <p className="text-muted-foreground mt-1">Tell us about your vision in your own words</p>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="project-description" className="text-base font-medium">
          What are you trying to build?
        </Label>
        <Textarea
          id="project-description"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe your project... For example: 'I want to build a task management app that helps remote teams stay organized and collaborate effectively.'"
          className="min-h-[240px] text-base resize-none focus:ring-2 focus:ring-primary transition-all"
        />
        <p className="text-sm text-muted-foreground">
          Don't worry about being too technical—just describe what you're trying to achieve.
        </p>
      </div>
    </div>
  );
};

export default Step1BigIdea;
