"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import {
  engagementData,
  retentionData,
  heatmapData,
  leaderboard,
  trendingIngredients,
  trendingFormats,
  trendingRecipes,
  dashboardStats,
} from "@/lib/data/dashboard";
import { CountUp } from "@/components/ui/CountUp";
import type { LeaderboardEntry, TrendItem } from "@/lib/types";

/* ─── helpers ─── */

const cardBase: React.CSSProperties = {
  background: "var(--bg-elevated)",
  borderRadius: "var(--radius-sm)",
  boxShadow: "var(--shadow-md)",
  padding: 24,
  borderTop: "3px solid transparent",
  borderImage: "var(--gradient-copper) 1",
};

const cardMotion = {
  whileHover: {
    y: -4,
    boxShadow: "var(--shadow-lg)",
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
};

const sectionTitle = {
  fontSize: 18,
  fontWeight: 600,
  color: "var(--text-primary)",
};

const subtitle = {
  fontSize: 13,
  color: "var(--text-muted)",
  marginTop: 2,
};

/* ─── custom tooltip for area chart ─── */

function EngagementTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="frosted-glass"
      style={{
        padding: "10px 14px",
        borderRadius: "var(--radius-sm)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <p style={{ fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>
        {label}
      </p>
      <p style={{ fontSize: 13, color: "var(--copper)", fontWeight: 500 }}>
        {payload[0].value.toLocaleString()} views
      </p>
    </div>
  );
}

/* ─── inline arc gauge SVG ─── */

function ArcGauge({ score, max = 100 }: { score: number; max?: number }) {
  const pct = score / max;
  const r = 16;
  const cx = 20;
  const cy = 22;
  const startAngle = Math.PI;
  const endAngle = 0;
  const sweep = startAngle - (startAngle - endAngle) * pct;

  const arcPath = (angle: number) =>
    `${cx + r * Math.cos(angle)} ${cy - r * Math.sin(angle)}`;

  return (
    <svg width={40} height={28} viewBox="0 0 40 28" style={{ flexShrink: 0 }}>
      <path
        d={`M ${arcPath(startAngle)} A ${r} ${r} 0 0 1 ${arcPath(endAngle)}`}
        fill="none"
        stroke="var(--bg-inset)"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d={`M ${arcPath(startAngle)} A ${r} ${r} 0 ${pct > 0.5 ? 1 : 0} 1 ${arcPath(sweep)}`}
        fill="none"
        stroke="var(--copper)"
        strokeWidth={4}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── score pill ─── */

function ScorePill({ score }: { score: number }) {
  const bg =
    score >= 80
      ? "var(--green-soft)"
      : score >= 60
        ? "var(--amber-soft)"
        : "var(--red-soft)";
  const color =
    score >= 80
      ? "var(--green)"
      : score >= 60
        ? "var(--amber)"
        : "var(--red)";
  return (
    <span
      style={{
        background: bg,
        color,
        fontWeight: 600,
        fontSize: 13,
        padding: "3px 10px",
        borderRadius: "var(--radius-full)",
      }}
    >
      {score}
    </span>
  );
}

/* ─── heatmap segment color ─── */

function heatmapColor(dropoff: number) {
  if (dropoff >= 15) return "var(--red)";
  if (dropoff >= 8) return "var(--amber)";
  return "var(--green)";
}

/* ─── mini sparkline ─── */

function Sparkline({ data }: { data: number[] }) {
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <ResponsiveContainer width={56} height={24}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="v"
          stroke="var(--gold)"
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

/* ─── trending card ─── */

function TrendingCard({
  title,
  items,
}: {
  title: string;
  items: TrendItem[];
}) {
  return (
    <motion.div style={cardBase} {...cardMotion}>
      <p style={sectionTitle}>{title}</p>
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {items.slice(0, 5).map((item) => (
          <div
            key={item.name}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "var(--text-primary)",
                flex: 1,
                minWidth: 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.name}
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: "var(--radius-full)",
                background: "var(--gold-light)",
                color: "var(--copper)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {item.emoji} +{item.change}%
            </span>
            <div style={{ flexShrink: 0 }}>
              <Sparkline data={item.sparkline} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── retention tooltip ─── */

function RetentionTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="frosted-glass"
      style={{
        padding: "10px 14px",
        borderRadius: "var(--radius-sm)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <p style={{ fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>
        {label}
      </p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ fontSize: 13, color: p.color, fontWeight: 500 }}>
          {p.name}: {p.value}%
        </p>
      ))}
    </div>
  );
}

/* ─── heatmap tooltip ─── */

function HeatmapTooltipCard({
  seg,
  pos,
}: {
  seg: { range: string; dropoff: number };
  pos: { x: number; y: number };
}) {
  return (
    <div
      className="frosted-glass"
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y - 48,
        transform: "translateX(-50%)",
        padding: "6px 12px",
        borderRadius: "var(--radius-sm)",
        boxShadow: "var(--shadow-md)",
        fontSize: 13,
        fontWeight: 500,
        color: "var(--text-primary)",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {seg.range}: {seg.dropoff}% of viewers left
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN DASHBOARD PAGE
   ═══════════════════════════════════════════ */

type SortKey = "score" | "views" | "engagement" | "date" | "title";
type SortDir = "asc" | "desc";

export default function DashboardPage() {
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [hoveredSeg, setHoveredSeg] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const sortedLeaderboard = useMemo(() => {
    const sorted = [...leaderboard].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (typeof valA === "string" && typeof valB === "string")
        return valA.localeCompare(valB);
      return (valA as number) - (valB as number);
    });
    return sortDir === "desc" ? sorted.reverse() : sorted;
  }, [sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return null;
    return sortDir === "asc" ? (
      <ChevronUp size={14} style={{ marginLeft: 4 }} />
    ) : (
      <ChevronDown size={14} style={{ marginLeft: 4 }} />
    );
  }

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ display: "flex", flexDirection: "column", gap: 28, padding: "0 4px" }}
    >
      {/* ── Stat Cards ── */}
      <motion.div
        variants={itemVariants}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
        }}
      >
        {/* Total Views */}
        <motion.div style={cardBase} {...cardMotion}>
          <p style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>
            Total Views
          </p>
          <CountUp
            end={dashboardStats.totalViews}
            className="block"
            suffix=""
          />
          <span
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontWeight: 600,
              fontSize: 32,
              color: "var(--text-primary)",
              display: "none",
            }}
          />
          <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontWeight: 600, fontSize: 32, color: "var(--text-primary)", marginTop: 4 }}>
            <CountUp end={dashboardStats.totalViews} duration={1.8} />
          </div>
          <p
            style={{
              marginTop: 8,
              fontSize: 13,
              fontWeight: 500,
              color: "var(--green)",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <ArrowUpRight size={14} /> +12% vs last month
          </p>
        </motion.div>

        {/* Engagement Rate */}
        <motion.div style={cardBase} {...cardMotion}>
          <p style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>
            Engagement Rate
          </p>
          <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontWeight: 600, fontSize: 32, color: "var(--text-primary)", marginTop: 4 }}>
            <CountUp end={dashboardStats.engagementRate} decimals={1} suffix="%" duration={1.8} />
          </div>
          <p
            style={{
              marginTop: 8,
              fontSize: 13,
              fontWeight: 500,
              color: "var(--green)",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <ArrowUpRight size={14} /> +0.8%
          </p>
        </motion.div>

        {/* Content Score */}
        <motion.div style={cardBase} {...cardMotion}>
          <p style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>
            Content Score
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 4,
            }}
          >
            <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontWeight: 600, fontSize: 32, color: "var(--text-primary)" }}>
              <CountUp end={dashboardStats.contentScore} duration={1.8} />
              <span style={{ fontSize: 20, color: "var(--text-muted)" }}>/100</span>
            </span>
            <ArcGauge score={dashboardStats.contentScore} />
          </div>
        </motion.div>

        {/* Best Performer */}
        <motion.div style={cardBase} {...cardMotion}>
          <p style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>
            Best Performer
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 8,
            }}
          >
            <img
              src={dashboardStats.bestPerformer.thumbnail}
              alt={dashboardStats.bestPerformer.title}
              width={48}
              height={48}
              style={{ borderRadius: 8, objectFit: "cover" }}
            />
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  color: "var(--text-primary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {dashboardStats.bestPerformer.title}
              </p>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "var(--radius-full)",
                  background: "var(--gold-light)",
                  color: "var(--gold)",
                }}
              >
                {dashboardStats.bestPerformer.score} pts
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Engagement Over Time ── */}
      <motion.div variants={itemVariants} style={{ ...cardBase, padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div>
            <p style={sectionTitle}>Engagement Over Time</p>
            <p style={subtitle}>Last 6 months</p>
          </div>
          <TrendingUp size={18} style={{ color: "var(--copper)" }} />
        </div>
        <div style={{ marginTop: 20 }}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={engagementData}>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--gold)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="var(--bg-inset)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "var(--text-muted)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "var(--text-muted)" }}
                axisLine={false}
                tickLine={false}
                width={48}
              />
              <Tooltip content={<EngagementTooltip />} />
              <Area
                type="monotone"
                dataKey="views"
                stroke="var(--copper)"
                strokeWidth={2}
                fill="url(#goldGrad)"
                animationDuration={1200}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* ── Retention Curve ── */}
      <motion.div variants={itemVariants} style={{ ...cardBase, padding: 28 }}>
        <p style={sectionTitle}>Viewer Retention Curve</p>
        <div style={{ marginTop: 20 }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={retentionData}>
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="var(--bg-inset)"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 12, fill: "var(--text-muted)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "var(--text-muted)" }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                width={40}
              />
              <Tooltip content={<RetentionTooltip />} />
              <ReferenceArea
                x1="0s"
                x2="3s"
                fill="var(--red)"
                fillOpacity={0.06}
                label={{ value: "Hook Zone", position: "insideTop", fontSize: 11, fill: "var(--red)" }}
              />
              <ReferenceArea
                x1="24s"
                x2="30s"
                fill="var(--green)"
                fillOpacity={0.06}
                label={{ value: "CTA Zone", position: "insideTop", fontSize: 11, fill: "var(--green)" }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="line"
                wrapperStyle={{ fontSize: 12, paddingBottom: 12 }}
              />
              <Line
                type="monotone"
                dataKey="yours"
                name="Your Video"
                stroke="var(--gold)"
                strokeWidth={2.5}
                dot={false}
                animationDuration={1200}
              />
              <Line
                type="monotone"
                dataKey="average"
                name="Category Average"
                stroke="var(--text-muted)"
                strokeWidth={1.5}
                strokeDasharray="6 4"
                dot={false}
                animationDuration={1200}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{
            marginTop: 16,
            background: "var(--bg-inset)",
            borderRadius: "var(--radius-sm)",
            padding: "12px 16px",
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            fontSize: 13,
            color: "var(--text-secondary)",
            lineHeight: 1.55,
          }}
        >
          <span style={{ fontSize: 18, flexShrink: 0 }}>📉</span>
          <span>
            You lose <strong style={{ color: "var(--red)" }}>22%</strong> of viewers
            in the first 3 seconds. Try starting with a close-up shot of the
            finished dish or a bold text hook to grab attention instantly.
          </span>
        </div>
      </motion.div>

      {/* ── Drop-off Heatmap ── */}
      <motion.div variants={itemVariants} style={{ ...cardBase, padding: 28 }}>
        <p style={sectionTitle}>Where Viewers Leave</p>
        <div
          style={{
            marginTop: 16,
            width: "100%",
            height: 48,
            borderRadius: 8,
            overflow: "hidden",
            display: "flex",
            position: "relative",
          }}
        >
          {heatmapData.map((seg, i) => (
            <div
              key={seg.range}
              style={{
                flex: 1,
                height: "100%",
                background: heatmapColor(seg.dropoff),
                opacity: hoveredSeg === i ? 1 : 0.82,
                cursor: "pointer",
                transition: "opacity 0.2s",
                borderRight:
                  i < heatmapData.length - 1
                    ? "1px solid var(--bg-primary)"
                    : "none",
              }}
              onMouseEnter={(e) => {
                setHoveredSeg(i);
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltipPos({
                  x: rect.left + rect.width / 2,
                  y: rect.top,
                });
              }}
              onMouseLeave={() => setHoveredSeg(null)}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 6,
            fontSize: 11,
            color: "var(--text-muted)",
          }}
        >
          <span>0s</span>
          <span>30s</span>
        </div>
        {hoveredSeg !== null && (
          <HeatmapTooltipCard seg={heatmapData[hoveredSeg]} pos={tooltipPos} />
        )}
      </motion.div>

      {/* ── Content Leaderboard ── */}
      <motion.div variants={itemVariants} style={{ ...cardBase, padding: 28 }}>
        <p style={sectionTitle}>Content Leaderboard</p>
        <div style={{ marginTop: 16, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid var(--bg-inset)",
                  textAlign: "left",
                  color: "var(--text-muted)",
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                <th style={{ padding: "10px 8px", width: 36 }}>#</th>
                <th
                  style={{ padding: "10px 8px", cursor: "pointer" }}
                  onClick={() => handleSort("title")}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>
                    Video
                    <SortIcon col="title" />
                  </span>
                </th>
                <th
                  style={{ padding: "10px 8px", cursor: "pointer" }}
                  onClick={() => handleSort("date")}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>
                    Date
                    <SortIcon col="date" />
                  </span>
                </th>
                <th
                  style={{ padding: "10px 8px", cursor: "pointer" }}
                  onClick={() => handleSort("score")}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>
                    Score
                    <SortIcon col="score" />
                  </span>
                </th>
                <th
                  style={{ padding: "10px 8px", cursor: "pointer" }}
                  onClick={() => handleSort("views")}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>
                    Views
                    <SortIcon col="views" />
                  </span>
                </th>
                <th
                  style={{ padding: "10px 8px", cursor: "pointer" }}
                  onClick={() => handleSort("engagement")}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>
                    Engagement
                    <SortIcon col="engagement" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedLeaderboard.map((entry, idx) => (
                <tr
                  key={entry.id}
                  style={{
                    borderBottom: "1px solid var(--bg-inset)",
                    cursor: "default",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--gold-light)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td
                    style={{
                      padding: "10px 8px",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      fontSize: 13,
                    }}
                  >
                    {idx + 1}
                  </td>
                  <td style={{ padding: "10px 8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <img
                        src={entry.thumbnail}
                        alt={entry.title}
                        width={36}
                        height={36}
                        style={{ borderRadius: 6, objectFit: "cover" }}
                      />
                      <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>
                        {entry.title}
                      </span>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "10px 8px",
                      color: "var(--text-secondary)",
                      fontSize: 13,
                    }}
                  >
                    {entry.date}
                  </td>
                  <td style={{ padding: "10px 8px" }}>
                    <ScorePill score={entry.score} />
                  </td>
                  <td
                    style={{
                      padding: "10px 8px",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      fontSize: 13,
                    }}
                  >
                    {entry.views.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: "10px 8px",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      fontSize: 13,
                    }}
                  >
                    {entry.engagement}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ── Trending Section ── */}
      <motion.div
        variants={itemVariants}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        <TrendingCard title="Trending Ingredients" items={trendingIngredients} />
        <TrendingCard title="Trending Formats" items={trendingFormats} />
        <TrendingCard title="Trending Recipes" items={trendingRecipes} />
      </motion.div>
    </motion.div>
  );
}
