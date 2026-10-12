"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowUpRight, LayoutGrid, List } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const FEATURED = {
  id: "infilla",
  num: "01",
  name: "Infilla",
  href: "https://www.infilla.com",
  caseStudy: "/case-studies/infilla",
  description:
    "Civic tech research project redesigning AI-enhanced search for Infilla Forum, a Q&A platform used by city planners in NYC and SF. Led research and ideation for a 13-week project helping planners find zoning answers faster.",
  tags: [
    { label: "User Research", color: "bg-[#4ecdc4] text-[#252422]", hover: "hover:bg-[#4ecdc4]/60" },
    { label: "UX Design", color: "bg-[#f256dc] text-[#252422]", hover: "hover:bg-[#f256dc]/60" },
    { label: "Ideation", color: "bg-[#a78bfa] text-[#252422]", hover: "hover:bg-[#a78bfa]/60" },
    { label: "Prototyping", color: "bg-[#ff9f6d] text-[#252422]", hover: "hover:bg-[#ff9f6d]/60" },
  ],
  media: [
    { type: "image", src: "/assets/infilla/thumbnail.png", alt: "Infilla Thumbnail" },
  ],
}

const PROJECTS = [
  {
    id: "aifa",
    num: "02",
    name: "AiFA Labs",
    href: "https://www.aifalabs.com",
    caseStudy: "/case-studies/aifa" as string | null,
    thumbnail: "/assets/aifa/thumbnail.jpg",
    description: "Brand and marketing design for AiFA Labs' enterprise AI suite. The Cerebro mark in dark and light, LinkedIn carousel series for SASA, and event campaigns for the AI Summit New York and SAP Sapphire Madrid.",
    tags: [
      { label: "Branding", color: "bg-[#a78bfa] text-[#252422]", hover: "hover:bg-[#a78bfa]/60" },
      { label: "Graphic Design", color: "bg-[#e5f2a5] text-[#252422]", hover: "hover:bg-[#e5f2a5]/60" },
      { label: "Marketing", color: "bg-[#f56a6a] text-[#252422]", hover: "hover:bg-[#f56a6a]/60" },
    ],
    wip: false,
  },
  {
    id: "titan-radio",
    num: "03",
    name: "Titan Radio",
    href: "https://titanradio.org",
    caseStudy: null as string | null,
    thumbnail: "/assets/TR/TR1.png",
    description: "College blog website for Cal State University, Fullerton. Built using Wordpress, HTML, CSS, & JS. Along with social media graphics for Instagram, built using Canva & Figma.",
    tags: [
      { label: "UX Design", color: "bg-[#f256dc] text-[#252422]", hover: "hover:bg-[#f256dc]/60" },
      { label: "Web Dev", color: "bg-[#a5b941] text-[#252422]", hover: "hover:bg-[#a5b941]/60" },
    ],
    wip: true,
  },
  {
    id: "titan-universe",
    num: "04",
    name: "Titan Universe",
    href: "https://titanuniverse.org",
    caseStudy: "/case-studies/titan-universe",
    thumbnail: "/assets/TU/TU1.png",
    description: "College blog website for Cal State University, Fullerton. Built using Wordpress, HTML, CSS, & JS. Along with social media graphics for Instagram, built using Canva & Figma.",
    tags: [
      { label: "User Research", color: "bg-[#4ecdc4] text-[#252422]", hover: "hover:bg-[#4ecdc4]/60" },
      { label: "UX Design", color: "bg-[#f256dc] text-[#252422]", hover: "hover:bg-[#f256dc]/60" },
      { label: "Marketing", color: "bg-[#f56a6a] text-[#252422]", hover: "hover:bg-[#f56a6a]/60" },
      { label: "Web Dev", color: "bg-[#a5b941] text-[#252422]", hover: "hover:bg-[#a5b941]/60" },
    ],
    wip: false,
  },
  {
    id: "acm",
    num: "05",
    name: "ACM — Associated Works",
    href: "https://acmcsuf.com",
    caseStudy: "/case-studies/ACM",
    thumbnail: "/assets/ACM/NW1.png",
    description: "Creatively engineered & demonstrated concepts for the largest tech club at Cal State University, Fullerton. Designed apps, flyers, websites, & graphics. Hosted several workshops related to Design & Technology.",
    tags: [
      { label: "UX Design", color: "bg-[#f256dc] text-[#252422]", hover: "hover:bg-[#f256dc]/60" },
      { label: "Graphic Design", color: "bg-[#e5f2a5] text-[#252422]", hover: "hover:bg-[#e5f2a5]/60" },
      { label: "Marketing", color: "bg-[#f56a6a] text-[#252422]", hover: "hover:bg-[#f56a6a]/60" },
      { label: "Web Dev", color: "bg-[#a5b941] text-[#252422]", hover: "hover:bg-[#a5b941]/60" },
    ],
    wip: false,
  },
  {
    id: "memory-box",
    num: "06",
    name: "MemoryBox",
    href: null as string | null,
    caseStudy: "/case-studies/memory-box",
    thumbnail: "/assets/MemoryBox/Memorybox1.png",
    description: "Web project designed using Figma for Code&Crush Designathon (presented by CSUF Society of Women Engineers), placing 3rd. Reimagining means of preserving love, virtually.",
    tags: [{ label: "UX Design", color: "bg-[#f256dc] text-[#252422]", hover: "hover:bg-[#f256dc]/60" }],
    wip: false,
  },
  {
    id: "BlogIt",
    num: "07",
    name: "BlogIt!",
    href: null as string | null,
    caseStudy: null as string | null,
    thumbnail: "/assets/BlogIt/BlogIt1.png",
    description: "Reinventing blogging platforms for the new age — CPSC362 Software Engineering.",
    tags: [
      { label: "UX Design", color: "bg-[#f256dc] text-[#252422]", hover: "hover:bg-[#f256dc]/60" },
      { label: "Web Dev", color: "bg-[#a5b941] text-[#252422]", hover: "hover:bg-[#a5b941]/60" },
    ],
    wip: false,
  },
]

function FeaturedProject() {
  return (
    <div id={FEATURED.id} className="mb-2 border border-[#d9d9d9] bg-white overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#d9d9d9]">
        <span className="text-xs font-medium text-[#7f7f7f] tracking-widest uppercase">
          Recent — {FEATURED.num}
        </span>
        {FEATURED.href && (
          <a
            href={FEATURED.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-1 text-[#7f7f7f] hover:text-[#464646] transition-colors"
            aria-label="Visit Infilla"
          >
            <span className="text-xs font-medium">LINK TO SITE</span>
            <ArrowUpRight size={16} strokeWidth={2} />
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Image — shows first on mobile, second column on desktop */}
        <div className="relative bg-[#fafafa] overflow-hidden min-h-[180px] md:min-h-[280px] md:order-last">
          <div className="h-full">
            {FEATURED.media.map((m, i) =>
              m.type === "image" ? (
                <Image
                  key={m.src}
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  quality={85}
                />
              ) : (
                <video
                  key={i}
                  src={m.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="object-cover rounded max-h-[240px] w-auto flex-shrink-0 hover:scale-[1.02] transition-transform duration-300"
                />
              )
            )}
          </div>
        </div>

        <div className="p-5 md:p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl md:text-4xl font-medium text-[#464646] mb-3 leading-tight">
              {FEATURED.name}
            </h3>
            <p className="text-sm text-[#7f7f7f] leading-relaxed mb-4">
              {FEATURED.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {FEATURED.tags.map((t) => (
                <Badge key={t.label} variant="outline" className={`border-0 ${t.color} ${t.hover} transition-colors`}>
                  {t.label}
                </Badge>
              ))}
            </div>
          </div>
          <Link href={FEATURED.caseStudy}>
            <Button
              variant="outline"
              className="rounded-none text-black ring-1 ring-black hover:bg-black hover:text-white gap-2 w-fit"
            >
              <span className="text-sm font-medium">Case Study</span>
              <BookOpen size={15} strokeWidth={2.5} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function ProjectRow({ project }: { project: (typeof PROJECTS)[0] }) {
  const [hovered, setHovered] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const router = useRouter()

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY })
  }

  return (
    <div
      id={project.id}
      className={`border-b border-[#f0f0f0] last:border-b-0 transition-colors duration-200 ${project.caseStudy ? "lg:cursor-none" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div onClick={() => project.caseStudy && router.push(project.caseStudy)}>

        {/* Mobile layout — always shows description, no hover needed */}
        <div className="lg:hidden px-4 py-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-baseline gap-2 min-w-0 flex-wrap">
              <span className="text-2xl font-medium text-[#d9d9d9] tabular-nums shrink-0">{project.num}</span>
              <h3 className="text-2xl font-medium text-[#464646] leading-tight">{project.name}</h3>
            </div>
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-0.5 text-[#aaaaaa] hover:text-[#464646] transition-colors shrink-0 mt-1"
              >
                <span className="text-xs">Site</span>
                <ArrowUpRight size={12} strokeWidth={2} />
              </a>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.tags.map((t) => (
              <Badge key={t.label} variant="outline" className={`border-0 ${t.color} transition-colors`}>
                {t.label}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-[#7f7f7f] leading-relaxed mb-3">{project.description}</p>
          {project.caseStudy && (
            <button
              onClick={(e) => { e.stopPropagation(); router.push(project.caseStudy!) }}
              className="flex items-center gap-1.5 text-xs font-medium text-[#aaaaaa] ring-1 ring-[#d9d9d9] px-2.5 py-1 active:bg-black active:text-white active:ring-black transition-colors"
            >
              <BookOpen size={11} strokeWidth={2.5} />
              <span>Case Study</span>
            </button>
          )}
        </div>

        {/* Desktop layout — hover to expand */}
        <div className="hidden lg:block">
          <div className={`grid grid-cols-[40px_1fr_auto] items-center gap-4 py-3 px-5 transition-colors duration-200 ${hovered ? "bg-[#fafafa]" : "bg-white"}`}>
            <span className="text-3xl font-medium text-[#d9d9d9] select-none tabular-nums">
              {project.num}
            </span>
            <div className="min-w-0 flex items-center gap-3 flex-wrap">
              <h3 className="text-3xl font-medium text-[#464646]">{project.name}</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <Badge key={t.label} variant="outline" className={`border-0 ${t.color} ${t.hover} transition-colors`}>
                    {t.label}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {project.caseStudy && (
                <BookOpen size={13} strokeWidth={2} className="text-[#d9d9d9]" />
              )}
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-[#d9d9d9] hover:text-[#464646] transition-colors"
                  aria-label={`Visit ${project.name}`}
                >
                  <span className="text-xs">Site</span>
                  <ArrowUpRight size={13} strokeWidth={2} />
                </a>
              )}
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out bg-[#fafafa] ${
              hovered ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex gap-4 px-5 pb-4 pt-1 items-start">
              <div className="w-1/6 overflow-hidden flex-shrink-0 bg-[#f0f0f0]">
                <Image
                  src={project.thumbnail}
                  alt={project.name}
                  width={128}
                  height={80}
                  className="w-full h-full object-cover"
                  quality={75}
                />
              </div>
              <p className="text-sm text-[#7f7f7f] leading-relaxed max-w-lg pt-1">
                {project.description}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Cursor label — desktop only */}
      {hovered && project.caseStudy && (
        <div
          className="hidden lg:flex fixed pointer-events-none z-50 bg-black text-white text-xs font-medium px-3 py-1.5 whitespace-nowrap items-center gap-1.5 translate-x-3 -translate-y-1/2"
          style={{ left: cursor.x, top: cursor.y }}
        >
          <BookOpen size={12} strokeWidth={2.5} />
          OPEN CASE STUDY
        </div>
      )}
    </div>
  )
}

const GRID_PROJECTS = [
  {
    id: FEATURED.id,
    num: FEATURED.num,
    name: FEATURED.name,
    href: FEATURED.href,
    caseStudy: FEATURED.caseStudy,
    thumbnail: FEATURED.media[0].src,
    thumbnails: null as string[] | null,
    tags: FEATURED.tags,
  },
  ...PROJECTS.map((p) => ({
    id: p.id,
    num: p.num,
    name: p.name,
    href: p.href,
    caseStudy: p.caseStudy,
    thumbnail: p.thumbnail,
    thumbnails: p.id === "BlogIt"
      ? ["/assets/BlogIt/BlogIt1.png", "/assets/BlogIt/BlogIt2.png", "/assets/BlogIt/BlogIt3.png"]
      : null,
    tags: p.tags,
  })),
]

function FadingThumbnail({ srcs, alt }: { srcs: string[]; alt: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % srcs.length)
    }, 2800)
    return () => clearInterval(id)
  }, [srcs.length])

  return (
    <>
      {srcs.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{ opacity: i === index ? 1 : 0, transition: "opacity 1.4s ease-in-out" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover"
            quality={75}
          />
        </div>
      ))}
    </>
  )
}

function GridView() {
  const router = useRouter()

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {GRID_PROJECTS.map((project) => {
        const isClickable = !!(project.caseStudy || project.href)
        return (
          <div
            key={project.id}
            className={`group overflow-hidden bg-[#fafafa] border border-[#f0f0f0] ${isClickable ? "cursor-pointer" : ""}`}
            onClick={() => {
              if (project.caseStudy) router.push(project.caseStudy)
              else if (project.href) window.open(project.href, "_blank")
            }}
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#f0f0f0]">
              {project.thumbnails ? (
                <FadingThumbnail srcs={project.thumbnails} alt={project.name} />
              ) : (
                <Image
                  src={project.thumbnail}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  quality={75}
                />
              )}
            </div>
            <div className="px-3 py-2.5">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-[#d9d9d9] tabular-nums shrink-0">{project.num}</span>
                <h3 className="text-base font-medium text-[#464646] leading-snug">{project.name}</h3>
              </div>
              <div className="hidden md:flex flex-wrap gap-1 mt-1.5">
                {project.tags.slice(0, 2).map((t) => (
                  <Badge key={t.label} variant="outline" className={`border-0 ${t.color} ${t.hover} transition-colors`}>
                    {t.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function ProjectsSection() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  return (
    <section id="projects" className="bg-white px-4 md:px-8 pb-12">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-2xl font-medium text-[#464646]">Projects</h2>
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setViewMode("list")}
            aria-label="List view"
            className={`p-1.5 transition-colors ${viewMode === "list" ? "text-[#464646]" : "text-[#d9d9d9] hover:text-[#aaaaaa]"}`}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            className={`p-1.5 transition-colors ${viewMode === "grid" ? "text-[#464646]" : "text-[#d9d9d9] hover:text-[#aaaaaa]"}`}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {viewMode === "list" ? (
        <>
          <FeaturedProject />
          <div className="mt-2">
            <div className="px-1 py-2">
              <span className="text-xs font-medium text-[#7f7f7f] tracking-widest uppercase">
                More projects
              </span>
            </div>
            <div>
              {PROJECTS.map((p) => (
                <ProjectRow key={p.id} project={p} />
              ))}
            </div>
          </div>
          <div className="mt-3 px-5 py-4 mb-4 border border-dashed border-[#d9d9d9]">
            <p className="text-sm font-medium text-[#464646]">Coming soon</p>
            <p className="text-xs text-[#7f7f7f] mt-0.5">Designing, tinkering, creating more projects...</p>
          </div>
        </>
      ) : (
        <GridView />
      )}
    </section>
  )
}
