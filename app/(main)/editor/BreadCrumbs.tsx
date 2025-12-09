import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { steps } from "./steps";

interface BreadCrumbsProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

function BreadCrumbs({ currentStep, setCurrentStep }: BreadCrumbsProps) {
  return (
    <div className="flex w-full justify-center">
      <Breadcrumb>
        <BreadcrumbList className="mx-auto flex w-full items-center justify-center text-center">
          {steps.map((step) => (
            <React.Fragment key={step.key}>
              <BreadcrumbItem>
                {step.key === currentStep ? (
                  <BreadcrumbPage>{step.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <button onClick={() => setCurrentStep(step.key)}>
                      {step.title}
                    </button>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator className="last:hidden" />
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default BreadCrumbs;
