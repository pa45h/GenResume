import { title } from "process";
import { email, z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});
export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine((file) => {
      if (
        (!file || (file instanceof File && file.type.startsWith("image/")),
        "Must be an image file")
      )
        return true;
    })
    .refine((file) => {
      if (
        (!file || (file instanceof File && file.size <= 5 * 1024 * 1024),
        "Image size must be less than 5MB")
      )
        return true;
    }),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
  linkedinUrl: optionalString,
  githubUrl: optionalString,
  otherUrl_1: optionalString,
  otherUrlLabel_1: optionalString,
  otherUrl_2: optionalString,
  otherUrlLabel_2: optionalString,
});
export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});
export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;

export type workExperience = NonNullable<
  z.infer<typeof workExperienceSchema>["workExperiences"]
>[number];

export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: optionalString,
        institution: optionalString,
        fieldOfStudy: optionalString,
        grade: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      }),
    )
    .optional(),
});
export type EducationValues = z.infer<typeof educationSchema>;

export const projectSchema = z.object({
  projects: z
    .array(
      z.object({
        title: optionalString,
        description: optionalString,
        liveUrl: optionalString,
        repoUrl: optionalString,
      }),
    )
    .optional(),
});
export type ProjectValues = z.infer<typeof projectSchema>;

export const skillsSchema = z.object({
  skills: z.array(z.string()).optional(),
});
export type SkillsValues = z.infer<typeof skillsSchema>;

export const summarySchema = z.object({
  summary: optionalString,
});
export type SummaryValues = z.infer<typeof summarySchema>;

export const itemSchema = z.object({
  items: z
    .array(
      z.object({
        title: optionalString,
        subTitle: optionalString,
        description: optionalString,
        dateRange: optionalString,
      }),
    )
    .optional(),
});
export type ItemValues = z.infer<typeof itemSchema>;

export const customSectionSchema = z.object({
  customSections: z
    .array(
      z.object({
        title: optionalString,
        items: itemSchema.shape.items,
      }),
    )
    .optional(),
});
export type CustomSectionValues = z.infer<typeof customSectionSchema>;

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...projectSchema.shape,
  ...customSectionSchema.shape,
  ...skillsSchema.shape,
  ...summarySchema.shape,
  colorHex: optionalString,
  borderStyle: optionalString,
  template: optionalString,
});
export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};

export const generateWorkExperienceSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Required")
    .min(20, "Must be at least 20 characters"),
});
export type GenerateWorkExperienceValues = z.infer<
  typeof generateWorkExperienceSchema
>;

export const generateSummarySchema = z.object({
  jobTitle: optionalString,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...projectSchema.shape,
  ...customSectionSchema.shape,
  ...skillsSchema.shape,
});
export type GenerateSummaryValues = z.infer<typeof generateSummarySchema>;
