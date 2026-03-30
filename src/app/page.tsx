"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { ChefHat, Video, BarChart3, ChevronDown } from "lucide-react";
import { recipes } from "@/lib/data/recipes";

const trendingRecipes = recipes.filter((r) => r.trending).slice(0, 4);

const tickerItems = [
  "🔥 Priya just cooked Butter Chicken",
  "⚡ Mike's reel scored 94/100",
  "🍝 Trending: One-Pot Pasta Week",
  "👨‍🍳 Sarah reached Sous Chef level",
  "📈 Birria Tacos +340% this week",
  "🎯 Zara's hook score jumped to 91",
  "🌶️ 47 people cooked Shakshuka today",
  "🏆 New achievement: World Traveler unlocked",
];

const featureCards = [
  {
    emoji: "🍳",
    title: "Cook Smarter",
    icon: ChefHat,
    description:
      "AI-powered recipes that adapt to your fridge, your taste, and your skill level.",
  },
  {
    emoji: "🎥",
    title: "Create Better",
    icon: Video,
    description:
      "Analyze your cooking content like a product. Get scores on hooks, visuals, audio, and CTAs.",
  },
  {
    emoji: "📊",
    title: "Grow Faster",
    icon: BarChart3,
    description:
      "Track food trends, predict engagement, and get insights that help you outperform.",
  },
];

function StaggeredText({ text, className }: { text: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const chars = text.split("");

  return (
    <motion.span ref={ref} className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.02, duration: 0.3, ease: "easeOut" }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function Particle({ index }: { index: number }) {
  const r = (offset: number) => seededRandom(index * 7 + offset);
  const size = 3 + r(0) * 3;
  const duration = 15 + r(1) * 20;
  const delay = r(2) * -duration;
  const startX = r(3) * 100;
  const startY = r(4) * 100;
  const isGold = r(5) > 0.5;

  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${startX}%`,
        top: `${startY}%`,
        background: isGold ? "#F5A623" : "#B87333",
        opacity: 0.1 + r(6) * 0.15,
        animation: `particle-float-${index % 5} ${duration}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const chevronOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src="/images/hero-chef.png"
          alt="Chef cooking in a warm kitchen"
          fill
          className="object-cover"
          style={{ objectPosition: "center 20%" }}
          priority
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <div className="flex items-baseline gap-3 sm:gap-5">
          <motion.h1
            className="font-display text-[56px] sm:text-[96px] font-bold leading-none text-gradient-copper"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Gobble
          </motion.h1>
          <motion.span
            className="font-display text-[56px] sm:text-[96px] font-bold leading-none text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Inc
          </motion.span>
        </div>

        <div className="h-6" />

        <div className="text-white font-sans font-medium text-lg sm:text-2xl">
          <StaggeredText text="Cook Smarter. Create Better. Grow Faster." />
        </div>

        <motion.p
          className="font-sans italic text-white/60 text-base sm:text-lg mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Heart Poured Into My Food ❤️
        </motion.p>

        <div className="h-10" />

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <Link
            href="/recipes"
            className="gradient-copper text-[var(--text-primary)] font-sans font-semibold px-8 py-3.5 rounded-full text-base hover:scale-105 hover:shadow-glow transition-all duration-300"
          >
            Explore Recipes
          </Link>
          <Link
            href="/studio"
            className="border border-white/40 text-white font-sans font-semibold px-8 py-3.5 rounded-full text-base hover:bg-white/10 hover:border-white/60 transition-all duration-300"
          >
            Creator Studio →
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity: chevronOpacity }}
      >
        <ChevronDown className="w-8 h-8 text-white/60 animate-bounce-slow" />
      </motion.div>

      <style jsx>{`
        @keyframes particle-float-0 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(30px, -40px); }
          50% { transform: translate(-20px, -80px); }
          75% { transform: translate(40px, -40px); }
        }
        @keyframes particle-float-1 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-40px, -30px); }
          50% { transform: translate(20px, -60px); }
          75% { transform: translate(-30px, -90px); }
        }
        @keyframes particle-float-2 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(50px, -50px); }
          66% { transform: translate(-30px, -30px); }
        }
        @keyframes particle-float-3 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-20px, -60px); }
          50% { transform: translate(30px, -30px); }
          75% { transform: translate(-40px, -70px); }
        }
        @keyframes particle-float-4 {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(25px, -45px); }
          40% { transform: translate(-35px, -20px); }
          60% { transform: translate(15px, -70px); }
          80% { transform: translate(-25px, -50px); }
        }
      `}</style>
    </section>
  );
}

function FeatureCardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 sm:py-32 px-4 sm:px-8"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-display text-4xl sm:text-5xl font-bold text-center mb-16"
          style={{ color: "var(--text-primary)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          The Intelligent Kitchen
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureCards.map((card, i) => (
            <motion.div
              key={card.title}
              className="group relative p-10 rounded-lg cursor-default"
              style={{
                background: "var(--bg-elevated)",
                boxShadow: "var(--shadow-md)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
            >
              <div
                className="absolute inset-x-0 top-0 h-[3px] rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "var(--gradient-copper)" }}
              />
              <div className="group-hover:shadow-lg transition-shadow duration-300" />

              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6 gradient-copper"
              >
                <card.icon className="w-7 h-7 text-white" />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{card.emoji}</span>
                <h3
                  className="font-display text-xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {card.title}
                </h3>
              </div>

              <p
                className="font-sans text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialProofTicker() {
  const tickerContent = tickerItems.join("  ·  ");

  return (
    <section
      className="py-4 overflow-hidden group"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
        <span
          className="font-sans text-sm px-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {tickerContent}
        </span>
        <span
          className="font-sans text-sm px-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {tickerContent}
        </span>
      </div>
    </section>
  );
}

function TrendingPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 sm:py-32 px-4 sm:px-8"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-display text-3xl sm:text-[40px] font-bold mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Trending This Week{" "}
            <motion.span
              className="inline-block"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              🔥
            </motion.span>
          </h2>
          <p
            className="font-sans text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            What the world is cooking right now
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {trendingRecipes.map((recipe, i) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/recipes/${recipe.slug}`} className="block group">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={recipe.heroImage}
                    alt={recipe.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="frosted-glass px-3 py-1 rounded-full text-xs font-sans font-medium text-white backdrop-blur-md bg-white/15 border-white/20">
                        ⏱ {recipe.prepTime + recipe.cookTime} min
                      </span>
                      <span className="frosted-glass px-3 py-1 rounded-full text-xs font-sans font-medium text-white backdrop-blur-md bg-white/15 border-white/20">
                        ⭐ {recipe.rating}
                      </span>
                      <span className="frosted-glass px-3 py-1 rounded-full text-xs font-sans font-medium text-white backdrop-blur-md bg-white/15 border-white/20">
                        🔥 Trending
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                      {recipe.title}
                    </h3>

                    <motion.span
                      className="inline-block font-sans text-sm font-medium text-white/80 mt-2 overflow-hidden"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 inline-block">
                        View Recipe →
                      </span>
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 sm:py-24 px-4 sm:px-8 gradient-copper">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl sm:text-[40px] font-bold mb-4 text-[var(--text-primary)]">
          Ready to cook something amazing?
        </h2>
        <p className="font-sans text-base sm:text-lg mb-10 text-[var(--text-primary)]/80">
          Join 2,400+ home chefs using Gobble AI
        </p>
        <Link
          href="/recipes"
          className="inline-block bg-white text-[var(--text-primary)] font-sans font-semibold px-10 py-4 rounded-full text-base hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          Get Started Free →
        </Link>
      </motion.div>
    </section>
  );
}

function Footer() {
  const [heartHover, setHeartHover] = useState(false);

  return (
    <footer
      className="py-12 px-4 text-center"
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--gold-light)",
      }}
    >
      <div className="max-w-4xl mx-auto space-y-5">
        <h3 className="font-display text-2xl font-bold text-gradient-copper">
          Gobble Inc
        </h3>

        <nav className="flex items-center justify-center gap-6 flex-wrap">
          {[
            { label: "Recipes", href: "/recipes" },
            { label: "Studio", href: "/studio" },
            { label: "Dashboard", href: "/dashboard" },
            { label: "Profile", href: "/profile" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-sans text-sm transition-colors duration-200"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--copper)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p
          className="font-sans text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          Built with{" "}
          <span
            className="cursor-default inline-block transition-all duration-300"
            onMouseEnter={() => setHeartHover(true)}
            onMouseLeave={() => setHeartHover(false)}
            style={{
              filter: heartHover
                ? "drop-shadow(0 0 8px rgba(245, 166, 35, 0.6)) drop-shadow(0 0 16px rgba(245, 166, 35, 0.3))"
                : "none",
              transform: heartHover ? "scale(1.3)" : "scale(1)",
            }}
          >
            ❤️
          </span>
        </p>

        <p
          className="font-sans text-[13px]"
          style={{ color: "var(--text-muted)" }}
        >
          a Pearika Chordia Product
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="-ml-0 lg:-ml-[68px]">
      <HeroSection />
      <FeatureCardsSection />
      <SocialProofTicker />
      <TrendingPreviewSection />
      <CTABanner />
      <Footer />
    </div>
  );
}
