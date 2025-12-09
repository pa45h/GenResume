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

function Modern({ resumeData, contentRef, className }: ResumePreviewProps) {
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
        className={cn("flex", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        {/* Left Sidebar */}
        <div
          className="w-[35%] space-y-6 p-6"
          style={{
            backgroundColor: resumeData.colorHex + "15",
          }}
        >
          <PersonalInfoSidebar resumeData={resumeData} />
          <SkillsSection resumeData={resumeData} />
          <ContactSection resumeData={resumeData} />
        </div>

        {/* Main Content */}
        <div className="w-[65%] space-y-5 p-6">
          <SummarySection resumeData={resumeData} />
          <WorkExperienceSection resumeData={resumeData} />
          <ProjectsSection resumeData={resumeData} />
          <EducationSection resumeData={resumeData} />
          <CustomSections resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

function PersonalInfoSidebar({ resumeData }: ResumeSectionProps) {
  const { photo, firstName, lastName, jobTitle, colorHex, borderStyle } =
    resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="space-y-4">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={150}
          height={150}
          alt="Profile Picture"
          className="mx-auto aspect-square object-cover"
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : "8px",
          }}
        />
      )}
      <div className="space-y-2 text-center">
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ color: colorHex }}
        >
          {firstName} {lastName}
        </h1>
        <p
          className="text-base font-medium tracking-wider uppercase"
          style={{ color: colorHex }}
        >
          {jobTitle}
        </p>
      </div>
    </div>
  );
}

function ContactSection({ resumeData }: ResumeSectionProps) {
  const {
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
  } = resumeData;

  return (
    <div className="space-y-3">
      <h2
        className="border-b-2 pb-2 text-sm font-bold tracking-wider uppercase"
        style={{ color: colorHex, borderColor: colorHex }}
      >
        Contact
      </h2>
      <div className="space-y-2 text-xs">
        {(city || country) && (
          <div className="flex items-start gap-2">
            <MapPinHouse
              className="mt-0.5 size-4 shrink"
              style={{ color: colorHex }}
            />
            <span className="wrap-break-word">
              {city}
              {city && country ? ", " : ""}
              {country}
            </span>
          </div>
        )}
        {phone && (
          <div className="flex items-start gap-2">
            <Phone
              className="mt-0.5 size-4 shrink"
              style={{ color: colorHex }}
            />
            <Link href={`tel:${phone}`} className="break-all underline">
              {phone}
            </Link>
          </div>
        )}
        {email && (
          <div className="flex items-start gap-2">
            <Mail
              className="mt-0.5 size-4 shrink"
              style={{ color: colorHex }}
            />
            <Link href={`mailto:${email}`} className="break-all underline">
              {email}
            </Link>
          </div>
        )}
        {linkedinUrl && (
          <div className="flex items-start gap-2">
            <Linkedin
              className="mt-0.5 size-4 shrink"
              style={{ color: colorHex }}
            />
            <Link
              href={linkedinUrl}
              target="_blank"
              className="break-all underline"
            >
              LinkedIn
            </Link>
          </div>
        )}
        {githubUrl && (
          <div className="flex items-start gap-2">
            <Github
              className="mt-0.5 size-4 shrink"
              style={{ color: colorHex }}
            />
            <Link
              href={githubUrl}
              target="_blank"
              className="break-all underline"
            >
              GitHub
            </Link>
          </div>
        )}
        {otherUrl_1 && otherUrlLabel_1 && (
          <div className="flex items-start gap-2">
            <Link2
              className="mt-0.5 size-4 shrink"
              style={{ color: colorHex }}
            />
            <Link
              href={otherUrl_1}
              target="_blank"
              className="break-all underline"
            >
              {otherUrlLabel_1}
            </Link>
          </div>
        )}
        {otherUrl_2 && otherUrlLabel_2 && (
          <div className="flex items-start gap-2">
            <Link2
              className="mt-0.5 size-4 shrink"
              style={{ color: colorHex }}
            />
            <Link
              href={otherUrl_2}
              target="_blank"
              className="break-all underline"
            >
              {otherUrlLabel_2}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;

  if (!skills?.length) return null;

  return (
    <div className="space-y-3">
      <h2
        className="border-b-2 pb-2 text-sm font-bold tracking-wider uppercase"
        style={{ color: colorHex, borderColor: colorHex }}
      >
        Skills
      </h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            className="px-2 py-1 text-xs text-white hover:bg-black"
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

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;

  if (!summary) return null;

  return (
    <div className="space-y-2">
      <h2
        className="text-lg font-bold tracking-wide uppercase"
        style={{ color: colorHex }}
      >
        Profile
      </h2>
      <div className="text-sm leading-relaxed whitespace-pre-line">
        {summary}
      </div>
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
    <div className="space-y-3">
      <h2
        className="text-lg font-bold tracking-wide uppercase"
        style={{ color: colorHex }}
      >
        Experience
      </h2>
      {workExperiencesNotEmpty.map((exp, index) => (
        <div
          key={index}
          className="space-y-1 border-l-2 pl-4"
          style={{ borderColor: colorHex }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold" style={{ color: colorHex }}>
                {exp.position}
              </h3>
              <p className="text-xs font-semibold text-gray-700">
                {exp.company}
              </p>
            </div>
            {exp.startDate && (
              <span className="text-xs text-gray-600">
                {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
              </span>
            )}
          </div>
          <div className="text-xs leading-relaxed whitespace-pre-line">
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
    <div className="space-y-3">
      <h2
        className="text-lg font-bold tracking-wide uppercase"
        style={{ color: colorHex }}
      >
        Projects
      </h2>
      {projectsNotEmpty.map((proj, index) => (
        <div
          key={index}
          className="space-y-1 border-l-2 pl-4"
          style={{ borderColor: colorHex }}
        >
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-bold" style={{ color: colorHex }}>
              {proj.title}
            </h3>
            <div className="flex gap-2 text-xs">
              {proj.liveUrl && (
                <Link
                  href={proj.liveUrl}
                  target="_blank"
                  className="underline"
                  style={{ color: colorHex }}
                >
                  Live
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
          <div className="text-xs leading-relaxed whitespace-pre-line">
            {proj.description}
          </div>
        </div>
      ))}
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
    <div className="space-y-3">
      <h2
        className="text-lg font-bold tracking-wide uppercase"
        style={{ color: colorHex }}
      >
        Education
      </h2>
      {educationsNotEmpty.map((edu, index) => (
        <div
          key={index}
          className="space-y-1 border-l-2 pl-4"
          style={{ borderColor: colorHex }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold" style={{ color: colorHex }}>
                {edu.degree}
                {edu.fieldOfStudy && ", " + edu.fieldOfStudy}
              </h3>
              <p className="text-xs font-semibold text-gray-700">
                {edu.institution}
              </p>
            </div>
            {edu.startDate && (
              <span className="text-xs text-gray-600">
                {formatDate(edu.startDate, "yyyy")}
                {edu.endDate && " - " + formatDate(edu.endDate, "yyyy")}
              </span>
            )}
          </div>
          {edu.grade && <div className="text-xs">{edu.grade}</div>}
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
          <div key={index} className="space-y-3">
            <h2
              className="text-lg font-bold tracking-wide uppercase"
              style={{ color: colorHex }}
            >
              {section.title}
            </h2>
            {itemsNotEmpty.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="space-y-1 border-l-2 pl-4"
                style={{ borderColor: colorHex }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3
                      className="text-sm font-bold"
                      style={{ color: colorHex }}
                    >
                      {item.title}
                    </h3>
                    {item.subTitle && (
                      <p className="text-xs font-semibold text-gray-700">
                        {item.subTitle}
                      </p>
                    )}
                  </div>
                  {item.dateRange && (
                    <span className="text-xs text-gray-600">
                      {item.dateRange}
                    </span>
                  )}
                </div>
                {item.description && (
                  <div className="text-xs leading-relaxed whitespace-pre-line">
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

export default Modern;
