import { ResumeValues } from "@/lib/validation";
import useDebounce from "./useDebounce";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { saveResume } from "@/app/(main)/editor/actions";
import { fileReplacer } from "@/lib/utils";

export default function useAutoSave(resumeData: ResumeValues) {
  const searchParams = useSearchParams();

  const debouncedResumeData = useDebounce(resumeData, 2000);

  const [resumeId, setResumeId] = useState(resumeData.id);

  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData),
  );

  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

  useEffect(() => {
    async function save() {
      const toastId = toast.loading("Saving...");
      try {
        setIsSaving(true);
        setIsError(false);

        const newData = structuredClone(debouncedResumeData);

        const updatedResume = await saveResume({
          ...newData,
          ...(JSON.stringify(lastSavedData.photo, fileReplacer) ===
            JSON.stringify(newData.photo, fileReplacer) && {
            photo: undefined,
          }),
          id: resumeId,
        });

        setResumeId(updatedResume.id);
        setLastSavedData(newData);

        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
        toast.success("All Changes Saved!");
      } catch (error) {
        setIsError(true);
        console.error("Error Saving Changes---", error);
        toast.error("Error Saving Changes!");
      } finally {
        setIsSaving(false);
        toast.dismiss(toastId);
      }
    }
    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer);

    if (hasUnsavedChanges && debouncedResumeData && !isSaving && !isError) {
      save();
    }
  }, [
    debouncedResumeData,
    isSaving,
    lastSavedData,
    isError,
    resumeId,
    searchParams,
    toast,
  ]);
  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer),
    resumeId,
  };
}
