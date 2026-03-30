export interface VideoDemoCategory {
  name: string;
  score: number;
  status: string;
  statusColor: string;
  feedback: string;
  suggestions?: string[];
  colorPalette?: string[];
  subScores?: { label: string; value: number }[];
  waveform?: number[];
  problemRange?: number[];
}

export interface VideoDemoTimestamp {
  time: number;
  position: number;
  color: string;
  label: string;
}

export interface VideoDemoBenchmark {
  metric: string;
  yours: number;
  top20: number;
  insight: string;
}

export interface VideoDemo {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  overallScore: number;
  verdict: string;
  subVerdict: string;
  caption: string;
  topFeedback: string;
  categories: VideoDemoCategory[];
  timestampMarkers: VideoDemoTimestamp[];
  benchmarks: VideoDemoBenchmark[];
}

export const videoDemos: VideoDemo[] = [
  {
    id: "butter-chicken",
    title: "Butter Chicken Reel",
    duration: "0:32",
    thumbnail: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&q=80",
    overallScore: 78,
    verdict: "Strong Visuals, Needs a Tighter Hook",
    subVerdict: "Your video scores above average on visuals but underperforms on hooks and CTAs.",
    caption: "ngl this butter chicken hits different 🫣 the sauce alone could make me cry happy tears. recipe's on the page, you're welcome 🧡",
    topFeedback: "Beautiful warm tones and great overhead shot at 0:04. The cheese pull moment is peak engagement bait. But no text overlay until 1.2s and zero CTA in the final 3s.",
    categories: [
      {
        name: "Hook Strength", score: 65, status: "Needs Work", statusColor: "amber",
        feedback: "Your opening frame shows the finished dish — good for appetite appeal. But the first text overlay doesn't appear until 1.2 seconds in. Top creators hook within 0.5 seconds.",
        suggestions: ["Lead with motion — a pour, a sizzle, a dramatic reveal", "Add bold text overlay within the first 0.5 seconds", "Try a question hook: 'You've been making butter chicken WRONG'"],
      },
      {
        name: "Visual Appeal", score: 88, status: "Excellent", statusColor: "green",
        feedback: "Excellent warm color temperature — golds, oranges, and reds dominate. The overhead plating shot at 0:04 is beautifully composed. Kitchen background at 0:08–0:12 is slightly cluttered.",
        colorPalette: ["#D4A347", "#C0392B", "#F39C12", "#8B4513", "#2C3E50"],
        subScores: [{ label: "Color", value: 92 }, { label: "Composition", value: 85 }, { label: "Lighting", value: 90 }, { label: "Background", value: 78 }],
      },
      {
        name: "Audio Quality", score: 72, status: "Good", statusColor: "amber",
        feedback: "Sizzle sounds are clear and satisfying — great ASMR potential. However, the voiceover between 0:12–0:18 competes with background music. Drop music volume 40% during narration.",
        waveform: [45, 62, 78, 55, 82, 90, 65, 72, 88, 42, 58, 75, 92, 68, 45, 30, 25, 35, 28, 22, 18, 42, 65, 78, 85, 92, 68, 55, 72, 80, 85, 78, 65, 52, 88, 75, 62, 48, 72, 55],
        problemRange: [15, 22],
      },
      {
        name: "CTA Effectiveness", score: 58, status: "Weak", statusColor: "red",
        feedback: "No clear call-to-action detected in the final 3 seconds. 73% of viral food content includes a visible CTA. You're leaving engagement on the table.",
      },
    ],
    timestampMarkers: [
      { time: 0.01, position: 3, color: "green", label: "Strong opener — finished dish reveal creates immediate appetite appeal" },
      { time: 0.04, position: 12.5, color: "green", label: "Perfect overhead shot with textbook food photography composition" },
      { time: 0.08, position: 25, color: "amber", label: "Kitchen clutter visible in background — consider a cleaner surface" },
      { time: 0.12, position: 37.5, color: "red", label: "Audio conflict — voiceover and music competing for attention" },
      { time: 0.18, position: 56, color: "green", label: "The cheese pull is peak engagement bait — viewers rewatch this moment" },
      { time: 0.24, position: 75, color: "amber", label: "Pacing slows here — consider tighter editing or a surprise cut" },
      { time: 0.30, position: 94, color: "red", label: "Video ends without a CTA — add a follow/save prompt" },
    ],
    benchmarks: [
      { metric: "Hook Retention", yours: 68, top20: 82, insight: "Your hook retains 17% fewer viewers" },
      { metric: "Engagement Rate", yours: 4.2, top20: 6.8, insight: "Engagement is 38% below top tier" },
      { metric: "Save Rate", yours: 2.1, top20: 4.5, insight: "Save rate is less than half of top creators" },
      { metric: "Share Rate", yours: 0.8, top20: 2.3, insight: "Shares are nearly 3x lower than top performers" },
    ],
  },
  {
    id: "pasta-asmr",
    title: "Midnight Pasta ASMR",
    duration: "0:45",
    thumbnail: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&q=80",
    overallScore: 94,
    verdict: "Near Perfect — Viral Potential",
    subVerdict: "Exceptional across all metrics. This is the type of content that breaks through the algorithm.",
    caption: "POV: it's 1am and you just made the most perfect cacio e pepe of your life 🍝✨ no words needed, just vibes",
    topFeedback: "The sizzle at 0:00 is a perfect hook — 96% of viewers stayed past 3s. ASMR audio is crisp and satisfying. Moody lighting is gorgeous. CTA execution is textbook.",
    categories: [
      {
        name: "Hook Strength", score: 96, status: "Outstanding", statusColor: "green",
        feedback: "The sizzle sound at 0:00 immediately triggers curiosity. 96% of viewers stayed past the 3-second mark — that's top 1% performance. The dark, moody opening frame creates intrigue.",
        suggestions: ["This hook is nearly perfect — keep using sensory-first openings", "The dark aesthetic is trending; lean into it for future ASMR content"],
      },
      {
        name: "Visual Appeal", score: 95, status: "Outstanding", statusColor: "green",
        feedback: "The low-key lighting creates a cinematic, intimate atmosphere. Close-up shots of pasta twirling are mesmerizing. Color palette is warm and cohesive throughout.",
        colorPalette: ["#2C1810", "#D4A347", "#F5E6D3", "#8B6914", "#1A1A2E"],
        subScores: [{ label: "Color", value: 96 }, { label: "Composition", value: 94 }, { label: "Lighting", value: 97 }, { label: "Background", value: 88 }],
      },
      {
        name: "Audio Quality", score: 91, status: "Excellent", statusColor: "green",
        feedback: "ASMR audio is crisp — the pasta water bubbling, fork scraping, and cheese melting sounds are perfectly captured. No competing audio layers. Clean and intentional throughout.",
        waveform: [85, 78, 72, 88, 92, 95, 88, 82, 78, 85, 90, 88, 82, 78, 75, 80, 85, 88, 92, 95, 90, 85, 82, 88, 92, 90, 85, 82, 80, 78, 82, 85, 88, 92, 88, 85, 82, 78, 85, 90],
        problemRange: [-1, -1],
      },
      {
        name: "CTA Effectiveness", score: 88, status: "Strong", statusColor: "green",
        feedback: "'Save this recipe' text overlay appears at 0:42 — clean, non-intrusive, and highly effective. Pin comment with recipe link drives 3x more profile visits.",
      },
    ],
    timestampMarkers: [
      { time: 0.00, position: 2, color: "green", label: "Sizzle sound hook — triggers immediate ASMR response" },
      { time: 0.05, position: 11, color: "green", label: "Close-up pasta shot — viewers are locked in" },
      { time: 0.12, position: 27, color: "green", label: "Cheese pull moment — peak visual satisfaction" },
      { time: 0.20, position: 44, color: "green", label: "Plating sequence — beautiful composition" },
      { time: 0.30, position: 67, color: "green", label: "Fork twirl — satisfying ASMR moment" },
      { time: 0.38, position: 84, color: "green", label: "First bite — relatable, personal touch" },
      { time: 0.42, position: 93, color: "green", label: "Clean CTA — 'Save this recipe' text overlay" },
    ],
    benchmarks: [
      { metric: "Hook Retention", yours: 96, top20: 82, insight: "Your hook outperforms top creators by 17%" },
      { metric: "Engagement Rate", yours: 8.4, top20: 6.8, insight: "Engagement is 24% above top tier" },
      { metric: "Save Rate", yours: 6.2, top20: 4.5, insight: "Save rate is 38% higher than top creators" },
      { metric: "Share Rate", yours: 3.1, top20: 2.3, insight: "Shares are 35% above top performers" },
    ],
  },
  {
    id: "taco-tuesday",
    title: "Taco Tuesday Fails",
    duration: "0:28",
    thumbnail: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300&q=80",
    overallScore: 52,
    verdict: "Below Average — Multiple Issues",
    subVerdict: "Significant issues across hook, audio, and CTA. This content needs a reshoot or heavy re-edit.",
    caption: "tried making birria tacos... emphasis on TRIED 😭 swipe to see the disaster",
    topFeedback: "Opens with a static wide shot — no motion, no text, nothing to grab attention. Lighting is flat and bluish. Background music drowns out narration. Ends abruptly with no CTA.",
    categories: [
      {
        name: "Hook Strength", score: 42, status: "Poor", statusColor: "red",
        feedback: "Opens with a wide static shot of a messy kitchen — no motion, no text, no reason to stop scrolling. 58% of viewers left within 2 seconds. You need an immediate visual or audio hook.",
        suggestions: ["Open with the taco falling apart — comedy hooks work", "Add text: 'This was supposed to be birria tacos...' at 0:00", "Start with the expectation (reference image) vs reality"],
      },
      {
        name: "Visual Appeal", score: 55, status: "Below Average", statusColor: "red",
        feedback: "Lighting is flat and slightly blue-tinted — makes food look unappetizing. Camera is too far from the food. No close-up shots of the cooking process or final dish. Background is cluttered and distracting.",
        colorPalette: ["#6B7B8D", "#A0AEC0", "#C4B99A", "#4A5568", "#2D3748"],
        subScores: [{ label: "Color", value: 45 }, { label: "Composition", value: 52 }, { label: "Lighting", value: 48 }, { label: "Background", value: 40 }],
      },
      {
        name: "Audio Quality", score: 48, status: "Poor", statusColor: "red",
        feedback: "Background music is too loud and drowns out your narration from 0:08–0:22. The audio mix is unbalanced. No satisfying cooking sounds (sizzle, crunch) are captured.",
        waveform: [30, 25, 35, 28, 22, 18, 15, 45, 62, 75, 82, 78, 72, 68, 72, 75, 78, 72, 68, 62, 55, 48, 42, 35, 28, 22, 18, 15, 12, 10, 15, 18, 22, 25, 28, 22, 18, 15, 12, 10],
        problemRange: [7, 25],
      },
      {
        name: "CTA Effectiveness", score: 35, status: "Missing", statusColor: "red",
        feedback: "No CTA whatsoever. The video just cuts to black. No follow prompt, no save prompt, no link in bio mention. You're getting zero conversion from whatever views you do get.",
      },
    ],
    timestampMarkers: [
      { time: 0.00, position: 2, color: "red", label: "Static wide shot — nothing to hook the viewer" },
      { time: 0.04, position: 14, color: "red", label: "Still no text or motion — viewers are already gone" },
      { time: 0.08, position: 29, color: "red", label: "Music drowns out narration — audio conflict starts" },
      { time: 0.14, position: 50, color: "amber", label: "First taco attempt visible — too far from camera" },
      { time: 0.20, position: 71, color: "amber", label: "The fail moment — could be funny but poorly framed" },
      { time: 0.26, position: 93, color: "red", label: "Abrupt ending — no CTA, no follow-up, nothing" },
    ],
    benchmarks: [
      { metric: "Hook Retention", yours: 42, top20: 82, insight: "You lose 58% of viewers in the first 2 seconds" },
      { metric: "Engagement Rate", yours: 1.8, top20: 6.8, insight: "Engagement is 74% below top tier" },
      { metric: "Save Rate", yours: 0.4, top20: 4.5, insight: "Almost nobody is saving this content" },
      { metric: "Share Rate", yours: 0.2, top20: 2.3, insight: "Share rate is effectively zero" },
    ],
  },
  {
    id: "shakshuka-morning",
    title: "Shakshuka Morning Routine",
    duration: "0:38",
    thumbnail: "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=300&q=80",
    overallScore: 85,
    verdict: "Great Content, CTA Could Be Stronger",
    subVerdict: "Strong hook and gorgeous visuals, but you're leaving engagement on the table with a weak CTA.",
    caption: "my sunday morning shakshuka ritual ☀️🍳 there's something healing about eggs poaching in spiced tomato at 8am. recipe below 👇",
    topFeedback: "The egg-cracking close-up at 0:02 is a brilliant hook. Natural morning light gives warm, inviting tones. Gentle background music complements narration perfectly. CTA is present but too subtle.",
    categories: [
      {
        name: "Hook Strength", score: 82, status: "Great", statusColor: "green",
        feedback: "The close-up egg crack at 0:02 is visually satisfying and immediately communicates 'cooking content.' 82% of viewers stayed past 3 seconds. The morning light in the background adds warmth.",
        suggestions: ["Try adding text: 'My healing morning ritual' at 0:00 for extra context", "The egg crack is great — consider making it the very first frame"],
      },
      {
        name: "Visual Appeal", score: 92, status: "Excellent", statusColor: "green",
        feedback: "Natural morning sunlight creates beautiful warm tones without any color grading needed. Close-up shots of eggs poaching in tomato sauce are mesmerizing. Clean kitchen surface, great depth of field.",
        colorPalette: ["#E8A849", "#C0392B", "#F5E6D3", "#2C1810", "#FF6B35"],
        subScores: [{ label: "Color", value: 95 }, { label: "Composition", value: 90 }, { label: "Lighting", value: 96 }, { label: "Background", value: 85 }],
      },
      {
        name: "Audio Quality", score: 88, status: "Excellent", statusColor: "green",
        feedback: "Gentle acoustic background music complements the peaceful morning vibe perfectly. Narration is clear and well-mixed. The sizzle when eggs hit the sauce is a satisfying detail.",
        waveform: [55, 60, 65, 70, 72, 75, 78, 80, 82, 80, 78, 75, 72, 70, 68, 72, 75, 78, 80, 82, 85, 82, 80, 78, 75, 72, 70, 68, 65, 62, 60, 58, 55, 52, 50, 48, 45, 42, 40, 38],
        problemRange: [-1, -1],
      },
      {
        name: "CTA Effectiveness", score: 62, status: "Needs Work", statusColor: "amber",
        feedback: "Small 'link in bio' text appears at 0:36 but it's easy to miss — only visible for 1.5 seconds. No verbal CTA. Add a bolder text overlay, hold it for 3+ seconds, and mention it in your voiceover.",
      },
    ],
    timestampMarkers: [
      { time: 0.00, position: 2, color: "green", label: "Morning light establishes cozy, healing atmosphere" },
      { time: 0.02, position: 5, color: "green", label: "Egg crack close-up — perfect hook moment" },
      { time: 0.08, position: 21, color: "green", label: "Sauce bubbling — satisfying visual and audio" },
      { time: 0.16, position: 42, color: "green", label: "Eggs poaching — mesmerizing time-lapse" },
      { time: 0.24, position: 63, color: "green", label: "Plating with fresh herbs — beautiful composition" },
      { time: 0.32, position: 84, color: "amber", label: "Pacing slightly slow — could tighten the edit" },
      { time: 0.36, position: 95, color: "amber", label: "CTA too subtle — 'link in bio' barely visible" },
    ],
    benchmarks: [
      { metric: "Hook Retention", yours: 82, top20: 82, insight: "Your hook matches top creator performance" },
      { metric: "Engagement Rate", yours: 6.1, top20: 6.8, insight: "Engagement is just 10% below top tier" },
      { metric: "Save Rate", yours: 3.8, top20: 4.5, insight: "Save rate is close — a stronger CTA would close the gap" },
      { metric: "Share Rate", yours: 1.5, top20: 2.3, insight: "Shares are 35% below — add a share-worthy moment" },
    ],
  },
];

export const studioAnalysis = {
  overallScore: 78,
  verdict: "Strong Visuals, Needs a Tighter Hook",
  subVerdict: "Your video scores above average on visuals but underperforms on hooks and CTAs.",
  videoInfo: {
    title: "Butter Chicken Reel",
    duration: "0:32",
    uploadedAgo: "3 days ago",
    thumbnail: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200&q=80",
  },
  categories: [
    {
      name: "Hook Strength",
      score: 65,
      status: "Needs Work",
      statusColor: "amber",
      feedback: "Your opening frame shows the finished dish — good for appetite appeal. But the first text overlay doesn't appear until 1.2 seconds in. Top creators hook within 0.5 seconds. Consider opening with the most dramatic moment — the cheese pull, the sizzle, the pour.",
      suggestions: [
        "Lead with motion — a pour, a sizzle, a dramatic reveal",
        "Add bold text overlay within the first 0.5 seconds",
        "Try a question hook: 'You've been making butter chicken WRONG'",
      ],
    },
    {
      name: "Visual Appeal",
      score: 88,
      status: "Excellent",
      statusColor: "green",
      feedback: "Excellent warm color temperature — golds, oranges, and reds dominate, which is ideal for food content. The overhead plating shot at 0:04 is beautifully composed. One note: the kitchen background at 0:08–0:12 is slightly cluttered. Consider a cleaner surface or shallow depth of field.",
      colorPalette: ["#D4A347", "#C0392B", "#F39C12", "#8B4513", "#2C3E50"],
      subScores: [
        { label: "Color", value: 92 },
        { label: "Composition", value: 85 },
        { label: "Lighting", value: 90 },
        { label: "Background", value: 78 },
      ],
    },
    {
      name: "Audio Quality",
      score: 72,
      status: "Good",
      statusColor: "amber",
      feedback: "Sizzle sounds are clear and satisfying — great ASMR potential. However, the voiceover between 0:12–0:18 competes with background music. Drop music volume 40% during narration. Closing audio is clean.",
      waveform: [45, 62, 78, 55, 82, 90, 65, 72, 88, 42, 58, 75, 92, 68, 45, 30, 25, 35, 28, 22, 18, 42, 65, 78, 85, 92, 68, 55, 72, 80, 85, 78, 65, 52, 88, 75, 62, 48, 72, 55],
      problemRange: [15, 22],
    },
    {
      name: "CTA Effectiveness",
      score: 58,
      status: "Weak",
      statusColor: "red",
      feedback: "No clear call-to-action detected in the final 3 seconds. 73% of viral food content includes a visible CTA ('Follow for more', 'Save this recipe', 'Link in bio'). You're leaving engagement on the table.",
    },
  ],
  timestampMarkers: [
    { time: 0.01, position: 3, color: "green", label: "Strong opener — finished dish reveal creates immediate appetite appeal" },
    { time: 0.04, position: 12.5, color: "green", label: "Perfect overhead shot with textbook food photography composition" },
    { time: 0.08, position: 25, color: "amber", label: "Kitchen clutter visible in background — consider a cleaner surface" },
    { time: 0.12, position: 37.5, color: "red", label: "Audio conflict — voiceover and music competing for attention" },
    { time: 0.18, position: 56, color: "green", label: "The cheese pull is peak engagement bait — viewers rewatch this moment" },
    { time: 0.24, position: 75, color: "amber", label: "Pacing slows here — consider tighter editing or a surprise cut" },
    { time: 0.30, position: 94, color: "red", label: "Video ends without a CTA — add a follow/save prompt" },
  ],
  benchmarks: [
    { metric: "Hook Retention", yours: 68, top20: 82, insight: "Your hook retains 17% fewer viewers" },
    { metric: "Engagement Rate", yours: 4.2, top20: 6.8, insight: "Engagement is 38% below top tier" },
    { metric: "Save Rate", yours: 2.1, top20: 4.5, insight: "Save rate is less than half of top creators" },
    { metric: "Share Rate", yours: 0.8, top20: 2.3, insight: "Shares are nearly 3x lower than top performers" },
  ],
  captions: [
    { style: "Casual", text: "ngl this butter chicken hits different 🫣 the sauce alone could make me cry happy tears. recipe's on the page, you're welcome 🧡" },
    { style: "SEO-Optimized", text: "The BEST Butter Chicken Recipe — Creamy, Rich, 45 Minutes 🍗 Save this for your next dinner! #butterchicken #indianfood #homecooking #easyrecipe #dinnerideas" },
    { style: "Viral Hook", text: "I almost didn't post this because it's THAT good. My family's been making this butter chicken for 3 generations. Every single person who tries it asks for the recipe. Here it is 🧵👇" },
  ],
  hookIdeas: [
    { text: "POV: You just made restaurant-quality butter chicken at home", retention: 18 },
    { text: "Stop scrolling if you love Indian food 🛑", retention: 22 },
    { text: "This $4 dinner tastes like a $40 restaurant meal", retention: 15 },
    { text: "My mom's secret butter chicken recipe (she might actually disown me for this)", retention: 25 },
    { text: "3 ingredients 90% of people forget in butter chicken", retention: 20 },
  ],
  thumbnailConcepts: [
    { name: "The Reveal", description: "Top-down shot of the finished dish with steam rising. Bold text: 'BETTER THAN TAKEOUT' in white with drop shadow." },
    { name: "The Split", description: "Vertical split — scattered raw ingredients on the left, plated perfection on the right. Arrow connecting them. Text at top." },
    { name: "The Face", description: "Your reaction face with wide eyes, blurred butter chicken in foreground. Text: 'I CAN'T BELIEVE I MADE THIS 🤯'" },
  ],
};
