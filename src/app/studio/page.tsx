"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Lightbulb, Copy, Check, Clock, Play } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { studioAnalysis, videoDemos } from "@/lib/data/studio";
import type { VideoDemo, VideoDemoCategory } from "@/lib/data/studio";

/* ── helpers ─────────────────────────────────────────────────────────── */

function scoreColor(score: number) {
  if (score >= 80) return "var(--green)";
  if (score >= 60) return "var(--amber)";
  return "var(--red)";
}

function statusBg(color: string) {
  if (color === "green") return "var(--green-soft)";
  if (color === "amber") return "var(--amber-soft)";
  return "var(--red-soft)";
}

function statusFg(color: string) {
  if (color === "green") return "var(--green)";
  if (color === "amber") return "var(--amber)";
  return "var(--red)";
}

/* ── animated counter ────────────────────────────────────────────────── */

function AnimatedNumber({
  value,
  duration = 2,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <span ref={ref} className={className}>{display}</span>;
}

/* ── mini gauge (60px) ──────────────────────────────────────────────── */

function MiniGauge({ score, size = 60 }: { score: number; size?: number }) {
  const color = scoreColor(score);
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--bg-inset)"
        strokeWidth={5}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

/* ── copy button ─────────────────────────────────────────────────────── */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 14px",
        borderRadius: 8,
        border: "1px solid var(--text-muted)",
        background: copied ? "var(--green-soft)" : "transparent",
        color: copied ? "var(--green)" : "var(--text-secondary)",
        cursor: "pointer",
        fontSize: 14,
        fontWeight: 500,
        transition: "all 0.2s",
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

/* ── main page ────────────────────────────────────────────────────────── */

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState<"captions" | "hooks" | "thumbnails">("captions");
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoDemo>(videoDemos[0]);
  const prevTheme = useRef<string | null>(null);

  useEffect(() => {
    prevTheme.current = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "dark");
    return () => {
      if (prevTheme.current) {
        document.documentElement.setAttribute("data-theme", prevTheme.current);
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
    };
  }, []);

  const sv = selectedVideo;
  const staticData = studioAnalysis;
  const hook = sv.categories[0];
  const visual = sv.categories[1];
  const audio = sv.categories[2];
  const cta = sv.categories[3];

  const tabs = [
    { key: "captions" as const, label: "Captions" },
    { key: "hooks" as const, label: "Hook Ideas" },
    { key: "thumbnails" as const, label: "Thumbnail Concepts" },
  ];

  const benchmarkData = sv.benchmarks.map((b) => ({
    metric: b.metric,
    yours: b.yours,
    top20: b.top20,
    insight: b.insight,
  }));

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "40px 24px 80px",
        display: "flex",
        flexDirection: "column",
        gap: 32,
      }}
    >
      {/* ── page header ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className="font-display"
          style={{ fontWeight: 700, fontSize: 36, color: "var(--text-primary)", marginBottom: 4 }}
        >
          Creator Content Studio
        </h1>
        <p className="font-sans" style={{ fontSize: 16, color: "var(--text-secondary)" }}>
          AI-powered video analysis for food creators
        </p>
      </motion.div>

      {/* ── video gallery — select a video to analyze ────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <p className="font-sans" style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 12, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>
          Select from your latest Insta Reels
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
          {videoDemos.map((video) => {
            const isActive = selectedVideo.id === video.id;
            const sc = scoreColor(video.overallScore);
            return (
              <motion.button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "var(--bg-elevated)",
                  borderRadius: "var(--radius-sm)",
                  border: isActive ? "2px solid var(--gold)" : "2px solid transparent",
                  boxShadow: isActive ? "var(--shadow-glow)" : "var(--shadow-sm)",
                  overflow: "hidden",
                  cursor: "pointer",
                  textAlign: "left",
                  padding: 0,
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }}
                  />
                  <div style={{
                    position: "absolute", bottom: 6, right: 6,
                    background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
                    borderRadius: 6, padding: "2px 8px",
                    fontSize: 12, fontWeight: 600, color: "#fff",
                    fontFamily: "var(--font-jetbrains), monospace",
                  }}>
                    {video.duration}
                  </div>
                  <div style={{
                    position: "absolute", top: 6, left: 6,
                    background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
                    borderRadius: 6, padding: "2px 8px",
                    fontSize: 13, fontWeight: 700, color: sc,
                    fontFamily: "var(--font-jetbrains), monospace",
                  }}>
                    {video.overallScore}
                  </div>
                </div>
                <div style={{ padding: "10px 12px" }}>
                  <p className="font-sans" style={{ fontWeight: 600, fontSize: 13, color: "var(--text-primary)", marginBottom: 4 }}>
                    {video.title}
                  </p>
                  <p className="font-sans" style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {video.verdict}
                  </p>
                </div>
                {isActive && (
                  <div style={{ height: 3, background: "var(--gradient-copper)" }} />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* ── selected video detail strip ──────────────────────────── */}
      <motion.div
        key={selectedVideo.id + "-strip"}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "var(--bg-elevated)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-md)",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img
            src={selectedVideo.thumbnail}
            alt={selectedVideo.title}
            style={{ width: 80, height: 80, borderRadius: 12, objectFit: "cover" }}
          />
          <div style={{ flex: 1 }}>
            <p className="font-sans" style={{ fontWeight: 600, fontSize: 18, color: "var(--text-primary)" }}>
              {selectedVideo.title}
            </p>
            <p className="font-sans" style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 2 }}>
              {selectedVideo.verdict}
            </p>
          </div>
          <div style={{
            background: "var(--gradient-copper)", borderRadius: 12,
            width: 56, height: 56, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}>
            <span className="font-mono" style={{ fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1 }}>
              {selectedVideo.overallScore}
            </span>
          </div>
        </div>

        {/* Score bars */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {selectedVideo.categories.map((cat) => (
            { label: cat.name.split(" ")[0], score: cat.score }
          )).map((item) => (
            <div key={item.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span className="font-sans" style={{ fontSize: 12, fontWeight: 500, color: "var(--text-muted)" }}>{item.label}</span>
                <span className="font-mono" style={{ fontSize: 12, fontWeight: 600, color: scoreColor(item.score) }}>{item.score}</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: "var(--bg-inset)", overflow: "hidden" }}>
                <motion.div
                  key={selectedVideo.id + item.label}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{ height: "100%", borderRadius: 3, background: scoreColor(item.score) }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA verdict */}
        {(() => {
          const ctaCat = selectedVideo.categories[3];
          return (
            <div style={{
              background: ctaCat.score >= 80 ? "var(--green-soft)" : ctaCat.score >= 60 ? "var(--amber-soft)" : "var(--red-soft)",
              borderRadius: 12, padding: "12px 16px",
              borderLeft: `3px solid ${scoreColor(ctaCat.score)}`,
            }}>
              <p className="font-sans" style={{ fontSize: 12, fontWeight: 600, color: scoreColor(ctaCat.score), marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                CTA Verdict
              </p>
              <p className="font-sans" style={{ fontSize: 14, color: "var(--text-primary)", lineHeight: 1.5 }}>
                {ctaCat.feedback}
              </p>
            </div>
          );
        })()}

        {/* Caption preview */}
        <div style={{ background: "var(--bg-inset)", borderRadius: 12, padding: "12px 16px" }}>
          <p className="font-sans" style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Current Caption
          </p>
          <p className="font-sans" style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.5, fontStyle: "italic" }}>
            &ldquo;{selectedVideo.caption}&rdquo;
          </p>
        </div>

        {/* Top feedback */}
        <p className="font-sans" style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Analysis: </span>
          {selectedVideo.topFeedback}
        </p>
      </motion.div>

      {/* ── upload zone (decorative) ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          height: 72,
          border: "2px dashed var(--text-muted)",
          borderRadius: "var(--radius-sm)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          cursor: "pointer",
          opacity: 0.6,
        }}
      >
        <Upload size={18} style={{ color: "var(--text-muted)" }} />
        <span className="font-sans" style={{ fontSize: 14, color: "var(--text-muted)" }}>
          Drop your own video or paste a TikTok/YouTube link
        </span>
      </motion.div>

      {/* ── full analysis heading ─────────────────────────────────── */}
      <div style={{ textAlign: "center" }}>
        <p className="font-display" style={{ fontSize: 24, fontWeight: 700, color: "var(--text-primary)" }}>
          Full Analysis — {sv.title}
        </p>
        <p className="font-sans" style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4 }}>
          Deep-dive breakdown with frame-level feedback
        </p>
      </div>

      {/* ── video info strip ─────────────────────────────────────── */}
      <motion.div
        key={sv.id + "-info"}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: "var(--bg-elevated)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-sm)",
          padding: 16,
        }}
      >
        <img
          src={sv.thumbnail}
          alt={sv.title}
          style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            objectFit: "cover",
          }}
        />
        <div style={{ flex: 1 }}>
          <p className="font-sans" style={{ fontWeight: 600, fontSize: 16, color: "var(--text-primary)" }}>
            {sv.title}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 2 }}>
            <span className="font-mono" style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
              <Play size={12} /> {sv.duration}
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── overall score gauge ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          padding: "32px 0",
        }}
      >
        <OverallGauge key={sv.id} score={sv.overallScore} />
        <p className="font-display" style={{ fontWeight: 600, fontSize: 28, color: "var(--text-primary)", textAlign: "center", marginTop: 4 }}>
          {sv.verdict}
        </p>
        <p className="font-sans" style={{ fontSize: 16, color: "var(--text-secondary)", textAlign: "center", maxWidth: 480 }}>
          {sv.subVerdict}
        </p>
      </motion.div>

      {/* ── score breakdown 2×2 ──────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))",
          gap: 20,
        }}
      >
        <HookCard data={hook} />
        <VisualCard data={visual} />
        <AudioCard data={audio} />
        <CTACard data={cta} />
      </div>

      {/* ── timestamp feedback timeline ──────────────────────────── */}
      <TimelineSection markers={sv.timestampMarkers} activeMarker={activeMarker} setActiveMarker={setActiveMarker} />

      {/* ── benchmark comparison ──────────────────────────────────── */}
      <BenchmarkSection data={benchmarkData} />

      {/* ── generated content (tabbed) ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{
          background: "var(--bg-elevated)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-md)",
          padding: 28,
        }}
      >
        <h2 className="font-display" style={{ fontWeight: 600, fontSize: 24, color: "var(--text-primary)", marginBottom: 20 }}>
          Generated Content
        </h2>

        {/* tabs */}
        <div style={{ display: "flex", gap: 24, borderBottom: "1px solid var(--bg-inset)", marginBottom: 24, position: "relative" }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="font-sans"
              style={{
                fontWeight: 600,
                fontSize: 15,
                color: activeTab === t.key ? "var(--text-primary)" : "var(--text-muted)",
                background: "none",
                border: "none",
                cursor: "pointer",
                paddingBottom: 12,
                position: "relative",
              }}
            >
              {t.label}
              {activeTab === t.key && (
                <motion.div
                  layoutId="tab-indicator"
                  style={{
                    position: "absolute",
                    bottom: -1,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: "var(--gradient-copper)",
                    borderRadius: 2,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "captions" && (
            <motion.div
              key="captions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              {staticData.captions.map((c, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg-inset)",
                    borderRadius: "var(--radius-sm)",
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span
                      className="font-sans"
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        padding: "3px 10px",
                        borderRadius: 20,
                        background: "var(--gold-light)",
                        color: "var(--gold)",
                      }}
                    >
                      {c.style}
                    </span>
                    <CopyButton text={c.text} />
                  </div>
                  <p className="font-sans" style={{ fontSize: 15, color: "var(--text-primary)", lineHeight: 1.6 }}>
                    {c.text}
                  </p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "hooks" && (
            <motion.div
              key="hooks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              {staticData.hookIdeas.map((h, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg-inset)",
                    borderRadius: "var(--radius-sm)",
                    padding: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <p className="font-sans" style={{ fontSize: 15, color: "var(--text-primary)", flex: 1 }}>
                    &ldquo;{h.text}&rdquo;
                  </p>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: 20,
                      background: "var(--green-soft)",
                      color: "var(--green)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ↑{h.retention}% retention
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "thumbnails" && (
            <motion.div
              key="thumbnails"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              {staticData.thumbnailConcepts.map((tc, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg-inset)",
                    borderRadius: "var(--radius-sm)",
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <h4 className="font-sans" style={{ fontWeight: 600, fontSize: 16, color: "var(--text-primary)" }}>
                    {tc.name}
                  </h4>
                  <p className="font-sans" style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {tc.description}
                  </p>
                  <ThumbnailWireframe concept={i} />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION COMPONENTS
   ═══════════════════════════════════════════════════════════════════════ */

/* ── overall gauge (220px SVG) ───────────────────────────────────────── */

function OverallGauge({ score }: { score: number }) {
  const size = 220;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;

  const overshootScore = Math.min(score + 3, 100);
  const targetOffset = circ * (1 - score / 100);
  const overshootOffset = circ * (1 - overshootScore / 100);

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--red)" />
            <stop offset="40%" stopColor="var(--amber)" />
            <stop offset="80%" stopColor="var(--gold)" />
            <stop offset="100%" stopColor="var(--green)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--bg-inset)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#arc-gradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{
            strokeDashoffset: [circ, overshootOffset, targetOffset],
          }}
          transition={{
            duration: 2,
            times: [0, 0.75, 1],
            ease: "easeOut",
          }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          className="font-mono"
          style={{ fontWeight: 700, fontSize: 64, color: "var(--text-primary)", lineHeight: 1 }}
        >
          <AnimatedNumber value={score} duration={2} />
        </span>
        <span className="font-mono" style={{ fontWeight: 400, fontSize: 20, color: "var(--text-muted)", marginTop: 2 }}>
          /100
        </span>
      </div>
    </div>
  );
}

/* ── card wrapper ────────────────────────────────────────────────────── */

function ScoreCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{
        background: "var(--bg-elevated)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {children}
    </motion.div>
  );
}

function CardHeader({ name, score, status, statusColor }: { name: string; score: number; status: string; statusColor: string }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <MiniGauge score={score} />
        <div style={{ flex: 1 }}>
          <h3 className="font-sans" style={{ fontWeight: 600, fontSize: 17, color: "var(--text-primary)" }}>
            {name}
          </h3>
          <span
            className="font-sans"
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: 20,
              background: statusBg(statusColor),
              color: statusFg(statusColor),
              display: "inline-block",
              marginTop: 4,
            }}
          >
            {status}
          </span>
        </div>
        <span className="font-mono" style={{ fontWeight: 600, fontSize: 24, color: scoreColor(score) }}>
          {score}
        </span>
      </div>
    </>
  );
}

/* ── card 1: hook strength ───────────────────────────────────────────── */

function HookCard({ data }: { data: VideoDemoCategory }) {
  return (
    <ScoreCard delay={0.2}>
      <CardHeader name={data.name} score={data.score} status={data.status} statusColor={data.statusColor} />
      <p className="font-sans" style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
        {data.feedback}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.suggestions?.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <Lightbulb size={16} style={{ color: "var(--gold)", marginTop: 2, flexShrink: 0 }} />
            <span className="font-sans" style={{ fontSize: 14, color: "var(--text-primary)" }}>{s}</span>
          </div>
        ))}
      </div>

      {/* mini timeline bar */}
      <div style={{ position: "relative", marginTop: 8 }}>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }} className="font-sans">
          First 3 seconds
        </div>
        <div style={{ position: "relative", height: 24, background: "var(--bg-inset)", borderRadius: 12, overflow: "visible" }}>
          {/* animated gold sweep */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              borderRadius: 12,
              background: "linear-gradient(90deg, var(--gold) 0%, transparent 100%)",
              opacity: 0.12,
            }}
          />
          {/* 0.0s green dot */}
          <div style={{ position: "absolute", left: "0%", top: "50%", transform: "translate(-50%, -50%)" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--green)" }} />
          </div>
          {/* 0.5s ideal hook dashed line */}
          <div
            style={{
              position: "absolute",
              left: "16.7%",
              top: 0,
              height: "100%",
              borderLeft: "2px dashed var(--text-muted)",
            }}
          />
          <span
            className="font-mono"
            style={{
              position: "absolute",
              left: "16.7%",
              top: -18,
              transform: "translateX(-50%)",
              fontSize: 10,
              color: "var(--text-muted)",
              whiteSpace: "nowrap",
            }}
          >
            0.5s — Ideal hook
          </span>
          {/* 1.2s amber dot */}
          <div style={{ position: "absolute", left: "40%", top: "50%", transform: "translate(-50%, -50%)" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--amber)" }} />
          </div>
          <span
            className="font-mono"
            style={{
              position: "absolute",
              left: "40%",
              top: 30,
              transform: "translateX(-50%)",
              fontSize: 10,
              color: "var(--amber)",
              whiteSpace: "nowrap",
            }}
          >
            1.2s — Your first text
          </span>
        </div>
      </div>
    </ScoreCard>
  );
}

/* ── card 2: visual appeal ───────────────────────────────────────────── */

function VisualCard({ data }: { data: VideoDemoCategory }) {
  const [hoveredColor, setHoveredColor] = useState<number | null>(null);
  const palette: string[] = data.colorPalette ?? [];
  const subScores: { label: string; value: number }[] = data.subScores ?? [];

  return (
    <ScoreCard delay={0.25}>
      <CardHeader name={data.name} score={data.score} status={data.status} statusColor={data.statusColor} />
      <p className="font-sans" style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
        {data.feedback}
      </p>

      {/* color palette */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
        {palette.map((c, i) => (
          <div key={i} style={{ position: "relative" }}>
            <motion.div
              onHoverStart={() => setHoveredColor(i)}
              onHoverEnd={() => setHoveredColor(null)}
              whileHover={{ scale: 1.15 }}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: c,
                cursor: "pointer",
                border: "2px solid var(--bg-elevated)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            />
            <AnimatePresence>
              {hoveredColor === i && (
                <motion.span
                  initial={{ opacity: 0, y: 4, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.9 }}
                  className="font-mono"
                  style={{
                    position: "absolute",
                    top: -28,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: 11,
                    color: "var(--text-primary)",
                    background: "var(--bg-elevated)",
                    padding: "2px 8px",
                    borderRadius: 6,
                    boxShadow: "var(--shadow-sm)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <p className="font-sans" style={{ fontSize: 13, color: "var(--text-muted)" }}>
        Dominant: Warm Amber &nbsp;|&nbsp; Accent: Deep Red
      </p>

      {/* sub-scores */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {subScores.map((s) => (
          <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="font-sans" style={{ fontSize: 12, color: "var(--text-muted)" }}>{s.label}</span>
              <span className="font-mono" style={{ fontSize: 12, fontWeight: 600, color: scoreColor(s.value) }}>
                {s.value}
              </span>
            </div>
            <div style={{ height: 4, background: "var(--bg-inset)", borderRadius: 2, overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.value}%` }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                style={{ height: "100%", background: scoreColor(s.value), borderRadius: 2 }}
              />
            </div>
          </div>
        ))}
      </div>
    </ScoreCard>
  );
}

/* ── card 3: audio quality ───────────────────────────────────────────── */

function AudioCard({ data }: { data: VideoDemoCategory }) {
  const waveform: number[] = data.waveform ?? [];
  const problemRange: number[] = data.problemRange ?? [];

  return (
    <ScoreCard delay={0.3}>
      <CardHeader name={data.name} score={data.score} status={data.status} statusColor={data.statusColor} />
      <p className="font-sans" style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
        {data.feedback}
      </p>

      {/* waveform */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 60 }}>
        {waveform.map((h, i) => {
          const isProblem = i >= problemRange[0] && i <= problemRange[1];
          return (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.6, delay: i * 0.015, ease: "easeOut" }}
              style={{
                flex: 1,
                minWidth: 4,
                borderRadius: 2,
                background: isProblem ? "var(--red)" : "var(--gold)",
                opacity: isProblem ? 1 : 0.6,
                boxShadow: isProblem ? "0 0 8px rgba(220, 38, 38, 0.4)" : "none",
              }}
            />
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="font-mono" style={{ fontSize: 10, color: "var(--text-muted)" }}>0:00</span>
        <span className="font-mono" style={{ fontSize: 10, color: "var(--red)" }}>
          0:12–0:18 conflict
        </span>
        <span className="font-mono" style={{ fontSize: 10, color: "var(--text-muted)" }}>0:32</span>
      </div>
    </ScoreCard>
  );
}

/* ── card 4: CTA effectiveness ───────────────────────────────────────── */

function CTACard({ data }: { data: VideoDemoCategory }) {
  return (
    <ScoreCard delay={0.35}>
      <CardHeader name={data.name} score={data.score} status={data.status} statusColor={data.statusColor} />
      <p className="font-sans" style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
        {data.feedback}
      </p>

      {/* end screen mockup */}
      <div
        style={{
          aspectRatio: "16/9",
          background: "var(--bg-inset)",
          borderRadius: "var(--radius-sm)",
          border: "2px dashed var(--gold)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          padding: 16,
          overflow: "hidden",
        }}
      >
        <span
          className="font-sans"
          style={{
            fontWeight: 700,
            fontSize: 18,
            color: "var(--gold)",
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          FOLLOW FOR MORE 🍳
        </span>
        <div
          style={{
            padding: "6px 20px",
            borderRadius: 8,
            border: "2px dashed var(--gold)",
            color: "var(--gold)",
            fontSize: 14,
            fontWeight: 600,
          }}
          className="font-sans"
        >
          💾 Save
        </div>
        {/* zone labels */}
        <span
          className="font-mono"
          style={{
            position: "absolute",
            top: 8,
            right: 10,
            fontSize: 9,
            color: "var(--text-muted)",
            opacity: 0.6,
          }}
        >
          CTA Zone
        </span>
        <span
          className="font-mono"
          style={{
            position: "absolute",
            bottom: 8,
            left: 10,
            fontSize: 9,
            color: "var(--text-muted)",
            opacity: 0.6,
          }}
        >
          Safe area
        </span>
      </div>
      <p className="font-sans" style={{ fontSize: 13, color: "var(--gold)", fontWeight: 500 }}>
        Quick win: Add a &quot;Follow for more&quot; text overlay in the last 3 seconds.
      </p>
    </ScoreCard>
  );
}

/* ── timestamp feedback timeline ─────────────────────────────────────── */

function TimelineSection({
  markers,
  activeMarker,
  setActiveMarker,
}: {
  markers: { time: number; position: number; color: string; label: string }[];
  activeMarker: number | null;
  setActiveMarker: (v: number | null) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      style={{
        background: "var(--bg-elevated)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
        padding: 28,
      }}
    >
      <h2 className="font-display" style={{ fontWeight: 600, fontSize: 24, color: "var(--text-primary)", marginBottom: 20 }}>
        Frame-by-Frame Feedback
      </h2>

      <div style={{ position: "relative", paddingTop: 60, paddingBottom: 12 }}>
        {/* bar */}
        <div
          style={{
            width: "100%",
            height: 8,
            background: "var(--bg-inset)",
            borderRadius: 9999,
            position: "relative",
          }}
        >
          {markers.map((m, i) => (
            <div
              key={i}
              style={{ position: "absolute", left: `${m.position}%`, top: "50%", transform: "translate(-50%, -50%)", zIndex: 2 }}
            >
              <motion.div
                whileHover={{ scale: 1.3 }}
                onClick={() => setActiveMarker(activeMarker === i ? null : i)}
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: statusFg(m.color),
                  border: "3px solid var(--bg-elevated)",
                  cursor: "pointer",
                  boxShadow: activeMarker === i ? `0 0 12px ${statusFg(m.color)}` : "none",
                }}
              />

              <AnimatePresence>
                {activeMarker === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="frosted-glass"
                    style={{
                      position: "absolute",
                      bottom: 28,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 300,
                      maxWidth: 320,
                      padding: 14,
                      borderRadius: "var(--radius-md)",
                      boxShadow: "var(--shadow-lg)",
                      zIndex: 10,
                    }}
                  >
                    <span className="font-mono" style={{ fontSize: 12, color: statusFg(m.color), fontWeight: 600 }}>
                      {m.time.toFixed(2)}s
                    </span>
                    <p className="font-sans" style={{ fontSize: 13, color: "var(--text-primary)", marginTop: 4, lineHeight: 1.5 }}>
                      {m.label}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── benchmark comparison ────────────────────────────────────────────── */

function BenchmarkSection({
  data,
}: {
  data: { metric: string; yours: number; top20: number; insight: string }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.38 }}
      style={{
        background: "var(--bg-elevated)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
        padding: 28,
      }}
    >
      <h2 className="font-display" style={{ fontWeight: 600, fontSize: 24, color: "var(--text-primary)", marginBottom: 4 }}>
        How You Compare
      </h2>
      <p className="font-sans" style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24 }}>
        Your performance vs. top 20% of food creators
      </p>

      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barGap={4} margin={{ left: 20, right: 30, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-inset)" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis dataKey="metric" type="category" width={120} tick={{ fill: "var(--text-primary)", fontSize: 13 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--bg-inset)",
                borderRadius: 12,
                boxShadow: "var(--shadow-md)",
                color: "var(--text-primary)",
                fontSize: 13,
              }}
              cursor={{ fill: "var(--bg-inset)", opacity: 0.5 }}
            />
            <Bar dataKey="yours" name="You" radius={[0, 4, 4, 0]} barSize={14}>
              {data.map((_, i) => (
                <Cell key={i} fill="var(--gold)" />
              ))}
            </Bar>
            <Bar dataKey="top20" name="Top 20%" radius={[0, 4, 4, 0]} barSize={14}>
              {data.map((_, i) => (
                <Cell key={i} fill="var(--text-muted)" opacity={0.4} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 16 }}>
        {data.map((d, i) => (
          <p key={i} className="font-sans" style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            <strong style={{ color: "var(--text-primary)" }}>{d.metric}:</strong> {d.insight}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

/* ── thumbnail wireframes ────────────────────────────────────────────── */

function ThumbnailWireframe({ concept }: { concept: number }) {
  const baseStyle: React.CSSProperties = {
    aspectRatio: "16/9",
    background: "var(--bg-inset)",
    borderRadius: "var(--radius-sm)",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px dashed var(--text-muted)",
  };

  if (concept === 0) {
    return (
      <div style={baseStyle}>
        {/* bowl */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: "2px dashed var(--text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div style={{ width: 50, height: 50, borderRadius: "50%", background: "var(--bg-elevated)", opacity: 0.6 }} />
        </div>
        {/* steam squiggles */}
        <svg width="30" height="40" style={{ position: "absolute", top: "15%", left: "55%" }} viewBox="0 0 30 40">
          <path d="M10 35 Q15 25 10 20 Q5 15 10 5" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M20 35 Q25 25 20 20 Q15 15 20 5" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
        <span
          className="font-sans"
          style={{
            position: "absolute",
            bottom: 16,
            fontWeight: 700,
            fontSize: 14,
            color: "var(--gold)",
            letterSpacing: 1,
          }}
        >
          BETTER THAN TAKEOUT
        </span>
        <span className="font-mono" style={{ position: "absolute", top: 8, left: 10, fontSize: 9, color: "var(--text-muted)" }}>
          Top-down view
        </span>
      </div>
    );
  }

  if (concept === 1) {
    return (
      <div style={{ ...baseStyle, flexDirection: "row" }}>
        {/* left: ingredients */}
        <div
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            borderRight: "1px dashed var(--text-muted)",
          }}
        >
          {[12, 10, 8, 14, 10].map((s, i) => (
            <div
              key={i}
              style={{
                width: s,
                height: s,
                borderRadius: "50%",
                border: "1.5px dashed var(--text-muted)",
              }}
            />
          ))}
          <span className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 4 }}>
            Ingredients
          </span>
        </div>
        {/* arrow */}
        <div style={{ padding: "0 8px", color: "var(--gold)", fontSize: 20, fontWeight: 700 }}>→</div>
        {/* right: dish */}
        <div
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: "2px dashed var(--gold)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--gold)", opacity: 0.2 }} />
          </div>
          <span className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 6 }}>
            Dish
          </span>
        </div>
      </div>
    );
  }

  // concept === 2: The Face
  return (
    <div style={baseStyle}>
      {/* person silhouette */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", border: "2px dashed var(--text-muted)" }} />
        <div style={{ width: 48, height: 40, borderRadius: "8px 8px 0 0", border: "2px dashed var(--text-muted)", borderBottom: "none" }} />
      </div>
      {/* blurred foreground */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          background: "linear-gradient(transparent, var(--bg-inset))",
        }}
      />
      {/* text overlay */}
      <span
        className="font-sans"
        style={{
          position: "absolute",
          bottom: 14,
          fontWeight: 700,
          fontSize: 11,
          color: "var(--gold)",
          textAlign: "center",
        }}
      >
        I CAN&apos;T BELIEVE I MADE THIS 🤯
      </span>
      <span className="font-mono" style={{ position: "absolute", top: 8, right: 10, fontSize: 9, color: "var(--text-muted)" }}>
        Text overlay position
      </span>
    </div>
  );
}
