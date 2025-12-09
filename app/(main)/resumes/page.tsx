import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import ResumeItem from "./ResumeItem";

export const metadata: Metadata = {
  title: "Your Resumes",
  description: "Manage and create your resumes with GenResume.",
};

export default async function ResumesPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
        <div>Please sign in to view your resumes.</div>
      </main>
    );
  }

  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: resumeDataInclude,
    }),
    prisma.resume.count({ where: { userId } }),
  ]);

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-3 py-6">
      <div className="flex w-full flex-col items-center justify-between gap-3 rounded-lg border border-white/20 p-3 text-center shadow-md">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Your Resumes ({totalCount})</h1>
        </div>
        <Button
          asChild
          className="flex w-fit gap-2 font-bold shadow-[0px_0px_500px_rgba(255,255,255)] transition-shadow hover:shadow-[0px_0px_10px_rgba(255,255,255)]"
        >
          <Link href="/editor">
            <PlusSquare className="size-5" />
            Create New Resume
          </Link>
        </Button>
      </div>
      <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {resumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>

      {/* Animated Grid Background */}
      <div
        className="absolute inset-0 -z-50 h-screen w-screen opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: `perspective(500px) rotateX(60deg) scale(2) translateY(-50%)`,
          transformOrigin: "center top",
        }}
      />

      {/* Geometric Shapes */}
      <div className="animate-spin-slow absolute top-20 right-20 h-32 w-32 rounded-full border-2 border-white/20" />
      <div
        className="absolute bottom-20 left-20 h-24 w-24 rotate-45 border-2 border-white/20"
        style={{ animation: "spin 8s linear infinite reverse" }}
      />
      <div
        className="absolute top-1/4 left-1/2 h-16 w-16 border-2 border-white/10"
        style={{ animation: "float 5s ease-in-out infinite" }}
      />

      {/* Pulsing Dots */}
      <div
        className="absolute top-1/3 right-1/4 h-2 w-2 rounded-full bg-white"
        style={{ animation: "pulse 2s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-1/3 left-1/2 h-2 w-2 rounded-full bg-white"
        style={{ animation: "pulse 2s ease-in-out infinite 0.5s" }}
      />
      <div
        className="absolute top-21 left-[10%] h-2 w-2 rounded-full bg-white"
        style={{ animation: "pulse 2s ease-in-out infinite 1s" }}
      />
    </main>
  );
}
