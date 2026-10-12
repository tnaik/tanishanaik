import type { Metadata } from "next"
import AifaBrandCaseStudy from "@/components/aifa-case-study"

export const metadata: Metadata = {
  title: "AiFA Labs Brand System — Tanisha Naik",
  description: "Logo, LinkedIn carousels and campaign graphics for AiFA Labs.",
}

export default function AifaCaseStudyPage() {
  return <AifaBrandCaseStudy backHref="/#aifa" />
}
