import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FileUser } from "lucide-react";
import React, { useState } from "react";
import { templates } from "../resumes/templates";
import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";

interface TemplatePickerProps {
  resumeData: ResumeValues;
  template: string | undefined;
  onChange: (template: string) => void;
}

function TemplatePicker({
  resumeData,
  template,
  onChange,
}: TemplatePickerProps) {
  const [showTemplates, setShowTemplates] = useState(false);
  return (
    <Popover open={showTemplates} onOpenChange={setShowTemplates}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          title="Change Resume Template"
          onClick={() => setShowTemplates(true)}
          className="hover:bg-secondary cursor-pointer transition-transform hover:translate-x-1.5"
        >
          <FileUser className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background/95 relative w-fit border p-3 shadow-lg backdrop-blur-sm"
        align="end"
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {templates.map((temp) => (
            <div
              key={temp.key}
              className={`group hover:border-primary/50 flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 p-1.5 transition-all hover:shadow-md ${
                temp.key === template
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-card"
              }`}
              onClick={() => {
                onChange(temp.key);
                setShowTemplates(false);
              }}
            >
              <div className="relative overflow-hidden rounded-md border shadow-sm">
                <ResumePreview
                  resumeData={
                    resumeData.template === temp.key
                      ? resumeData
                      : { ...resumeData, template: temp.key }
                  }
                  className="h-34 w-24 object-contain transition-transform group-hover:scale-105"
                />
              </div>
              <span className="text-center text-xs font-medium">
                {temp.title}
              </span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default TemplatePicker;
