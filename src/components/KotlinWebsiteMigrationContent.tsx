"use client";

import RollingText from "./RollingText";
import FadeInText from "./FadeInText";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const beforeImages = [
  {
    src: "/kotlin-website-migration/before1.png",
    alt: "Kotlin homepage before migration - image 1",
  },
  {
    src: "/kotlin-website-migration/before2.png",
    alt: "Kotlin homepage before migration - image 2",
  },
  {
    src: "/kotlin-website-migration/before3.png",
    alt: "Kotlin homepage before migration - image 3",
  },
  {
    src: "/kotlin-website-migration/before4.png",
    alt: "Kotlin homepage before migration - image 4",
  },
  {
    src: "/kotlin-website-migration/before5.png",
    alt: "Kotlin homepage before migration - image 5",
  },
  {
    src: "/kotlin-website-migration/before6.png",
    alt: "Kotlin homepage before migration - image 6",
  },
  {
    src: "/kotlin-website-migration/before7.png",
    alt: "Kotlin homepage before migration - image 7",
  },
];

const afterImages = [
  {
    src: "/kotlin-website-migration/after1.png",
    alt: "Kotlin homepage after migration - image 1",
  },
  {
    src: "/kotlin-website-migration/after2.png",
    alt: "Kotlin homepage after migration - image 2",
  },
  {
    src: "/kotlin-website-migration/after3.png",
    alt: "Kotlin homepage after migration - image 3",
  },
  {
    src: "/kotlin-website-migration/after4.png",
    alt: "Kotlin homepage after migration - image 4",
  },
  {
    src: "/kotlin-website-migration/after5.png",
    alt: "Kotlin homepage after migration - image 5",
  },
  {
    src: "/kotlin-website-migration/after6.png",
    alt: "Kotlin homepage after migration - image 6",
  },
  {
    src: "/kotlin-website-migration/after7.png",
    alt: "Kotlin homepage after migration - image 7",
  },
];

const techStack = [
  {
    label: "React Router 7",
    detail: "Framework mode with SSR enabled by default",
  },
  {
    label: "TypeScript",
    detail: "Strict typing across all components and routes",
  },
  {
    label: "@rescui",
    detail: "Third-party component library used throughout for maintainability",
  },
  {
    label: "SCSS",
    detail: "Ported original styling from the source project",
  },
  { label: "Vite", detail: "Build tooling and dev server" },
  {
    label: "Docker",
    detail: "Containerised production deployment via Docker Compose",
  },
  { label: "Node.js 20+", detail: "Runtime for SSR and build pipeline" },
];

const highlights = [
  {
    heading: "Server-Side Rendering",
    body: "Migrated from a Flask-backed client-rendered setup to React Router 7 in framework mode, enabling server-side rendering for correct initial HTML output, improved performance, and SEO.",
  },
  {
    heading: "Full Interactivity Preserved",
    body: "Tab switching and all other interactive elements remain fully functional after hydration with no regressions against the original source project.",
  },
  {
    heading: "@rescui Component Integration",
    body: "Continued use of @rescui components throughout the migrated project, as required by the evaluation criteria, ensuring visual accuracy and long-term maintainability.",
  },
  {
    heading: "Built from Scratch",
    body: "Rather than adapting the legacy Flask codebase, the React Router 7 project was started fresh, thus enabling a clean structure and removing all legacy constraints from the outset.",
  },
];

export default function KotlinWebsiteMigrationContent() {
  const imagesRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  const [lightbox, setLightbox] = useState<{
    src: string;
    alt?: string;
    type: "image" | "video";
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
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      // Before/after images
      const screenshots = imagesRef.current?.querySelectorAll(".screenshot");
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
          <RollingText text="KOTLIN WEBSITE MIGRATION" duration={0.45} />
        </h1>
        <FadeInText>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            JetBrains Internship Assignment
          </p>
        </FadeInText>

        <FadeInText>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
            Test assignment for a JetBrains internship. The source project was a
            stripped-down version of a past revision of{" "}
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
              kotlinlang.org
            </strong>
            , a single-page app built on a legacy Flask + React stack. The goal
            was to migrate it to{" "}
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
              React Router 7 Framework Mode
            </strong>{" "}
            with server-side rendering, while fully preserving the original
            visual appearance and all interactive functionality, including tab
            switching and other interactive elements. The evaluation was focused
            on SSR correctness, visual accuracy, continued use of{" "}
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
              @rescui
            </strong>{" "}
            components for maintainability, and the overall code quality.
          </p>
        </FadeInText>

        <FadeInText>
          <div className="mt-6 flex flex-wrap gap-3">
            {["React Router 7", "TypeScript", "SSR", "SCSS", "Docker"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-[#2a2c2a] dark:text-zinc-300"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </FadeInText>

        <FadeInText>
          <div className="mt-6">
            <a
              href="https://github.com/vlad-ionita/React-Router-Migration-JetBrains.com"
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

      {/* Before / After */}
      <section className="mb-12">
        <FadeInText>
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Before &amp; After
          </h2>
        </FadeInText>

        <div ref={imagesRef} className="grid gap-6 sm:grid-cols-2">
          {/* Before column */}
          <div className="flex flex-col gap-3">
            <FadeInText>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Before — Flask + React
              </p>
            </FadeInText>
            {beforeImages.map((img) => (
              <div
                key={img.src}
                className="screenshot overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 cursor-zoom-in dark:border-[#2a2c2a] dark:bg-[#1a1c1a]"
                style={{ opacity: 0 }}
                onClick={() => setLightbox({ ...img, type: "image" })}
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
            ))}
          </div>

          {/* After column */}
          <div className="flex flex-col gap-3">
            <FadeInText>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                After — React Router 7 + SSR
              </p>
            </FadeInText>
            {afterImages.map((img) => (
              <div
                key={img.src}
                className="screenshot overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 cursor-zoom-in dark:border-[#2a2c2a] dark:bg-[#1a1c1a]"
                style={{ opacity: 0 }}
                onClick={() => setLightbox({ ...img, type: "image" })}
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
            ))}
          </div>
        </div>
      </section>

      {/* Demo Video */}
      <section className="mb-12">
        <FadeInText>
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Interactive Elements Demo
          </h2>
        </FadeInText>

        <FadeInText>
          <div
            className="relative aspect-video overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 cursor-zoom-in dark:border-[#2a2c2a] dark:bg-[#1a1c1a]"
            onClick={() =>
              setLightbox({
                src: "/kotlin-website-migration/demo.mp4",
                type: "video",
              })
            }
          >
            <video
              src="/kotlin-website-migration/demo.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
            Tab switching fully functional after hydration with no regressions
            against the original source project
          </p>
        </FadeInText>
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
          {lightbox.type === "video" ? (
            <video
              src={lightbox.src}
              autoPlay
              muted
              loop
              playsInline
              className="max-h-[90vh] max-w-[90vw] rounded-xl"
            />
          ) : (
            <Image
              src={lightbox.src}
              alt={lightbox.alt ?? ""}
              width={1280}
              height={900}
              className="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain rounded-xl"
              sizes="90vw"
            />
          )}
        </div>
      )}
    </main>
  );
}
