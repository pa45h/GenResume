import Classic from "@/components/ResumeTamplates/Classic";
import Compact from "@/components/ResumeTamplates/Compact";
import Modern from "@/components/ResumeTamplates/Modern";
import Professional from "@/components/ResumeTamplates/Professional";
import { ResumeValues } from "@/lib/validation";

export const templates: {
  key: string;
  title: string;
  component: React.ComponentType<{
    resumeData: ResumeValues;
    className?: string;
  }>;
}[] = [
  {
    key: "classic",
    title: "Classic",
    component: Classic,
  },
  {
    key: "modern",
    title: "Modern",
    component: Modern,
  },
  {
    key: "professional",
    title: "Professional",
    component: Professional,
  },
  {
    key: "compact",
    title: "Compact",
    component: Compact,
  },
];
