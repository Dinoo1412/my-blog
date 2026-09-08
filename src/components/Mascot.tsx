"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const messages = [
  "欢迎回来，今天也一起写点东西吧。",
  "灵感先记下来，稍后再慢慢整理。",
  "读累了吗？记得眺望一下远处。",
  "代码会过期，思考留下来。",
  "喵，我在这里帮你守着这本笔记。",
];

type Position = { x: number; y: number };

export default function Mascot() {
  const [hidden, setHidden] = useState(false);
  const [message, setMessage] = useState(messages[0]);
  const [talking, setTalking] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const drag = useRef({ active: false, moved: false, x: 0, y: 0, originX: 0, originY: 0 });
  const positionRef = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const restoreTimer = window.setTimeout(() => {
      setHidden(localStorage.getItem("jay-mascot-hidden") === "true");
      const saved = localStorage.getItem("jay-mascot-position");
      if (saved) {
        try { setPosition(JSON.parse(saved) as Position); } catch { /* keep the default position */ }
      }
    }, 0);
    const greetingTimer = window.setTimeout(() => setTalking(true), 900);
    return () => {
      window.clearTimeout(restoreTimer);
      window.clearTimeout(greetingTimer);
    };
  }, []);

  const keepInView = (x: number, y: number) => ({
    x: Math.min(12, Math.max(x, -window.innerWidth + 230)),
    y: Math.min(12, Math.max(y, -window.innerHeight + 250)),
  });

  const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { active: true, moved: false, x: event.clientX, y: event.clientY, originX: position.x, originY: position.y };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!drag.current.active) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    if (Math.hypot(dx, dy) > 5) drag.current.moved = true;
    const next = keepInView(drag.current.originX + dx, drag.current.originY + dy);
    positionRef.current = next;
    setPosition(next);
  };

  const onPointerUp = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (drag.current.moved) {
      localStorage.setItem("jay-mascot-position", JSON.stringify(positionRef.current));
      return;
    }
    const next = messages[(messages.indexOf(message) + 1) % messages.length];
    setMessage(next);
    setTalking(true);
  };

  const close = () => {
    setHidden(true);
    localStorage.setItem("jay-mascot-hidden", "true");
  };

  const restore = () => {
    setHidden(false);
    setTalking(true);
    localStorage.setItem("jay-mascot-hidden", "false");
  };

  if (hidden) {
    return <button type="button" className="mascot-return" onClick={restore} aria-label="唤回看板娘"><span>喵</span></button>;
  }

  return (
    <aside className="mascot" style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }} aria-label="Jay 的小猫助手">
      {talking && <div className="mascot-note"><button type="button" onClick={() => setTalking(false)} aria-label="关闭对话">×</button><p>{message}</p></div>}
      <button type="button" className="mascot-character" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} aria-label="点击与小猫助手对话，拖动可移动">
        <span className="mascot-stage">
          <Image className="mascot-base" src="/mascot/jay-cat-girl.png" alt="手持钢笔、趴在笔记本上的蓝灰色小猫少女" width={1448} height={1086} sizes="(max-width: 767px) 128px, 190px" draggable={false} />
          <Image className="mascot-detail mascot-ears" src="/mascot/jay-cat-girl.png" alt="" aria-hidden width={1448} height={1086} sizes="(max-width: 767px) 128px, 190px" draggable={false} />
          <Image className="mascot-detail mascot-fringe" src="/mascot/jay-cat-girl.png" alt="" aria-hidden width={1448} height={1086} sizes="(max-width: 767px) 128px, 190px" draggable={false} />
          <Image className="mascot-detail mascot-tail" src="/mascot/jay-cat-girl.png" alt="" aria-hidden width={1448} height={1086} sizes="(max-width: 767px) 128px, 190px" draggable={false} />
        </span>
      </button>
      <button type="button" className="mascot-tuck" onClick={close} aria-label="暂时收起看板娘" title="暂时合上"><span aria-hidden>⌄</span></button>
    </aside>
  );
}
