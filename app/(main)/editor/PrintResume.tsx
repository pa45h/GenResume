import { Button } from "@/components/ui/button";
import { ResumeValues } from "@/lib/validation";
import { Download } from "lucide-react";
import React from "react";
import { useReactToPrint } from "react-to-print";

interface PrintResumeProps {
  resume: ResumeValues;
  contentRef: React.RefObject<HTMLDivElement>;
}

function PrintResume({ resume, contentRef }: PrintResumeProps) {
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Resume",
  });

  return (
    <Button
      variant="secondary"
      size="icon"
      title="Download The Resume"
      onClick={reactToPrintFn}
      className="hover:bg-secondary cursor-pointer transition-transform hover:translate-x-1.5"
    >
      <Download className="size-5" />
    </Button>
  );
}

export default PrintResume;
