"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface RollingTextProps {
  text: string;
}

export default function RollingText({ text }: RollingTextProps) {
  const realRef = useRef<HTMLSpanElement>(null);
  const fakeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const real = realRef.current?.querySelectorAll(".roll-char");
    const fake = fakeRef.current?.querySelectorAll(".roll-char");
    if (!real || !fake) return;

    if (fakeRef.current) fakeRef.current.style.opacity = "1";
    gsap.set(fake, { scaleY: 0 });

    const stepDelay = 0.05;

    Array.from(real).forEach((char, i) => {
      const delay = i * stepDelay;

      gsap.to(char, {
        scaleY: 0,
        duration: 0.5,
        delay,
        ease: "power3.inOut",
      });

      gsap.to(fake[i], {
        scaleY: 1,
        duration: 0.5,
        delay: delay - 0.01,
        ease: "power3.inOut",
      });
    });
  }, []);

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
      className="relative inline-block leading-none perspective-[400px] transform-3d"
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
