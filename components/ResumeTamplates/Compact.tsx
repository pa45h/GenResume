import { useEffect, useRef, useState } from "react";
import { ResumePreviewProps } from "../ResumePreview";
import useDimentions from "@/hooks/useDimentions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import {
  Github,
  Link2,
  Linkedin,
  Mail,
  MapPinHouse,
  Phone,
} from "lucide-react";
import { formatDate } from "date-fns";
import Link from "next/link";
import { Badge } from "../ui/badge";

function Compact({ resumeData, contentRef, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const { width } = useDimentions(containerRef);

  return (
    <div
      className={cn(
        "aspect-210/297 h-fit w-full bg-white text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-3 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <WorkExperienceSection resumeData={resumeData} />
            <ProjectsSection resumeData={resumeData} />
          </div>
          <div className="space-y-3">
            <SkillsSection resumeData={resumeData} />
            <EducationSection resumeData={resumeData} />
            <CustomSections resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    linkedinUrl,
    githubUrl,
    otherUrl_1,
    otherUrlLabel_1,
    otherUrl_2,
    otherUrlLabel_2,
    colorHex,
    borderStyle,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="border-b-2 pb-3" style={{ borderColor: colorHex }}>
      <div
        className={cn(
          "mx-auto flex w-fit items-center gap-10",
          photoSrc ? "" : "justify-center",
        )}
      >
        {photoSrc && (
          <Image
            src={photoSrc}
            width={90}
            height={90}
            alt="Profile Picture"
            className="aspect-square object-cover"
            style={{
              borderRadius:
                borderStyle === BorderStyles.SQUARE
                  ? "0px"
                  : borderStyle === BorderStyles.CIRCLE
                    ? "9999px"
                    : "6px",
            }}
          />
        )}
        <div
          className={cn(
            "flex flex-col items-start space-y-2",
            photoSrc ? "items-start" : "items-center",
          )}
        >
          <div
            className={cn(
              "space-y-0.5",
              photoSrc ? "text-left" : "text-center",
            )}
          >
            <h1
              className="text-3xl leading-none font-bold tracking-tight"
              style={{ color: colorHex }}
            >
              {firstName} {lastName}
            </h1>
            <p className="text-sm font-semibold" style={{ color: colorHex }}>
              {jobTitle}
            </p>
          </div>

          <div className="flex flex-col flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600">
            <div className={`flex gap-3 ${photoSrc ? "" : "justify-center"}`}>
              {(city || country) && (
                <div className="flex items-center gap-1">
                  <MapPinHouse className="size-3" />
                  <span>
                    {city}
                    {city && country ? ", " : ""}
                    {country}
                  </span>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-1">
                  <Phone className="size-3" />
                  <Link href={`tel:${phone}`} className="underline">
                    {phone}
                  </Link>
                </div>
              )}
              {email && (
                <div className="flex items-center gap-1">
                  <Mail className="size-3" />
                  <Link href={`mailto:${email}`} className="underline">
                    {email}
                  </Link>
                </div>
              )}
            </div>
            <div className={`flex gap-3 ${photoSrc ? "" : "justify-center"}`}>
              {linkedinUrl && (
                <Link
                  href={linkedinUrl}
                  target="_blank"
                  className="flex items-center gap-1 underline"
                  style={{ color: colorHex }}
                >
                  <Linkedin className="size-3" />
                  <span>LinkedIn</span>
                </Link>
              )}
              {githubUrl && (
                <Link
                  href={githubUrl}
                  target="_blank"
                  className="flex items-center gap-1 underline"
                  style={{ color: colorHex }}
                >
                  <Github className="size-3" />
                  <span>GitHub</span>
                </Link>
              )}
              {otherUrl_1 && otherUrlLabel_1 && (
                <Link
                  href={otherUrl_1}
                  target="_blank"
                  className="flex items-center gap-1 underline"
                  style={{ color: colorHex }}
                >
                  <Link2 className="size-3" />
                  <span>{otherUrlLabel_1}</span>
                </Link>
              )}
              {otherUrl_2 && otherUrlLabel_2 && (
                <Link
                  href={otherUrl_2}
                  target="_blank"
                  className="flex items-center gap-1 underline"
                  style={{ color: colorHex }}
                >
                  <Link2 className="size-3" />
                  <span>{otherUrlLabel_2}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;

  if (!summary) return null;

  return (
    <div className="space-y-1">
      <h2
        className="text-xs font-bold tracking-wider uppercase"
        style={{ color: colorHex }}
      >
        Summary
      </h2>
      <p className="text-xs leading-relaxed whitespace-pre-line text-gray-700">
        {summary}
      </p>
    </div>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <div className="space-y-2">
      <h2
        className="text-xs font-bold tracking-wider uppercase"
        style={{ color: colorHex }}
      >
        Experience
      </h2>
      {workExperiencesNotEmpty.map((exp, index) => (
        <div key={index} className="space-y-0.5">
          <div>
            <h3
              className="text-xs leading-tight font-bold"
              style={{ color: colorHex }}
            >
              {exp.position}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-600">
                {exp.company}
              </p>
              {exp.startDate && (
                <span className="text-xs text-gray-500">
                  {formatDate(exp.startDate, "MM/yy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yy") : "Now"}
                </span>
              )}
            </div>
          </div>
          <div className="text-xs leading-relaxed whitespace-pre-line text-gray-700">
            {exp.description}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsSection({ resumeData }: ResumeSectionProps) {
  const { projects, colorHex } = resumeData;

  const projectsNotEmpty = projects?.filter(
    (proj) => Object.values(proj).filter(Boolean).length > 0,
  );

  if (!projectsNotEmpty?.length) return null;

  return (
    <div className="space-y-2">
      <h2
        className="text-xs font-bold tracking-wider uppercase"
        style={{ color: colorHex }}
      >
        Projects
      </h2>
      {projectsNotEmpty.map((proj, index) => (
        <div key={index} className="space-y-0.5">
          <div className="flex items-start justify-between gap-1">
            <h3
              className="flex-1 text-xs leading-tight font-bold"
              style={{ color: colorHex }}
            >
              {proj.title}
            </h3>
            <div className="flex gap-1.5 text-xs whitespace-nowrap">
              {proj.liveUrl && (
                <Link
                  href={proj.liveUrl}
                  target="_blank"
                  className="underline"
                  style={{ color: colorHex }}
                >
                  Demo
                </Link>
              )}
              {proj.repoUrl && (
                <Link
                  href={proj.repoUrl}
                  target="_blank"
                  className="underline"
                  style={{ color: colorHex }}
                >
                  Code
                </Link>
              )}
            </div>
          </div>
          <div className="text-xs leading-relaxed whitespace-pre-line text-gray-700">
            {proj.description}
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;

  if (!skills?.length) return null;

  return (
    <div className="space-y-2">
      <h2
        className="text-xs font-bold tracking-wider uppercase"
        style={{ color: colorHex }}
      >
        Skills
      </h2>
      <div className="flex flex-wrap gap-1">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            className="px-1.5 py-0 text-xs text-white hover:bg-black"
            style={{
              backgroundColor: colorHex,
              borderRadius:
                borderStyle === BorderStyles.SQUARE
                  ? "0px"
                  : borderStyle === BorderStyles.CIRCLE
                    ? "9999px"
                    : "4px",
            }}
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;

  const educationsNotEmpty = educations?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!educationsNotEmpty?.length) return null;

  return (
    <div className="space-y-2">
      <h2
        className="text-xs font-bold tracking-wider uppercase"
        style={{ color: colorHex }}
      >
        Education
      </h2>
      {educationsNotEmpty.map((edu, index) => (
        <div key={index} className="space-y-0.5">
          <div>
            <h3
              className="text-xs leading-tight font-bold"
              style={{ color: colorHex }}
            >
              {edu.degree}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-600">
                {edu.institution}
              </p>
              {edu.startDate && (
                <span className="text-xs text-gray-500">
                  {formatDate(edu.startDate, "yyyy")}
                  {edu.endDate && " - " + formatDate(edu.endDate, "yyyy")}
                </span>
              )}
            </div>
          </div>
          {edu.fieldOfStudy && (
            <p className="text-xs text-gray-600">{edu.fieldOfStudy}</p>
          )}
          {edu.grade && <p className="text-xs text-gray-600">{edu.grade}</p>}
        </div>
      ))}
    </div>
  );
}

function CustomSections({ resumeData }: ResumeSectionProps) {
  const { customSections, colorHex } = resumeData;

  const customSectionsNotEmpty = customSections?.filter(
    (section) => Object.values(section).filter(Boolean).length > 0,
  );

  if (!customSectionsNotEmpty?.length) return null;

  return (
    <>
      {customSectionsNotEmpty.map((section, index) => {
        const itemsNotEmpty = section.items?.filter(
          (item) => Object.values(item).filter(Boolean).length > 0,
        );
        if (!itemsNotEmpty?.length) return null;
        return (
          <div key={index} className="space-y-2">
            <h2
              className="text-xs font-bold tracking-wider uppercase"
              style={{ color: colorHex }}
            >
              {section.title}
            </h2>
            {itemsNotEmpty.map((item, itemIndex) => (
              <div key={itemIndex} className="space-y-0.5">
                <div>
                  <h3
                    className="text-xs leading-tight font-bold"
                    style={{ color: colorHex }}
                  >
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    {item.subTitle && (
                      <p className="text-xs font-semibold text-gray-600">
                        {item.subTitle}
                      </p>
                    )}
                    {item.dateRange && (
                      <span className="text-xs text-gray-500">
                        {item.dateRange}
                      </span>
                    )}
                  </div>
                </div>
                {item.description && (
                  <div className="text-xs leading-relaxed whitespace-pre-line text-gray-700">
                    {item.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}

export default Compact;
