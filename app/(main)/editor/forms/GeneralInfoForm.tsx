import React, { use, useEffect } from "react";
import { useForm } from "react-hook-form";
import { generalInfoSchema, GeneralInfoValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";

function GeneralInfoForm({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<GeneralInfoValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      title: resumeData.title || "",
      description: resumeData.description || "",
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
      <div className="space-y-1.5 text-center">
        <h1 className="text-2xl font-semibold">General Information</h1>
        <p className="text-muted-foreground text-sm">
          This information will not be part of your resume.
        </p>
        <Form {...form}>
          <form className="space-y-3 rounded-lg border border-white/20 bg-black px-3 py-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Parth Katariya's Resume"
                      autoFocus
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Resume for sde internship applications"
                    ></Input>
                  </FormControl>
                  <FormDescription>
                    Describe the purpose of this resume.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}

export default GeneralInfoForm;
