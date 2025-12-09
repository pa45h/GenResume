import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResumeServerData } from "./types";
import { ResumeValues } from "./validation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    : value;
}

export function mapToResumeValues(data: ResumeServerData): ResumeValues {
  return {
    id: data.id,
    title: data.title || undefined,
    description: data.description || undefined,
    photo: data.photoUrl || undefined,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    email: data.email || undefined,
    linkedinUrl: data.linkedinUrl || undefined,
    githubUrl: data.githubUrl || undefined,
    otherUrl_1: data.otherUrl_1 || undefined,
    otherUrlLabel_1: data.otherUrlLabel_1 || undefined,
    otherUrl_2: data.otherUrl_2 || undefined,
    otherUrlLabel_2: data.otherUrlLabel_2 || undefined,
    phone: data.phone || undefined,
    city: data.city || undefined,
    country: data.country || undefined,
    jobTitle: data.jobTitle || undefined,
    workExperiences: data.workExperiences.map((exp) => ({
      position: exp.position || undefined,
      company: exp.company || undefined,
      startDate: exp.startDate?.toISOString().split("T")[0] || undefined,
      endDate: exp.endDate?.toISOString().split("T")[0] || undefined,
      description: exp.description || undefined,
    })),
    educations: data.educations.map((edu) => ({
      degree: edu.degree || undefined,
      fieldOfStudy: edu.fieldOfStudy || undefined,
      grade: edu.grade || undefined,
      institution: edu.institution || undefined,
      startDate: edu.startDate?.toISOString().split("T")[0] || undefined,
      endDate: edu.endDate?.toISOString().split("T")[0] || undefined,
    })),
    projects: data.projects.map((proj) => ({
      title: proj.title || undefined,
      description: proj.description || undefined,
      liveUrl: proj.liveUrl || undefined,
      repoUrl: proj.repoUrl || undefined,
    })),
    customSections: data.customSections.map((section) => ({
      title: section.title || undefined,
      items: section.items.map((item) => ({
        title: item.title || undefined,
        subTitle: item.subTitle || undefined,
        description: item.description || undefined,
        dateRange: item.dateRange || undefined,
      })),
    })),
    skills: data.skills || [],
    borderStyle: data.borderStyle,
    colorHex: data.colorHex,
    template: data.template,
    summary: data.summary || undefined,
  };
}
