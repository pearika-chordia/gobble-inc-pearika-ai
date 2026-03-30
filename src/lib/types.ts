export interface Substitution {
  name: string;
  note: string;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: string;
  substitutions?: Substitution[];
}

export interface TroubleshootingTip {
  problem: string;
  solution: string;
}

export interface Step {
  number: number;
  instruction: string;
  duration?: number;
  tip?: string;
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface TasteProfile {
  spicy: number;
  sweet: number;
  salty: number;
  sour: number;
  umami: number;
  rich: number;
}

export interface TasteModifications {
  spicy: string[];
  sweet: string[];
  salty: string[];
  sour: string[];
  umami: string[];
  rich: string[];
}

export interface Creator {
  name: string;
  handle: string;
  avatar: string;
}

export interface RecipeStats {
  timesCookedToday: number;
  averageRating: number;
  totalRatings: number;
  trendScore: number;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  cuisine: string;
  difficulty: "easy" | "medium" | "hard";
  prepTime: number;
  cookTime: number;
  servings: number;
  rating: number;
  trending: boolean;
  trendChange: number;
  cardHeight: number;
  heroImage: string;
  creator: Creator;
  ingredients: Ingredient[];
  steps: Step[];
  nutrition: Nutrition;
  tasteProfile: TasteProfile;
  pairings: string[];
  stats: RecipeStats;
  tasteModifications: TasteModifications;
  troubleshooting: Record<number, TroubleshootingTip[]>;
}

export interface LeaderboardEntry {
  id: string | number;
  title: string;
  date: string;
  score: number;
  views: number;
  engagement: number;
  thumbnail: string;
}

export interface TrendItem {
  name: string;
  emoji: string;
  change: number;
  sparkline: number[];
}

export interface Achievement {
  id: string;
  name: string;
  emoji: string;
  description: string;
  unlocked: boolean;
  date?: string;
}

export interface ActivityEntry {
  id: string;
  emoji: string;
  text: string;
  time: string;
  dotColor: string;
}
