import Navbar from "@/app/(main)/Navbar";
import { SignUp } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <>
      <main className="relative flex items-center justify-center p-3">
        <Link
          href="/"
          className="group absolute top-4 left-4 z-50 flex w-fit cursor-pointer items-center gap-3"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white opacity-50 blur-xl transition-opacity group-hover:opacity-100" />
            <div className="relative transform bg-white p-3 transition-transform duration-300 group-hover:rotate-12">
              <Sparkles className="h-7 w-7 text-black" />
            </div>
          </div>
          <span className="text-4xl font-black tracking-tighter">
            Gen<span className="text-white/70">Resume</span>
          </span>
        </Link>
        <SignUp />

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

        {/* Pulsing Dots */}
        <div
          className="absolute top-1/3 right-1/4 h-2 w-2 rounded-full bg-white"
          style={{ animation: "pulse 2s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 h-2 w-2 rounded-full bg-white"
          style={{ animation: "pulse 2s ease-in-out infinite 0.5s" }}
        />
        <div
          className="absolute top-21 left-[10%] h-2 w-2 rounded-full bg-white"
          style={{ animation: "pulse 2s ease-in-out infinite 1s" }}
        />
      </main>
    </>
  );
}
