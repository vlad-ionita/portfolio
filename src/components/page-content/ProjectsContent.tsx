"use client";

import RollingText from "@/components/RollingText";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Link from "next/link";

const projects = [
  {
    title: "Kotlin Website Migration",
    description:
      "Migration of a past revision of the Kotlin website homepage from a legacy Flask and React stack to React Router 7 with server-side rendering.",
    tags: ["React Router 7", "TypeScript", "SSR"],
    repo: "https://github.com/vlad-ionita/React-Router-Migration-JetBrains.com",
    detailHref: "/projects/kotlin-website-migration",
  },
  {
    title: "Job Application Tracker",
    description:
      "A full-stack job application tracker with a kanban-style interface, JWT authentication with refresh token rotation, and a responsive React frontend.",
    tags: ["React", "Node.js", "PostgreSQL", "Prisma"],
    repo: "https://github.com/vlad-ionita/Job-Application-Tracker",
    detailHref: "/projects/job-application-tracker",
  },
  {
    title: "AR Frigate Application",
    description:
      "A Unity-based AR application built for a pair of AR glasses, designed to help navy personnel manage battle damage repair scenarios on frigates.",
    tags: ["Unity", "C#", "AR"],
    repo: null,
    detailHref: null,
  },
  {
    title: "Conference Management System",
    description:
      "A distributed conference management system composed of three microservices, focused on the review microservice, including API design and inter-service communication.",
    tags: ["Java", "Spring Boot", "Microservices"],
    repo: null,
    detailHref: null,
  },
  {
    title: "Task Tracking Application",
    description:
      "A kanban-style task tracking application built with Java, Spring, and JavaFX, focused on clean architecture and usability.",
    tags: ["Java", "Spring", "JavaFX"],
    repo: null,
    detailHref: null,
  },
];

export default function ProjectsContent() {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".project-card");
    if (!cards) return;
    gsap.set(cards, { opacity: 0, x: -15 });
    gsap.to(cards, {
      opacity: 1,
      x: 0,
      duration: 0.15,
      delay: 0.5,
      ease: "power4.inOut",
      stagger: 0.1,
    });
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-24">
      <h1 className="mb-8 text-5xl text-center font-black tracking-tight text-zinc-900 dark:text-zinc-50">
        <RollingText text="PROJECTS" duration={0.45} />
      </h1>

      <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.title}
            style={{ opacity: 0 }}
            className="project-card flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-md dark:border-[#2a2c2a] dark:bg-[#1a1c1a] dark:hover:border-[#3a3c3a]"
          >
            <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {project.title}
            </h2>
            <div className="flex-1">
              <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-[#2a2c2a] dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {(project.repo || project.detailHref) && (
              <div className="mt-4 flex gap-4 text-sm font-medium">
                {project.detailHref && (
                  <Link
                    href={project.detailHref}
                    className="text-zinc-500 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Details
                  </Link>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
