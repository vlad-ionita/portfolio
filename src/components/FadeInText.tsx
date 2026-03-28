"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeInTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function FadeInText({ children, className }: FadeInTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === el)
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
