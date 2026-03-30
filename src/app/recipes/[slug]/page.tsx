"use client";

import { useState, useEffect, useRef, useCallback, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  Minus,
  Plus,
  Star,
  Timer,
  RefreshCw,
  ChevronRight,
  X,
  AlertCircle,
} from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { recipes } from "@/lib/data/recipes";
import type { Recipe, TasteProfile } from "@/lib/types";

type TimerState = {
  stepNumber: number;
  remaining: number;
  total: number;
  running: boolean;
};

type TasteKey = keyof TasteProfile;

const TASTE_KEYS: TasteKey[] = [
  "spicy",
  "sweet",
  "salty",
  "sour",
  "umami",
  "rich",
];

const TASTE_CATEGORY_MAP: Record<TasteKey, string[]> = {
  spicy: ["Spice", "Chiles"],
  sweet: ["Sweetener"],
  salty: ["Seasoning"],
  sour: ["Acid", "Citrus"],
  umami: ["Sauce", "Aromatics"],
  rich: ["Dairy", "Cheese", "Oil"],
};

function getTasteMultiplier(
  category: string,
  tasteValues: TasteProfile,
  baseTaste: TasteProfile
): number {
  let multiplier = 1;
  for (const key of TASTE_KEYS) {
    if (TASTE_CATEGORY_MAP[key].includes(category)) {
      const base = baseTaste[key] || 50;
      const current = tasteValues[key];
      const shift = (current - base) / 100;
      multiplier += shift * 0.8;
    }
  }
  return Math.max(0.2, Math.min(3, multiplier));
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function boldToHtml(text: string) {
  return text.replace(
    /\*\*(.*?)\*\*/g,
    '<strong style="color: var(--copper); font-weight: 600;">$1</strong>'
  );
}

export default function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const recipe = recipes.find((r) => r.slug === slug);

  if (!recipe) {
    return <RecipeNotFound />;
  }

  return <RecipeDetail recipe={recipe} />;
}

function RecipeNotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "var(--bg-primary)" }}
    >
      <AlertCircle
        className="w-16 h-16 mb-6"
        style={{ color: "var(--text-muted)" }}
      />
      <h1
        className="font-display text-3xl font-bold mb-3"
        style={{ color: "var(--text-primary)" }}
      >
        Recipe Not Found
      </h1>
      <p
        className="font-sans text-base mb-8"
        style={{ color: "var(--text-secondary)" }}
      >
        We couldn&apos;t find the recipe you&apos;re looking for.
      </p>
      <Link
        href="/recipes"
        className="gradient-copper text-white font-sans font-semibold px-8 py-3 rounded-full hover:scale-105 transition-transform"
      >
        Browse All Recipes
      </Link>
    </div>
  );
}

function RecipeDetail({ recipe }: { recipe: Recipe }) {
  const baseServings = recipe.servings;
  const [servings, setServings] = useState(baseServings);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(
    new Set()
  );
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [timers, setTimers] = useState<TimerState[]>([]);
  const [userRating, setUserRating] = useState(recipe.rating);
  const [ratingAnimating, setRatingAnimating] = useState<number | null>(null);
  const [tasteValues, setTasteValues] = useState<TasteProfile>({
    ...recipe.tasteProfile,
  });
  const [lastChangedTaste, setLastChangedTaste] = useState<TasteKey | null>(
    null
  );
  const [troubleshootingStep, setTroubleshootingStep] = useState<number | null>(
    null
  );
  const [openSubstitution, setOpenSubstitution] = useState<string | null>(null);

  const servingsRatio = servings / baseServings;

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Timer tick
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) =>
        prev
          .map((t) => {
            if (!t.running || t.remaining <= 0) return t;
            return { ...t, remaining: t.remaining - 1 };
          })
          .filter((t) => t.remaining >= 0)
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const startTimer = useCallback(
    (stepNumber: number, duration: number) => {
      setTimers((prev) => {
        const existing = prev.find((t) => t.stepNumber === stepNumber);
        if (existing) {
          return prev.map((t) =>
            t.stepNumber === stepNumber ? { ...t, running: !t.running } : t
          );
        }
        return [
          ...prev,
          { stepNumber, remaining: duration, total: duration, running: true },
        ];
      });
    },
    []
  );

  const resetTimer = useCallback(
    (stepNumber: number) => {
      setTimers((prev) =>
        prev.map((t) =>
          t.stepNumber === stepNumber
            ? { ...t, remaining: t.total, running: false }
            : t
        )
      );
    },
    []
  );

  const toggleIngredient = useCallback((id: string) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleRating = useCallback((star: number) => {
    setUserRating(star);
    setRatingAnimating(star);
    setTimeout(() => setRatingAnimating(null), 300);
  }, []);

  const handleTasteChange = useCallback((key: TasteKey, value: number) => {
    setTasteValues((prev) => ({ ...prev, [key]: value }));
    setLastChangedTaste(key);
  }, []);

  const activeTimers = timers.filter((t) => t.remaining > 0);

  const totalTime = recipe.prepTime + recipe.cookTime;
  const difficultyLabel =
    recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1);

  return (
    <div style={{ background: "var(--bg-primary)" }} className="min-h-screen">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(40vh, 50vh, 50vh)" }}
      >
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <Image
            src={recipe.heroImage}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--bg-primary) 0%, transparent 50%)",
          }}
        />

        {/* Back button */}
        <Link
          href="/recipes"
          className="absolute top-5 left-5 z-20 w-11 h-11 rounded-full frosted-glass flex items-center justify-center hover:scale-105 transition-transform"
          style={{ boxShadow: "var(--shadow-md)" }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: "var(--text-primary)" }} />
        </Link>

        {/* Hero content overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-5 sm:px-10 pb-8">
          <motion.h1
            className="font-display text-3xl sm:text-[48px] font-bold leading-tight mb-3"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {recipe.title}
          </motion.h1>

          {/* Metadata row */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span
              className="px-3 py-1 rounded-full font-sans font-medium text-sm"
              style={{
                background: "var(--gold-light)",
                color: "var(--copper)",
              }}
            >
              {recipe.cuisine}
            </span>
            <span
              className="font-sans font-medium text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              ⏱ {totalTime} min
            </span>
            <span
              className="font-sans font-medium text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Serves {recipe.servings}
            </span>
            <span
              className="font-sans font-medium text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {difficultyLabel}
            </span>
          </motion.div>

          {/* Creator */}
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0"
              style={{ background: "var(--gradient-copper)" }}
            >
              {recipe.creator.avatar && (
                <Image
                  src={recipe.creator.avatar}
                  alt={recipe.creator.name}
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div>
              <p
                className="font-sans font-medium text-sm leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {recipe.creator.name}
              </p>
              <p
                className="font-sans text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                {recipe.creator.handle}
              </p>
            </div>
          </motion.div>

          {/* Star Rating */}
          <motion.div
            className="flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                onClick={() => handleRating(star)}
                animate={
                  ratingAnimating === star
                    ? { scale: [1, 1.3, 1] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
                className="p-0.5 cursor-pointer"
              >
                <Star
                  className="w-5 h-5"
                  fill={star <= userRating ? "#F5A623" : "transparent"}
                  stroke={star <= userRating ? "#F5A623" : "var(--text-muted)"}
                  strokeWidth={1.5}
                />
              </motion.button>
            ))}
            <span
              className="font-mono text-sm ml-2"
              style={{ color: "var(--text-secondary)" }}
            >
              {userRating.toFixed(1)}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column — 56% */}
          <div className="w-full lg:w-[56%] space-y-10">
            <ServingAdjuster
              servings={servings}
              setServings={setServings}
            />
            <IngredientList
              ingredients={recipe.ingredients}
              ratio={servingsRatio}
              tasteValues={tasteValues}
              baseTaste={recipe.tasteProfile}
              checked={checkedIngredients}
              toggleIngredient={toggleIngredient}
              openSubstitution={openSubstitution}
              setOpenSubstitution={setOpenSubstitution}
            />
            <StepsList
              steps={recipe.steps}
              troubleshooting={recipe.troubleshooting}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              timers={timers}
              startTimer={startTimer}
              resetTimer={resetTimer}
              setTroubleshootingStep={setTroubleshootingStep}
            />
          </div>

          {/* Right Column — 40%, sticky */}
          <div className="w-full lg:w-[40%]">
            <div className="lg:sticky lg:top-[100px] space-y-8">
              <TasteProfileCard
                tasteValues={tasteValues}
                onChange={handleTasteChange}
                lastChanged={lastChangedTaste}
                modifications={recipe.tasteModifications}
              />
              <NutritionRing nutrition={recipe.nutrition} />
              <SocialProofStrip count={recipe.stats.timesCookedToday} />
            </div>
          </div>
        </div>
      </div>

      {/* Floating timers */}
      <AnimatePresence>
        {activeTimers.length > 0 && (
          <motion.div
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-3 flex-wrap justify-center"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
          >
            {activeTimers.map((t) => (
              <div
                key={t.stepNumber}
                className="frosted-glass rounded-full flex items-center gap-0 overflow-hidden"
                style={{ boxShadow: "var(--shadow-lg)" }}
              >
                <motion.button
                  onClick={() => startTimer(t.stepNumber, t.total)}
                  className="px-4 py-2 flex items-center gap-2 cursor-pointer bg-transparent border-none"
                  animate={
                    t.running && t.remaining <= 10
                      ? { scale: [1, 1.03, 1] }
                      : {}
                  }
                  transition={
                    t.running && t.remaining <= 10
                      ? { repeat: Infinity, duration: 0.6 }
                      : {}
                  }
                >
                  <Timer className="w-4 h-4" style={{ color: "var(--copper)" }} />
                  <span className="font-mono font-medium text-sm" style={{ color: "var(--text-primary)" }}>
                    Step {t.stepNumber}
                  </span>
                  <span
                    className="font-mono font-semibold text-sm"
                    style={{
                      color: !t.running
                        ? "var(--amber)"
                        : t.remaining <= 10
                        ? "var(--red)"
                        : "var(--green)",
                    }}
                  >
                    {formatTime(t.remaining)}
                  </span>
                  <span className="text-xs font-sans font-medium" style={{ color: "var(--text-muted)" }}>
                    {t.running ? "⏸" : "▶"}
                  </span>
                </motion.button>
                {!t.running && (
                  <button
                    onClick={() => resetTimer(t.stepNumber)}
                    className="px-3 py-2 cursor-pointer bg-transparent border-none flex items-center"
                    style={{ borderLeft: "1px solid var(--bg-inset)" }}
                    title="Reset timer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
                  </button>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Troubleshooting Drawer */}
      <AnimatePresence>
        {troubleshootingStep !== null &&
          recipe.troubleshooting[troubleshootingStep] && (
            <TroubleshootingDrawer
              stepNumber={troubleshootingStep}
              tips={recipe.troubleshooting[troubleshootingStep]}
              onClose={() => setTroubleshootingStep(null)}
            />
          )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Serving Adjuster ─── */
function ServingAdjuster({
  servings,
  setServings,
}: {
  servings: number;
  setServings: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-5">
      <span
        className="font-sans font-semibold text-lg"
        style={{ color: "var(--text-primary)" }}
      >
        Servings
      </span>
      <div className="flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setServings(Math.max(1, servings - 1))}
          className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
          style={{
            background: "var(--bg-elevated)",
            boxShadow: "var(--shadow-sm)",
          }}
          disabled={servings <= 1}
        >
          <Minus
            className="w-4 h-4"
            style={{
              color: servings <= 1 ? "var(--text-muted)" : "var(--text-primary)",
            }}
          />
        </motion.button>

        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: "var(--bg-inset)" }}
        >
          <AnimatePresence mode="popLayout">
            <motion.span
              key={servings}
              className="font-mono font-semibold text-2xl"
              style={{ color: "var(--text-primary)" }}
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 15, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {servings}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setServings(Math.min(12, servings + 1))}
          className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
          style={{
            background: "var(--bg-elevated)",
            boxShadow: "var(--shadow-sm)",
          }}
          disabled={servings >= 12}
        >
          <Plus
            className="w-4 h-4"
            style={{
              color:
                servings >= 12 ? "var(--text-muted)" : "var(--text-primary)",
            }}
          />
        </motion.button>
      </div>
    </div>
  );
}

/* ─── Ingredient List ─── */
function IngredientList({
  ingredients,
  ratio,
  tasteValues,
  baseTaste,
  checked,
  toggleIngredient,
  openSubstitution,
  setOpenSubstitution,
}: {
  ingredients: Recipe["ingredients"];
  ratio: number;
  tasteValues: TasteProfile;
  baseTaste: TasteProfile;
  checked: Set<string>;
  toggleIngredient: (id: string) => void;
  openSubstitution: string | null;
  setOpenSubstitution: (id: string | null) => void;
}) {
  return (
    <div>
      <h2
        className="font-sans font-semibold text-xl mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Ingredients
      </h2>
      <ul className="space-y-1">
        {ingredients.map((ing) => {
          const isChecked = checked.has(ing.id);
          const tasteMult = getTasteMultiplier(ing.category, tasteValues, baseTaste);
          const scaledAmount = Math.round(ing.amount * ratio * tasteMult * 100) / 100;
          const isTasteAdjusted = Math.abs(tasteMult - 1) > 0.01;
          const hasSubs =
            ing.substitutions && ing.substitutions.length > 0;
          const isSubOpen = openSubstitution === ing.id;

          return (
            <li key={ing.id} className="relative">
              <div
                className="flex items-center gap-3 py-2.5 px-2 rounded-sm -mx-2 transition-colors duration-200"
                style={{
                  opacity: isChecked ? 0.5 : 1,
                }}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleIngredient(ing.id)}
                  className="w-6 h-6 rounded-sm flex-shrink-0 flex items-center justify-center cursor-pointer transition-all duration-200"
                  style={{
                    background: isChecked
                      ? "var(--gradient-copper)"
                      : "var(--bg-inset)",
                    border: isChecked
                      ? "none"
                      : "1.5px solid var(--text-muted)",
                  }}
                >
                  {isChecked && (
                    <motion.svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    >
                      <path
                        d="M3 7l3 3 5-5"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  )}
                </button>

                {/* Amount + unit */}
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={`${scaledAmount}-${tasteMult}`}
                    className="font-mono font-medium text-[15px] min-w-[70px]"
                    style={{
                      color: isTasteAdjusted
                        ? tasteMult > 1
                          ? "var(--accent-copper)"
                          : "#3b82f6"
                        : "var(--text-primary)",
                      textDecoration: isChecked ? "line-through" : "none",
                    }}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                  >
                    {scaledAmount} {ing.unit}
                    {isTasteAdjusted && (
                      <span className="text-[11px] ml-1 opacity-70">
                        {tasteMult > 1 ? "▲" : "▼"}
                      </span>
                    )}
                  </motion.span>
                </AnimatePresence>

                {/* Name */}
                <span
                  className="font-sans text-base flex-1"
                  style={{
                    color: isChecked
                      ? "var(--text-muted)"
                      : "var(--text-primary)",
                    textDecoration: isChecked ? "line-through" : "none",
                  }}
                >
                  {ing.name}
                </span>

                {/* Substitution button */}
                {hasSubs && (
                  <button
                    onClick={() =>
                      setOpenSubstitution(isSubOpen ? null : ing.id)
                    }
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer hover:scale-110 transition-transform"
                    style={{ background: "var(--bg-inset)" }}
                    title="View substitutions"
                  >
                    <RefreshCw
                      className="w-3.5 h-3.5"
                      style={{ color: "var(--copper)" }}
                    />
                  </button>
                )}
              </div>

              {/* Substitution popover */}
              <AnimatePresence>
                {isSubOpen && ing.substitutions && (
                  <motion.div
                    className="absolute right-0 top-full mt-1 z-30 w-72 frosted-glass rounded-md p-4"
                    style={{ boxShadow: "var(--shadow-lg)" }}
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    <p
                      className="font-sans font-semibold text-sm mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Substitutions
                    </p>
                    <div className="space-y-2">
                      {ing.substitutions.map((sub) => (
                        <div key={sub.name}>
                          <p
                            className="font-sans font-medium text-sm"
                            style={{ color: "var(--copper)" }}
                          >
                            {sub.name}
                          </p>
                          <p
                            className="font-sans text-xs"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {sub.note}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ─── Steps List ─── */
function StepsList({
  steps,
  troubleshooting,
  activeStep,
  setActiveStep,
  timers,
  startTimer,
  resetTimer,
  setTroubleshootingStep,
}: {
  steps: Recipe["steps"];
  troubleshooting: Recipe["troubleshooting"];
  activeStep: number | null;
  setActiveStep: (step: number | null) => void;
  timers: TimerState[];
  startTimer: (step: number, dur: number) => void;
  resetTimer: (step: number) => void;
  setTroubleshootingStep: (step: number | null) => void;
}) {
  return (
    <div>
      <h2
        className="font-sans font-semibold text-xl mb-6"
        style={{ color: "var(--text-primary)" }}
      >
        Steps
      </h2>
      <div className="relative">
        {/* Timeline connector */}
        <div
          className="absolute left-[17px] top-0 bottom-0 w-0.5"
          style={{ background: "var(--bg-inset)" }}
        />

        <div className="space-y-6">
          {steps.map((step) => {
            const isActive = activeStep === step.number;
            const timer = timers.find((t) => t.stepNumber === step.number);
            const hasTroubleshooting = !!troubleshooting[step.number];

            return (
              <motion.div
                key={step.number}
                className="relative flex gap-4 cursor-pointer"
                onClick={() =>
                  setActiveStep(isActive ? null : step.number)
                }
                animate={{ opacity: isActive || activeStep === null ? 1 : 0.7 }}
                transition={{ duration: 0.2 }}
              >
                {/* Step number circle */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                  style={{ background: "var(--gradient-copper)" }}
                >
                  <span className="font-sans font-bold text-sm text-white">
                    {step.number}
                  </span>
                </div>

                {/* Step card */}
                <div
                  className="flex-1 p-5 rounded-md"
                  style={{
                    background: isActive
                      ? "var(--gold-light)"
                      : "var(--bg-elevated)",
                    boxShadow: "var(--shadow-sm)",
                    borderLeft: isActive
                      ? "3px solid var(--gold)"
                      : "3px solid transparent",
                  }}
                >
                  <div
                    className="font-sans text-base leading-[1.7]"
                    style={{ color: "var(--text-primary)" }}
                    dangerouslySetInnerHTML={{
                      __html: boldToHtml(step.instruction),
                    }}
                  />

                  {/* Inline timer */}
                  {step.duration && (
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startTimer(step.number, step.duration!);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-sans font-medium cursor-pointer transition-colors duration-200"
                        style={{
                          background: timer?.running
                            ? timer.remaining <= 10
                              ? "var(--gradient-copper)"
                              : "var(--green-soft)"
                            : "var(--gold-light)",
                          color: timer?.running
                            ? timer.remaining <= 10
                              ? "white"
                              : "var(--green)"
                            : "var(--copper)",
                        }}
                      >
                        <Timer className="w-3.5 h-3.5" />
                        <span className="font-mono">
                          {timer
                            ? formatTime(timer.remaining)
                            : formatTime(step.duration)}
                        </span>
                        <span>
                          {timer?.running
                            ? "Pause"
                            : timer && timer.remaining < timer.total
                            ? "Resume"
                            : "Start"}
                        </span>
                      </button>
                      {timer && !timer.running && timer.remaining < timer.total && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            resetTimer(step.number);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-sans font-medium cursor-pointer transition-colors duration-200"
                          style={{
                            background: "var(--bg-inset)",
                            color: "var(--text-secondary)",
                            border: "1px solid var(--text-muted)",
                          }}
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Reset</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Tip */}
                  {step.tip && (
                    <p
                      className="mt-2 font-sans text-sm italic"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      💡 {step.tip}
                    </p>
                  )}

                  {/* Troubleshooting link */}
                  {hasTroubleshooting && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTroubleshootingStep(step.number);
                      }}
                      className="mt-3 font-sans text-sm font-medium flex items-center gap-1 cursor-pointer hover:underline"
                      style={{ color: "var(--copper)" }}
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      Something went wrong?
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Troubleshooting Drawer ─── */
function TroubleshootingDrawer({
  stepNumber,
  tips,
  onClose,
}: {
  stepNumber: number;
  tips: { problem: string; solution: string }[];
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      {/* Drawer */}
      <motion.aside
        className="fixed right-0 top-0 bottom-0 z-50 w-[360px] max-w-[90vw] frosted-glass overflow-y-auto"
        style={{ boxShadow: "var(--shadow-lg)" }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3
              className="font-sans font-semibold text-lg"
              style={{ color: "var(--text-primary)" }}
            >
              Troubleshooting — Step {stepNumber}
            </h3>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
              style={{ background: "var(--bg-inset)" }}
            >
              <X className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
            </button>
          </div>

          <div className="space-y-5">
            {tips.map((tip, i) => (
              <div key={i}>
                <p
                  className="font-sans font-medium text-sm mb-1"
                  style={{ color: "var(--red)" }}
                >
                  ⚠ {tip.problem}
                </p>
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {tip.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.aside>
    </>
  );
}

/* ─── Taste Profile Card ─── */
function TasteProfileCard({
  tasteValues,
  onChange,
  lastChanged,
  modifications,
}: {
  tasteValues: TasteProfile;
  onChange: (key: TasteKey, value: number) => void;
  lastChanged: TasteKey | null;
  modifications: Recipe["tasteModifications"];
}) {
  const radarData = TASTE_KEYS.map((key) => ({
    subject: key.charAt(0).toUpperCase() + key.slice(1),
    value: tasteValues[key],
    fullMark: 100,
  }));

  const suggestion =
    lastChanged && modifications[lastChanged]
      ? modifications[lastChanged][
          Math.floor(Math.random() * modifications[lastChanged].length)
        ]
      : null;

  return (
    <div
      className="rounded-lg p-7"
      style={{
        background: "var(--bg-elevated)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <h3
        className="font-sans font-semibold text-xl mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Taste Profile
      </h3>

      {/* Radar chart */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, duration: 0.8 }}
      >
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="var(--bg-inset)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: "var(--text-secondary)",
                fontSize: 12,
                fontFamily: "var(--font-dm-sans)",
              }}
            />
            <Radar
              dataKey="value"
              stroke="var(--copper)"
              strokeWidth={2}
              fill="var(--copper)"
              fillOpacity={0.2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Sliders */}
      <div className="space-y-4 mt-4">
        {TASTE_KEYS.map((key) => (
          <div key={key}>
            <div className="flex items-center justify-between mb-1">
              <span
                className="font-sans text-sm font-medium capitalize"
                style={{ color: "var(--text-secondary)" }}
              >
                {key}
              </span>
              <span
                className="font-mono text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                {tasteValues[key]}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={tasteValues[key]}
              onChange={(e) => onChange(key, Number(e.target.value))}
              className="taste-slider w-full"
              style={
                {
                  "--slider-pct": `${tasteValues[key]}%`,
                } as React.CSSProperties
              }
            />
          </div>
        ))}
      </div>

      {/* Suggestion */}
      <AnimatePresence mode="wait">
        {suggestion && (
          <motion.div
            key={suggestion}
            className="mt-5 p-4 rounded-md"
            style={{ background: "var(--bg-inset)" }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <p
              className="font-sans text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              💡 {suggestion}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .taste-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 3px;
          background: linear-gradient(
            to right,
            var(--copper) 0%,
            var(--gold) var(--slider-pct),
            var(--bg-inset) var(--slider-pct),
            var(--bg-inset) 100%
          );
          outline: none;
          cursor: pointer;
        }
        .taste-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid var(--gold);
          box-shadow: var(--shadow-md);
          cursor: pointer;
        }
        .taste-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid var(--gold);
          box-shadow: var(--shadow-md);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

/* ─── Nutrition Ring ─── */
function NutritionRing({ nutrition }: { nutrition: Recipe["nutrition"] }) {
  const total = nutrition.protein + nutrition.carbs + nutrition.fat;
  const data = [
    { name: "Protein", value: nutrition.protein, color: "#16A34A" },
    { name: "Carbs", value: nutrition.carbs, color: "#F5A623" },
    { name: "Fat", value: nutrition.fat, color: "#DC2626" },
  ];

  return (
    <div
      className="rounded-lg p-7"
      style={{
        background: "var(--bg-elevated)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <h3
        className="font-sans font-semibold text-xl mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Nutrition
      </h3>

      <div className="relative mx-auto" style={{ width: 180, height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-mono font-semibold text-[28px] leading-none"
            style={{ color: "var(--text-primary)" }}
          >
            {nutrition.calories}
          </span>
          <span
            className="font-sans text-xs mt-1"
            style={{ color: "var(--text-muted)" }}
          >
            kcal
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex justify-center gap-6 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: item.color }}
            />
            <span
              className="font-sans text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {item.name}{" "}
              <span className="font-mono font-medium">
                {item.value}g
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Social Proof Strip ─── */
function SocialProofStrip({ count }: { count: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const start = performance.now();
          const duration = 1200;
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayCount(Math.round(eased * count));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, hasAnimated]);

  const avatarColors = [
    "linear-gradient(135deg, #B87333, #F5A623)",
    "linear-gradient(135deg, #F5A623, #FFD700)",
    "linear-gradient(135deg, #DC2626, #F59E0B)",
    "linear-gradient(135deg, #16A34A, #F5A623)",
    "linear-gradient(135deg, #7C3AED, #B87333)",
  ];

  return (
    <div
      ref={ref}
      className="rounded-lg p-5 flex items-center gap-4"
      style={{
        background: "var(--bg-elevated)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Stacked avatars */}
      <div className="flex -space-x-2 flex-shrink-0">
        {avatarColors.map((bg, i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full border-2"
            style={{
              background: bg,
              borderColor: "var(--bg-elevated)",
              zIndex: 5 - i,
            }}
          />
        ))}
      </div>
      <p
        className="font-sans font-medium text-sm"
        style={{ color: "var(--text-secondary)" }}
      >
        🔥{" "}
        <span className="font-mono font-semibold" style={{ color: "var(--text-primary)" }}>
          {displayCount.toLocaleString()}
        </span>{" "}
        people cooked this today
      </p>
    </div>
  );
}
