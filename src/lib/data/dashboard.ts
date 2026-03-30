import { LeaderboardEntry, TrendItem } from "@/lib/types";

export const engagementData = [
  { month: "Oct", views: 3200 },
  { month: "Nov", views: 4100 },
  { month: "Dec", views: 3800 },
  { month: "Jan", views: 5200 },
  { month: "Feb", views: 6800 },
  { month: "Mar", views: 8400 },
];

export const retentionData = [
  { time: "0s", yours: 100, average: 100 },
  { time: "3s", yours: 78, average: 82 },
  { time: "6s", yours: 72, average: 76 },
  { time: "9s", yours: 68, average: 72 },
  { time: "12s", yours: 62, average: 70 },
  { time: "15s", yours: 58, average: 68 },
  { time: "18s", yours: 55, average: 66 },
  { time: "21s", yours: 52, average: 64 },
  { time: "24s", yours: 50, average: 62 },
  { time: "27s", yours: 48, average: 60 },
  { time: "30s", yours: 44, average: 58 },
];

export const heatmapData = [
  { range: "0-3s", dropoff: 22 },
  { range: "3-6s", dropoff: 6 },
  { range: "6-9s", dropoff: 4 },
  { range: "9-12s", dropoff: 5 },
  { range: "12-15s", dropoff: 8 },
  { range: "15-18s", dropoff: 3 },
  { range: "18-21s", dropoff: 4 },
  { range: "21-24s", dropoff: 6 },
  { range: "24-27s", dropoff: 3 },
  { range: "27-30s", dropoff: 12 },
];

export const leaderboard: LeaderboardEntry[] = [
  {
    id: "1",
    title: "Butter Chicken Reel",
    date: "Feb 12",
    score: 94,
    views: 8432,
    engagement: 7.2,
    thumbnail: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=100&q=80",
  },
  {
    id: "2",
    title: "Shakshuka Morning",
    date: "Mar 1",
    score: 91,
    views: 7815,
    engagement: 6.9,
    thumbnail: "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=100&q=80",
  },
  {
    id: "3",
    title: "Quick Pasta Hack",
    date: "Jan 28",
    score: 87,
    views: 6218,
    engagement: 6.1,
    thumbnail: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=100&q=80",
  },
  {
    id: "4",
    title: "Spice Rack Tour",
    date: "Mar 3",
    score: 82,
    views: 5104,
    engagement: 5.8,
    thumbnail: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100&q=80",
  },
  {
    id: "5",
    title: "Birria Taco Night",
    date: "Feb 20",
    score: 79,
    views: 4892,
    engagement: 5.2,
    thumbnail: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=100&q=80",
  },
  {
    id: "6",
    title: "Gyoza Folding ASMR",
    date: "Jan 15",
    score: 76,
    views: 4210,
    engagement: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=100&q=80",
  },
  {
    id: "7",
    title: "Korean Fried Chicken",
    date: "Feb 5",
    score: 73,
    views: 3856,
    engagement: 4.5,
    thumbnail: "https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=100&q=80",
  },
  {
    id: "8",
    title: "Smash Burger 101",
    date: "Mar 10",
    score: 71,
    views: 3412,
    engagement: 4.2,
    thumbnail: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&q=80",
  },
  {
    id: "9",
    title: "Cacio e Pepe Basics",
    date: "Jan 8",
    score: 65,
    views: 2890,
    engagement: 3.8,
    thumbnail: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=100&q=80",
  },
  {
    id: "10",
    title: "Thai Fried Rice Quick",
    date: "Feb 28",
    score: 62,
    views: 2345,
    engagement: 3.5,
    thumbnail: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=100&q=80",
  },
  {
    id: "11",
    title: "Pantry Challenge",
    date: "Dec 20",
    score: 58,
    views: 1987,
    engagement: 3.1,
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&q=80",
  },
  {
    id: "12",
    title: "Kitchen Fails Comp",
    date: "Dec 5",
    score: 52,
    views: 1456,
    engagement: 2.7,
    thumbnail: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=100&q=80",
  },
];

export const trendingIngredients: TrendItem[] = [
  { name: "Cottage Cheese", emoji: "⚡", change: 340, sparkline: [10, 12, 15, 25, 55, 80, 95] },
  { name: "Dubai Chocolate", emoji: "🔥", change: 220, sparkline: [15, 20, 45, 60, 65, 62, 68] },
  { name: "Gochujang", emoji: "📈", change: 95, sparkline: [20, 25, 30, 38, 45, 55, 62] },
  { name: "Yuzu", emoji: "📈", change: 78, sparkline: [25, 28, 32, 38, 42, 50, 55] },
  { name: "Burrata", emoji: "🔥", change: 145, sparkline: [12, 15, 22, 45, 62, 70, 72] },
];

export const trendingFormats: TrendItem[] = [
  { name: "Quick Recipe Reels", emoji: "⚡", change: 280, sparkline: [10, 15, 20, 35, 60, 78, 90] },
  { name: "ASMR Cooking", emoji: "📈", change: 89, sparkline: [25, 28, 35, 40, 48, 55, 60] },
  { name: "Ingredient POV", emoji: "🔥", change: 210, sparkline: [8, 12, 18, 40, 65, 75, 80] },
  { name: "Cook With Me", emoji: "📈", change: 67, sparkline: [30, 32, 35, 40, 42, 48, 52] },
  { name: "Recipe Duets", emoji: "🔥", change: 156, sparkline: [10, 15, 25, 42, 58, 68, 72] },
];

export const trendingRecipes: TrendItem[] = [
  { name: "Birria Tacos", emoji: "🔥", change: 180, sparkline: [15, 20, 28, 42, 58, 68, 72] },
  { name: "Protein Bowls", emoji: "📈", change: 67, sparkline: [30, 32, 38, 42, 45, 50, 55] },
  { name: "Baked Oats", emoji: "⚡", change: 320, sparkline: [8, 10, 14, 28, 58, 82, 95] },
  { name: "One-Pot Pasta", emoji: "🔥", change: 134, sparkline: [12, 18, 28, 42, 55, 62, 68] },
  { name: "Smash Burgers", emoji: "📈", change: 88, sparkline: [22, 28, 32, 40, 48, 55, 60] },
];

export const dashboardStats = {
  totalViews: 24847,
  engagementRate: 5.2,
  contentScore: 78,
  bestPerformer: {
    title: "Butter Chicken Reel",
    score: 94,
    thumbnail: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=100&q=80",
  },
};
