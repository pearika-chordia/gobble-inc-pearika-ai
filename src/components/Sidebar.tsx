"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  Video,
  BarChart3,
  User,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/recipes", label: "Recipes", icon: BookOpen },
  { href: "/studio", label: "Studio", icon: Video },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/profile", label: "Profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        className="fixed left-0 top-0 h-screen z-50 hidden lg:flex flex-col py-6 overflow-hidden"
        style={{
          background: "var(--bg-elevated)",
          boxShadow: "var(--shadow-lg)",
          borderTopRightRadius: "var(--radius-lg)",
          borderBottomRightRadius: "var(--radius-lg)",
        }}
        animate={{ width: isHovered ? 240 : 68 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href="/" className="px-4 mb-8 flex items-center gap-3 no-underline">
          <div
            className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-display font-bold text-white text-sm"
            style={{ background: "var(--gradient-copper)" }}
          >
            G
          </div>
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="text-gradient-copper font-display text-xl font-bold whitespace-nowrap"
              >
                Gobble
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        <nav className="flex-1 flex flex-col gap-1 px-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex items-center gap-3 px-3 py-3 rounded-xl no-underline group"
                style={{ textDecoration: "none" }}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: "var(--gradient-copper)",
                      boxShadow: "var(--shadow-glow)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-3">
                  <Icon
                    size={22}
                    className="flex-shrink-0"
                    style={{
                      color: active ? "#fff" : "var(--text-secondary)",
                    }}
                  />
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className="text-sm font-medium whitespace-nowrap"
                        style={{
                          color: active ? "#fff" : "var(--text-secondary)",
                        }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                {!active && (
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: "var(--gold-light)",
                      transition: "opacity 0.15s ease",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-2 mt-auto">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl border-0 cursor-pointer"
            style={{
              background: "var(--bg-inset)",
            }}
          >
            <div className="relative w-10 h-6 flex-shrink-0 rounded-full" style={{ background: "var(--bg-primary)" }}>
              <motion.div
                className="absolute top-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: "var(--gradient-copper)" }}
                animate={{ left: theme === "dark" ? 18 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {theme === "dark" ? (
                  <Moon size={12} color="#fff" />
                ) : (
                  <Sun size={12} color="#fff" />
                )}
              </motion.div>
            </div>
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-medium whitespace-nowrap"
                  style={{ color: "var(--text-muted)" }}
                >
                  {theme === "dark" ? "Dark Mode" : "Light Mode"}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Mobile Bottom Tab Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden flex justify-around items-center frosted-glass"
        style={{
          height: 80,
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          borderTop: "1px solid var(--gold-light)",
        }}
      >
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 py-2 px-3 no-underline"
              style={{ textDecoration: "none" }}
            >
              <Icon
                size={22}
                style={{
                  color: active ? "var(--copper)" : "var(--text-muted)",
                }}
              />
              {active && (
                <motion.div
                  layoutId="mobile-tab-indicator"
                  className="w-1 h-1 rounded-full"
                  style={{ background: "var(--gradient-copper)" }}
                />
              )}
              <span
                className="text-[10px] font-medium"
                style={{
                  color: active ? "var(--copper)" : "var(--text-muted)",
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
