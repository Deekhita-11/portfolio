import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

// Smooth closed-loop track with varied curves
const TRACK_D =
  "M 160,110 " +
  "L 640,110 " +
  "Q 740,110 740,190 " +
  "L 740,250 " +
  "Q 740,340 640,340 " +
  "L 450,340 " +
  "Q 370,340 370,250 " +
  "L 370,230 " +
  "Q 370,170 310,170 " +
  "L 160,170 " +
  "Q 80,170 80,250 " +
  "L 80,270 " +
  "Q 80,350 160,350 " +
  "L 310,350 " +
  "Q 370,350 400,390 " +
  "Q 430,420 500,420 " +
  "L 720,420 " +
  "Q 820,420 820,320 " +
  "L 820,170 " +
  "Q 820,60 700,60 " +
  "L 180,60 " +
  "Q 80,60 80,110 " +
  "Z";

const COMPONENTS = [
  { id: "mcu",     label: "ATmega328P MCU",       desc: "16MHz AVR microcontroller running proportional steering loop", color: "#A5B89B" },
  { id: "driver",  label: "L298N Motor Driver",   desc: "Dual H-Bridge controlling differential drive PWM channels",     color: "#E8E7E2" },
  { id: "sensors", label: "5-Ch IR Sensor Array", desc: "Infrared reflection sensors reading optical track contrast",   color: "#A5B89B" },
  { id: "motors",  label: "N20 Micro Gearmotors", desc: "6V 300RPM high-torque motors with rubber traction wheels",     color: "#969891" },
];

export default function Robotics() {
  const ref = useScrollReveal();
  const pathRef = useRef(null);
  const animRef = useRef(null);
  const distRef = useRef(0);
  const lenRef = useRef(1);

  const [highlight, setHighlight] = useState(null);

  const [telemetry, setTelemetry] = useState({
    x: 160,
    y: 110,
    angle: 0,
    irLeft: false,
    irCenter: true,
    irRight: false,
    speed: 72,
    steering: "FORWARD",
    correction: "0.0°",
    pwmL: 85,
    pwmR: 85,
  });

  useEffect(() => {
    if (pathRef.current) {
      lenRef.current = pathRef.current.getTotalLength();
    }
  }, []);

  useEffect(() => {
    let lastAngle = 0;

    const loop = () => {
      const len = lenRef.current;
      if (len <= 1) {
        animRef.current = requestAnimationFrame(loop);
        return;
      }

      distRef.current = (distRef.current + 1.6) % len;
      const d = distRef.current;

      const pt1 = pathRef.current.getPointAtLength(d);
      const eps = 4;
      const pt2 = pathRef.current.getPointAtLength((d + eps) % len);

      const angle = Math.atan2(pt2.y - pt1.y, pt2.x - pt1.x) * (180 / Math.PI);

      let dAngle = angle - lastAngle;
      if (dAngle > 180) dAngle -= 360;
      if (dAngle < -180) dAngle += 360;
      lastAngle = angle;

      let irLeft = false;
      let irCenter = true;
      let irRight = false;
      let steering = "FORWARD →";
      let correction = "0.0°";
      let pwmL = 85;
      let pwmR = 85;

      if (dAngle < -0.8) {
        irLeft = true;
        irCenter = true;
        irRight = false;
        steering = "← TURNING LEFT";
        correction = `${dAngle.toFixed(1)}°`;
        pwmL = Math.max(30, Math.round(85 + dAngle * 12));
        pwmR = 95;
      } else if (dAngle > 0.8) {
        irLeft = false;
        irCenter = true;
        irRight = true;
        steering = "TURNING RIGHT →";
        correction = `+${dAngle.toFixed(1)}°`;
        pwmL = 95;
        pwmR = Math.max(30, Math.round(85 - dAngle * 12));
      }

      setTelemetry({
        x: pt1.x,
        y: pt1.y,
        angle,
        irLeft,
        irCenter,
        irRight,
        speed: Math.round((pwmL + pwmR) / 2.5),
        steering,
        correction,
        pwmL,
        pwmR,
      });

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <section id="robotics" className="py-24 border-t border-[var(--color-border)]" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={ref} className="reveal">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-[var(--color-border)]">
            <div>
              <p className="font-mono text-xs tracking-[0.25em] text-[var(--color-accent)] mb-2 uppercase">
                ROBOTICS // 04
              </p>
              <h2
                className="font-heading font-black uppercase tracking-tight text-[var(--color-text)]"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                AUTONOMOUS LINE FOLLOWER
              </h2>
              <p className="text-[var(--color-text-muted)] text-sm max-w-lg mt-2">
                Simulated optical telemetry &amp; differential PWM kinematics on an actual closed tracking loop.
              </p>
            </div>
            <div className="font-mono text-xs text-[var(--color-text-muted)] space-y-1 text-left md:text-right">
              <p>LAB: ROBOGENIX // XIM UNIVERSITY</p>
              <p className="text-[var(--color-accent)] font-semibold">FEEDBACK RATE: 50Hz</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols: Track Canvas */}
            <div className="lg:col-span-8">
              <div
                className="technical-card rounded-xl p-4 md:p-6 relative overflow-hidden"
                style={{ background: "var(--color-surface)" }}
              >
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-[var(--color-border)] font-mono text-xs text-[var(--color-text-muted)]">
                  <span>TEST RIG // 820mm CLOSED CIRCUIT</span>
                  <span className="text-[var(--color-accent)] font-bold">● SYSTEM ENGAGED</span>
                </div>

                <div className="relative w-full aspect-[900/460]">
                  <svg viewBox="0 0 900 460" className="w-full h-full" style={{ overflow: "visible" }}>
                    {/* Outer Track Buffer */}
                    <path
                      d={TRACK_D}
                      fill="none"
                      stroke="#202321"
                      strokeWidth="26"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Black Tracking Line */}
                    <path
                      ref={pathRef}
                      d={TRACK_D}
                      fill="none"
                      stroke="#0F1010"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Sage Center Guide Line */}
                    <path
                      d={TRACK_D}
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth="1.2"
                      strokeDasharray="4 4"
                      opacity="0.4"
                    />

                    {/* ── Robot Chassis ── */}
                    <g
                      transform={`translate(${telemetry.x}, ${telemetry.y}) rotate(${telemetry.angle})`}
                      style={{ transition: "none" }}
                    >
                      {/* Left Wheel */}
                      <rect
                        x="-24"
                        y="-18"
                        width="14"
                        height="6"
                        rx="2"
                        fill={highlight === "motors" ? "var(--color-accent)" : "#202321"}
                        stroke="#30332F"
                        strokeWidth="1.5"
                      />
                      {/* Right Wheel */}
                      <rect
                        x="-24"
                        y="12"
                        width="14"
                        height="6"
                        rx="2"
                        fill={highlight === "motors" ? "var(--color-accent)" : "#202321"}
                        stroke="#30332F"
                        strokeWidth="1.5"
                      />

                      {/* Castor ball */}
                      <circle cx="-28" cy="0" r="3" fill="#969891" />

                      {/* PCB Chassis */}
                      <rect
                        x="-28"
                        y="-14"
                        width="46"
                        height="28"
                        rx="4"
                        fill="#181A19"
                        stroke={highlight ? "var(--color-accent)" : "var(--color-border)"}
                        strokeWidth="1.8"
                      />

                      {/* L298N Heat Sink */}
                      <rect
                        x="-16"
                        y="-10"
                        width="12"
                        height="20"
                        rx="1"
                        fill={highlight === "driver" ? "var(--color-accent)" : "#242725"}
                        stroke="var(--color-border)"
                        strokeWidth="1"
                      />

                      {/* ATmega328P DIP IC */}
                      <rect
                        x="2"
                        y="-6"
                        width="12"
                        height="12"
                        rx="1"
                        fill={highlight === "mcu" ? "var(--color-accent)" : "#121313"}
                        stroke="#969891"
                        strokeWidth="0.8"
                      />

                      {/* Sensor bracket */}
                      <line x1="18" y1="0" x2="28" y2="0" stroke="var(--color-border)" strokeWidth="2" />
                      <line x1="28" y1="-12" x2="28" y2="12" stroke="var(--color-border)" strokeWidth="1.8" />

                      {/* 3 IR Sensors */}
                      <circle
                        cx="28"
                        cy="-10"
                        r="3.5"
                        fill={telemetry.irLeft ? "var(--color-accent)" : "#121313"}
                        stroke={highlight === "sensors" ? "var(--color-accent)" : "var(--color-border)"}
                        strokeWidth="1.2"
                      />
                      <circle
                        cx="28"
                        cy="0"
                        r="3.5"
                        fill={telemetry.irCenter ? "var(--color-accent)" : "#121313"}
                        stroke={highlight === "sensors" ? "var(--color-accent)" : "var(--color-border)"}
                        strokeWidth="1.2"
                      />
                      <circle
                        cx="28"
                        cy="10"
                        r="3.5"
                        fill={telemetry.irRight ? "var(--color-accent)" : "#121313"}
                        stroke={highlight === "sensors" ? "var(--color-accent)" : "var(--color-border)"}
                        strokeWidth="1.2"
                      />
                    </g>
                  </svg>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center justify-between font-mono text-[11px] text-[var(--color-text-muted)]">
                  <span>KINEMATICS: PROPORTIONAL DIFFERENTIAL</span>
                  <span className="text-[var(--color-accent)]">HEADING: {Math.round(telemetry.angle)}°</span>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Telemetry & Inspector */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Telemetry Console */}
              <div className="technical-card rounded-xl p-6" style={{ background: "var(--color-surface)" }}>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--color-border)]">
                  <span className="font-mono text-xs font-bold text-[var(--color-text)] uppercase tracking-wider">
                    LIVE TELEMETRY
                  </span>
                  <span className="font-mono text-[10px] text-[var(--color-accent)] font-bold">50 Hz ACTIVE</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between py-1 border-b border-[var(--color-border)]/40">
                    <span className="text-[var(--color-text-muted)]">STATUS</span>
                    <span className="font-bold text-[var(--color-accent)]">TRACKING</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-[var(--color-border)]/40">
                    <span className="text-[var(--color-text-muted)]">STEERING</span>
                    <span className="font-bold text-[var(--color-text)]">{telemetry.steering}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-[var(--color-border)]/40">
                    <span className="text-[var(--color-text-muted)]">CORRECTION</span>
                    <span className="font-bold text-[var(--color-accent)]">{telemetry.correction}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-[var(--color-border)]/40">
                    <span className="text-[var(--color-text-muted)]">SPEED</span>
                    <span className="text-[var(--color-text)]">{telemetry.speed}% PWM</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-[var(--color-border)]/40">
                    <span className="text-[var(--color-text-muted)]">MOTOR L / R</span>
                    <span className="text-[var(--color-text)]">{telemetry.pwmL}% / {telemetry.pwmR}%</span>
                  </div>
                </div>

                {/* 3-IR Array Indicator */}
                <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
                  <p className="font-mono text-[10px] text-[var(--color-text-muted)] tracking-wider uppercase mb-2">
                    IR SENSOR BITMASK
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
                    <div
                      className={`p-2 rounded border transition-colors ${
                        telemetry.irLeft
                          ? "bg-[var(--color-accent)] text-[#121313] font-bold border-[var(--color-accent)]"
                          : "bg-[var(--color-bg)] text-[var(--color-text-muted)] border-[var(--color-border)]"
                      }`}
                    >
                      <p>{telemetry.irLeft ? "● 1" : "○ 0"}</p>
                      <p className="text-[9px] mt-0.5">LEFT</p>
                    </div>

                    <div
                      className={`p-2 rounded border transition-colors ${
                        telemetry.irCenter
                          ? "bg-[var(--color-accent)] text-[#121313] font-bold border-[var(--color-accent)]"
                          : "bg-[var(--color-bg)] text-[var(--color-text-muted)] border-[var(--color-border)]"
                      }`}
                    >
                      <p>{telemetry.irCenter ? "● 1" : "○ 0"}</p>
                      <p className="text-[9px] mt-0.5">CENTER</p>
                    </div>

                    <div
                      className={`p-2 rounded border transition-colors ${
                        telemetry.irRight
                          ? "bg-[var(--color-accent)] text-[#121313] font-bold border-[var(--color-accent)]"
                          : "bg-[var(--color-bg)] text-[var(--color-text-muted)] border-[var(--color-border)]"
                      }`}
                    >
                      <p>{telemetry.irRight ? "● 1" : "○ 0"}</p>
                      <p className="text-[9px] mt-0.5">RIGHT</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Component Inspector */}
              <div className="technical-card rounded-xl p-6" style={{ background: "var(--color-surface)" }}>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--color-border)]">
                  <span className="font-mono text-xs font-bold text-[var(--color-text)] uppercase tracking-wider">
                    COMPONENT INSPECTOR
                  </span>
                  <span className="font-mono text-[10px] text-[var(--color-text-muted)]">HOVER PART</span>
                </div>

                <div className="space-y-2">
                  {COMPONENTS.map((c) => (
                    <div
                      key={c.id}
                      onMouseEnter={() => setHighlight(c.id)}
                      onMouseLeave={() => setHighlight(null)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        highlight === c.id
                          ? "border-[var(--color-accent)] bg-[var(--color-bg)] shadow-sm"
                          : "border-[var(--color-border)] bg-[var(--color-bg)]/50 hover:border-[var(--color-accent)]/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[var(--color-text)]">
                          {c.label}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1 leading-snug">
                        {c.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
