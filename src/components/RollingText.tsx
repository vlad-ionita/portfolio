"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface RollingTextProps {
  text: string;
  duration?: number;
}

export default function RollingText({
  text,
  duration = 0.4,
}: RollingTextProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const realRef = useRef<HTMLSpanElement>(null);
  const fakeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const real = realRef.current?.querySelectorAll(".roll-char");
    const fake = fakeRef.current?.querySelectorAll(".roll-char");
    if (!real || !fake) return;

    if (fakeRef.current) fakeRef.current.style.opacity = "1";
    gsap.set(fake, { scaleY: 0 });

    gsap.to(wrapperRef.current, {
      opacity: 1,
      duration,
      ease: "power2.inOut",
    });

    const stepDelay = 0.05;

    Array.from(real).forEach((char, i) => {
      const delay = i * stepDelay;

      gsap.to(char, {
        scaleY: 0,
        duration,
        delay,
        ease: "power3.inOut",
      });

      gsap.to(fake[i], {
        scaleY: 1,
        duration,
        delay: delay,
        ease: "power3.inOut",
      });
    });
  }, [duration]);

  const realChars = text.split("").map((char, i) => (
    <span
      key={i}
      className="roll-char relative inline-block origin-top backface-hidden transform-3d"
      aria-hidden="true"
    >
      {char === " " ? "\u00A0" : char} {/* For spaces */}
    </span>
  ));

  const fakeChars = text.split("").map((char, i) => (
    <span
      key={i}
      className="roll-char relative inline-block origin-bottom backface-hidden transform-3d"
      aria-hidden="true"
    >
      {char === " " ? "\u00A0" : char} {/* For spaces */}
    </span>
  ));

  return (
    <span
      ref={wrapperRef}
      className="relative inline-block leading-none perspective-[400px] transform-3d"
      style={{ opacity: 0 }}
      aria-label={text}
    >
      <span ref={realRef} className="block transform-3d" aria-hidden="true">
        {realChars}
      </span>
      <span
        ref={fakeRef}
        className="absolute top-0 left-0 block h-full transform-3d"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        {fakeChars}
      </span>
    </span>
  );
}
