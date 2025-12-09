import { Button } from "@/components/ui/button";
import {
  generateWorkExperienceSchema,
  GenerateWorkExperienceValues,
  workExperience,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparkles } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { generateWorkExperience } from "./actions";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/LoadingButton";
import { set } from "zod";

interface GenerateWorkExperienceButtonProps {
  onWorkExperienceGenerated: (workExperience: workExperience) => void;
}

export default function GenerateWorkExperienceButton({
  onWorkExperienceGenerated,
}: GenerateWorkExperienceButtonProps) {
  const [showInputDialog, setShowInputDialog] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={() => setShowInputDialog(true)}
      >
        <WandSparkles className="size-5" />
        Fill with AI
      </Button>
      <InputDialog
        open={showInputDialog}
        onOpenChange={setShowInputDialog}
        onWorkExperienceGenerated={(workExperience) => {
          onWorkExperienceGenerated(workExperience);
          setShowInputDialog(false);
        }}
      />
    </>
  );
}

interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkExperienceGenerated: (workExperience: workExperience) => void;
}

function InputDialog({
  open,
  onOpenChange,
  onWorkExperienceGenerated,
}: InputDialogProps) {
  const form = useForm<GenerateWorkExperienceValues>({
    resolver: zodResolver(generateWorkExperienceSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(input: GenerateWorkExperienceValues) {
    try {
      const generatedWorkExperience = await generateWorkExperience(input);

      onWorkExperienceGenerated(generatedWorkExperience);

      onOpenChange(false);
    } catch (error) {
      console.error("Error generating work experience:", error);
      toast.error(
        "Failed to generate work experience. Please try again later.",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Work Experience</DialogTitle>
          <DialogDescription>
            Use AI to generate your work experience details entry.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe your work experience</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={`e.g. from July 2020 to June 2023, worked as a software engineer at XYZ company, tasks were: ...`}
                      className="min-h-[120px]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Generate
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
