"use client";

import { useEffect, useRef, useState } from "react";

type Ripple = { id: number; x: number; y: number };

export default function CursorEffects() {
  const penRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const pressed = useRef(false);
  const dragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("custom-cursor");

    const move = (event: PointerEvent) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        penRef.current?.style.setProperty("transform", `translate3d(${event.clientX}px, ${event.clientY}px, 0)`);
      });
      const interactive = (event.target as Element | null)?.closest("a, button, [role='button']");
      penRef.current?.classList.toggle("is-interactive", Boolean(interactive) && !dragging.current);
      if (pressed.current && !dragging.current && Math.hypot(event.clientX - start.current.x, event.clientY - start.current.y) > 7) {
        dragging.current = true;
        penRef.current?.classList.remove("is-pressed", "is-interactive");
        penRef.current?.classList.add("is-dragging");
      }
    };
    const down = (event: PointerEvent) => {
      pressed.current = true;
      dragging.current = false;
      start.current = { x: event.clientX, y: event.clientY };
      penRef.current?.classList.add("is-pressed");
    };
    const up = (event: PointerEvent) => {
      penRef.current?.classList.remove("is-pressed", "is-dragging");
      if (!dragging.current) {
        const id = Date.now();
        setRipples((items) => [...items, { id, x: event.clientX, y: event.clientY }]);
        window.setTimeout(() => setRipples((items) => items.filter((item) => item.id !== id)), 650);
      }
      pressed.current = false;
      dragging.current = false;
    };
    const cancel = () => {
      pressed.current = false;
      dragging.current = false;
      penRef.current?.classList.remove("is-pressed", "is-dragging", "is-interactive");
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", cancel);
    window.addEventListener("blur", cancel);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", cancel);
      window.removeEventListener("blur", cancel);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] hidden xl:block"><div ref={penRef} className="cursor-pen-position"><div className="cursor-pen"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /><path d="m15 5 3 3" /></svg></div></div>{ripples.map((ripple) => <span key={ripple.id} className="cursor-ink" style={{ left: ripple.x, top: ripple.y }} />)}</div>;
}
