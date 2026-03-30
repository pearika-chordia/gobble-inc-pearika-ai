"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import {
  userProfile,
  achievements,
  tasteDNA,
  recentActivity,
  profileStats,
} from "@/lib/data/profile";
import { CountUp } from "@/components/ui/CountUp";
import type { Achievement } from "@/lib/types";

/* ─── radar chart data ─── */

const radarData = Object.entries(tasteDNA).map(([key, value]) => ({
  subject: key.charAt(0).toUpperCase() + key.slice(1),
  value,
  fullMark: 100,
}));

/* ─── xp helpers ─── */

const xpPercent = Math.round(
  (userProfile.currentXP / userProfile.requiredXP) * 100
);
const xpRemaining = userProfile.requiredXP - userProfile.currentXP;

/* ─── animation variants ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const timelineItem = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

/* ─── page ─── */

export default function ProfilePage() {
  return (
    <main
      style={{ background: "var(--bg-primary)", minHeight: "100vh" }}
      className="pb-32"
    >
      <div className="max-w-6xl mx-auto px-6 pt-12 space-y-12">
        {/* ─── Profile Header ─── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-4"
        >
          {/* avatar */}
          <div
            className="rounded-full shadow-md"
            style={{
              width: 80,
              height: 80,
              padding: 3,
              background: "var(--gradient-copper)",
            }}
          >
            <div
              className="rounded-full w-full h-full flex items-center justify-center"
              style={{
                background: "var(--bg-elevated)",
                fontSize: 36,
              }}
            >
              👨‍🍳
            </div>
          </div>

          {/* name + badge */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <h1
              className="font-sans"
              style={{ fontWeight: 600, fontSize: 28, color: "var(--text-primary)" }}
            >
              {userProfile.name}
            </h1>
            <span
              className="gradient-copper font-sans"
              style={{
                fontWeight: 600,
                fontSize: 13,
                color: "#fff",
                padding: "4px 14px",
                borderRadius: 9999,
                whiteSpace: "nowrap",
              }}
            >
              {userProfile.levelEmoji} {userProfile.level}
            </span>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: 15 }} className="font-sans">
            {userProfile.handle}
          </p>

          <p
            className="font-sans uppercase tracking-widest"
            style={{ fontSize: 12, color: "var(--text-muted)" }}
          >
            Member since {userProfile.memberSince}
          </p>
        </motion.section>

        {/* ─── XP + Level Progress ─── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            background: "var(--bg-elevated)",
            borderRadius: "var(--radius-sm)",
            boxShadow: "var(--shadow-md)",
            padding: 28,
          }}
        >
          <p
            className="font-sans"
            style={{ fontWeight: 500, fontSize: 16, color: "var(--text-primary)", marginBottom: 16 }}
          >
            {userProfile.levelEmoji} {userProfile.level} → {userProfile.nextLevel} {userProfile.nextLevelEmoji}
          </p>

          {/* progress track */}
          <div
            className="rounded-full w-full"
            style={{ height: 12, background: "var(--bg-inset)" }}
          >
            <motion.div
              className="rounded-full h-full gradient-copper"
              initial={{ width: "0%" }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 1.5, type: "spring", bounce: 0.15 }}
            />
          </div>

          <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
            <p
              className="font-sans"
              style={{ fontWeight: 400, fontSize: 14, color: "var(--text-secondary)" }}
            >
              {xpRemaining.toLocaleString()} XP to {userProfile.nextLevel} {userProfile.nextLevelEmoji}
            </p>
            <p
              className="font-mono"
              style={{ fontWeight: 500, fontSize: 14, color: "var(--text-primary)" }}
            >
              {userProfile.currentXP.toLocaleString()} / {userProfile.requiredXP.toLocaleString()} XP
            </p>
          </div>
        </motion.section>

        {/* ─── Streak ─── */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="flex flex-col items-center text-center gap-2"
        >
          <div className="relative flex items-center justify-center">
            <span
              className="animate-pulse-glow rounded-full absolute"
              style={{ width: 64, height: 64 }}
            />
            <span
              style={{ fontSize: 48, lineHeight: 1, animation: "streak-pulse 2s ease-in-out infinite" }}
            >
              🔥
            </span>
          </div>

          <h2
            className="font-display"
            style={{ fontSize: 36, color: "var(--text-primary)" }}
          >
            {userProfile.streak} Day Streak
          </h2>
          <p
            className="font-sans"
            style={{ fontWeight: 400, fontSize: 15, color: "var(--text-secondary)" }}
          >
            Keep cooking to maintain your streak!
          </p>

          <style>{`
            @keyframes streak-pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.15); }
            }
          `}</style>
        </motion.section>

        {/* ─── Achievements Grid ─── */}
        <section>
          <h2
            className="font-display mb-6"
            style={{ fontSize: 28, color: "var(--text-primary)" }}
          >
            Achievements
          </h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {achievements.map((a, i) => (
              <AchievementCard key={a.id} achievement={a} index={i} />
            ))}
          </motion.div>
        </section>

        {/* ─── Taste DNA ─── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          style={{
            background: "var(--bg-elevated)",
            borderRadius: "var(--radius-sm)",
            boxShadow: "var(--shadow-md)",
            padding: 32,
          }}
        >
          <h2
            className="font-display"
            style={{ fontSize: 28, color: "var(--text-primary)" }}
          >
            Your Taste DNA
          </h2>
          <p
            className="font-sans mt-1"
            style={{ fontWeight: 400, fontSize: 15, color: "var(--text-secondary)" }}
          >
            Based on everything you&apos;ve cooked
          </p>

          <motion.div
            className="flex justify-center my-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="var(--bg-inset)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "var(--text-secondary)", fontSize: 13, fontFamily: "var(--font-dm-sans)" }}
                />
                <Radar
                  dataKey="value"
                  stroke="#B87333"
                  strokeWidth={2.5}
                  fill="#B87333"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          <p
            className="font-sans"
            style={{
              fontWeight: 400,
              fontSize: 15,
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            You lean heavy into spice and umami — a bold palate! Try expanding
            your sweet repertoire. How about a chai crème brûlée? 🍮
          </p>
        </motion.section>

        {/* ─── Recent Activity Timeline ─── */}
        <section>
          <h2
            className="font-display mb-6"
            style={{ fontSize: 28, color: "var(--text-primary)" }}
          >
            Recent Activity
          </h2>

          <motion.div
            className="relative"
            style={{ paddingLeft: 28 }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* vertical line */}
            <div
              className="absolute top-0 bottom-0"
              style={{
                left: 4,
                width: 2,
                background: "var(--bg-inset)",
                borderRadius: 1,
              }}
            />

            {recentActivity.map((entry, i) => (
              <motion.div
                key={entry.id}
                variants={timelineItem}
                transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
                className="relative mb-6 last:mb-0"
              >
                {/* dot */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 10,
                    height: 10,
                    left: -24,
                    top: 6,
                    background: entry.dotColor,
                    boxShadow: `0 0 6px ${entry.dotColor}40`,
                  }}
                />

                <div className="flex items-start justify-between gap-4">
                  <p
                    className="font-sans"
                    style={{ fontWeight: 400, fontSize: 15, color: "var(--text-primary)" }}
                  >
                    {entry.emoji} {entry.text}
                  </p>
                  <span
                    className="font-sans shrink-0"
                    style={{ fontSize: 13, color: "var(--text-muted)" }}
                  >
                    {entry.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ─── Stats Strip ─── */}
        <motion.section
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {profileStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={i}
              style={{
                background: "var(--bg-elevated)",
                borderRadius: "var(--radius-sm)",
                boxShadow: "var(--shadow-md)",
                padding: 20,
              }}
              className="flex flex-col items-center text-center gap-1"
            >
              <span style={{ fontSize: 24 }}>{stat.icon}</span>
              <span
                className="font-mono"
                style={{ fontWeight: 600, fontSize: 24, color: "var(--text-primary)" }}
              >
                <CountUp end={stat.value} duration={1.8} />
              </span>
              <p
                className="font-sans uppercase tracking-widest"
                style={{ fontSize: 12, color: "var(--text-muted)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.section>
      </div>
    </main>
  );
}

/* ─── Achievement Card ─── */

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  const locked = !achievement.unlocked;

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      whileHover={
        locked
          ? undefined
          : { y: -4, boxShadow: "var(--shadow-glow)", transition: { duration: 0.25 } }
      }
      style={{
        background: locked ? "var(--bg-inset)" : "var(--bg-elevated)",
        borderRadius: "var(--radius-sm)",
        boxShadow: locked ? "none" : "var(--shadow-md)",
        padding: 20,
        position: "relative",
        cursor: locked ? "default" : "pointer",
      }}
    >
      {locked && (
        <Lock
          size={16}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "var(--text-muted)",
          }}
        />
      )}

      {/* icon circle */}
      <div
        className="flex items-center justify-center rounded-full mx-auto mb-3"
        style={{
          width: 56,
          height: 56,
          background: locked ? "var(--bg-inset)" : "var(--gold-light)",
          fontSize: 36,
          filter: locked ? "grayscale(80%)" : "none",
        }}
      >
        {achievement.emoji}
      </div>

      <h3
        className="font-sans text-center"
        style={{
          fontWeight: 600,
          fontSize: 15,
          color: locked ? "var(--text-muted)" : "var(--text-primary)",
        }}
      >
        {achievement.name}
      </h3>

      <p
        className="font-sans text-center mt-1"
        style={{
          fontWeight: 400,
          fontSize: 13,
          color: locked ? "var(--text-muted)" : "var(--text-secondary)",
          lineHeight: 1.5,
        }}
      >
        {achievement.description}
      </p>

      {achievement.date && !locked && (
        <p
          className="font-sans uppercase tracking-widest text-center mt-3"
          style={{ fontSize: 11, color: "var(--text-muted)" }}
        >
          {achievement.date}
        </p>
      )}
    </motion.div>
  );
}
