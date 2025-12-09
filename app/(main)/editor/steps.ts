import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";
import ProjectForm from "./forms/ProjectForm";
import CustomSectionForm from "./forms/CustomSectionForm";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  {
    title: "General Info",
    component: GeneralInfoForm,
    key: "general-info",
  },
  {
    title: "Personal Info",
    component: PersonalInfoForm,
    key: "personal-info",
  },
  {
    title: "Skills",
    component: SkillsForm,
    key: "skills",
  },
  {
    title: "Education",
    component: EducationForm,
    key: "education",
  },
  {
    title: "Projects",
    component: ProjectForm,
    key: "projects",
  },
  {
    title: "Work Experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  {
    title: "Custom Sections",
    component: CustomSectionForm,
    key: "custom-sections",
  },
  {
    title: "Summary",
    component: SummaryForm,
    key: "summary",
  },
];
