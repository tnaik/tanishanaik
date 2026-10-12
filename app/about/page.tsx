"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const SKILLS: Record<string, string[]> = {
  Design:      ["Figma", "Adobe Premiere Pro", "Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign", "Prototyping"],
  Development: ["HTML", "CSS", "JavaScript", "PHP", "WordPress", "React", "Next.js", "Claude"],
  Skillsets:   ["Video Editing", "Photography", "Digital Marketing", "SEO Analytics", "Social Media"],
}

const TAB_COLOR: Record<string, { bg: string; ring: string }> = {
  Design:      { bg: "#f256dc", ring: "#f256dc" },
  Development: { bg: "#a5b941", ring: "#a5b941" },
  Skillsets:   { bg: "#5db3f1", ring: "#5db3f1" },
}


export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("Design")

  return (
    <div className="w-full bg-white px-4 py-4 md:p-8 pb-24 md:pb-24">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <Link href="/">
          <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* Hero */}
        <section className="pb-12">
          <div className="bg-white shadow-md p-2 pb-8 mb-8" style={{ width: 200 }}>
            <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
              <Image
                src="/assets/tanisha_upd.jpeg"
                alt="Tanisha Naik"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <h1
            className="leading-none text-[#464646]"
            style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(56px, 10vw, 100px)" }}
          >
            Tanisha Naik
          </h1>
          <p className="text-sm text-[#aaaaaa] mt-1 tracking-wide">
            Product Designer &amp; Creative Technologist
          </p>

          <div className="w-8 h-px bg-[#e8e8e8] my-6" />

          <p className="text-sm text-[#7f7f7f] leading-relaxed mb-4">
            Based in NYC. Passionate about bridging creative &amp; technical skills to craft intentional digital experiences. Lifelong learner, expanding my toolkit to shape tomorrow&apos;s design solutions.
          </p>
          <p className="text-sm text-[#7f7f7f] leading-relaxed mb-4">
            I currently design at AiFA Labs for AI systems in enterprise. Previously, I worked in TV &amp; Radio — from producing social content to making creative code for live music events. Studied computer science at Cal State Fullerton. Hosted workshops &amp; designathons to encourage students in art, design, &amp; code. Recently finished a project designing for an AI research tool in civic tech.
          </p>
          <p className="text-sm font-medium text-[#464646] mb-6">
            Let&apos;s chat about building meaningful digital experiences.
          </p>

          <div className="flex flex-row gap-2 flex-wrap">
            <a href="/NaikTanishaResume_.pdf" target="_blank" rel="noopener noreferrer">
              <Badge className="gap-1 px-3 py-1.5 font-medium bg-[#42C97E] text-[#252422] hover:bg-[#42C97E]/80 rounded-full">
                Resume
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3.5 rotate-45">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                </svg>
              </Badge>
            </a>
            <a href="mailto:tanishapnaik@gmail.com?subject=Interested%20in%20your%20work...&body=Let's%20Connect!">
              <Badge className="gap-1 px-3 py-1.5 bg-[#F7DD43] text-[#252422] hover:bg-[#F7DD43]/80 rounded-full">
                Email
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              </Badge>
            </a>
            <a href="https://www.linkedin.com/in/tanishanaik/" target="_blank" rel="noopener noreferrer">
              <Badge className="gap-1 px-3 py-1.5 bg-[#FF82E0] text-[#252422] hover:bg-[#FF82E0]/80 rounded-full">
                LinkedIn
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" className="size-4">
                  <g fill="#320e3b" fillRule="nonzero">
                    <g transform="scale(4,4)">
                      <path d="M40.227,12c10.918,0 11.773,0.854 11.773,11.773v16.453c0,10.919 -0.855,11.774 -11.773,11.774h-16.454c-10.918,0 -11.773,-0.855 -11.773,-11.773v-16.454c0,-10.919 0.855,-11.773 11.773,-11.773zM25.029,43v-16.272h-5.057v16.272zM22.501,24.401c1.625,0 2.947,-1.322 2.947,-2.949c0,-1.625 -1.322,-2.947 -2.947,-2.947c-1.629,0 -2.949,1.32 -2.949,2.947c0,1.627 1.318,2.949 2.949,2.949zM44,43v-8.925c0,-4.382 -0.946,-7.752 -6.067,-7.752c-2.46,0 -4.109,1.349 -4.785,2.628h-0.068v-2.223h-4.851v16.272h5.054v-8.05c0,-2.122 0.405,-4.178 3.036,-4.178c2.594,0 2.628,2.427 2.628,4.315v7.913z" />
                    </g>
                  </g>
                </svg>
              </Badge>
            </a>
          </div>
        </section>

        <div className="border-t border-[#f0f0f0]" />

        {/* Experience */}
        <section className="pt-6 pb-8">
          <div className="flex flex-col gap-4">
            <h2
              className="text-[#464646]"
              style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(28px, 5vw, 42px)" }}
            >
              EXPERIENCE
            </h2>
            <ul className="flex flex-col gap-5">
              {[
                {
                  company: "AiFA Labs",
                  href: "https://aifalabs.com",
                  role: "Cognitive Product Designer",
                  date: "2023–Present",
                },
                {
                  company: "Infilla",
                  href: "https://www.infilla.com",
                  role: "Product Design Intern, Ideation Lead",
                  date: "Oct 2025–Feb 2026",
                },
                {
                  company: "Titan Radio",
                  href: "https://titanradio.org",
                  role: "Webmaster",
                  date: "2023–2025",
                },
                {
                  company: "Titan Universe",
                  href: "https://titanuniverse.org",
                  role: "Digital Content Coordinator & Chief Website Editor",
                  date: "2023–2024",
                },
              ].map((exp) => (
                <li key={exp.company} className="flex flex-col gap-0.5">
                  <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                    <a
                      href={exp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[#464646] underline underline-offset-2 hover:text-[#7f7f7f] transition-colors"
                    >
                      {exp.company}
                    </a>
                    <span className="text-sm text-[#aaaaaa]">—</span>
                    <span className="text-sm text-[#7f7f7f]">{exp.role}</span>
                  </div>
                  <span className="text-xs text-[#aaaaaa]">{exp.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="border-t border-[#f0f0f0]" />

        {/* Skills */}
        <section className="pt-6 pb-2">
          <h2
            className="text-[#464646] mb-6"
            style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(28px, 5vw, 42px)" }}
          >
            WORKFLOW
          </h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(SKILLS).map((tab) => {
              const isActive = activeTab === tab
              const { bg, ring } = TAB_COLOR[tab]
              return (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  onTouchEnd={(e) => { e.preventDefault(); setActiveTab(tab) }}
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? "ring-2 ring-offset-2 text-[#252422]"
                      : "hover:opacity-80 text-[#7f7f7f]"
                  }`}
                  style={{
                    backgroundColor: isActive ? bg : `${bg}90`,
                    ["--tw-ring-color" as string]: ring,
                  }}
                >
                  {tab}
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            {SKILLS[activeTab].map((skill) => (
              <div
                key={skill}
                className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-[#FAFAFA] text-[#464646] border border-[#d9d9d9] cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>


      </div>
    </div>
  )
}
