"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

interface RippleTextProps {
  text: string;
}

export default function RippleText({ text }: RippleTextProps) {
  const realRef = useRef<HTMLSpanElement>(null);
  const fakeRef = useRef<HTMLSpanElement>(null);
  const pendingEnter = useRef<gsap.core.Tween | null>(null);
  const pendingLeave = useRef<gsap.core.Tween | null>(null);
  const [fakeVisible] = useState(false);

  useEffect(() => {
    const fake = fakeRef.current?.querySelectorAll(".ripple-char");
    if (fake) gsap.set(fake, { rotateX: 95 });
    if (fakeRef.current) fakeRef.current.style.opacity = "1";
  }, []);

  const handleMouseEnter = () => {
    const real = realRef.current?.querySelectorAll(".ripple-char");
    const fake = fakeRef.current?.querySelectorAll(".ripple-char");
    if (!real || !fake) return;

    // Up
    pendingLeave.current?.kill();
    gsap.to(real, {
      rotateX: -95,
      stagger: 0.025,
      duration: 0.2,
      ease: "sine.inOut",
      overwrite: "auto",
    });
    pendingEnter.current = gsap.delayedCall(0.075, () => {
      gsap.to(fake, {
        rotateX: 0,
        stagger: 0.025,
        duration: 0.2,
        ease: "sine.inOut",
        overwrite: "auto",
      });
    });
  };

  const handleMouseLeave = () => {
    const real = realRef.current?.querySelectorAll(".ripple-char");
    const fake = fakeRef.current?.querySelectorAll(".ripple-char");
    if (!real || !fake) return;

    // Down
    pendingEnter.current?.kill();
    gsap.to(fake, {
      rotateX: 95,
      stagger: 0.025,
      duration: 0.2,
      ease: "sine.inOut",
      overwrite: "auto",
    });
    pendingLeave.current = gsap.delayedCall(0.075, () => {
      gsap.to(real, {
        rotateX: 0,
        stagger: 0.025,
        duration: 0.2,
        ease: "sine.inOut",
        overwrite: "auto",
      });
    });
  };

  const realChars = text.split("").map((char, i) => (
    <span
      key={i}
      className="ripple-char relative inline-block origin-top backface-hidden transform-3d"
      aria-hidden="true"
    >
      {char === " " ? "\u00A0" : char} {/* For spaces */}
    </span>
  ));

  const fakeChars = text.split("").map((char, i) => (
    <span
      key={i}
      className="ripple-char relative inline-block origin-bottom backface-hidden transform-3d"
      aria-hidden="true"
    >
      {char === " " ? "\u00A0" : char} {/* For spaces */}
    </span>
  ));

  return (
    <span
      className="relative inline-block leading-none perspective-[400px] transform-3d"
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
        style={{ opacity: fakeVisible ? 1 : 0 }}
        aria-hidden="true"
      >
        {fakeChars}
      </span>
    </span>
  );
}
