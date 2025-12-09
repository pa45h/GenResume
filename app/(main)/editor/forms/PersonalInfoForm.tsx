import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { personalInfoSchema, PersonalInfoValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

function PersonalInfoForm({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: resumeData.firstName || "",
      lastName: resumeData.lastName || "",
      jobTitle: resumeData.jobTitle || "",
      city: resumeData.city || "",
      country: resumeData.country || "",
      phone: resumeData.phone || "",
      email: resumeData.email || "",
      linkedinUrl: resumeData.linkedinUrl || "",
      githubUrl: resumeData.githubUrl || "",
      otherUrl_1: resumeData.otherUrl_1 || "",
      otherUrlLabel_1: resumeData.otherUrlLabel_1 || "",
      otherUrl_2: resumeData.otherUrl_2 || "",
      otherUrlLabel_2: resumeData.otherUrlLabel_2 || "",
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

  const photoInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative z-50 mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h1 className="text-2xl font-semibold">Personal Information</h1>
        <p className="text-muted-foreground text-sm">Tell us about yourself.</p>
      </div>
      <Form {...form}>
        <form className="space-y-3 rounded-lg border border-white/20 bg-black px-3 py-6">
          <FormField
            control={form.control}
            name="photo"
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <div className="flex flex-col items-center gap-2 sm:flex-row">
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      {...fieldValues}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValues.onChange(file);
                      }}
                      ref={photoInputRef}
                    />
                  </FormControl>
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => {
                      fieldValues.onChange(null);
                      if (photoInputRef.current) {
                        photoInputRef.current.value = "";
                      }
                    }}
                  >
                    Remove
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Parth" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Katariya" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Software Development Engineer"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Vadodara" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="India" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} placeholder="96017 04554" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    placeholder="parth.katariya87@gmail.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="linkedinUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      {...field}
                      placeholder="https://www.linkedin.com/in/parthkatariya"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      {...field}
                      placeholder="https://github.com/pa45h"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="otherUrl_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other URL 1</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      {...field}
                      placeholder="https://coding-platform.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otherUrlLabel_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other URL Label 1</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Leetcode" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="otherUrl_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other URL 2</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      {...field}
                      placeholder="https://personal-website.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otherUrlLabel_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other URL Label 2</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Portfolio" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}

export default PersonalInfoForm;
