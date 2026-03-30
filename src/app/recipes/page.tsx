"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { recipes } from "@/lib/data/recipes";

const CUISINE_FILTERS = [
  "All",
  "Indian",
  "Italian",
  "Mexican",
  "Asian",
  "American",
  "Middle Eastern",
] as const;

const TIME_FILTERS = [
  { label: "Any", max: Infinity },
  { label: "<15 min", max: 15 },
  { label: "<30 min", max: 30 },
  { label: "<1 hour", max: 60 },
] as const;

const DIFFICULTY_FILTERS = ["Any", "Easy", "Medium", "Hard"] as const;

const PLACEHOLDERS = [
  "Search 'butter chicken'...",
  "Try 'quick weeknight pasta'...",
  "What's cooking tonight?",
];

const ASIAN_CUISINES = new Set(["Thai", "Japanese", "Korean"]);

function mapCuisineToFilter(cuisine: string): string {
  return ASIAN_CUISINES.has(cuisine) ? "Asian" : cuisine;
}

export default function RecipesPage() {
  const [search, setSearch] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeCuisine, setActiveCuisine] = useState("All");
  const [activeTime, setActiveTime] = useState(0);
  const [activeDifficulty, setActiveDifficulty] = useState("Any");

  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    const timeMax = TIME_FILTERS[activeTime].max;

    return recipes.filter((r) => {
      if (q) {
        const haystack =
          `${r.title} ${r.description} ${r.cuisine} ${r.ingredients.map((i) => i.name).join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      if (activeCuisine !== "All" && mapCuisineToFilter(r.cuisine) !== activeCuisine)
        return false;

      if (timeMax !== Infinity && r.prepTime + r.cookTime > timeMax) return false;

      if (activeDifficulty !== "Any" && r.difficulty !== activeDifficulty.toLowerCase())
        return false;

      return true;
    });
  }, [search, activeCuisine, activeTime, activeDifficulty]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        padding: "48px 24px 80px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: 32 }}>
          <h1
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: 48,
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Recipes
          </h1>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 18,
              color: "var(--text-secondary)",
              marginTop: 8,
            }}
          >
            Discover your next masterpiece
          </p>
        </header>

        {/* Search Bar */}
        <div
          style={{
            maxWidth: 640,
            margin: "0 auto 16px",
          }}
        >
          <div
            style={{
              position: "relative",
              height: 56,
              borderRadius: "var(--radius-full)",
              background: "var(--bg-elevated)",
              boxShadow: searchFocused
                ? "0 0 0 3px var(--gold-glow), var(--shadow-lg)"
                : "var(--shadow-md)",
              display: "flex",
              alignItems: "center",
              transition: "box-shadow 0.25s ease",
            }}
          >
            <Search
              size={20}
              style={{
                marginLeft: 20,
                color: "var(--text-muted)",
                flexShrink: 0,
              }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder={PLACEHOLDERS[placeholderIdx]}
              style={{
                flex: 1,
                height: "100%",
                border: "none",
                outline: "none",
                background: "transparent",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 16,
                color: "var(--text-primary)",
                paddingLeft: 12,
                paddingRight: 20,
              }}
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          {/* Cuisine pills */}
          {CUISINE_FILTERS.map((c) => (
            <FilterPill
              key={c}
              label={c}
              active={activeCuisine === c}
              onClick={() => setActiveCuisine(c)}
            />
          ))}

          <Divider />

          {/* Time pills */}
          {TIME_FILTERS.map((t, i) => (
            <FilterPill
              key={t.label}
              label={t.label}
              active={activeTime === i}
              onClick={() => setActiveTime(i)}
            />
          ))}

          <Divider />

          {/* Difficulty pills */}
          {DIFFICULTY_FILTERS.map((d) => (
            <FilterPill
              key={d}
              label={d}
              active={activeDifficulty === d}
              onClick={() => setActiveDifficulty(d)}
            />
          ))}
        </div>

        {/* Results Count */}
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: "var(--text-muted)",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Showing {filtered.length} recipe{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Recipe Grid */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
          className="recipe-grid"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "64px 20px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            <p style={{ fontSize: 48, marginBottom: 12 }}>🍽️</p>
            <p style={{ fontSize: 18, fontWeight: 500 }}>No recipes found</p>
            <p style={{ fontSize: 14, marginTop: 4 }}>
              Try adjusting your filters or search term
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        .recipe-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 1024px) {
          .recipe-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .recipe-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        height: 40,
        padding: "0 18px",
        borderRadius: "var(--radius-full)",
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: 14,
        fontWeight: 500,
        border: active ? "none" : "1px solid var(--bg-inset)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
        ...(active
          ? {
              background: "var(--gradient-copper)",
              color: "#1C1917",
              boxShadow: "var(--shadow-glow)",
            }
          : {
              background: "var(--bg-elevated)",
              color: "var(--text-secondary)",
              boxShadow: "var(--shadow-sm)",
            }),
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background =
            "var(--gold-light)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background =
            "var(--bg-elevated)";
        }
      }}
    >
      {label}
    </button>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: 1,
        height: 24,
        background: "var(--bg-inset)",
        alignSelf: "center",
        flexShrink: 0,
      }}
    />
  );
}

function RecipeCard({ recipe }: { recipe: (typeof recipes)[number] }) {
  const [hovered, setHovered] = useState(false);
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 30 }}
    >
      <Link
        href={`/recipes/${recipe.slug}`}
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            background: "var(--bg-elevated)",
            borderRadius: "var(--radius-lg)",
            boxShadow: hovered ? "var(--shadow-lg)" : "var(--shadow-md)",
            overflow: "hidden",
            transform: hovered ? "translateY(-6px)" : "translateY(0)",
            border: hovered
              ? "1px solid var(--gold)"
              : "1px solid transparent",
            transition:
              "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease, border-color 0.25s ease",
            position: "relative",
          }}
        >
          {/* Image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 10",
              overflow: "hidden",
            }}
          >
            <Image
              src={recipe.heroImage}
              alt={recipe.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />

            {/* Trending badge */}
            {recipe.trending && (
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  background: "rgba(255, 252, 247, 0.7)",
                  border: "1px solid rgba(245, 166, 35, 0.15)",
                }}
              >
                🔥
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: 20 }}>
            <h3
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 600,
                fontSize: 20,
                color: "var(--text-primary)",
                margin: 0,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: 1.3,
              }}
            >
              {recipe.title}
            </h3>

            {/* Metadata row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 10,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  background: "var(--gold-light)",
                  color: "var(--copper)",
                  fontSize: 12,
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: "var(--radius-full)",
                  lineHeight: 1.5,
                }}
              >
                {recipe.cuisine}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: 14,
                  color: "var(--text-secondary)",
                }}
              >
                ⏱ {totalTime} min
              </span>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: 14,
                  color: "var(--text-secondary)",
                }}
              >
                ⭐ {recipe.rating}
              </span>
            </div>

            {/* Creator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 12,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  overflow: "hidden",
                  position: "relative",
                  background: "var(--bg-inset)",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={recipe.creator.avatar}
                  alt={recipe.creator.name}
                  fill
                  sizes="28px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: 13,
                  color: "var(--text-secondary)",
                }}
              >
                by {recipe.creator.handle}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
