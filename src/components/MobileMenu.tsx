"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import CornerBox from "./CornerBox";

const MAILTO = "mailto:ionitavlad83@gmail.com";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

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

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  mounted: boolean;
  theme: string | undefined;
  onCycleTheme: () => void;
  pathname: string;
}

export default function MobileMenu({
  open,
  onClose,
  mounted,
  theme,
  onCycleTheme,
  pathname,
}: MobileMenuProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !bgRef.current || !panelRef.current) return;
    if (open) {
      gsap.set(wrapperRef.current, { pointerEvents: "auto" });
      gsap.to(bgRef.current, {
        opacity: 1,
        duration: 0.375,
        ease: "sine.out",
      });
      gsap.to(panelRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.375,
        ease: "sine.inOut",
      });
    } else {
      gsap.to(bgRef.current, { opacity: 0, duration: 0.375, ease: "sine.in" });
      gsap.to(panelRef.current, {
        clipPath: "inset(0% 0% 100% 100%)",
        duration: 0.375,
        ease: "sine.inOut",
        onComplete: () => {
          gsap.set(wrapperRef.current, { pointerEvents: "none" });
        },
      });
    }
  }, [open]);

  if (!mounted) return null;

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-60"
      style={{ pointerEvents: "none" }}
    >
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-black/40 backdrop-blur-[6px]"
        style={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Menu panel */}
      <div
        ref={panelRef}
        className="absolute top-0 right-0 min-w-50 border border-zinc-200 bg-white dark:border-[#1e201e] dark:bg-[#101110]"
        style={{ clipPath: "inset(0% 0% 100% 100%)" }}
      >
        <button
          onClick={onClose}
          className="flex w-full items-center justify-end gap-1.5 px-6 py-4 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
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
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
          <span>Close</span>
        </button>

        <ul className="text-center">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={onClose}
                className={`block px-6 py-2 text-sm transition-colors leading-none hover:text-zinc-900 dark:hover:text-zinc-50 ${
                  pathname === href
                    ? "font-semibold italic text-zinc-900 dark:text-zinc-50"
                    : "font-semibold text-zinc-500 dark:text-zinc-400"
                }`}
              >
                <CornerBox active={pathname === href}>{label}</CornerBox>
              </Link>
            </li>
          ))}
          <li>
            <a
              href={MAILTO}
              onClick={onClose}
              className="block px-6 py-2 text-sm font-semibold leading-none text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              <CornerBox>Contact</CornerBox>
            </a>
          </li>
        </ul>

        <button
          onClick={() => {
            onCycleTheme();
          }}
          className="flex w-full items-center justify-center gap-2 px-6 py-4 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 border-t border-zinc-100 dark:border-[#1e201e]"
        >
          {icons[theme ?? "system"]}
          <span className="capitalize">{theme ?? "system"} theme</span>
        </button>
      </div>
    </div>
  );
}
