import LoadingButton from "@/components/LoadingButton";
import { ResumeValues } from "@/lib/validation";
import { WandIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { enhanceSummary } from "./actions";

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
      if (!resumeData.summary) {
        toast.error("Please enter a summary first to enhance it.");
        return;
      }
      const enhancedSummary = await enhanceSummary(resumeData.summary);
      onSummaryGenerated(enhancedSummary);
      toast.success("Summary enhanced successfully!");
    } catch (error) {
      console.error("Error enhancing summary:", error);
      toast.error(
        "Failed to enhance summary. Please try again after some time.",
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
      <WandIcon className="size-4" />
      Enhance
    </LoadingButton>
  );
}

export default GenerateSummaryButton;
