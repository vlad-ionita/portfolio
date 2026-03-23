"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

interface CornerBoxProps {
  children: React.ReactNode;
  active?: boolean;
}

export default function CornerBox({
  children,
  active = false,
}: CornerBoxProps) {
  const boxRef = useRef<HTMLSpanElement>(null);
  const [initialActive] = useState(active);

  useEffect(() => {
    if (active) {
      gsap.to(boxRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.15,
        ease: "sine.out",
      });
    } else {
      gsap.to(boxRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 0.15,
        ease: "sine.in",
      });
    }
  }, [active]);

  const handleMouseEnter = () => {
    if (active) return;
    gsap.to(boxRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.15,
      ease: "sine.out",
    });
  };

  const handleMouseLeave = () => {
    if (active) return;
    gsap.to(boxRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 0.15,
      ease: "sine.in",
    });
  };

  return (
    <span
      className="relative inline-flex items-center px-2 py-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        ref={boxRef}
        className="pointer-events-none absolute inset-0"
        style={{ opacity: initialActive ? 1 : 0 }}
      >
        <span className="absolute top-0 left-0 h-1 w-1 border-l border-t border-current" />
        <span className="absolute top-0 right-0 h-1 w-1 border-r border-t border-current" />
        <span className="absolute bottom-0 left-0 h-1 w-1 border-b border-l border-current" />
        <span className="absolute bottom-0 right-0 h-1 w-1 border-b border-r border-current" />
      </span>
      {children}
    </span>
  );
}
