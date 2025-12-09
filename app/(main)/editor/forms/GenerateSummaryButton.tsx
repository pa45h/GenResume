import LoadingButton from "@/components/LoadingButton";
import { ResumeValues } from "@/lib/validation";
import { WandSparkles } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { generateSummary } from "./actions";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);

      const summary = await generateSummary(resumeData);
      onSummaryGenerated(summary);
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error(
        "Failed to generate summary. Please try again after some time.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton
      variant="outline"
      type="button"
      loading={loading}
      onClick={handleClick}
    >
      <WandSparkles className="size-4" />
      Generate
    </LoadingButton>
  );
}

export default GenerateSummaryButton;
