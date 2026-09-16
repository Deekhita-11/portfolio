import React from "react";

const TRACK_1 = "DESIGN  //  PROTOTYPE  //  BENCH TEST  //  DEPLOY  //  HARDWARE INTEGRATION  //  FIRMWARE  //";
const TRACK_2 = "ROBOTICS  //  FULL-STACK WEB  //  EMBEDDED C++  //  PCB SCHEMATICS  //  AUTOMATION  //";

function Track({ text, reverse = false, speed = 30 }) {
  const content = `${text}  ${text}  ${text}`;

  return (
    <div className="overflow-hidden py-3 border-y border-[var(--color-border)]">
      <div
        className="whitespace-nowrap inline-block"
        style={{
          animation: `marquee${reverse ? "Reverse" : ""} ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        <span className="font-mono text-xs font-bold tracking-[0.2em] text-[var(--color-text)] uppercase">
          {content}
        </span>
      </div>
    </div>
  );
}

export default function MarqueeBanner() {
  return (
    <div className="w-full select-none" style={{ background: "var(--color-surface)" }}>
      <Track text={TRACK_1} speed={28} />
      <Track text={TRACK_2} reverse speed={22} />
    </div>
  );
}
