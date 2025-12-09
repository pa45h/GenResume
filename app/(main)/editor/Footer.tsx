"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { steps } from "./steps";
import Link from "next/link";
import { FileUserIcon, PenLineIcon, Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  resumePreview: boolean;
  setResumePreview: (show: boolean) => void;
  isSaving: boolean;
}

function Footer({
  currentStep,
  setCurrentStep,
  resumePreview,
  setResumePreview,
  isSaving,
}: FooterProps) {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key;
  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  )?.key;

  return (
    <footer className="w-full border-t px-6 py-2">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          {previousStep && (
            <Button
              variant="secondary"
              onClick={
                previousStep ? () => setCurrentStep(previousStep) : undefined
              }
              disabled={!previousStep}
            >
              Previous
            </Button>
          )}
          {nextStep && (
            <Button
              onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
              disabled={!nextStep}
            >
              Next
            </Button>
          )}
        </div>
        <Button
          variant="outline"
          className="md:hidden"
          onClick={() => setResumePreview(!resumePreview)}
          title={resumePreview ? "Show Editor" : "Show Preview"}
        >
          <div className="hidden sm:block">
            {resumePreview ? "Editor" : "Preview"}
          </div>
          {resumePreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link href="/resumes">Cancel</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
