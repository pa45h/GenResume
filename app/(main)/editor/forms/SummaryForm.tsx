import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { summarySchema, SummaryValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import GenerateSummaryButton from "./GenerateSummaryButton";
import EnhanceSummaryButton from "./EnhanceSummaryButton";

function SummaryForm({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<SummaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        ...values,
      });
    });
    return () => unsubscribe();
  }, [form, resumeData, setResumeData]);

  return (
    <div className="relative z-50 mx-auto max-w-xl space-y-6">
      <div className="space-y.5 text-center">
        <h2 className="text-2xl font-semibold">Professional Summary</h2>
        <p className="text-muted-foreground text-sm">
          Add a short introduction for resume or let the AI generate from your
          data.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3 rounded-lg border border-white/20 bg-black px-3 py-6">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <div className="mb-2 flex justify-around gap-2">
                  <GenerateSummaryButton
                    resumeData={resumeData}
                    onSummaryGenerated={(summary) =>
                      form.setValue("summary", summary)
                    }
                  />
                  <EnhanceSummaryButton
                    resumeData={resumeData}
                    onSummaryGenerated={(summary) =>
                      form.setValue("summary", summary)
                    }
                  />
                </div>
                <FormLabel className="sr-only">Professional Summary</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={`- Generate: generate a summary based on your data.\n- Enhance: type and improve your existing summary.`}
                    className="h-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

export default SummaryForm;
