export const projects = [
  {
    id: 1,
    num: "01",
    title: "PERIOD TRACKER",
    category: ["web", "software"],
    stackLabel: "HTML / CSS / JAVASCRIPT / PHP",
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    status: "COMPLETE ●",
    github: "https://github.com/Deekhita-11/Deekhita-11",
    live: null,
    domainType: "cycle",
    screens: [
      {
        id: "01",
        label: "CYCLE PHASES",
        src: "/images/projects/period-tracker-real.png",
        caption: "Personal cycle tracker & 4-phase biological telemetry (Menstruation, Follicular, Ovulation, Luteal)",
      },
      {
        id: "02",
        label: "PREDICTION LOGIC",
        src: "/images/projects/period-tracker-real.png",
        caption: "Rolling average estimation engine based on previous 3 recorded intervals",
      },
    ],
    summary:
      "A simple cycle-tracking application for recording periods, estimating cycles, and viewing history.",
    problem:
      "Users need a lightweight, intuitive utility to log menstrual cycles and forecast upcoming dates without invasive commercial tracking.",
    solution:
      "Designed a clean interface with form-validated historical logging, rolling average cycle estimation, and secure MySQL persistence.",
    architecture: [
      {
        step: "01 / CLIENT INPUT",
        component: "Cycle Input Form",
        tech: "HTML5 / JavaScript",
        desc: "Captures date intervals, symptom notes, and cycle duration with client checks.",
        annotation: "// validates chronological bounds",
        highlightTarget: "01 Menstruation / Input",
      },
      {
        step: "02 / FORECAST LOGIC",
        component: "Cycle Predictor",
        tech: "Moving Average JS",
        desc: "Computes projected cycle onsets based on previous 3 recorded intervals.",
        annotation: "// rolling window estimation",
        highlightTarget: "02 Follicular & Ovulation",
      },
      {
        step: "03 / BACKEND HANDLER",
        component: "Data Router",
        tech: "PHP 8.x Prepared SQL",
        desc: "Sanitizes user input and executes parameterized write queries.",
        annotation: "// session security & validation",
        highlightTarget: "03 Backend Verification",
      },
      {
        step: "04 / RELATIONAL STORE",
        component: "MySQL Database",
        tech: "InnoDB Storage",
        desc: "Persists historical records, user profiles, and calculated metrics.",
        annotation: "// indexed for timeline recall",
        highlightTarget: "04 Luteal & Timeline Archive",
      },
    ],
    codeSnippet: {
      filename: "cycle_calculator.js",
      language: "javascript",
      annotation: "// Rolling average cycle prediction routine",
      code: `// cycle_calculator.js — Cycle Estimation Engine
export function estimateNextCycle(cycleHistory) {
  if (!cycleHistory || cycleHistory.length === 0) return null;

  // Calculate moving average of past 3 valid cycle durations
  const recentCycles = cycleHistory.slice(-3);
  const totalDays = recentCycles.reduce((sum, c) => sum + c.durationDays, 0);
  const avgDuration = Math.round(totalDays / recentCycles.length);

  const lastPeriodDate = new Date(cycleHistory[cycleHistory.length - 1].startDate);
  const nextEstimatedDate = new Date(lastPeriodDate);
  nextEstimatedDate.setDate(lastPeriodDate.getDate() + avgDuration);

  return {
    nextCycleDate: nextEstimatedDate.toISOString().split("T")[0],
    averageDurationDays: avgDuration,
    sampleSize: recentCycles.length,
  };
}`,
    },
  },
  {
    id: 2,
    num: "02",
    title: "BLOOD MANAGEMENT SYSTEM",
    category: ["web", "systems"],
    stackLabel: "REACT / VITE / TAILWIND",
    tags: ["React 18", "Vite", "Tailwind CSS", "MySQL", "REST API"],
    status: "CURRENTLY BUILDING ●",
    github: "https://github.com/Deekhita-11/Deekhita-11",
    live: null,
    domainType: "system",
    screens: [
      {
        id: "01",
        label: "DISPATCH CONSOLE",
        src: "/images/projects/blood-management-real.png",
        caption: "Centralized hospital dispatch log, active inventory breakdown, and ACID-verified allocation",
      },
      {
        id: "02",
        label: "INVENTORY MATRIX",
        src: "/images/projects/blood-management-real.png",
        caption: "Real-time stock monitoring across 8 blood types with automated low-threshold triggers",
      },
    ],
    summary:
      "A centralized system for managing blood donors, inventory, and requests through a structured web interface.",
    problem:
      "Blood banks often rely on disjointed records, causing critical dispatch delays during emergency inventory requests.",
    solution:
      "A centralized web interface uniting donor registries, atomic inventory allocation, and automated blood unit dispatch matching.",
    architecture: [
      {
        step: "01 / CLIENT INTERFACE",
        component: "React Dashboard",
        tech: "Vite · Tailwind",
        desc: "Real-time stock dashboard, donor intake portal, and hospital dispatch forms.",
        annotation: "// optimistic UI updates",
        highlightTarget: "Top Navigation & KPI Telemetry",
      },
      {
        step: "02 / STATE CONTROLLER",
        component: "Inventory State",
        tech: "Context & Hooks",
        desc: "Calculates available vs reserved blood units by group type.",
        annotation: "// deficit threshold monitoring",
        highlightTarget: "Right Panel Inventory Distribution",
      },
      {
        step: "03 / DISPATCH PIPELINE",
        component: "RESTful Endpoints",
        tech: "Node / PHP Backend",
        desc: "Routes authenticated requests and verifies unit availability prior to lock.",
        annotation: "// atomic request locking",
        highlightTarget: "Hospital Dispatch Request Table",
      },
      {
        step: "04 / ATOMIC STORAGE",
        component: "MySQL Schema",
        tech: "ACID RDBMS",
        desc: "Stores blood inventory units, expiration logs, and hospital match records.",
        annotation: "// prevents double-allocation",
        highlightTarget: "ACID Transaction & Auto-Sync Engine",
      },
    ],
    codeSnippet: {
      filename: "BloodInventory.jsx",
      language: "jsx",
      annotation: "// Real-time atomic inventory allocation routine",
      code: `// BloodInventory.jsx — Dispatch Allocation Handler
import React, { useState, useTransition } from "react";

export function BloodInventory({ stock, onDispatchSuccess }) {
  const [selectedGroup, setSelectedGroup] = useState("O+");
  const [isPending, startTransition] = useTransition();

  const handleAllocate = async (group, unitsNeeded) => {
    startTransition(async () => {
      const payload = { bloodGroup: group, quantity: unitsNeeded };
      const res = await fetch("/api/inventory/allocate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) onDispatchSuccess(data.allocatedUnits);
    });
  };

  return (
    <div className="hud-inventory-view font-mono text-xs">
      <header className="flex justify-between border-b border-[var(--color-border)] pb-2">
        <span>STATUS: // ACTIVE_STOCK</span>
        <span className="text-[var(--color-accent)]">{selectedGroup} UNITS</span>
      </header>
    </div>
  );
}`,
    },
  },
  {
    id: 3,
    num: "03",
    title: "GADGET GENIE",
    category: ["web", "software"],
    stackLabel: "HTML / CSS / JAVASCRIPT / PHP",
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Git"],
    status: "COMPLETE ●",
    github: "https://github.com/Deekhita-11/Deekhita-11",
    live: null,
    domainType: "parametric",
    screens: [
      {
        id: "01",
        label: "DISCOVERY HUB",
        src: "/images/projects/gadget-genie-real.png",
        caption: "Interactive gadget discovery interface with parametric search and multi-category metrics (120+ laptops, 50+ phones)",
      },
      {
        id: "02",
        label: "SPEC COMPARISON",
        src: "/images/projects/gadget-genie-real.png",
        caption: "Side-by-side parametric spec comparison with differential highlights",
      },
    ],
    summary:
      "A gadget discovery platform that helps users find technology products based on their needs.",
    problem:
      "Shoppers face fragmented vendor pages when comparing device specifications side-by-side.",
    solution:
      "A responsive gadget exploration engine featuring multi-attribute parametric filters and dynamic comparison matrices.",
    architecture: [
      {
        step: "01 / SPEC MATRIX",
        component: "Comparison Table",
        tech: "DOM Rendering",
        desc: "Side-by-side parametric spec comparison with differential highlights.",
        annotation: "// sub-10ms DOM diff render",
        highlightTarget: "Hero Product Cards & Laptop Finder",
      },
      {
        step: "02 / QUERY ENGINE",
        component: "Search Controller",
        tech: "Asynchronous Fetch",
        desc: "Dispatches sanitized filter parameters without requiring page reloads.",
        annotation: "// debounced search input",
        highlightTarget: "Sidebar Navigation & Search Controller",
      },
      {
        step: "03 / BACKEND ROUTER",
        component: "PHP Query Builder",
        tech: "Prepared PDO",
        desc: "Constructs multi-field relational queries across device categories.",
        annotation: "// SQL injection immunization",
        highlightTarget: "Backend Prepared Statement Router",
      },
      {
        step: "04 / DEVICE DATABASE",
        component: "MySQL Relational",
        tech: "3NF Normalized Schema",
        desc: "Stores devices, benchmark scores, battery ratings, and price records.",
        annotation: "// multi-table JOIN lookup",
        highlightTarget: "Normalized Database & Catalog Index",
      },
    ],
    codeSnippet: {
      filename: "gadget_compare.php",
      language: "php",
      annotation: "// Parametric comparison query builder with prepared statements",
      code: `<?php
// gadget_compare.php — Relational Spec Comparison
require_once 'db_config.php';

$idA = filter_input(INPUT_GET, 'deviceA', FILTER_VALIDATE_INT);
$idB = filter_input(INPUT_GET, 'deviceB', FILTER_VALIDATE_INT);

$query = "SELECT g.name, s.display, s.soc, s.battery, s.price
          FROM gadgets g
          JOIN specifications s ON g.id = s.gadget_id
          WHERE g.id IN (?, ?)";

$stmt = $pdo->prepare($query);
$stmt->execute([$idA, $idB]);
$specs = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode(['comparison' => $specs]);
?>`,
    },
  },
  {
    id: 4,
    num: "04",
    title: "LINE FOLLOWER BOT",
    category: ["robotics", "embedded"],
    stackLabel: "ARDUINO UNO / C++ / IR ARRAY",
    tags: ["Arduino UNO", "C/C++", "IR Sensor Array", "L298N Motor Driver", "DC Motors"],
    status: "COMPLETE ●",
    github: "https://github.com/Deekhita-11/Deekhita-11",
    live: null,
    domainType: "kinematics",
    screens: [
      {
        id: "01",
        label: "CHASSIS & TELEMETRY",
        src: "/images/projects/line-follower.svg",
        caption: "Differential chassis schematic, 5-channel IR optical array, and PID closed-loop tuning (ICORT 2025 DRDO 2nd Place)",
      },
      {
        id: "02",
        label: "PID CONTROLLER",
        src: "/images/projects/line-follower.svg",
        caption: "490Hz PWM dual H-bridge motor driver regulation for yaw trajectory recovery",
      },
    ],
    summary:
      "Autonomous optical line-tracking vehicle engineered with 5-channel IR array and differential PWM control. Secured 2nd Position at ICORT 2025 (ITR-DRDO Chandipur).",
    problem:
      "Maintaining autonomous line trajectory at speed requires low-latency optical sampling and rapid motor torque corrections.",
    solution:
      "Engineered an Arduino bot with a 5-sensor IR array feeding into differential PWM steering with motor driver H-bridge circuitry.",
    architecture: [
      {
        step: "01 / OPTICAL ARRAY",
        component: "5-Ch IR Sensors",
        tech: "Infrared Photodiodes",
        desc: "Samples reflected surface contrast at 50Hz to identify trajectory alignment.",
        annotation: "// reads digital bitmask [010]",
        highlightTarget: "Front 5-Channel IR Sensor Wing",
      },
      {
        step: "02 / LOGIC UNIT",
        component: "ATmega328P MCU",
        tech: "Embedded C++ (16MHz)",
        desc: "Executes trajectory evaluation and calculates differential motor bias.",
        annotation: "// computes angular error",
        highlightTarget: "Arduino ATmega328P Controller",
      },
      {
        step: "03 / POWER STAGE",
        component: "L298N Driver",
        tech: "Dual H-Bridge IC",
        desc: "Regulates 6V-9V motor drive current using high-frequency PWM duty cycles.",
        annotation: "// modulates PWM 0-255",
        highlightTarget: "L298N Dual Motor Driver",
      },
      {
        step: "04 / ACTUATION",
        component: "DC Gearmotors",
        tech: "Differential Wheels",
        desc: "Applies directional yaw torque to smoothly steer the chassis back on track.",
        annotation: "// instant curve correction",
        highlightTarget: "Left / Right Drive Motors",
      },
    ],
    codeSnippet: {
      filename: "LineFollower.ino",
      language: "cpp",
      annotation: "// 50Hz differential optical tracking loop",
      code: `// LineFollower.ino — Differential Motor Control Loop
#define ENA 5
#define ENB 6
#define SENSOR_MASK B00011111

void loop() {
  byte sensors = readIRArray() & SENSOR_MASK;
  switch (sensors) {
    case B00000100: // Centered
      driveMotors(90, 90);
      break;
    case B00001100: // Slight Left drift
      driveMotors(45, 100);
      break;
    case B00000110: // Slight Right drift
      driveMotors(100, 45);
      break;
    default:
      recoverTrajectory();
      break;
  }
}`,
    },
  },
];
