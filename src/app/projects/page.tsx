import RollingText from "@/components/RollingText";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

const projects = [
  {
    title: "Kotlin Website Migration",
    description:
      "Migration of the Kotlin website homepage from a legacy Flask and React 17 stack to React Router 7 with server-side rendering.",
    tags: ["React Router 7", "TypeScript", "SSR"],
    repo: "https://github.com/vlad-ionita/React-Router-Migration-JetBrains.com",
  },
  {
    title: "Job Application Tracker",
    description:
      "A full-stack job application tracker with a kanban-style interface, JWT authentication with refresh token rotation, and a responsive React frontend.",
    tags: ["React", "Node.js", "PostgreSQL", "Prisma"],
    repo: "https://github.com/vlad-ionita/Job-Application-Tracker",
  },
  {
    title: "AR Frigate Application",
    description:
      "A Unity-based AR application built for a pair of AR glasses, designed to help navy personnel manage battle damage repair scenarios on frigates.",
    tags: ["Unity", "C#", "AR"],
    repo: null,
  },
  {
    title: "Conference Management System",
    description:
      "A distributed conference management system composed of three microservices, focused on the review microservice, including API design and inter-service communication.",
    tags: ["Java", "Spring Boot", "Microservices"],
    repo: null,
  },
  {
    title: "Task Tracking Application",
    description:
      "A kanban-style task tracking application built with Java, Spring, and JavaFX, focused on clean architecture and usability.",
    tags: ["Java", "Spring", "JavaFX"],
    repo: null,
  },
];

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-24">
      <h1 className="mb-8 text-5xl text-center font-black tracking-tight text-zinc-900 dark:text-zinc-50">
        <RollingText text="PROJECTS" />
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.title}
            className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-md dark:border-[#2a2c2a] dark:bg-[#1a1c1a] dark:hover:border-[#3a3c3a]"
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

            {/* Repository Link */}
            {project.repo && (
              <div className="mt-4 flex gap-4 text-sm font-medium">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  GitHub
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
