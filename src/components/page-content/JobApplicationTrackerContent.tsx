"use client";

import RollingText from "../RollingText";
import FadeInText from "../FadeInText";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const screenshotSections = [
  {
    label: "Homepage",
    src: "/job-application-tracker/homepage.png",
    alt: "Job Application Tracker Homepage",
  },
  {
    label: "Dashboard",
    src: "/job-application-tracker/dashboard.png",
    alt: "Job Application Tracker Dashboard",
  },
  {
    label: "Add / Edit Job",
    src: "/job-application-tracker/add-edit.png",
    alt: "Job Application Tracker Add / Edit Form",
  },
];

const filterImages = [
  {
    src: "/job-application-tracker/before.png",
    alt: "Dashboard before sorting by date",
    label: "Before sorting by date",
  },
  {
    src: "/job-application-tracker/after.png",
    alt: "Dashboard after sorting by date",
    label: "After sorting by date",
  },
];

const highlights = [
  {
    heading: "Kanban Board",
    body: "Applications are organised across four columns: Saved, Applied, In Process, and Finished. Each card's status is updated directly from the edit form as things progress.",
  },
  {
    heading: "Dual JWT Auth",
    body: "Short-lived access tokens (15 min) paired with rotating refresh tokens (7 days) and reuse detection to prevent replay attacks. Tokens are stored in httpOnly cookies for XSS protection.",
  },
  {
    heading: "Search, Filter & Sort",
    body: "Filter applications by title, company, or location. Sort by last updated, relevant date, company, or title, with relative date formatting throughout the application.",
  },
  {
    heading: "Security-First Backend",
    body: "Rate limiting on auth endpoints (5 requests per 10 minutes per IP), bcrypt password hashing, and cascading account deletion ensure production-grade security practices.",
  },
];

const techStack = [
  {
    label: "React 19 + React Router v7",
    detail: "SPA frontend with client-side routing",
  },
  {
    label: "Tailwind CSS v4 + shadcn/ui",
    detail:
      "Utility-first styling with a pre-built accessible component library",
  },
  {
    label: "GSAP + ScrollTrigger",
    detail: "Animated landing page with smooth scroll-driven transitions",
  },
  {
    label: "Express.js v5 + Node.js",
    detail: "REST API backend handling all CRUD and authentication logic",
  },
  {
    label: "PostgreSQL + Prisma ORM",
    detail: "Relational database with type-safe queries via Prisma",
  },
  {
    label: "JWT + bcrypt",
    detail: "Dual-token authentication with secure password hashing",
  },
  {
    label: "Axios",
    detail: "HTTP client with a token-refresh interceptor for seamless re-auth",
  },
  {
    label: "Vite",
    detail: "Build tooling and dev server for the frontend",
  },
];

export default function JobApplicationTrackerContent() {
  const screenshotsRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  const [lightbox, setLightbox] = useState<{
    src: string;
    alt?: string;
  } | null>(null);

  useEffect(() => {
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(document.body);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Screenshots
      const screenshots =
        screenshotsRef.current?.querySelectorAll(".screenshot");
      if (screenshots) {
        screenshots.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "bottom top",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        });
      }

      // Highlight cards
      const highlightCards =
        highlightsRef.current?.querySelectorAll(".highlight-card");
      if (highlightCards) {
        gsap.fromTo(
          highlightCards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.125,
            scrollTrigger: {
              trigger: highlightsRef.current,
              start: "top 85%",
              end: "bottom top",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      }

      // Tech stack items
      const techItems = techRef.current?.querySelectorAll(".tech-item");
      if (techItems) {
        gsap.fromTo(
          techItems,
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.075,
            scrollTrigger: {
              trigger: techRef.current,
              start: "top 90%",
              end: "bottom top",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-24">
      {/* Back link */}
      <FadeInText>
        <Link
          href="/projects"
          className="mb-12 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="rotate-180"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Projects
        </Link>
      </FadeInText>

      {/* Description */}
      <div className="mb-12">
        <h1 className="mb-2 text-[clamp(1rem,5.5vw,1.875rem)] font-black tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          <RollingText text="JOB APPLICATION TRACKER" duration={0.45} />
        </h1>
        <FadeInText>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Personal Project
          </p>
        </FadeInText>

        <FadeInText>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
            A full-stack web application designed to make finding a job easier
            and less stressful. Applications are tracked on a{" "}
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
              Kanban board
            </strong>{" "}
            across four stages: Saved, Applied, In Process, and Finished. Each
            entry stores the job title, company, location, a link to the
            posting, notes, and key dates, so everything relevant to an
            application lives in one place. The board can be searched and
            filtered by title, company, or location, and sorted by last updated,
            relevant date, company, or title, making it easy to stay on top of a
            busy job search without losing track of where things stand.
          </p>
        </FadeInText>

        <FadeInText>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              "React 19",
              "Express.js",
              "PostgreSQL",
              "Prisma",
              "JWT",
              "Tailwind CSS v4",
              "GSAP",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-[#2a2c2a] dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </FadeInText>

        <FadeInText>
          <div className="mt-6">
            <a
              href="https://github.com/vlad-ionita/Job-Application-Tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
            >
              GitHub
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </FadeInText>
      </div>

      {/* Screenshots */}
      <section className="mb-12">
        <FadeInText>
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Preview
          </h2>
        </FadeInText>

        <div ref={screenshotsRef} className="flex flex-col gap-10">
          {screenshotSections.map((section) => (
            <div key={section.label}>
              <FadeInText>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  {section.label}
                </p>
              </FadeInText>
              <div
                className="screenshot overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 cursor-zoom-in dark:border-[#2a2c2a] dark:bg-[#1a1c1a]"
                style={{ opacity: 0 }}
                onClick={() =>
                  setLightbox({ src: section.src, alt: section.alt })
                }
              >
                <Image
                  src={section.src}
                  alt={section.alt}
                  width={1280}
                  height={900}
                  className="w-full h-auto"
                  sizes="(max-width: 640px) 100vw, 75vw"
                />
              </div>
            </div>
          ))}

          {/* Search & Filter */}
          <div>
            <FadeInText>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Search &amp; Filter
              </p>
            </FadeInText>
            <div className="grid gap-3 sm:grid-cols-2">
              {filterImages.map((img) => (
                <div key={img.src} className="flex flex-col gap-2">
                  <div
                    className="screenshot overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 cursor-zoom-in dark:border-[#2a2c2a] dark:bg-[#1a1c1a]"
                    style={{ opacity: 0 }}
                    onClick={() => setLightbox({ src: img.src, alt: img.alt })}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={1280}
                      height={900}
                      className="w-full h-auto"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <FadeInText>
                    <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
                      {img.label}
                    </p>
                  </FadeInText>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project highlights */}
      <section className="mb-12">
        <FadeInText>
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Project Highlights
          </h2>
        </FadeInText>
        <div ref={highlightsRef} className="grid gap-5 sm:grid-cols-2">
          {highlights.map((h) => (
            <div
              key={h.heading}
              style={{ opacity: 0 }}
              className="highlight-card rounded-2xl border border-zinc-200 bg-white p-6 dark:border-[#2a2c2a] dark:bg-[#1a1c1a]"
            >
              <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {h.heading}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {h.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section>
        <FadeInText>
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Tech Stack
          </h2>
        </FadeInText>
        <div
          ref={techRef}
          className="flex flex-col divide-y divide-zinc-100 dark:divide-[#2a2c2a]"
        >
          {techStack.map((item) => (
            <div
              key={item.label}
              style={{ opacity: 0 }}
              className="tech-item flex flex-col gap-0.5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
            >
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 sm:shrink-0">
                {item.label}
              </span>
              <span className="text-sm text-zinc-500 sm:text-right dark:text-zinc-400">
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <Image
            src={lightbox.src}
            alt={lightbox.alt ?? ""}
            width={1280}
            height={900}
            className="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain rounded-xl"
            sizes="90vw"
          />
        </div>
      )}
    </main>
  );
}
