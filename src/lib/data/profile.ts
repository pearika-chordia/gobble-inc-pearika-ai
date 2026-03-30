import { Achievement, ActivityEntry } from "@/lib/types";

export const userProfile = {
  name: "Gobble Chef",
  handle: "@minisgobble",
  avatar: "/avatars/chef.jpg",
  memberSince: "October 2024",
  level: "Sous Chef",
  levelEmoji: "🔪",
  nextLevel: "Head Chef",
  nextLevelEmoji: "👨‍🍳",
  currentXP: 2450,
  requiredXP: 4000,
  streak: 12,
};

export const achievements: Achievement[] = [
  { id: "1", name: "First Recipe", emoji: "🥚", description: "Cooked your first recipe", unlocked: true, date: "Oct 15, 2024" },
  { id: "2", name: "On a Roll", emoji: "🔥", description: "Hit a 7-day cooking streak", unlocked: true, date: "Nov 2, 2024" },
  { id: "3", name: "World Traveler", emoji: "🌍", description: "Cooked from 5 cuisines", unlocked: true, date: "Nov 18, 2024" },
  { id: "4", name: "Content Creator", emoji: "🎥", description: "Analyzed your first video", unlocked: true, date: "Dec 1, 2024" },
  { id: "5", name: "Flavor Explorer", emoji: "🧪", description: "Adjusted taste profile 10 times", unlocked: true, date: "Dec 22, 2024" },
  { id: "6", name: "High Scorer", emoji: "⚡", description: "Scored above 90 on content", unlocked: true, date: "Jan 15, 2025" },
  { id: "7", name: "Crowd Pleaser", emoji: "❤️", description: "Got 5-star rating on 3 recipes", unlocked: true, date: "Feb 8, 2025" },
  { id: "8", name: "Speed Demon", emoji: "⏱", description: "Cook under 15 minutes", unlocked: false },
  { id: "9", name: "Master Chef", emoji: "⭐", description: "Reach Master Chef level", unlocked: false },
  { id: "10", name: "Viral Hit", emoji: "📈", description: "Score 95+ on content", unlocked: false },
];

export const tasteDNA = {
  spicy: 82,
  umami: 75,
  rich: 70,
  salty: 65,
  sweet: 40,
  sour: 35,
};

export const recentActivity: ActivityEntry[] = [
  { id: "1", emoji: "🍳", text: "Cooked Butter Chicken — ⭐ 4.5/5", time: "2 hours ago", dotColor: "#F5A623" },
  { id: "2", emoji: "🎥", text: "Analyzed 'Quick Pasta Hack' — Score: 87", time: "Yesterday", dotColor: "#3B82F6" },
  { id: "3", emoji: "🏆", text: "Reached Sous Chef level 🔪", time: "3 days ago", dotColor: "#B87333" },
  { id: "4", emoji: "🍳", text: "Cooked Korean Fried Chicken — ⭐ 5/5", time: "4 days ago", dotColor: "#F5A623" },
  { id: "5", emoji: "⚡", text: "Unlocked 'High Scorer' achievement", time: "1 week ago", dotColor: "#16A34A" },
  { id: "6", emoji: "🍳", text: "Cooked Shakshuka — ⭐ 4/5", time: "1 week ago", dotColor: "#F5A623" },
];

export const profileStats = [
  { label: "Recipes Cooked", value: 15, icon: "🍳" },
  { label: "Videos Analyzed", value: 12, icon: "🎥" },
  { label: "Avg Score", value: 78, icon: "⭐" },
  { label: "Cuisines Explored", value: 7, icon: "🌍" },
];
