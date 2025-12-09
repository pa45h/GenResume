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

function Classic({ resumeData, contentRef, className }: ResumePreviewProps) {
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
        className={cn("space-y-6 p-8", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
        <ProjectsSection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <CustomSections resumeData={resumeData} />
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

export function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
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
    <div className="relative space-y-4 pb-6">
      <div className="flex items-start gap-6">
        {photoSrc && (
          <div className="relative">
            <Image
              src={photoSrc}
              width={128}
              height={128}
              alt="Profile Picture"
              className="aspect-square object-cover"
              style={{
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "9999px"
                      : "8px",
                border: `3px solid ${colorHex}`,
              }}
            />
          </div>
        )}
        <div className="flex-1 space-y-3">
          <div className="space-y-1">
            <h1
              className="text-4xl font-bold tracking-tight"
              style={{ color: colorHex }}
            >
              {firstName} {lastName}
            </h1>
            <div className="flex items-center gap-3">
              <div
                className="h-0.5 w-12"
                style={{ backgroundColor: colorHex }}
              />
              <p className="text-lg font-medium text-gray-700">{jobTitle}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
            {(city || country) && (
              <div className="flex items-center gap-1.5">
                <MapPinHouse className="size-4" style={{ color: colorHex }} />
                <span>
                  {city}
                  {city && country ? ", " : ""}
                  {country}
                </span>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="size-4" style={{ color: colorHex }} />
                <Link href={`tel:${phone}`} className="underline">
                  {phone}
                </Link>
              </div>
            )}
            {email && (
              <div className="flex items-center gap-1.5">
                <Mail className="size-4" style={{ color: colorHex }} />
                <Link href={`mailto:${email}`} className="underline">
                  {email}
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            {linkedinUrl && (
              <Link
                href={linkedinUrl}
                target="_blank"
                className="flex items-center gap-1.5 font-medium underline"
                style={{ color: colorHex }}
              >
                <Linkedin className="size-4" />
                <span>LinkedIn</span>
              </Link>
            )}
            {githubUrl && (
              <Link
                href={githubUrl}
                target="_blank"
                className="flex items-center gap-1.5 font-medium underline"
                style={{ color: colorHex }}
              >
                <Github className="size-4" />
                <span>GitHub</span>
              </Link>
            )}
            {otherUrl_1 && otherUrlLabel_1 && (
              <Link
                href={otherUrl_1}
                target="_blank"
                className="flex items-center gap-1.5 font-medium underline"
                style={{ color: colorHex }}
              >
                <Link2 className="size-4" />
                <span>{otherUrlLabel_1}</span>
              </Link>
            )}
            {otherUrl_2 && otherUrlLabel_2 && (
              <Link
                href={otherUrl_2}
                target="_blank"
                className="flex items-center gap-1.5 font-medium underline"
                style={{ color: colorHex }}
              >
                <Link2 className="size-4" />
                <span>{otherUrlLabel_2}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Bottom border line */}
      <div
        className="absolute right-0 bottom-0 left-0 h-0.5"
        style={{ backgroundColor: colorHex, opacity: 0.3 }}
      />
    </div>
  );
}

export function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;

  if (!summary) return null;

  return (
    <div className="space-y-3 border-b border-gray-200 pb-6">
      <div className="flex items-center gap-3">
        <div
          className="h-1 w-1 rounded-full"
          style={{ backgroundColor: colorHex }}
        />
        <h2
          className="text-lg font-bold tracking-wide uppercase"
          style={{ color: colorHex }}
        >
          Professional Summary
        </h2>
      </div>
      <p
        className="border-l-2 pl-4 text-sm leading-relaxed whitespace-pre-line text-gray-700"
        style={{ borderColor: `${colorHex}33` }}
      >
        {summary}
      </p>
    </div>
  );
}

export function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <div className="space-y-3 border-b border-gray-200 pb-6">
      <div className="flex items-center gap-3">
        <div
          className="h-1 w-1 rounded-full"
          style={{ backgroundColor: colorHex }}
        />
        <h2
          className="text-lg font-bold tracking-wide uppercase"
          style={{ color: colorHex }}
        >
          Work Experience
        </h2>
      </div>
      <div className="space-y-5 pl-4">
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="relative">
            {/* Vertical timeline line */}
            {index < workExperiencesNotEmpty.length - 1 && (
              <div
                className="absolute top-8 bottom-0 left-0 w-px"
                style={{ backgroundColor: colorHex, opacity: 0.2 }}
              />
            )}
            {/* Timeline dot */}
            <div
              className="absolute top-2 -left-0.5 h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: colorHex }}
            />
            <div className="space-y-1.5 pl-6">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3
                    className="text-base font-bold"
                    style={{ color: colorHex }}
                  >
                    {exp.position}
                  </h3>
                  <p className="text-sm font-semibold text-gray-700">
                    {exp.company}
                  </p>
                </div>
                {exp.startDate && (
                  <span className="text-sm whitespace-nowrap text-gray-600">
                    {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                    {exp.endDate
                      ? formatDate(exp.endDate, "MM/yyyy")
                      : "Present"}
                  </span>
                )}
              </div>
              <div className="text-sm leading-relaxed whitespace-pre-line text-gray-700">
                {exp.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;

  const educationsNotEmpty = educations?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!educationsNotEmpty?.length) return null;

  return (
    <div className="space-y-3 border-b border-gray-200 pb-6">
      <div className="flex items-center gap-3">
        <div
          className="h-1 w-1 rounded-full"
          style={{ backgroundColor: colorHex }}
        />
        <h2
          className="text-lg font-bold tracking-wide uppercase"
          style={{ color: colorHex }}
        >
          Education
        </h2>
      </div>
      <div className="space-y-5 pl-4">
        {educationsNotEmpty.map((edu, index) => (
          <div key={index} className="relative">
            {/* Vertical timeline line */}
            {index < educationsNotEmpty.length - 1 && (
              <div
                className="absolute top-8 bottom-0 left-0 w-px"
                style={{ backgroundColor: colorHex, opacity: 0.2 }}
              />
            )}
            {/* Timeline dot */}
            <div
              className="absolute top-2 -left-0.5 h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: colorHex }}
            />
            <div className="space-y-1.5 pl-6">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3
                    className="text-base font-bold"
                    style={{ color: colorHex }}
                  >
                    {edu.degree}
                    {edu.fieldOfStudy && " - " + edu.fieldOfStudy}
                    {", "}
                    {edu.institution}
                  </h3>
                </div>
                {edu.startDate && (
                  <span className="text-sm whitespace-nowrap text-gray-600">
                    {formatDate(edu.startDate, "yyyy")}
                    {edu.endDate && " - " + formatDate(edu.endDate, "yyyy")}
                  </span>
                )}
              </div>
              {edu.grade && (
                <p className="text-sm text-gray-600">{edu.grade}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectsSection({ resumeData }: ResumeSectionProps) {
  const { projects, colorHex } = resumeData;

  const projectsNotEmpty = projects?.filter(
    (proj) => Object.values(proj).filter(Boolean).length > 0,
  );

  if (!projectsNotEmpty?.length) return null;

  return (
    <div className="space-y-3 border-b border-gray-200 pb-6">
      <div className="flex items-center gap-3">
        <div
          className="h-1 w-1 rounded-full"
          style={{ backgroundColor: colorHex }}
        />
        <h2
          className="text-lg font-bold tracking-wide uppercase"
          style={{ color: colorHex }}
        >
          Projects
        </h2>
      </div>
      <div className="space-y-5 pl-4">
        {projectsNotEmpty.map((proj, index) => (
          <div key={index} className="relative">
            {/* Vertical timeline line */}
            {index < projectsNotEmpty.length - 1 && (
              <div
                className="absolute top-8 bottom-0 left-0 w-px"
                style={{ backgroundColor: colorHex, opacity: 0.2 }}
              />
            )}
            {/* Timeline dot */}
            <div
              className="absolute top-2 -left-0.5 h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: colorHex }}
            />
            <div className="space-y-1.5 pl-6">
              <div className="flex items-start justify-between gap-2">
                <h3
                  className="flex-1 text-base font-bold"
                  style={{ color: colorHex }}
                >
                  {proj.title}
                </h3>
                <div className="flex gap-2 text-sm whitespace-nowrap">
                  {proj.liveUrl && (
                    <Link
                      href={proj.liveUrl}
                      target="_blank"
                      className="font-medium underline"
                      style={{ color: colorHex }}
                    >
                      Live Demo
                    </Link>
                  )}
                  {proj.repoUrl && (
                    <Link
                      href={proj.repoUrl}
                      target="_blank"
                      className="font-medium underline"
                      style={{ color: colorHex }}
                    >
                      Source Code
                    </Link>
                  )}
                </div>
              </div>
              <div className="text-sm leading-relaxed whitespace-pre-line text-gray-700">
                {proj.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;

  if (!skills?.length) return null;

  return (
    <div className="space-y-3 border-b border-gray-200 pb-6">
      <div className="flex items-center gap-3">
        <div
          className="h-1 w-1 rounded-full"
          style={{ backgroundColor: colorHex }}
        />
        <h2
          className="text-lg font-bold tracking-wide uppercase"
          style={{ color: colorHex }}
        >
          Skills
        </h2>
      </div>
      <div className="flex flex-wrap gap-2 pl-4">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            className="bg-black px-3 py-1 text-sm font-medium text-white"
            style={{
              backgroundColor: colorHex,
              borderRadius:
                borderStyle === BorderStyles.SQUARE
                  ? "0px"
                  : borderStyle === BorderStyles.CIRCLE
                    ? "9999px"
                    : "6px",
            }}
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export function CustomSections({ resumeData }: ResumeSectionProps) {
  const { customSections, colorHex } = resumeData;

  const customSectionsNotEmpty = customSections?.filter(
    (section) => Object.values(section).filter(Boolean).length > 0,
  );

  if (!customSectionsNotEmpty?.length) return null;

  return (
    <>
      {customSectionsNotEmpty.map((section, sectionIndex) => {
        const itemsNotEmpty = section.items?.filter(
          (item) => Object.values(item).filter(Boolean).length > 0,
        );
        if (!itemsNotEmpty?.length) return null;
        return (
          <div
            key={sectionIndex}
            className="space-y-3 border-b border-gray-200 pb-6 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div
                className="h-1 w-1 rounded-full"
                style={{ backgroundColor: colorHex }}
              />
              <h2
                className="text-lg font-bold tracking-wide uppercase"
                style={{ color: colorHex }}
              >
                {section.title}
              </h2>
            </div>
            <div className="space-y-5 pl-4">
              {itemsNotEmpty.map((item, itemIndex) => (
                <div key={itemIndex} className="relative">
                  {/* Vertical timeline line */}
                  {itemIndex < itemsNotEmpty.length - 1 && (
                    <div
                      className="absolute top-8 bottom-0 left-0 w-px"
                      style={{ backgroundColor: colorHex, opacity: 0.2 }}
                    />
                  )}
                  {/* Timeline dot */}
                  <div
                    className="absolute top-2 -left-0.5 h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: colorHex }}
                  />
                  <div className="space-y-1.5 pl-6">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3
                          className="text-base font-bold"
                          style={{ color: colorHex }}
                        >
                          {item.title}
                        </h3>
                        {item.subTitle && (
                          <p className="text-sm font-semibold text-gray-700">
                            {item.subTitle}
                          </p>
                        )}
                      </div>
                      {item.dateRange && (
                        <span className="text-sm whitespace-nowrap text-gray-600">
                          {item.dateRange}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <div className="text-sm leading-relaxed whitespace-pre-line text-gray-700">
                        {item.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Classic;
