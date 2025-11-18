import { CheckCircle2, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ArchitectureResponse } from "@/lib/api";

interface Step7ResultsProps {
  result: ArchitectureResponse;
  onStartOver: () => void;
}

const Step7Results = ({ result, onStartOver }: Step7ResultsProps) => {
  const handleDownload = () => {
    const dataStr = JSON.stringify(result, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `architecture-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)]">
          <CheckCircle2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground">Architecture Generated! 🎉</h2>
          <p className="text-muted-foreground mt-1">Your custom solution architecture is ready</p>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download JSON
        </Button>
        <Button onClick={onStartOver} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Start Over
        </Button>
      </div>

      {/* Architecture Overview */}
      <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
        <h3 className="text-xl font-bold mb-4 text-primary">Architecture Overview</h3>
        <p className="text-muted-foreground leading-relaxed">{result.architecture.overview}</p>
      </Card>

      {/* Components */}
      <Card className="p-6 border-secondary/20 bg-card/50 backdrop-blur">
        <h3 className="text-xl font-bold mb-4 text-secondary">Components</h3>
        <div className="space-y-4">
          {result.architecture.components.map((component) => (
            <div key={component.name} className="p-4 rounded-lg border border-border/50 bg-background/50">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-lg font-semibold">{component.name}</h4>
                <Badge variant="secondary">{component.technology}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{component.description}</p>
              <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
                <strong>Reasoning:</strong> {component.reasoning}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Patterns */}
      <Card className="p-6 border-accent/20 bg-card/50 backdrop-blur">
        <h3 className="text-xl font-bold mb-4 text-accent">Architecture Patterns</h3>
        <div className="flex flex-wrap gap-2">
          {result.architecture.patterns.map((pattern) => (
            <Badge key={pattern} variant="outline" className="text-sm px-3 py-1">
              {pattern}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Reasoning */}
      <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
        <h3 className="text-xl font-bold mb-4 text-primary">Design Reasoning</h3>
        <p className="text-muted-foreground leading-relaxed">{result.architecture.reasoning}</p>
      </Card>

      <Separator />

      {/* Recommendations */}
      <Card className="p-6 border-green-500/20 bg-card/50 backdrop-blur">
        <h3 className="text-xl font-bold mb-4 text-green-600">Recommendations</h3>
        <ul className="space-y-3">
          {result.recommendations.map((rec) => (
            <li key={rec} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{rec}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Tradeoffs */}
      <Card className="p-6 border-orange-500/20 bg-card/50 backdrop-blur">
        <h3 className="text-xl font-bold mb-4 text-orange-600">Tradeoffs</h3>
        <ul className="space-y-3">
          {result.tradeoffs.map((tradeoff) => (
            <li key={tradeoff} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-orange-600 text-xs font-bold">⚖</span>
              </div>
              <span className="text-muted-foreground">{tradeoff}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Step7Results;
