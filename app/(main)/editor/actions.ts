"use server";

import prisma from "@/lib/prisma";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";

export async function saveResume(values: ResumeValues) {
  const { id } = values;
  console.log("Recieved ResumeValues---", values);

  const {
    photo,
    workExperiences,
    educations,
    projects,
    customSections,
    ...resumeValues
  } = resumeSchema.parse(values);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("User Not Authenticated!");
  }

  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume Not Founde!");
  }

  let newPhotoUrl: string | undefined | null = undefined;

  if (photo instanceof File) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }

    const blob = await put(`resume_photos/${photo.name}`, photo, {
      access: "public",
      addRandomSuffix: true,
    });

    newPhotoUrl = blob.url;
  } else if (photo === null) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    console.log("Setting newPhotoUrl to null");
    newPhotoUrl = null;
  }

  if (id) {
    return prisma.resume.update({
      where: { id, userId },
      data: {
        ...resumeValues,
        photoUrl: newPhotoUrl,
        workExperiences: {
          deleteMany: {},
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          deleteMany: {},
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
        projects: {
          deleteMany: {},
          create: projects?.map((proj) => ({
            ...proj,
          })),
        },
        customSections: {
          deleteMany: {},
          create: (customSections || [])
            .filter((section) => section.title)
            .map((section) => ({
              title: section.title as string,
              items: {
                create: (section.items || [])
                  .filter((item) => item.title)
                  .map((item) => ({
                    title: item.title as string,
                    subTitle: item.subTitle || undefined,
                    description: item.description || undefined,
                    dateRange: item.dateRange || undefined,
                  })),
              },
            })),
        },
        updatedAt: new Date(),
      },
    });
  } else {
    return prisma.resume.create({
      data: {
        userId,
        ...resumeValues,
        photoUrl: newPhotoUrl,
        workExperiences: {
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
        projects: {
          create: projects?.map((proj) => ({
            ...proj,
          })),
        },
        customSections: {
          create: (customSections || [])
            .filter((section) => section.title)
            .map((section) => ({
              title: section.title as string,
              items: {
                create: (section.items || [])
                  .filter((item) => item.title)
                  .map((item) => ({
                    title: item.title as string,
                    subTitle: item.subTitle || undefined,
                    description: item.description || undefined,
                    dateRange: item.dateRange || undefined,
                  })),
              },
            })),
        },
      },
    });
  }
}
