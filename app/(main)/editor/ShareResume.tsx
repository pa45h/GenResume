import { Button } from "@/components/ui/button";
import { ResumeValues } from "@/lib/validation";
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareResumeProps {
  resume: ResumeValues;
}

export const handleCopy = async (resumeId: string) => {
  try {
    const shareableLink = `${window.location.origin}/shared/${resumeId}`;
    await navigator.clipboard.writeText(shareableLink);
    toast.success("Shareable link copied to clipboard!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to copy link.");
  }
};

function ShareResume({ resume }: ShareResumeProps) {
  if (!resume.id) {
    return null;
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      title="Copy Shareable Link"
      onClick={() => handleCopy(resume.id as string)}
      className="hover:bg-secondary cursor-pointer transition-transform hover:translate-x-1.5"
    >
      <Copy className="size-5" />
    </Button>
  );
}

export default ShareResume;
