import ResumePreview from "@/components/ResumePreview";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";

interface ResumeSharedPageProps {
  params: Promise<{ resumeId: string }>;
}

async function ResumeSharedPage({ params }: ResumeSharedPageProps) {
  const { resumeId } = await params;

  if (!resumeId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Invalid Link</h1>
          <p className="text-muted-foreground mt-2">No resume ID provided</p>
        </div>
      </div>
    );
  }

  const resumeData = await prisma.resume.findUnique({
    where: { id: resumeId },
    include: resumeDataInclude,
  });

  if (!resumeData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Resume Not Found</h1>
          <p className="text-muted-foreground mt-2">
            This resume doesn't exist or has been removed
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl">
        <ResumePreview
          resumeData={mapToResumeValues(resumeData)}
          className="shadow-2xl"
        />
      </div>
    </div>
  );
}

export default ResumeSharedPage;
