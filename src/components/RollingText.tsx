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
    const fake = fakeRef.current?.querySelectorAll(".roll-char");
    if (fake) gsap.set(fake, { rotateX: 90 });
  }, []);

  const handleMouseEnter = () => {
    const real = realRef.current?.querySelectorAll(".roll-char");
    const fake = fakeRef.current?.querySelectorAll(".roll-char");
    if (!real || !fake) return;

    // Up
    gsap.to(real, {
      rotateX: -90,
      stagger: 0.025,
      duration: 0.2,
      ease: "sine.inOut",
      overwrite: "auto",
    });
    gsap.to(fake, {
      rotateX: 0,
      stagger: 0.025,
      delay: 0.075,
      duration: 0.2,
      ease: "sine.inOut",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    const real = realRef.current?.querySelectorAll(".roll-char");
    const fake = fakeRef.current?.querySelectorAll(".roll-char");
    if (!real || !fake) return;

    // Down
    gsap.to(real, {
      rotateX: 0,
      stagger: 0.025,
      delay: 0.075,
      duration: 0.2,
      ease: "sine.inOut",
      overwrite: "auto",
    });
    gsap.to(fake, {
      rotateX: 90,
      stagger: 0.025,
      duration: 0.2,
      ease: "sine.inOut",
      overwrite: "auto",
    });
  };

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
      className="relative inline-block overflow-hidden leading-none perspective-[400px] transform-3d"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={text}
    >
      <span ref={realRef} className="block transform-3d" aria-hidden="true">
        {realChars}
      </span>
      <span
        ref={fakeRef}
        className="absolute top-0 left-0 block h-full transform-3d"
        aria-hidden="true"
      >
        {fakeChars}
      </span>
    </span>
  );
}
