"use server";

import ai from "@/lib/gemini";
import {
  generateSummarySchema,
  GenerateSummaryValues,
  generateWorkExperienceSchema,
  GenerateWorkExperienceValues,
  workExperience,
} from "@/lib/validation";

export async function generateSummary(input: GenerateSummaryValues) {
  const {
    jobTitle,
    workExperiences,
    educations,
    projects,
    customSections,
    skills,
  } = generateSummarySchema.parse(input);

  let promptWithoutSummary = `You are an expert resume writer. Using the resume data below, write a concise 40-60 word professional summary tailored to the person's field and experience for the job role provided.
    Requirements:
    - Adapt tone and content to the user's industry and experience level.
    - Highlight key strengths, skills, and achievements.
    - Avoid generic adjectives, clichés, and invented information.
    - Do not repeat the same skill.
    - Be professional, ATS-friendly, and factual.
    - if something goes wrong, give response as you are giving tp end user, who is using this resume builder app.
    Resume Data (JSON):\n`;

  const resumeJson: any = {};

  if (jobTitle) {
    resumeJson.jobTitle = jobTitle;
  }

  if (workExperiences?.length) {
    resumeJson.workExperiences = workExperiences.map((we) => ({
      position: we.position || undefined,
      company: we.company || undefined,
      startDate: we.startDate || undefined,
      endDate: we.endDate || undefined,
      description: we.description || undefined,
    }));
  }

  if (educations?.length) {
    resumeJson.educations = educations.map((edu) => ({
      degree: edu.degree || undefined,
      fieldOfStudy: edu.fieldOfStudy || undefined,
      institution: edu.institution || undefined,
      startDate: edu.startDate || undefined,
      endDate: edu.endDate || undefined,
    }));
  }

  if (projects?.length) {
    resumeJson.projects = projects.map((proj) => ({
      title: proj.title || undefined,
      description: proj.description || undefined,
    }));
  }

  if (customSections?.length) {
    resumeJson.customSections = customSections.map((section) => ({
      title: section.title || undefined,
      items: section.items?.map((item) => ({
        title: item.title || undefined,
        subTitle: item.subTitle || undefined,
        description: item.description || undefined,
        dateRange: item.dateRange || undefined,
      })),
    }));
  }

  if (skills?.length) {
    resumeJson.skills = skills.filter(Boolean);
  }

  promptWithoutSummary += JSON.stringify(resumeJson, null, 2);
  promptWithoutSummary += `\n\nReturn only the professional summary text.`;

  console.log("Prompt---", promptWithoutSummary);

  const aiResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: promptWithoutSummary,
  });

  console.log("Summary---", aiResponse.text);

  if (!aiResponse.text) {
    throw new Error("Failed to generate summary");
  }

  return aiResponse.text.trim();
}

export async function enhanceSummary(summary: string) {
  const prompt = `You are an expert resume writer. Enhance and improve the following professional summary while maintaining its core message and factual accuracy.
    
Requirements:
- Keep the enhanced summary between 40-60 words
- Improve clarity, impact, and professionalism
- Use stronger action verbs and more compelling language
- Maintain ATS-friendly keywords
- Keep all factual information intact
- Make it more engaging and results-oriented
- Avoid clichés and generic phrases

Original Summary:
${summary}

Return only the enhanced professional summary text.`;

  console.log("Enhance Prompt---", prompt);

  const aiResponse = await ai.models.generateContent({
    model: "gemini-2.0-flash-lite",
    contents: prompt,
  });

  console.log("Enhanced Summary---", aiResponse.text);

  if (!aiResponse.text) {
    throw new Error("Failed to enhance summary");
  }

  return aiResponse.text.trim();
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceValues,
) {
  const { description } = generateWorkExperienceSchema.parse(input);

  const prompt = `You are an expert resume writer. your task is to generate a single work experience entry based on the user input provided below. your response must be adhere to the following structure. you can omit fields if they can't be infered from the provided data, but don't add any new ones.

  Follow this EXACT output format (do NOT add extra text):

  Job title: <job title>
  Company: <company name>
  Start Date: <YYYY-MM-DD>
  End Date: <YYYY-MM-DD>
  Description: <an optimized, concise, and impactful description of the work experience in bullet point( - ) format, might be infered from the job title>

  If a field cannot be inferred, return it as an empty value.

  User input description:
  ${description}
  `;

  console.log("Work Experience Prompt---", prompt);

  const aiResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  console.log("Work Experience---", aiResponse.text);

  if (!aiResponse.text) {
    throw new Error("Failed to generate work experience");
  }
  const text = aiResponse.text;
  return {
    position: text.match(/Job title: (.*)/)?.[1] || "",
    company: text.match(/Company: (.*)/)?.[1] || "",
    description: (text.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
    startDate: text.match(/Start Date: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: text.match(/End Date: (\d{4}-\d{2}-\d{2}|Present)/)?.[1],
  } satisfies workExperience;
}
