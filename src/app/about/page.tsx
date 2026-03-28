import RollingText from "@/components/RollingText";
import FadeInText from "@/components/FadeInText";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <h1 className="mb-2 text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
        <RollingText text="ABOUT ME" />
      </h1>
      <p className="mb-10 text-lg text-zinc-500 dark:text-zinc-400">
        Full-Stack Developer · CSE Graduate, TU Delft
      </p>

      {/* Intro */}
      <div className="mb-12 space-y-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        <FadeInText>
          <p>
            I am a full-stack developer currently based in the Netherlands with
            a BSc in Computer Science and Engineering and a minor in Project
            Management from TU Delft. I build end-to-end web applications with a
            focus on clean architecture, maintainable code, and deliberate
            technical decisions. My experience spans frontend development with
            React, backend services with Node.js and Java, and relational
            database design with PostgreSQL.
          </p>
        </FadeInText>
        <FadeInText>
          <p>
            I am drawn to environments where engineers take ownership of what
            they build and care about getting the details right. Outside of web
            development, I have a growing interest in DevOps and cloud
            infrastructure, and enjoy working on problems that require thinking
            carefully about how systems are designed and maintained over time.
          </p>
        </FadeInText>
      </div>

      {/* Skills */}
      <div className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Core Skills
        </h2>
        <div className="mb-6 space-y-3 text-zinc-600 dark:text-zinc-400">
          <FadeInText>
            <p>
              <span className="font-medium text-zinc-900 dark:text-zinc-50">
                Frontend:{" "}
              </span>
              React, React Router 7, Next.js, TypeScript, Vite, Tailwind CSS,
              shadcn/ui - building responsive, component-based interfaces with
              SSR support
            </p>
          </FadeInText>
          <FadeInText>
            <p>
              <span className="font-medium text-zinc-900 dark:text-zinc-50">
                Backend:{" "}
              </span>
              Node.js, Express, Java, Spring Boot, PHP - REST API design, JWT
              authentication, secure session management
            </p>
          </FadeInText>
          <FadeInText>
            <p>
              <span className="font-medium text-zinc-900 dark:text-zinc-50">
                Data:{" "}
              </span>
              PostgreSQL, MySQL, Prisma ORM - relational data modeling,
              indexing, query optimization
            </p>
          </FadeInText>
          <FadeInText>
            <p>
              <span className="font-medium text-zinc-900 dark:text-zinc-50">
                Other languages:{" "}
              </span>
              Python, Scala, R, C++ - used across academic projects for data
              processing, analysis, and systems-level programming
            </p>
          </FadeInText>
          <FadeInText>
            <p>
              <span className="font-medium text-zinc-900 dark:text-zinc-50">
                Tooling:{" "}
              </span>
              Docker, Git, GitLab, ESLint, Prettier - version control, code
              quality, containerization
            </p>
          </FadeInText>
        </div>
      </div>

      {/* Background */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Background
        </h2>
        <div className="space-y-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          <FadeInText>
            <p>
              Since graduating, I have been building full-stack projects
              independently, the most substantial being a job application
              tracker with a kanban-style interface, JWT-based authentication
              with refresh token rotation, and a fully responsive React
              frontend. Most recently, I completed a migration of the Kotlin
              website homepage from a legacy Flask and React 17 stack to React
              Router 7 with server-side rendering.
            </p>
          </FadeInText>
          <FadeInText>
            <p>
              During my studies at TU Delft I contributed to a distributed
              conference management system built around microservices, focusing
              on API design and inter-service communication, and built a
              kanban-style task tracking application in Java with Spring and
              JavaFX.
            </p>
          </FadeInText>
          <FadeInText>
            <p>
              Alongside my academic work, I completed an internship at Commando
              Materieel en IT, where I helped build a Unity-based AR application
              from scratch for a pair of AR glasses. The app was designed to
              help navy personnel manage battle damage repair scenarios on
              frigates, and was tested with real navy officers whose feedback
              directly shaped the final product.
            </p>
          </FadeInText>
        </div>
      </div>
    </main>
  );
}
