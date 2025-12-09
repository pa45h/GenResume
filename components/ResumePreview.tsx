"use client";

import useDimentions from "@/hooks/useDimentions";
import { ResumeValues } from "@/lib/validation";
import React, { useRef } from "react";
import Classic from "./ResumeTamplates/Classic";
import Modern from "./ResumeTamplates/Modern";
import Professional from "./ResumeTamplates/Professional";
import Compact from "./ResumeTamplates/Compact";

export interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

function ResumePreview({
  resumeData,
  contentRef,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null!);

  const { width, height } = useDimentions(containerRef);

  switch (resumeData.template) {
    case "classic":
      return (
        <Classic
          resumeData={resumeData}
          contentRef={contentRef}
          className={className}
        />
      );
    case "modern":
      return (
        <Modern
          resumeData={resumeData}
          contentRef={contentRef}
          className={className}
        />
      );
    case "professional":
      return (
        <Professional
          resumeData={resumeData}
          contentRef={contentRef}
          className={className}
        />
      );
    case "compact":
      return (
        <Compact
          resumeData={resumeData}
          contentRef={contentRef}
          className={className}
        />
      );
    default:
      return (
        <Classic
          resumeData={resumeData}
          contentRef={contentRef}
          className={className}
        />
      );
  }
}

export default ResumePreview;
