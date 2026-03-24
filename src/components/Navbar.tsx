"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useSyncExternalStore, useState } from "react";
import RollingText from "./RollingText";
import CornerBox from "./CornerBox";
import MobileMenu from "./MobileMenu";

const MAILTO = "mailto:ionitavlad83@gmail.com";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

const themes = ["system", "light", "dark"] as const;

// Theme icons
const icons: Record<string, React.ReactNode> = {
  system: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  light: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
  dark: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  ),
};

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [menuOpen, setMenuOpen] = useState(false);

  function cycleTheme() {
    const current = themes.indexOf(
      (theme as (typeof themes)[number]) ?? "system",
    );
    setTheme(themes[(current + 1) % themes.length]);
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-[#1e201e] dark:bg-[#101110]/80">
        <nav className="flex items-center justify-between px-6 py-4 sm:grid sm:grid-cols-3 sm:items-center">
          {/* Name (left side) */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex w-fit text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            <RollingText text={"VLAD IONITA"} />
          </Link>

          {/* Desktop links (center) */}
          <ul className="hidden items-center justify-center gap-6 sm:flex">
            {links.map(({ href, label }) => (
              <li key={href} className="flex">
                <Link
                  href={href}
                  className={`inline-flex items-center text-sm transition-colors hover:text-zinc-900 dark:hover:text-zinc-50 ${
                    pathname === href
                      ? "font-semibold italic text-zinc-900 dark:text-zinc-50"
                      : "font-semibold text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  <CornerBox active={pathname === href}>
                    <RollingText text={label} />
                  </CornerBox>
                </Link>
              </li>
            ))}
            <li className="flex">
              <a
                href={MAILTO}
                className="inline-flex items-center text-sm font-semibold text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                <CornerBox>
                  <RollingText text="Contact" />
                </CornerBox>
              </a>
            </li>
          </ul>

          {/* Desktop theme button + mobile menu button (right side) */}
          <div className="flex justify-end gap-3">
            {/* Desktop theme button */}
            <button
              onClick={cycleTheme}
              className="hidden h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-50 sm:flex"
            >
              {mounted ? icons[theme ?? "system"] : icons["system"]}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-1.5 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 sm:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
              <span>Menu</span>
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        mounted={mounted}
        theme={theme}
        onCycleTheme={cycleTheme}
        pathname={pathname}
      />
    </>
  );
}
