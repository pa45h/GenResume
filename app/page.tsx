"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  Brain,
  Layout,
  ClipboardCheck,
  Copyright,
} from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LinkedinIcon } from "@/components/ui/linkedin";
import { MailCheckIcon } from "@/components/ui/mail-check";
import { GithubIcon } from "@/components/ui/github";
import Link from "next/link";

export default function GenResumeLanding() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black/90 py-10 text-white sm:px-4 flex justify-center items-center">
      {/* Animated Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-20"
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
      <div
        className="absolute top-20 right-20 z-0 h-32 w-32 rounded-full border-2 border-white/20"
        style={{ animation: "float 2s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-20 left-20 z-0 h-24 w-24 rotate-45 border-2 border-white/20"
        style={{ animation: "spin 8s linear infinite reverse" }}
      />
      <div
        className="absolute top-1/4 left-1/2 z-0 h-16 w-16 border-2 border-white/10"
        style={{ animation: "float 5s ease-in-out infinite" }}
      />

      {/* Animated Lines */}
      <div
        className="absolute top-0 left-[12%] z-0 h-full w-px bg-linear-to-b from-transparent via-white to-transparent"
        style={{ animation: "slideDown 3s ease-in-out infinite" }}
      />
      <div
        className="absolute top-0 left-[55%] z-0 h-full w-px bg-linear-to-b from-transparent via-white to-transparent"
        style={{ animation: "slideDown 3s ease-in-out infinite" }}
      />

      <div
        className="absolute top-0 right-[15%] z-0 h-full w-px bg-linear-to-b from-transparent via-white to-transparent"
        style={{ animation: "slideDown 3s ease-in-out infinite 1s" }}
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

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-screen max-w-7xl px-8">
        <div className="flex w-full items-center justify-between gap-8">
          {/* Left Section - Hero */}
          <div className="col-span-7 space-y-8">
            {/* Logo */}
            <Link
              href="/"
              className="group flex w-fit cursor-pointer items-center gap-3"
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

            {/* Main Headline */}
            <div className="space-y-4">
              <div className="animate-in fade-in slide-in-from-left inline-block border border-white/30 px-4 py-2 backdrop-blur-sm duration-700">
                <span className="text-xs font-bold tracking-widest">
                  AI-POWERED RESUME BUILDER{" "}
                  <span className="mr-1 rounded-sm bg-white px-1.5 py-0.5 text-black">
                    FREE
                  </span>
                </span>
              </div>

              <h1 className="animate-in fade-in slide-in-from-left text-6xl leading-none font-black tracking-tight delay-150 duration-700 sm:text-7xl">
                Resumes That
                <br />
                <span className="relative mt-2 inline-block">
                  <span className="animate-gradient relative z-10 bg-linear-to-r from-white via-gray-300 to-white bg-size-[200%_auto] bg-clip-text text-transparent">
                    Win Jobs
                  </span>
                  <div className="animate-in slide-in-from-left absolute bottom-2 left-0 h-3 w-full -skew-y-1 bg-white/20 delay-300 duration-700" />
                </span>
              </h1>

              <p className="animate-in fade-in slide-in-from-left max-w-xl leading-relaxed text-white/60 delay-500 duration-700 sm:text-xl">
                Transform your career story through an interview-winning resume.
                AI-powered, ATS-optimized, ready in minutes.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="animate-in fade-in slide-in-from-left flex items-center gap-4 delay-700 duration-700">
              <Button
                className="group relative h-15 cursor-pointer overflow-hidden rounded-none bg-white px-8 py-4 font-bold text-black sm:w-full"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => redirect("/resumes")}
              >
                <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:-translate-y-full">
                  Create Resume
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                </span>
                <div className="absolute inset-0 translate-y-full bg-black transition-transform duration-300 group-hover:translate-y-0" />
                <span className="absolute inset-0 z-20 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-2">
                    Let's Go
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </span>
              </Button>
            </div>

            {/* Stats */}
            <div className="animate-in fade-in slide-in-from-left flex items-center gap-8 border-t border-white/10 delay-1000 duration-700">
              {[
                { value: "Create", label: "Your Way" },
                { value: "Refine", label: "With Clarity" },
                { value: "Achieve", label: "More" },
              ].map((stat, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div
                    className="mb-1 text-xl font-black transition-transform group-hover:scale-110 sm:text-3xl"
                    style={{ animation: "countUp 2s ease-out" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs tracking-wider text-white/50 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Features */}
          <div className="col-span-5 hidden space-y-4 md:block">
            {[
              {
                icon: <Brain className="h-6 w-6" />,
                title: "AI Assistance",
                desc: "Smart summaries & guided writing",
              },
              {
                icon: <Layout className="h-6 w-6" />,
                title: "Adaptive Templates",
                desc: "Clean, modern, customizable layouts",
              },
              {
                icon: <ClipboardCheck className="h-6 w-6" />,
                title: "ATS Friendly",
                desc: "Optimized structure recruiters trust",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative cursor-pointer overflow-hidden border border-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/5"
              >
                {/* Animated Border */}
                <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                  <div
                    className="animate-shimmer absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent"
                    style={{
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2s infinite",
                    }}
                  />
                </div>

                <div className="relative z-10 flex items-start gap-4">
                  <div className="bg-white p-2 text-black transition-colors duration-300 group-hover:bg-black group-hover:text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold">{feature.title}</h3>
                    <p className="text-sm opacity-60 group-hover:opacity-100">
                      {feature.desc}
                    </p>
                  </div>
                </div>

                {/* Number Badge */}
                <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center border border-white/20 text-xs font-black transition-colors duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
                  0{idx + 1}
                </div>
              </div>
            ))}

            {/* Process Indicator */}
            <div className="border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest text-white/50 uppercase">
                  Quick Process
                </span>
                <span className="text-xs font-bold">~5 MIN</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className="relative h-1 flex-1 overflow-hidden bg-white/20"
                  >
                    <div
                      className="absolute inset-0 bg-white"
                      style={{
                        animation: `load ${step}s ease-in-out infinite`,
                        animationDelay: `${(step - 1) * 0.3}s`,
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between text-xs text-white/40">
                <span>Input Data</span>
                <span>AI Process</span>
                <span>Download</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="absolute bottom-3 left-1/2 z-50 hidden -translate-x-1/2 flex-col items-center gap-4 text-sm sm:flex">
        <div className="flex items-center gap-6 text-white/70">
          {[
            {
              label: <LinkedinIcon className="duration-300" />,
              href: "https://linkedin.com/in/parthkatariya",
            },
            {
              label: <GithubIcon className="duration-300" />,
              href: "https://github.com/pa45h",
            },
            {
              label: <MailCheckIcon className="duration-300" />,
              href: "mailto:parth.katariya87@gmail.com",
            },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              className="group relative transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Copyright (Bottom Right) */}
      <div className="absolute bottom-2 left-7 flex items-center gap-1.5 text-sm text-white/40">
        GenResume <Copyright className="size-4" /> 2025
      </div>
      <div className="absolute right-7 bottom-2 flex items-center gap-1.5 text-sm text-white/40">
        ~ Parth Katariya
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 h-32 w-32 border-t-3 border-l-3 border-white/40" />
      <div className="absolute right-0 bottom-0 h-32 w-32 border-r-3 border-b-3 border-white/40" />
      <div className="absolute top-0 right-0 h-32 w-32 border-t-3 border-r-3 border-white/40" />
      <div className="absolute bottom-0 left-0 h-32 w-32 border-b-3 border-l-3 border-white/40" />

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes load {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.5);
            opacity: 1;
          }
        }
        @keyframes countUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-in-from-left {
          from {
            transform: translateX(-30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .fade-in {
          animation-name: fade-in;
        }
        .slide-in-from-left {
          animation-name: slide-in-from-left;
        }
        .delay-150 {
          animation-delay: 150ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
        .duration-700 {
          animation-duration: 700ms;
        }
      `}</style>
    </div>
  );
}
