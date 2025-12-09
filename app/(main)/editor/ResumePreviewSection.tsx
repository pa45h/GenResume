import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";
import React, { useRef } from "react";
import ColorPicker from "./ColorPicker";
import BorderStyleButton from "./BorderStyleButton";
import { cn } from "@/lib/utils";
import TemplatePicker from "./TemplatePicker";
import PrintResume from "./PrintResume";
import ShareResume from "./ShareResume";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  className?: string;
}

function ResumePreviewSection({
  resumeData,
  setResumeData,
  className,
}: ResumePreviewSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null!);
  return (
    <div
      className={cn(
        "group relative z-50 hidden w-full md:flex md:w-1/2",
        className,
      )}
    >
      <div className="absolute top-1 left-0.5 flex flex-none flex-col gap-1 opacity-40 transition-opacity group-hover:opacity-100 lg:top-3.5 xl:opacity-100 z-50">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle: borderStyle })
          }
        />
        <TemplatePicker
          resumeData={resumeData}
          template={resumeData.template}
          onChange={(template) =>
            setResumeData({ ...resumeData, template: template })
          }
        />
        <PrintResume resume={resumeData} contentRef={contentRef} />
        <ShareResume resume={resumeData} />
      </div>
      <div className="bg-secondary flex w-full justify-center overflow-y-auto p-3">
        <ResumePreview
          resumeData={resumeData}
          contentRef={contentRef}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
}

export default ResumePreviewSection;
