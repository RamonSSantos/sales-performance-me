import { useState } from "react";
import { SalesRecord, ProcessedData } from "@/types/sales";
import { processData } from "@/utils/dataProcessor";
import FileUpload from "@/components/FileUpload";
import Dashboard from "@/components/Dashboard";
import { BarChart3 } from "lucide-react";

const Index = () => {
  const [dashboardData, setDashboardData] = useState<ProcessedData | null>(null);

  const handleDataLoaded = (records: SalesRecord[]) => {
    const processed = processData(records);
    setDashboardData(processed);
  };

  const handleReset = () => {
    setDashboardData(null);
  };

  if (dashboardData) {
    return <Dashboard data={dashboardData} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Glow effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-2xl text-center space-y-8">
        {/* Header */}
        <div className="space-y-4 animate-fade-in">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-primary/10 glow-primary mb-4">
            <BarChart3 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            Sales <span className="text-gradient">Performance</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Upload your sales data to generate beautiful, interactive visualizations instantly.
          </p>
        </div>

        {/* Upload Area */}
        <FileUpload onDataLoaded={handleDataLoaded} />

        {/* Footer hint */}
        <p className="text-sm text-muted-foreground animate-fade-in">
          Supports JSON files with your sales records structure
        </p>
      </div>
    </div>
  );
};

export default Index;
