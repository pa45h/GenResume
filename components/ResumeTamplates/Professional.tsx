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

function Professional({
  resumeData,
  contentRef,
  className,
}: ResumePreviewProps) {
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
        className={cn("flex flex-col", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        {/* Header Section */}
        <div
          className="border-b-4 p-8 pb-6"
          style={{ borderColor: resumeData.colorHex }}
        >
          <PersonalInfoHeader resumeData={resumeData} />
        </div>

        {/* Main Content - Two Columns */}
        <div className="flex">
          {/* Left Column */}
          <div
            className="w-[38%] space-y-5 border-r-2 p-6 pr-5"
            style={{ borderColor: resumeData.colorHex }}
          >
            <ContactSection resumeData={resumeData} />
            <SkillsSection resumeData={resumeData} />
            <EducationSection resumeData={resumeData} />
          </div>

          {/* Right Column */}
          <div className="w-[62%] space-y-5 p-6 pl-5">
            <SummarySection resumeData={resumeData} />
            <WorkExperienceSection resumeData={resumeData} />
            <ProjectsSection resumeData={resumeData} />
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
  const { photo, firstName, lastName, jobTitle, borderStyle, colorHex } =
    resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Profile Picture"
          className="aspect-square border-2 object-cover"
          style={{
            borderColor: colorHex,
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : "8px",
          }}
        />
      )}
      <div className="flex-1 space-y-2">
        <h1
          className="text-5xl font-bold tracking-tight"
          style={{ color: colorHex }}
        >
          {firstName} {lastName}
        </h1>
        <p className="text-lg font-medium text-gray-700">{jobTitle}</p>
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

  const hasContact =
    city ||
    country ||
    phone ||
    email ||
    linkedinUrl ||
    githubUrl ||
    otherUrl_1 ||
    otherUrl_2;

  if (!hasContact) return null;

  return (
    <div className="space-y-3">
      <h2
        className="border-b pb-1.5 text-sm font-bold tracking-wider uppercase"
        style={{ color: colorHex, borderColor: colorHex }}
      >
        Contact
      </h2>
      <div className="space-y-2.5 text-xs">
        {(city || country) && (
          <div className="flex items-start gap-2.5">
            <MapPinHouse
              className="mt-0.5 size-4 shrink-0"
              style={{ color: colorHex }}
            />
            <span className="break-word leading-relaxed">
              {city}
              {city && country ? ", " : ""}
              {country}
            </span>
          </div>
        )}
        {phone && (
          <div className="flex items-start gap-2.5">
            <Phone
              className="mt-0.5 size-4 shrink-0"
              style={{ color: colorHex }}
            />
            <Link
              href={`tel:${phone}`}
              className="leading-relaxed break-all underline"
            >
              {phone}
            </Link>
          </div>
        )}
        {email && (
          <div className="flex items-start gap-2.5">
            <Mail
              className="mt-0.5 size-4 shrink-0"
              style={{ color: colorHex }}
            />
            <Link
              href={`mailto:${email}`}
              className="leading-relaxed break-all underline"
            >
              {email}
            </Link>
          </div>
        )}
        {linkedinUrl && (
          <div className="flex items-start gap-2.5">
            <Linkedin
              className="mt-0.5 size-4 shrink-0"
              style={{ color: colorHex }}
            />
            <Link
              href={linkedinUrl}
              target="_blank"
              className="leading-relaxed break-all underline"
            >
              LinkedIn Profile
            </Link>
          </div>
        )}
        {githubUrl && (
          <div className="flex items-start gap-2.5">
            <Github
              className="mt-0.5 size-4 shrink-0"
              style={{ color: colorHex }}
            />
            <Link
              href={githubUrl}
              target="_blank"
              className="leading-relaxed break-all underline"
            >
              GitHub Profile
            </Link>
          </div>
        )}
        {otherUrl_1 && otherUrlLabel_1 && (
          <div className="flex items-start gap-2.5">
            <Link2
              className="mt-0.5 size-4 shrink-0"
              style={{ color: colorHex }}
            />
            <Link
              href={otherUrl_1}
              target="_blank"
              className="leading-relaxed break-all underline"
            >
              {otherUrlLabel_1}
            </Link>
          </div>
        )}
        {otherUrl_2 && otherUrlLabel_2 && (
          <div className="flex items-start gap-2.5">
            <Link2
              className="mt-0.5 size-4 shrink-0"
              style={{ color: colorHex }}
            />
            <Link
              href={otherUrl_2}
              target="_blank"
              className="leading-relaxed break-all underline"
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
        className="border-b pb-1.5 text-sm font-bold tracking-wider uppercase"
        style={{ color: colorHex, borderColor: colorHex }}
      >
        Skills
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            className="px-2.5 py-1 text-xs font-medium text-white hover:bg-black"
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
    <div className="space-y-3">
      <h2
        className="border-b pb-1.5 text-sm font-bold tracking-wider uppercase"
        style={{ color: colorHex, borderColor: colorHex }}
      >
        Education
      </h2>
      <div className="space-y-3">
        {educationsNotEmpty.map((edu, index) => (
          <div key={index} className="space-y-1">
            <h3
              className="text-sm leading-tight font-bold"
              style={{ color: colorHex }}
            >
              {edu.degree}
            </h3>
            <p className="text-xs font-semibold text-gray-700">
              {edu.institution}
            </p>
            {edu.fieldOfStudy && (
              <p className="text-xs text-gray-600">{edu.fieldOfStudy}</p>
            )}
            <div className="flex items-center justify-between text-xs text-gray-500">
              {edu.startDate && (
                <span>
                  {formatDate(edu.startDate, "yyyy")}
                  {edu.endDate && " - " + formatDate(edu.endDate, "yyyy")}
                </span>
              )}
              {edu.grade && <span className="font-medium">{edu.grade}</span>}
            </div>
          </div>
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
        className="border-b-2 pb-1.5 text-base font-bold tracking-wider uppercase"
        style={{ color: colorHex, borderColor: colorHex }}
      >
        Professional Summary
      </h2>
      <p className="text-sm leading-relaxed whitespace-pre-line text-gray-700">
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
    <div className="space-y-3">
      <h2
        className="border-b-2 pb-1.5 text-base font-bold tracking-wider uppercase"
        style={{ color: colorHex, borderColor: colorHex }}
      >
        Work Experience
      </h2>
      <div className="space-y-4">
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold" style={{ color: colorHex }}>
                {exp.position}
              </h3>
              {exp.startDate && (
                <span className="text-xs whitespace-nowrap text-gray-600">
                  {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold text-gray-700">{exp.company}</p>
            <div className="text-sm leading-relaxed whitespace-pre-line text-gray-700">
              {exp.description}
            </div>
          </div>
        ))}
      </div>
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
        className="border-b-2 pb-1.5 text-base font-bold tracking-wider uppercase"
        style={{ color: colorHex, borderColor: colorHex }}
      >
        Projects
      </h2>
      <div className="space-y-4">
        {projectsNotEmpty.map((proj, index) => (
          <div key={index} className="space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold" style={{ color: colorHex }}>
                {proj.title}
              </h3>
              <div className="flex gap-2 text-xs whitespace-nowrap">
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
                    Source
                  </Link>
                )}
              </div>
            </div>
            <div className="text-sm leading-relaxed whitespace-pre-line text-gray-700">
              {proj.description}
            </div>
          </div>
        ))}
      </div>
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
              className="border-b-2 pb-1.5 text-base font-bold tracking-wider uppercase"
              style={{ color: colorHex, borderColor: colorHex }}
            >
              {section.title}
            </h2>
            <div className="space-y-4">
              {itemsNotEmpty.map((item, itemIndex) => (
                <div key={itemIndex} className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className="text-sm font-bold"
                      style={{ color: colorHex }}
                    >
                      {item.title}
                    </h3>
                    {item.dateRange && (
                      <span className="text-xs whitespace-nowrap text-gray-600">
                        {item.dateRange}
                      </span>
                    )}
                  </div>
                  {item.subTitle && (
                    <p className="text-xs font-semibold text-gray-700">
                      {item.subTitle}
                    </p>
                  )}
                  {item.description && (
                    <div className="text-sm leading-relaxed whitespace-pre-line text-gray-700">
                      {item.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Professional;
