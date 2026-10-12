"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function NavigationSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const close = () => setIsOpen(false)

  return (
    <div className="fixed bottom-6 left-4 z-50 flex flex-col items-start gap-2 pointer-events-none">

      {/* Nav card — expands from button corner */}
      <div
        className={`w-56 bg-black border border-[#333] shadow-lg overflow-hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          clipPath: isOpen ? "inset(0% 0% 0% 0%)" : "inset(100% 100% 0% 0%)",
          transition: isOpen
            ? "clip-path 0.45s cubic-bezier(0.16, 1, 0.3, 1)"
            : "clip-path 0.25s cubic-bezier(0.4, 0, 1, 1)",
        }}
      >
        <div className="p-5 flex flex-col gap-5">
          <nav className="space-y-3">
            <Link href="/about" className="block text-sm text-white hover:text-white/40 transition-colors" onClick={close}>
              About
            </Link>
            <Link href="/#work" className="block text-sm text-white hover:text-white/40 transition-colors" onClick={close}>
              Work
            </Link>
            <Link href="/#projects" className="block text-sm text-white hover:text-white/40 transition-colors" onClick={close}>
              Projects
            </Link>
            <ul className="pl-3 space-y-1.5 border-l border-[#333]">
              <li>
                <Link href="/case-studies/infilla" className="block text-xs text-[#666] hover:text-white transition-colors" onClick={close}>
                  01 Infilla
                </Link>
              </li>
              <li>
                <Link href="/case-studies/aifa" className="block text-xs text-[#666] hover:text-white transition-colors" onClick={close}>
                  02 AiFA Labs
                </Link>
              </li>
              <li>
                <Link href="/#titan-radio" className="block text-xs text-[#666] hover:text-white transition-colors" onClick={close}>
                  03 Titan Radio
                </Link>
              </li>
              <li>
                <Link href="/case-studies/titan-universe" className="block text-xs text-[#666] hover:text-white transition-colors" onClick={close}>
                  04 Titan Universe
                </Link>
              </li>
              <li>
                <Link href="/case-studies/ACM" className="block text-xs text-[#666] hover:text-white transition-colors" onClick={close}>
                  05 ACM <sup>(Associated Works)</sup>
                </Link>
              </li>
              <li>
                <Link href="/case-studies/memory-box" className="block text-xs text-[#666] hover:text-white transition-colors" onClick={close}>
                  06 MemoryBox
                </Link>
              </li>
              <li>
                <Link href="/#BlogIt" className="block text-xs text-[#666] hover:text-white transition-colors" onClick={close}>
                  07 BlogIt!
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-sm text-white mb-2">Contact</p>
            <div className="flex flex-row gap-2">
              <a
                href="/NaikTanishaResume_.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Resume"
              >
                <Badge className="gap-1 p-2 font-medium bg-[#42C97E] text-[#252422] hover:bg-[#42C97E]/80">
                  Resume
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 rotate-45">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                  </svg>
                </Badge>
              </a>

              <Badge className="gap-1 bg-[#F7DD43] text-[#252422] hover:bg-[#F7DD43]/80">
                <a href="mailto:tanishapnaik@gmail.com?subject=Interested%20in%20your%20work...&body=Let's%20Connect!" aria-label="Email">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                  </svg>
                </a>
              </Badge>

              <Badge className="gap-1 bg-[#FF82E0] text-[#252422] hover:bg-[#FF82E0]/80">
                <a href="https://www.linkedin.com/in/tanishanaik/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256" className="size-5">
                    <g fill="#320e3b" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none">
                      <g transform="scale(4,4)">
                        <path d="M40.227,12c10.918,0 11.773,0.854 11.773,11.773v16.453c0,10.919 -0.855,11.774 -11.773,11.774h-16.454c-10.918,0 -11.773,-0.855 -11.773,-11.773v-16.454c0,-10.919 0.855,-11.773 11.773,-11.773zM25.029,43v-16.272h-5.057v16.272zM22.501,24.401c1.625,0 2.947,-1.322 2.947,-2.949c0,-1.625 -1.322,-2.947 -2.947,-2.947c-1.629,0 -2.949,1.32 -2.949,2.947c0,1.627 1.318,2.949 2.949,2.949zM44,43v-8.925c0,-4.382 -0.946,-7.752 -6.067,-7.752c-2.46,0 -4.109,1.349 -4.785,2.628h-0.068v-2.223h-4.851v16.272h5.054v-8.05c0,-2.122 0.405,-4.178 3.036,-4.178c2.594,0 2.628,2.427 2.628,4.315v7.913z"></path>
                      </g>
                    </g>
                  </svg>
                </a>
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Menu button — square, flush below card */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        className="flex items-center gap-2 bg-black text-white text-xs font-medium px-3 py-2 hover:bg-[#464646] transition-colors duration-200 pointer-events-auto"
      >
        <span>{isOpen ? "Close" : "Menu"}</span>
      </button>

    </div>
  )
}
