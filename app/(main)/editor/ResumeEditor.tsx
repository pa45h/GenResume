"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "./steps";
import { useSearchParams } from "next/navigation";
import BreadCrumbs from "./BreadCrumbs";
import Footer from "./Footer";
import { useState } from "react";
import ResumePreviewSection from "./ResumePreviewSection";
import { cn, mapToResumeValues } from "@/lib/utils";
import useAutoSave from "@/hooks/useAutoSave";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import { ResumeServerData } from "@/lib/types";
import { ResumeValues } from "@/lib/validation";

interface ResumeEditorProps {
  resumeToEdit?: ResumeServerData | null;
}

function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
  const searchParams = useSearchParams();
  const currentStep = searchParams?.get("step") || steps[0].key;

  const [resumeData, setResumeData] = useState<ResumeValues>(
    resumeToEdit
      ? mapToResumeValues(resumeToEdit)
      : {
          colorHex: "#000000",
          borderStyle: "squircle",
          template: "classic",
        },
  );
  const [resumePreview, setResumePreview] = useState(false);

  const { isSaving, hasUnsavedChanges, resumeId } = useAutoSave(resumeData);
  useUnloadWarning(hasUnsavedChanges);

  if (resumeId && resumeData.id !== resumeId) {
    setResumeData({ ...resumeData, id: resumeId });
  }

  function setCurrentStep(step: string) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("step", step);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <div className=" flex grow flex-col border-t z-50">
      <main className="relative grow">
        <div className="absolute top-0 bottom-0 flex w-full">
          <div
            className={cn(
              "w-full space-y-6 overflow-auto p-3 md:block md:w-1/2",
              resumePreview && "hidden",
            )}
          >
            <BreadCrumbs
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(resumePreview && "flex")}
          />
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        resumePreview={resumePreview}
        setResumePreview={setResumePreview}
        isSaving={isSaving}
      />
    </div>
  );
}

export default ResumeEditor;
