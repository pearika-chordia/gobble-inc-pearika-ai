import { Recipe } from "@/lib/types";

const creator = {
  name: "Gobble Chef",
  handle: "@minisgobble",
  avatar: "/avatars/chef.jpg",
};

export const recipes: Recipe[] = [
  {
    id: "rec_001",
    slug: "butter-chicken",
    title: "Butter Chicken",
    description:
      "Rich and creamy tomato-based curry with tender marinated chicken, finished with butter and cream. A beloved North Indian classic.",
    cuisine: "Indian",
    difficulty: "medium",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    rating: 4.8,
    trending: true,
    trendChange: 12,
    cardHeight: 360,
    heroImage:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80",
    creator,
    ingredients: [
      {
        id: "bc-1",
        name: "Chicken Thighs",
        amount: 800,
        unit: "g",
        category: "Protein",
        substitutions: [
          { name: "Paneer", note: "For a vegetarian version, cube and pan-fry before adding" },
          { name: "Chicken Breast", note: "Use thighs for juicier results; breast dries out faster" },
        ],
      },
      {
        id: "bc-2",
        name: "Plain Yogurt",
        amount: 200,
        unit: "ml",
        category: "Dairy",
        substitutions: [
          { name: "Coconut Yogurt", note: "Dairy-free alternative, slightly sweeter" },
        ],
      },
      {
        id: "bc-3",
        name: "Tomato Puree",
        amount: 400,
        unit: "ml",
        category: "Sauce",
      },
      {
        id: "bc-4",
        name: "Heavy Cream",
        amount: 150,
        unit: "ml",
        category: "Dairy",
        substitutions: [
          { name: "Cashew Cream", note: "Blend soaked cashews with water for a dairy-free option" },
        ],
      },
      {
        id: "bc-5",
        name: "Butter",
        amount: 60,
        unit: "g",
        category: "Dairy",
      },
      {
        id: "bc-6",
        name: "Garam Masala",
        amount: 2,
        unit: "tsp",
        category: "Spice",
      },
      {
        id: "bc-7",
        name: "Kashmiri Chili Powder",
        amount: 1,
        unit: "tsp",
        category: "Spice",
      },
      {
        id: "bc-8",
        name: "Garlic",
        amount: 6,
        unit: "cloves",
        category: "Aromatics",
      },
      {
        id: "bc-9",
        name: "Ginger",
        amount: 2,
        unit: "inches",
        category: "Aromatics",
      },
      {
        id: "bc-10",
        name: "Salt",
        amount: 1,
        unit: "tsp",
        category: "Seasoning",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Marinate chicken in yogurt, garam masala, chili powder, salt, and half the ginger-garlic paste. Refrigerate for at least 30 minutes.",
        duration: 1800,
        tip: "Overnight marination gives the best flavor and tenderness.",
      },
      {
        number: 2,
        instruction:
          "Grill or broil the marinated chicken pieces until lightly charred on the edges.",
        duration: 600,
        tip: "Use a cast iron pan if you don't have a grill—get it smoking hot.",
      },
      {
        number: 3,
        instruction:
          "Melt butter in a heavy-bottomed pan. Sauté remaining ginger-garlic paste until fragrant.",
        duration: 120,
      },
      {
        number: 4,
        instruction:
          "Add tomato puree and cook on medium heat until the oil separates from the sauce.",
        duration: 600,
        tip: "This step is key—don't rush it. The raw tomato taste needs to cook out.",
      },
      {
        number: 5,
        instruction:
          "Add the grilled chicken, cream, and a splash of water. Simmer gently until the sauce thickens.",
        duration: 480,
      },
      {
        number: 6,
        instruction:
          "Finish with a knob of butter and dried fenugreek leaves (kasuri methi). Serve with naan or rice.",
      },
    ],
    nutrition: {
      calories: 520,
      protein: 38,
      carbs: 14,
      fat: 35,
      fiber: 2,
    },
    tasteProfile: {
      spicy: 35,
      sweet: 20,
      salty: 40,
      sour: 25,
      umami: 55,
      rich: 85,
    },
    pairings: ["Garlic Naan", "Basmati Rice", "Mango Lassi"],
    stats: {
      timesCookedToday: 1243,
      averageRating: 4.8,
      totalRatings: 8920,
      trendScore: 94,
    },
    tasteModifications: {
      spicy: [
        "Add 1-2 green chilies while simmering for more heat",
        "Increase Kashmiri chili to 2 tsp for deeper warmth",
      ],
      sweet: [
        "Add a teaspoon of honey to balance the tomato acidity",
        "Use caramelized onions as a base for natural sweetness",
      ],
      salty: [
        "Finish with a pinch of flaky sea salt before serving",
        "Add a splash of soy sauce for savory depth",
      ],
      sour: [
        "Squeeze fresh lemon juice over the finished dish",
        "Stir in a tablespoon of amchur (dried mango powder)",
      ],
      umami: [
        "Add a teaspoon of tomato paste for concentrated flavor",
        "Stir in a pinch of MSG or mushroom powder",
      ],
      rich: [
        "Swirl in an extra tablespoon of butter at the end",
        "Replace half the cream with full-fat coconut cream",
      ],
    },
    troubleshooting: {
      2: [
        {
          problem: "Chicken is dry after grilling",
          solution:
            "Reduce grilling time—the chicken will finish cooking in the sauce. Aim for 80% done.",
        },
      ],
      4: [
        {
          problem: "Sauce tastes too acidic",
          solution:
            "Cook the tomato puree longer until oil separates, and add a pinch of sugar to balance.",
        },
        {
          problem: "Sauce is too thin",
          solution:
            "Simmer uncovered on medium heat for an extra 5-10 minutes to reduce.",
        },
      ],
    },
  },
  {
    id: "rec_002",
    slug: "pasta-carbonara",
    title: "Pasta Carbonara",
    description:
      "Silky Roman pasta with a luscious egg and cheese sauce, crispy guanciale, and freshly cracked black pepper.",
    cuisine: "Italian",
    difficulty: "easy",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    rating: 4.7,
    trending: false,
    trendChange: 3,
    cardHeight: 380,
    heroImage:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
    creator,
    ingredients: [
      {
        id: "pc-1",
        name: "Spaghetti",
        amount: 400,
        unit: "g",
        category: "Pasta",
        substitutions: [
          { name: "Rigatoni", note: "Holds the sauce well in the ridges" },
          { name: "Bucatini", note: "Traditional alternative with a hollow center" },
        ],
      },
      {
        id: "pc-2",
        name: "Guanciale",
        amount: 200,
        unit: "g",
        category: "Protein",
        substitutions: [
          { name: "Pancetta", note: "More widely available, slightly different flavor" },
        ],
      },
      {
        id: "pc-3",
        name: "Egg Yolks",
        amount: 6,
        unit: "large",
        category: "Dairy",
      },
      {
        id: "pc-4",
        name: "Pecorino Romano",
        amount: 100,
        unit: "g",
        category: "Cheese",
        substitutions: [
          { name: "Parmesan", note: "Milder and nuttier—use a 50/50 blend for balance" },
        ],
      },
      {
        id: "pc-5",
        name: "Black Pepper",
        amount: 2,
        unit: "tsp",
        category: "Seasoning",
      },
      {
        id: "pc-6",
        name: "Salt",
        amount: 1,
        unit: "tbsp",
        category: "Seasoning",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Bring a large pot of heavily salted water to a boil. Cook spaghetti until 1 minute shy of al dente.",
        duration: 540,
        tip: "The pasta water should taste like the sea—this is your only chance to season the pasta.",
      },
      {
        number: 2,
        instruction:
          "While pasta cooks, cut guanciale into small strips and render in a cold pan over medium heat until crispy and golden.",
        duration: 420,
        tip: "Start with a cold pan to slowly render the fat without burning.",
      },
      {
        number: 3,
        instruction:
          "Whisk egg yolks with finely grated Pecorino and generous black pepper in a bowl.",
      },
      {
        number: 4,
        instruction:
          "Remove the guanciale pan from heat. Transfer pasta directly into the pan using tongs, reserving pasta water.",
        duration: 30,
      },
      {
        number: 5,
        instruction:
          "Off heat, pour the egg mixture over the pasta and toss vigorously, adding splashes of pasta water to create a creamy emulsion.",
        duration: 60,
        tip: "The residual heat cooks the eggs gently—never put this back on direct heat or you'll get scrambled eggs.",
      },
      {
        number: 6,
        instruction:
          "Serve immediately with extra Pecorino and cracked black pepper on top.",
      },
    ],
    nutrition: {
      calories: 610,
      protein: 28,
      carbs: 58,
      fat: 30,
      fiber: 2,
    },
    tasteProfile: {
      spicy: 15,
      sweet: 5,
      salty: 55,
      sour: 5,
      umami: 75,
      rich: 80,
    },
    pairings: ["Crisp White Wine", "Simple Green Salad"],
    stats: {
      timesCookedToday: 876,
      averageRating: 4.7,
      totalRatings: 6540,
      trendScore: 72,
    },
    tasteModifications: {
      spicy: [
        "Add red pepper flakes when rendering the guanciale",
        "Finish with a drizzle of chili oil",
      ],
      sweet: [
        "Caramelize a sliced shallot in the guanciale fat",
        "Add a tiny pinch of nutmeg to the egg mixture",
      ],
      salty: [
        "Use a mix of Pecorino and Parmigiano for less salt",
        "Increase the Pecorino for a sharper, saltier finish",
      ],
      sour: [
        "Add a squeeze of lemon juice before serving",
        "Serve with a lemon wedge on the side",
      ],
      umami: [
        "Add a splash of the guanciale drippings to the egg mix",
        "Grate in a little extra aged Pecorino",
      ],
      rich: [
        "Add one extra egg yolk to the mixture",
        "Stir in a tablespoon of mascarpone for extra creaminess",
      ],
    },
    troubleshooting: {
      2: [
        {
          problem: "Guanciale is burning instead of rendering",
          solution: "Lower the heat—start cold and render slowly over medium-low heat.",
        },
      ],
      5: [
        {
          problem: "Eggs scrambled when adding to pasta",
          solution:
            "Always take the pan fully off heat before adding the egg mixture. Toss continuously.",
        },
        {
          problem: "Sauce is too thick and clumpy",
          solution:
            "Add more pasta water a tablespoon at a time while tossing to loosen the sauce.",
        },
      ],
    },
  },
  {
    id: "rec_003",
    slug: "birria-tacos",
    title: "Birria Tacos",
    description:
      "Slow-braised beef in a rich, complex chili consommé, served in crispy dipped tortillas with melted cheese.",
    cuisine: "Mexican",
    difficulty: "hard",
    prepTime: 30,
    cookTime: 150,
    servings: 6,
    rating: 4.9,
    trending: true,
    trendChange: 18,
    cardHeight: 420,
    heroImage:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80",
    creator,
    ingredients: [
      {
        id: "bt-1",
        name: "Beef Chuck Roast",
        amount: 1.5,
        unit: "kg",
        category: "Protein",
        substitutions: [
          { name: "Beef Short Ribs", note: "Richer flavor with bone-in marrow" },
          { name: "Goat Meat", note: "Traditional Jalisco-style birria uses goat" },
        ],
      },
      {
        id: "bt-2",
        name: "Guajillo Chiles",
        amount: 6,
        unit: "whole",
        category: "Chiles",
      },
      {
        id: "bt-3",
        name: "Ancho Chiles",
        amount: 4,
        unit: "whole",
        category: "Chiles",
        substitutions: [
          { name: "Pasilla Chiles", note: "Slightly earthier but works well as a substitute" },
        ],
      },
      {
        id: "bt-4",
        name: "Roma Tomatoes",
        amount: 4,
        unit: "whole",
        category: "Produce",
      },
      {
        id: "bt-5",
        name: "White Onion",
        amount: 1,
        unit: "large",
        category: "Aromatics",
      },
      {
        id: "bt-6",
        name: "Garlic",
        amount: 8,
        unit: "cloves",
        category: "Aromatics",
      },
      {
        id: "bt-7",
        name: "Corn Tortillas",
        amount: 24,
        unit: "small",
        category: "Grain",
        substitutions: [
          { name: "Flour Tortillas", note: "Non-traditional but crisps up nicely" },
        ],
      },
      {
        id: "bt-8",
        name: "Oaxaca Cheese",
        amount: 300,
        unit: "g",
        category: "Cheese",
      },
      {
        id: "bt-9",
        name: "Cumin",
        amount: 1,
        unit: "tbsp",
        category: "Spice",
      },
      {
        id: "bt-10",
        name: "Mexican Oregano",
        amount: 1,
        unit: "tbsp",
        category: "Spice",
      },
      {
        id: "bt-11",
        name: "Apple Cider Vinegar",
        amount: 2,
        unit: "tbsp",
        category: "Acid",
      },
      {
        id: "bt-12",
        name: "Beef Broth",
        amount: 1,
        unit: "L",
        category: "Liquid",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Toast dried chiles in a dry pan until fragrant and pliable, about 30 seconds per side. Remove stems and seeds, then soak in hot water for 20 minutes.",
        duration: 1260,
        tip: "Don't burn the chiles—they turn bitter quickly. Just a light toast.",
      },
      {
        number: 2,
        instruction:
          "Roast tomatoes, onion (halved), and garlic under a broiler until charred on all sides.",
        duration: 600,
      },
      {
        number: 3,
        instruction:
          "Blend soaked chiles, roasted vegetables, cumin, oregano, vinegar, and a cup of soaking liquid until very smooth.",
        duration: 120,
      },
      {
        number: 4,
        instruction:
          "Season beef generously with salt and pepper. Sear in a hot Dutch oven until deeply browned on all sides.",
        duration: 480,
        tip: "Sear in batches to avoid steaming the meat.",
      },
      {
        number: 5,
        instruction:
          "Pour the chile sauce and beef broth over the seared meat. Bring to a boil, then cover and braise in a 325°F oven until fork-tender.",
        duration: 7200,
        tip: "Check every hour and flip the meat. It's done when it shreds effortlessly.",
      },
      {
        number: 6,
        instruction:
          "Shred the beef and strain the consommé. Dip tortillas in the consommé, fill with shredded beef and cheese, and griddle until crispy.",
        duration: 600,
      },
      {
        number: 7,
        instruction:
          "Serve tacos with a cup of consommé on the side for dipping, topped with fresh cilantro, diced onion, and lime.",
      },
    ],
    nutrition: {
      calories: 680,
      protein: 48,
      carbs: 42,
      fat: 36,
      fiber: 5,
    },
    tasteProfile: {
      spicy: 50,
      sweet: 15,
      salty: 45,
      sour: 20,
      umami: 80,
      rich: 90,
    },
    pairings: ["Mexican Coca-Cola", "Horchata", "Lime Wedges"],
    stats: {
      timesCookedToday: 2105,
      averageRating: 4.9,
      totalRatings: 12400,
      trendScore: 98,
    },
    tasteModifications: {
      spicy: [
        "Add 2 morita or chipotle chiles to the blend for smoky heat",
        "Serve with habanero salsa on the side",
      ],
      sweet: [
        "Add a cinnamon stick to the braising liquid",
        "Include a piloncillo cone in the chile sauce",
      ],
      salty: [
        "Season the consommé more aggressively before serving",
        "Add a pinch of salt to the tortillas before griddling",
      ],
      sour: [
        "Increase the apple cider vinegar to 3 tablespoons",
        "Serve with pickled red onions on top",
      ],
      umami: [
        "Add a piece of dried kombu to the braising liquid",
        "Stir a tablespoon of soy sauce into the consommé",
      ],
      rich: [
        "Use marrow bones in the braise for extra body",
        "Add a tablespoon of lard to the consommé",
      ],
    },
    troubleshooting: {
      1: [
        {
          problem: "Chiles are bitter after toasting",
          solution:
            "They were over-toasted. Use new chiles and toast only until fragrant, about 15-30 seconds per side.",
        },
      ],
      5: [
        {
          problem: "Meat isn't tender after braising",
          solution:
            "Continue cooking—it can take up to 3.5 hours. The collagen needs time to break down.",
        },
        {
          problem: "Consommé is too thin",
          solution:
            "Strain the broth and simmer uncovered on the stovetop until reduced by a third.",
        },
      ],
    },
  },
  {
    id: "rec_004",
    slug: "thai-basil-fried-rice",
    title: "Thai Basil Fried Rice",
    description:
      "Quick and fiery stir-fried rice with Thai basil, chili, garlic, and a fried egg on top. Street food at its best.",
    cuisine: "Thai",
    difficulty: "easy",
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    rating: 4.5,
    trending: false,
    trendChange: -2,
    cardHeight: 360,
    heroImage:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80",
    creator,
    ingredients: [
      {
        id: "tf-1",
        name: "Cooked Jasmine Rice",
        amount: 400,
        unit: "g",
        category: "Grain",
        substitutions: [
          { name: "Cauliflower Rice", note: "Low-carb option, stir-fry until dry first" },
        ],
      },
      {
        id: "tf-2",
        name: "Chicken Thighs",
        amount: 250,
        unit: "g",
        category: "Protein",
        substitutions: [
          { name: "Shrimp", note: "Cook quickly over high heat, add near the end" },
          { name: "Tofu", note: "Press firm tofu and cube; fry separately until crispy" },
        ],
      },
      {
        id: "tf-3",
        name: "Thai Basil Leaves",
        amount: 1,
        unit: "cup",
        category: "Herbs",
      },
      {
        id: "tf-4",
        name: "Thai Bird's Eye Chili",
        amount: 4,
        unit: "whole",
        category: "Chiles",
      },
      {
        id: "tf-5",
        name: "Garlic",
        amount: 5,
        unit: "cloves",
        category: "Aromatics",
      },
      {
        id: "tf-6",
        name: "Fish Sauce",
        amount: 2,
        unit: "tbsp",
        category: "Sauce",
        substitutions: [
          { name: "Soy Sauce", note: "Less funky but adds saltiness; use light soy" },
        ],
      },
      {
        id: "tf-7",
        name: "Oyster Sauce",
        amount: 1,
        unit: "tbsp",
        category: "Sauce",
      },
      {
        id: "tf-8",
        name: "Soy Sauce",
        amount: 1,
        unit: "tbsp",
        category: "Sauce",
      },
      {
        id: "tf-9",
        name: "Eggs",
        amount: 2,
        unit: "large",
        category: "Protein",
      },
      {
        id: "tf-10",
        name: "Vegetable Oil",
        amount: 3,
        unit: "tbsp",
        category: "Oil",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Slice chicken into small bite-sized pieces. Mince garlic and roughly chop the chilies.",
        duration: 120,
      },
      {
        number: 2,
        instruction:
          "Heat a wok over the highest heat until smoking. Add oil, then stir-fry garlic and chilies for 15 seconds.",
        duration: 30,
        tip: "Everything happens fast—have all ingredients prepped and within arm's reach.",
      },
      {
        number: 3,
        instruction:
          "Add chicken and stir-fry until cooked through and slightly caramelized.",
        duration: 180,
      },
      {
        number: 4,
        instruction:
          "Add day-old rice, breaking up any clumps. Toss with fish sauce, soy sauce, and oyster sauce. Stir-fry until every grain is coated and heated through.",
        duration: 180,
        tip: "Day-old rice is essential—fresh rice will turn mushy.",
      },
      {
        number: 5,
        instruction:
          "Kill the heat, toss in Thai basil leaves, and fold until just wilted.",
        duration: 15,
      },
      {
        number: 6,
        instruction:
          "Fry eggs sunny-side up in a separate pan. Plate the rice and top with the fried egg.",
        duration: 120,
      },
    ],
    nutrition: {
      calories: 480,
      protein: 32,
      carbs: 52,
      fat: 16,
      fiber: 2,
    },
    tasteProfile: {
      spicy: 65,
      sweet: 10,
      salty: 55,
      sour: 5,
      umami: 60,
      rich: 40,
    },
    pairings: ["Thai Iced Tea", "Cucumber Slices"],
    stats: {
      timesCookedToday: 654,
      averageRating: 4.5,
      totalRatings: 4320,
      trendScore: 61,
    },
    tasteModifications: {
      spicy: [
        "Add more bird's eye chilies or use them with seeds",
        "Drizzle with Thai chili oil before serving",
      ],
      sweet: [
        "Add a teaspoon of palm sugar to the sauce mix",
        "Include diced pineapple for tropical sweetness",
      ],
      salty: [
        "Add an extra splash of fish sauce at the end",
        "Top with crispy fried shallots for salty crunch",
      ],
      sour: [
        "Squeeze a lime wedge over the finished dish",
        "Serve with a side of nam prik (Thai chili vinegar)",
      ],
      umami: [
        "Add a teaspoon of fermented shrimp paste",
        "Stir in a splash of mushroom soy sauce",
      ],
      rich: [
        "Fry the rice in rendered pork fat instead of oil",
        "Add a drizzle of sesame oil at the very end",
      ],
    },
    troubleshooting: {
      2: [
        {
          problem: "Garlic is burning in the wok",
          solution: "The wok may be too hot—add the garlic and immediately follow with the chicken to lower temp.",
        },
      ],
      4: [
        {
          problem: "Rice is mushy and clumping",
          solution:
            "Use day-old refrigerated rice that's dried out. Spread fresh rice on a sheet pan and refrigerate uncovered for a few hours.",
        },
        {
          problem: "Rice is sticking to the wok",
          solution:
            "Ensure the wok is properly seasoned and smoking hot before adding oil. Use more oil if needed.",
        },
      ],
    },
  },
  {
    id: "rec_005",
    slug: "shakshuka",
    title: "Shakshuka",
    description:
      "Eggs poached in a spiced tomato and pepper sauce, served straight from the skillet with crusty bread for dipping.",
    cuisine: "Middle Eastern",
    difficulty: "easy",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    rating: 4.6,
    trending: true,
    trendChange: 8,
    cardHeight: 380,
    heroImage:
      "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800&q=80",
    creator,
    ingredients: [
      {
        id: "sh-1",
        name: "Eggs",
        amount: 6,
        unit: "large",
        category: "Protein",
      },
      {
        id: "sh-2",
        name: "Canned Crushed Tomatoes",
        amount: 800,
        unit: "g",
        category: "Sauce",
        substitutions: [
          { name: "Fresh Tomatoes", note: "Use very ripe tomatoes, blanch and crush; cook longer" },
        ],
      },
      {
        id: "sh-3",
        name: "Red Bell Pepper",
        amount: 2,
        unit: "whole",
        category: "Produce",
      },
      {
        id: "sh-4",
        name: "Yellow Onion",
        amount: 1,
        unit: "large",
        category: "Aromatics",
      },
      {
        id: "sh-5",
        name: "Garlic",
        amount: 4,
        unit: "cloves",
        category: "Aromatics",
      },
      {
        id: "sh-6",
        name: "Cumin",
        amount: 1,
        unit: "tsp",
        category: "Spice",
      },
      {
        id: "sh-7",
        name: "Paprika",
        amount: 1,
        unit: "tsp",
        category: "Spice",
        substitutions: [
          { name: "Smoked Paprika", note: "Adds a lovely smoky dimension" },
        ],
      },
      {
        id: "sh-8",
        name: "Cayenne Pepper",
        amount: 0.5,
        unit: "tsp",
        category: "Spice",
      },
      {
        id: "sh-9",
        name: "Olive Oil",
        amount: 3,
        unit: "tbsp",
        category: "Oil",
      },
      {
        id: "sh-10",
        name: "Fresh Cilantro",
        amount: 0.25,
        unit: "cup",
        category: "Herbs",
        substitutions: [
          { name: "Fresh Parsley", note: "If you have the cilantro-tastes-like-soap gene" },
        ],
      },
      {
        id: "sh-11",
        name: "Feta Cheese",
        amount: 60,
        unit: "g",
        category: "Cheese",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Heat olive oil in a large skillet over medium heat. Sauté diced onion and bell pepper until softened.",
        duration: 360,
      },
      {
        number: 2,
        instruction:
          "Add minced garlic, cumin, paprika, and cayenne. Cook until fragrant.",
        duration: 60,
        tip: "Stir constantly—ground spices burn in seconds.",
      },
      {
        number: 3,
        instruction:
          "Pour in crushed tomatoes, season with salt and pepper, and simmer until the sauce thickens slightly.",
        duration: 600,
        tip: "The sauce should be thick enough to hold the eggs in place.",
      },
      {
        number: 4,
        instruction:
          "Make 6 wells in the sauce with the back of a spoon. Crack an egg into each well.",
        duration: 30,
      },
      {
        number: 5,
        instruction:
          "Cover the skillet and cook on medium-low until the egg whites are set but yolks are still runny.",
        duration: 360,
        tip: "Check at 5 minutes—the eggs continue cooking from residual heat after you remove the lid.",
      },
      {
        number: 6,
        instruction:
          "Crumble feta cheese over the top, sprinkle with fresh cilantro, and serve with crusty bread.",
      },
    ],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 22,
      fat: 18,
      fiber: 5,
    },
    tasteProfile: {
      spicy: 40,
      sweet: 20,
      salty: 35,
      sour: 30,
      umami: 50,
      rich: 45,
    },
    pairings: ["Crusty Sourdough Bread", "Labneh", "Turkish Coffee"],
    stats: {
      timesCookedToday: 892,
      averageRating: 4.6,
      totalRatings: 5680,
      trendScore: 85,
    },
    tasteModifications: {
      spicy: [
        "Double the cayenne pepper for more kick",
        "Add harissa paste to the tomato sauce",
      ],
      sweet: [
        "Add roasted red peppers from a jar for natural sweetness",
        "Drizzle a tiny bit of honey over the finished dish",
      ],
      salty: [
        "Use more feta cheese crumbled on top",
        "Add a splash of soy sauce to the tomato base",
      ],
      sour: [
        "Squeeze lemon juice over the eggs before serving",
        "Add a tablespoon of pomegranate molasses to the sauce",
      ],
      umami: [
        "Add sun-dried tomatoes to the sauce",
        "Stir in a teaspoon of miso paste while cooking",
      ],
      rich: [
        "Swirl in a tablespoon of butter before adding eggs",
        "Drizzle with good quality extra virgin olive oil to finish",
      ],
    },
    troubleshooting: {
      3: [
        {
          problem: "Sauce is too watery for the eggs",
          solution:
            "Simmer longer to reduce, or add a tablespoon of tomato paste to thicken quickly.",
        },
      ],
      5: [
        {
          problem: "Egg whites are still raw but yolks are setting",
          solution:
            "Spoon some hot sauce over the whites, or cover with a lid and reduce heat to cook more gently.",
        },
        {
          problem: "Yolks are overcooked and hard",
          solution:
            "Remove from heat earlier—residual heat will continue cooking. Aim to pull at slightly underdone.",
        },
      ],
    },
  },
  {
    id: "rec_006",
    slug: "korean-fried-chicken",
    title: "Korean Fried Chicken",
    description:
      "Ultra-crispy double-fried chicken coated in a sticky, sweet-spicy gochujang glaze. Addictively crunchy.",
    cuisine: "Korean",
    difficulty: "medium",
    prepTime: 20,
    cookTime: 40,
    servings: 4,
    rating: 4.8,
    trending: false,
    trendChange: 5,
    cardHeight: 420,
    heroImage:
      "https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=800&q=80",
    creator,
    ingredients: [
      {
        id: "kf-1",
        name: "Chicken Wings",
        amount: 1,
        unit: "kg",
        category: "Protein",
        substitutions: [
          { name: "Chicken Drumettes", note: "Meatier option, increase fry time by 2 minutes" },
        ],
      },
      {
        id: "kf-2",
        name: "Potato Starch",
        amount: 200,
        unit: "g",
        category: "Baking",
        substitutions: [
          { name: "Cornstarch", note: "Slightly less crispy but works well" },
          { name: "Rice Flour", note: "Gives an extra shatteringly crisp coating" },
        ],
      },
      {
        id: "kf-3",
        name: "Gochujang",
        amount: 3,
        unit: "tbsp",
        category: "Sauce",
      },
      {
        id: "kf-4",
        name: "Soy Sauce",
        amount: 2,
        unit: "tbsp",
        category: "Sauce",
      },
      {
        id: "kf-5",
        name: "Rice Vinegar",
        amount: 1,
        unit: "tbsp",
        category: "Acid",
      },
      {
        id: "kf-6",
        name: "Honey",
        amount: 3,
        unit: "tbsp",
        category: "Sweetener",
        substitutions: [
          { name: "Corn Syrup", note: "Traditional in Korean restaurants for extra gloss" },
        ],
      },
      {
        id: "kf-7",
        name: "Garlic",
        amount: 4,
        unit: "cloves",
        category: "Aromatics",
      },
      {
        id: "kf-8",
        name: "Ginger",
        amount: 1,
        unit: "inch",
        category: "Aromatics",
      },
      {
        id: "kf-9",
        name: "Sesame Seeds",
        amount: 2,
        unit: "tbsp",
        category: "Garnish",
      },
      {
        id: "kf-10",
        name: "Vegetable Oil",
        amount: 1,
        unit: "L",
        category: "Oil",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Pat chicken wings completely dry with paper towels. Season with salt and toss in potato starch until evenly coated.",
        duration: 300,
        tip: "Dry chicken = crispy chicken. This is the most important step.",
      },
      {
        number: 2,
        instruction:
          "Heat oil to 325°F (160°C). Fry chicken in batches for 8-10 minutes until cooked through. Remove and rest on a wire rack.",
        duration: 600,
      },
      {
        number: 3,
        instruction:
          "Increase oil temperature to 375°F (190°C). Fry the chicken a second time for 3-4 minutes until deeply golden and shatteringly crisp.",
        duration: 240,
        tip: "The double-fry is the secret—it drives out moisture for extreme crunch.",
      },
      {
        number: 4,
        instruction:
          "While chicken fries, make the glaze: combine gochujang, soy sauce, honey, rice vinegar, minced garlic, and grated ginger in a saucepan. Simmer until thickened.",
        duration: 300,
      },
      {
        number: 5,
        instruction:
          "Toss the hot crispy chicken in the glaze until evenly coated. Sprinkle with sesame seeds.",
        duration: 60,
      },
      {
        number: 6,
        instruction: "Serve immediately with pickled radish and cold beer.",
      },
    ],
    nutrition: {
      calories: 560,
      protein: 34,
      carbs: 38,
      fat: 30,
      fiber: 1,
    },
    tasteProfile: {
      spicy: 55,
      sweet: 45,
      salty: 40,
      sour: 15,
      umami: 50,
      rich: 65,
    },
    pairings: ["Pickled Daikon Radish", "Cold Korean Beer", "Steamed Rice"],
    stats: {
      timesCookedToday: 765,
      averageRating: 4.8,
      totalRatings: 7200,
      trendScore: 78,
    },
    tasteModifications: {
      spicy: [
        "Add gochugaru flakes to the glaze for textured heat",
        "Mix in a teaspoon of Korean hot pepper paste",
      ],
      sweet: [
        "Increase honey to 4 tablespoons in the glaze",
        "Add a tablespoon of brown sugar for caramel notes",
      ],
      salty: [
        "Add an extra tablespoon of soy sauce to the glaze",
        "Sprinkle with flaky sea salt right after glazing",
      ],
      sour: [
        "Increase rice vinegar to 2 tablespoons",
        "Serve with a tangy pickled cucumber salad",
      ],
      umami: [
        "Add a teaspoon of fish sauce to the glaze",
        "Mix in a tablespoon of doenjang (fermented soybean paste)",
      ],
      rich: [
        "Add a tablespoon of butter to the glaze while warm",
        "Drizzle with toasted sesame oil before serving",
      ],
    },
    troubleshooting: {
      2: [
        {
          problem: "Coating is falling off during frying",
          solution:
            "Make sure chicken is dry before coating, and let the coated pieces rest 5 minutes before frying.",
        },
      ],
      3: [
        {
          problem: "Chicken isn't getting crispy on the second fry",
          solution:
            "Oil temperature is too low. Wait until it reaches 375°F before adding chicken. Don't overcrowd.",
        },
        {
          problem: "Oil is splattering excessively",
          solution:
            "Chicken wasn't dry enough, or there's water in the oil. Pat dry and use a splatter screen.",
        },
      ],
    },
  },
  {
    id: "rec_007",
    slug: "cacio-e-pepe",
    title: "Cacio e Pepe",
    description:
      "Three ingredients, infinite technique. Tonnarelli pasta in a silky emulsion of Pecorino Romano and black pepper.",
    cuisine: "Italian",
    difficulty: "medium",
    prepTime: 5,
    cookTime: 15,
    servings: 2,
    rating: 4.6,
    trending: false,
    trendChange: 1,
    cardHeight: 360,
    heroImage:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    creator,
    ingredients: [
      {
        id: "cp-1",
        name: "Tonnarelli or Spaghetti",
        amount: 200,
        unit: "g",
        category: "Pasta",
        substitutions: [
          { name: "Bucatini", note: "Hollow center catches the peppery sauce beautifully" },
        ],
      },
      {
        id: "cp-2",
        name: "Pecorino Romano",
        amount: 150,
        unit: "g",
        category: "Cheese",
        substitutions: [
          { name: "Parmigiano-Reggiano", note: "Milder and melts more easily, but less authentic" },
        ],
      },
      {
        id: "cp-3",
        name: "Black Peppercorns",
        amount: 2,
        unit: "tbsp",
        category: "Seasoning",
      },
      {
        id: "cp-4",
        name: "Salt",
        amount: 1,
        unit: "tbsp",
        category: "Seasoning",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Toast whole black peppercorns in a dry skillet over medium heat until fragrant. Crack coarsely with a mortar and pestle.",
        duration: 120,
        tip: "Don't use pre-ground pepper—freshly cracked is essential for this dish.",
      },
      {
        number: 2,
        instruction:
          "Bring salted water to a boil and cook pasta until 2 minutes shy of al dente. Reserve 2 cups of starchy pasta water.",
        duration: 480,
        tip: "Use less water than usual to make the pasta water extra starchy.",
      },
      {
        number: 3,
        instruction:
          "Add cracked pepper to a large skillet with a ladle of pasta water. Simmer to bloom the pepper's oils.",
        duration: 60,
      },
      {
        number: 4,
        instruction:
          "Transfer the pasta to the skillet. Toss vigorously while adding pasta water a ladle at a time.",
        duration: 120,
      },
      {
        number: 5,
        instruction:
          "Remove from heat. Add finely grated Pecorino in three additions, tossing constantly to form a creamy emulsion. Adjust with pasta water as needed.",
        duration: 120,
        tip: "Off heat is crucial—too much heat and the cheese will clump into a ball.",
      },
      {
        number: 6,
        instruction: "Plate immediately, finish with extra Pecorino and pepper.",
      },
    ],
    nutrition: {
      calories: 520,
      protein: 24,
      carbs: 56,
      fat: 22,
      fiber: 2,
    },
    tasteProfile: {
      spicy: 35,
      sweet: 5,
      salty: 50,
      sour: 5,
      umami: 65,
      rich: 70,
    },
    pairings: ["Frascati White Wine", "Simple Arugula Salad"],
    stats: {
      timesCookedToday: 432,
      averageRating: 4.6,
      totalRatings: 3890,
      trendScore: 55,
    },
    tasteModifications: {
      spicy: [
        "Add an extra tablespoon of cracked pepper",
        "Include a pinch of red pepper flakes",
      ],
      sweet: [
        "Add a touch of browned butter for nutty sweetness",
        "Caramelize a small shallot and mix into the pasta",
      ],
      salty: [
        "Use more Pecorino in the emulsion",
        "Add a pinch of flaky Maldon salt before serving",
      ],
      sour: [
        "Add a tiny squeeze of lemon over the plated pasta",
        "Zest a lemon over the top for bright flavor",
      ],
      umami: [
        "Mix a small amount of Parmigiano with the Pecorino",
        "Add a teaspoon of white miso to the pasta water",
      ],
      rich: [
        "Add a small knob of butter when creating the emulsion",
        "Use extra egg yolk mixed into the cheese for creaminess",
      ],
    },
    troubleshooting: {
      5: [
        {
          problem: "Cheese clumped into a ball instead of emulsifying",
          solution:
            "The pan was too hot. Start over with reserved pasta water: add cheese off heat, toss vigorously, and add water gradually.",
        },
        {
          problem: "Sauce is too thin and watery",
          solution:
            "Add more Pecorino and toss over very low heat to tighten the emulsion.",
        },
      ],
      4: [
        {
          problem: "Pasta is sticking together in the pan",
          solution:
            "Add more pasta water and keep tossing. The starch in the water prevents sticking.",
        },
      ],
    },
  },
  {
    id: "rec_008",
    slug: "chicken-tikka-masala",
    title: "Chicken Tikka Masala",
    description:
      "Charred tandoori chicken pieces swimming in a creamy, aromatic tomato-spice sauce. Britain's adopted national dish.",
    cuisine: "Indian",
    difficulty: "medium",
    prepTime: 25,
    cookTime: 25,
    servings: 4,
    rating: 4.7,
    trending: false,
    trendChange: 4,
    cardHeight: 380,
    heroImage:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
    creator,
    ingredients: [
      {
        id: "ct-1",
        name: "Chicken Breast",
        amount: 700,
        unit: "g",
        category: "Protein",
        substitutions: [
          { name: "Chicken Thighs", note: "Juicier and more forgiving when cooking" },
          { name: "Paneer", note: "Great vegetarian substitute, cube and pan-fry first" },
        ],
      },
      {
        id: "ct-2",
        name: "Plain Yogurt",
        amount: 200,
        unit: "ml",
        category: "Dairy",
      },
      {
        id: "ct-3",
        name: "Canned Tomatoes",
        amount: 400,
        unit: "g",
        category: "Sauce",
      },
      {
        id: "ct-4",
        name: "Heavy Cream",
        amount: 120,
        unit: "ml",
        category: "Dairy",
        substitutions: [
          { name: "Coconut Cream", note: "Dairy-free option that adds slight sweetness" },
        ],
      },
      {
        id: "ct-5",
        name: "Onion",
        amount: 2,
        unit: "medium",
        category: "Aromatics",
      },
      {
        id: "ct-6",
        name: "Garlic",
        amount: 5,
        unit: "cloves",
        category: "Aromatics",
      },
      {
        id: "ct-7",
        name: "Ginger",
        amount: 2,
        unit: "inches",
        category: "Aromatics",
      },
      {
        id: "ct-8",
        name: "Garam Masala",
        amount: 2,
        unit: "tsp",
        category: "Spice",
      },
      {
        id: "ct-9",
        name: "Turmeric",
        amount: 1,
        unit: "tsp",
        category: "Spice",
      },
      {
        id: "ct-10",
        name: "Cumin",
        amount: 1,
        unit: "tsp",
        category: "Spice",
      },
      {
        id: "ct-11",
        name: "Kashmiri Chili Powder",
        amount: 2,
        unit: "tsp",
        category: "Spice",
      },
      {
        id: "ct-12",
        name: "Butter",
        amount: 30,
        unit: "g",
        category: "Dairy",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Marinate chicken in yogurt, turmeric, chili powder, cumin, and salt. Let sit for at least 30 minutes.",
        duration: 1800,
        tip: "Score the chicken so the marinade penetrates deeply.",
      },
      {
        number: 2,
        instruction:
          "Thread chicken onto skewers and grill or broil on high until charred with blackened edges.",
        duration: 480,
        tip: "The char is essential to tikka masala's smoky flavor profile.",
      },
      {
        number: 3,
        instruction:
          "In a large pan, melt butter and sauté diced onions until deeply golden. Add ginger-garlic paste and cook 2 minutes.",
        duration: 480,
      },
      {
        number: 4,
        instruction:
          "Add canned tomatoes, garam masala, and remaining spices. Simmer until thick and the oil separates.",
        duration: 600,
      },
      {
        number: 5,
        instruction:
          "Stir in cream, add the grilled chicken pieces, and simmer together for 5 minutes.",
        duration: 300,
        tip: "Don't boil after adding cream or it may split.",
      },
      {
        number: 6,
        instruction:
          "Garnish with fresh cilantro and serve with naan or basmati rice.",
      },
    ],
    nutrition: {
      calories: 490,
      protein: 40,
      carbs: 16,
      fat: 30,
      fiber: 3,
    },
    tasteProfile: {
      spicy: 40,
      sweet: 15,
      salty: 35,
      sour: 20,
      umami: 50,
      rich: 75,
    },
    pairings: ["Garlic Naan", "Jeera Rice", "Raita"],
    stats: {
      timesCookedToday: 987,
      averageRating: 4.7,
      totalRatings: 7650,
      trendScore: 70,
    },
    tasteModifications: {
      spicy: [
        "Add fresh green chilies while sautéing onions",
        "Use hot paprika instead of Kashmiri chili",
      ],
      sweet: [
        "Add a tablespoon of honey to the sauce",
        "Use caramelized onions as the base",
      ],
      salty: [
        "Season more aggressively at the marinade stage",
        "Add a splash of soy sauce to the tomato base",
      ],
      sour: [
        "Stir in a tablespoon of tamarind paste",
        "Squeeze lemon juice over the finished dish",
      ],
      umami: [
        "Add a teaspoon of tomato paste for concentrated flavor",
        "Stir in a dash of Worcestershire sauce",
      ],
      rich: [
        "Finish with an extra knob of butter before serving",
        "Replace half the cream with mascarpone",
      ],
    },
    troubleshooting: {
      2: [
        {
          problem: "Chicken is dry after grilling",
          solution:
            "Use thighs instead of breast, or grill to 80% done since it finishes in the sauce.",
        },
      ],
      4: [
        {
          problem: "Sauce tastes raw and acidic",
          solution:
            "Cook tomatoes longer—at least 10 minutes until oil separates and the raw taste is gone.",
        },
        {
          problem: "Sauce is grainy or split",
          solution:
            "Blend the sauce smooth before adding cream. Add cream off the heat and stir in gently.",
        },
      ],
    },
  },
  {
    id: "rec_009",
    slug: "japanese-gyoza",
    title: "Japanese Gyoza",
    description:
      "Perfectly pleated pan-fried dumplings with a juicy pork and cabbage filling, served with a tangy dipping sauce.",
    cuisine: "Japanese",
    difficulty: "medium",
    prepTime: 30,
    cookTime: 15,
    servings: 4,
    rating: 4.7,
    trending: false,
    trendChange: 2,
    cardHeight: 420,
    heroImage:
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&q=80",
    creator,
    ingredients: [
      {
        id: "jg-1",
        name: "Ground Pork",
        amount: 300,
        unit: "g",
        category: "Protein",
        substitutions: [
          { name: "Ground Chicken", note: "Lighter flavor, add extra sesame oil for richness" },
          { name: "Firm Tofu", note: "Crumble and press dry for a vegetarian filling" },
        ],
      },
      {
        id: "jg-2",
        name: "Napa Cabbage",
        amount: 200,
        unit: "g",
        category: "Produce",
      },
      {
        id: "jg-3",
        name: "Gyoza Wrappers",
        amount: 40,
        unit: "wrappers",
        category: "Grain",
        substitutions: [
          { name: "Wonton Wrappers", note: "Slightly thinner but works in a pinch" },
        ],
      },
      {
        id: "jg-4",
        name: "Green Onions",
        amount: 4,
        unit: "stalks",
        category: "Aromatics",
      },
      {
        id: "jg-5",
        name: "Garlic",
        amount: 3,
        unit: "cloves",
        category: "Aromatics",
      },
      {
        id: "jg-6",
        name: "Ginger",
        amount: 1,
        unit: "inch",
        category: "Aromatics",
      },
      {
        id: "jg-7",
        name: "Soy Sauce",
        amount: 1,
        unit: "tbsp",
        category: "Sauce",
      },
      {
        id: "jg-8",
        name: "Sesame Oil",
        amount: 1,
        unit: "tsp",
        category: "Oil",
      },
      {
        id: "jg-9",
        name: "Rice Vinegar",
        amount: 3,
        unit: "tbsp",
        category: "Acid",
      },
      {
        id: "jg-10",
        name: "Vegetable Oil",
        amount: 2,
        unit: "tbsp",
        category: "Oil",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Finely mince napa cabbage, sprinkle with salt, and let sit for 10 minutes. Squeeze out all excess water thoroughly.",
        duration: 660,
        tip: "Getting the cabbage bone-dry prevents soggy gyoza. Wring it in a clean towel.",
      },
      {
        number: 2,
        instruction:
          "Combine pork, drained cabbage, minced garlic, grated ginger, green onions, soy sauce, and sesame oil. Mix in one direction until the filling is sticky and cohesive.",
        duration: 300,
      },
      {
        number: 3,
        instruction:
          "Place a heaping teaspoon of filling in the center of each wrapper. Wet the edges, fold in half, and pleat one side to seal.",
        duration: 900,
        tip: "Five to seven pleats per gyoza is the sweet spot. Don't overfill or they'll burst.",
      },
      {
        number: 4,
        instruction:
          "Heat oil in a non-stick skillet over medium-high. Place gyoza flat-side down in a tight circle. Fry until the bottoms are golden brown.",
        duration: 180,
      },
      {
        number: 5,
        instruction:
          "Add 80ml of water to the pan and immediately cover. Steam until the water has completely evaporated and the wrappers are translucent.",
        duration: 300,
        tip: "Don't peek—lifting the lid releases steam and extends cooking time.",
      },
      {
        number: 6,
        instruction:
          "Remove lid, let the bottoms crisp up for another minute. Flip onto a plate so the crispy side faces up. Serve with soy-vinegar dipping sauce.",
        duration: 60,
      },
    ],
    nutrition: {
      calories: 380,
      protein: 22,
      carbs: 36,
      fat: 16,
      fiber: 2,
    },
    tasteProfile: {
      spicy: 10,
      sweet: 10,
      salty: 40,
      sour: 20,
      umami: 65,
      rich: 50,
    },
    pairings: ["Miso Soup", "Chili Oil", "Japanese Beer"],
    stats: {
      timesCookedToday: 543,
      averageRating: 4.7,
      totalRatings: 4210,
      trendScore: 62,
    },
    tasteModifications: {
      spicy: [
        "Add la-yu (Japanese chili oil) to the dipping sauce",
        "Mix in finely minced fresh chili to the filling",
      ],
      sweet: [
        "Add a teaspoon of mirin to the filling mixture",
        "Include a pinch of sugar in the dipping sauce",
      ],
      salty: [
        "Increase soy sauce in the filling to 2 tablespoons",
        "Serve with extra soy sauce on the side",
      ],
      sour: [
        "Increase rice vinegar in the dipping sauce",
        "Add a squeeze of yuzu juice to the dip",
      ],
      umami: [
        "Add a teaspoon of dashi powder to the filling",
        "Mix in finely chopped dried shiitake mushrooms",
      ],
      rich: [
        "Use fattier ground pork (80/20) for juicier filling",
        "Add a splash of sesame oil to the dipping sauce",
      ],
    },
    troubleshooting: {
      3: [
        {
          problem: "Wrappers are tearing when folding",
          solution:
            "Don't overfill. Use less filling and ensure edges are moistened but not soaking wet.",
        },
      ],
      5: [
        {
          problem: "Gyoza are sticking to the pan and tearing",
          solution:
            "Use a well-seasoned non-stick pan. Ensure the oil is hot before placing gyoza, and don't move them until crispy.",
        },
        {
          problem: "Wrappers are gummy after steaming",
          solution:
            "After steaming, remove the lid and let the water fully evaporate. Fry for an extra minute to re-crisp the bottom.",
        },
      ],
    },
  },
  {
    id: "rec_010",
    slug: "classic-smash-burger",
    title: "Classic Smash Burger",
    description:
      "Thin, lacy-edged beef patties with maximum crust, melted American cheese, pickles, and special sauce on a soft bun.",
    cuisine: "American",
    difficulty: "easy",
    prepTime: 10,
    cookTime: 10,
    servings: 4,
    rating: 4.8,
    trending: true,
    trendChange: 15,
    cardHeight: 360,
    heroImage:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    creator,
    ingredients: [
      {
        id: "sb-1",
        name: "Ground Beef (80/20)",
        amount: 500,
        unit: "g",
        category: "Protein",
        substitutions: [
          { name: "Ground Turkey", note: "Leaner; add a tablespoon of butter to the ball before smashing" },
        ],
      },
      {
        id: "sb-2",
        name: "American Cheese",
        amount: 8,
        unit: "slices",
        category: "Cheese",
        substitutions: [
          { name: "Cheddar", note: "Sharper flavor, doesn't melt as smoothly" },
          { name: "Swiss", note: "Nuttier flavor, great for a different twist" },
        ],
      },
      {
        id: "sb-3",
        name: "Brioche Buns",
        amount: 4,
        unit: "whole",
        category: "Bread",
      },
      {
        id: "sb-4",
        name: "Dill Pickles",
        amount: 12,
        unit: "slices",
        category: "Condiment",
      },
      {
        id: "sb-5",
        name: "Mayonnaise",
        amount: 3,
        unit: "tbsp",
        category: "Condiment",
      },
      {
        id: "sb-6",
        name: "Ketchup",
        amount: 2,
        unit: "tbsp",
        category: "Condiment",
      },
      {
        id: "sb-7",
        name: "Yellow Mustard",
        amount: 1,
        unit: "tbsp",
        category: "Condiment",
      },
      {
        id: "sb-8",
        name: "Onion",
        amount: 1,
        unit: "small",
        category: "Aromatics",
      },
      {
        id: "sb-9",
        name: "Salt",
        amount: 1,
        unit: "tsp",
        category: "Seasoning",
      },
      {
        id: "sb-10",
        name: "Black Pepper",
        amount: 0.5,
        unit: "tsp",
        category: "Seasoning",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Divide beef into 8 equal balls (about 60g each). Do not season or overwork the meat. Keep loosely packed.",
        duration: 120,
        tip: "Handle the meat as little as possible—overworking makes tough burgers.",
      },
      {
        number: 2,
        instruction:
          "Heat a cast iron skillet or flat griddle over the highest heat until smoking. Season one side of each ball with salt and pepper.",
        duration: 180,
      },
      {
        number: 3,
        instruction:
          "Place a ball seasoned-side down on the griddle. Immediately smash flat with a sturdy spatula or press. Season the top. Cook without moving until edges are deeply browned and crispy.",
        duration: 120,
        tip: "Smash once and only once—pressing again squeezes out the juices.",
      },
      {
        number: 4,
        instruction:
          "Flip the patty, immediately add a slice of American cheese, and cook for 30 more seconds.",
        duration: 30,
      },
      {
        number: 5,
        instruction:
          "Mix mayo, ketchup, and mustard for the special sauce. Toast the buns on the griddle.",
        duration: 60,
      },
      {
        number: 6,
        instruction:
          "Stack two patties per bun. Add pickles, thinly sliced onion, and special sauce. Serve immediately.",
      },
    ],
    nutrition: {
      calories: 580,
      protein: 34,
      carbs: 32,
      fat: 36,
      fiber: 1,
    },
    tasteProfile: {
      spicy: 5,
      sweet: 15,
      salty: 50,
      sour: 20,
      umami: 70,
      rich: 80,
    },
    pairings: ["Crispy French Fries", "Milkshake", "Coleslaw"],
    stats: {
      timesCookedToday: 1567,
      averageRating: 4.8,
      totalRatings: 9850,
      trendScore: 96,
    },
    tasteModifications: {
      spicy: [
        "Add sliced jalapeños under the cheese",
        "Mix hot sauce into the special sauce",
      ],
      sweet: [
        "Add caramelized onions on top of the cheese",
        "Use a brioche bun brushed with honey butter",
      ],
      salty: [
        "Use extra pickle slices for briny salt",
        "Season more aggressively with coarse salt before smashing",
      ],
      sour: [
        "Add extra pickles or use bread-and-butter pickles",
        "Top with pickled onions instead of raw",
      ],
      umami: [
        "Add a dash of Worcestershire sauce to the beef before forming balls",
        "Spread a thin layer of miso mayo on the bun",
      ],
      rich: [
        "Add a slice of crispy bacon to each burger",
        "Use a 75/25 beef blend for more fat and flavor",
      ],
    },
    troubleshooting: {
      3: [
        {
          problem: "Patty is shrinking and puffing up",
          solution:
            "You didn't smash it thin enough. Press harder and flatter right after placing on the griddle.",
        },
        {
          problem: "Patty is sticking to the spatula when smashing",
          solution:
            "Place a small piece of parchment paper between the spatula and the meat ball before smashing.",
        },
      ],
      4: [
        {
          problem: "Cheese isn't melting fast enough",
          solution:
            "Add a tiny splash of water to the griddle and cover with a dome or bowl to steam-melt the cheese.",
        },
      ],
    },
  },
  {
    id: "rec_011",
    slug: "pad-thai",
    title: "Pad Thai",
    description:
      "Wok-charred rice noodles tossed with shrimp, egg, bean sprouts, and a perfectly balanced tamarind sauce.",
    cuisine: "Thai",
    difficulty: "medium",
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    rating: 4.6,
    trending: false,
    trendChange: 0,
    cardHeight: 380,
    heroImage:
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80",
    creator,
    ingredients: [
      {
        id: "pt-1",
        name: "Rice Noodles (flat)",
        amount: 200,
        unit: "g",
        category: "Noodle",
      },
      {
        id: "pt-2",
        name: "Shrimp",
        amount: 200,
        unit: "g",
        category: "Protein",
        substitutions: [
          { name: "Chicken Breast", note: "Slice thin for quick cooking" },
          { name: "Firm Tofu", note: "Press, cube, and fry until golden first" },
        ],
      },
      {
        id: "pt-3",
        name: "Tamarind Paste",
        amount: 3,
        unit: "tbsp",
        category: "Sauce",
        substitutions: [
          { name: "Lime Juice + Brown Sugar", note: "2 tbsp lime juice + 1 tbsp brown sugar as a rough substitute" },
        ],
      },
      {
        id: "pt-4",
        name: "Fish Sauce",
        amount: 3,
        unit: "tbsp",
        category: "Sauce",
      },
      {
        id: "pt-5",
        name: "Palm Sugar",
        amount: 2,
        unit: "tbsp",
        category: "Sweetener",
        substitutions: [
          { name: "Brown Sugar", note: "More accessible; slightly different flavor" },
        ],
      },
      {
        id: "pt-6",
        name: "Eggs",
        amount: 2,
        unit: "large",
        category: "Protein",
      },
      {
        id: "pt-7",
        name: "Bean Sprouts",
        amount: 100,
        unit: "g",
        category: "Produce",
      },
      {
        id: "pt-8",
        name: "Garlic",
        amount: 3,
        unit: "cloves",
        category: "Aromatics",
      },
      {
        id: "pt-9",
        name: "Roasted Peanuts",
        amount: 3,
        unit: "tbsp",
        category: "Garnish",
      },
      {
        id: "pt-10",
        name: "Green Onions",
        amount: 3,
        unit: "stalks",
        category: "Produce",
      },
      {
        id: "pt-11",
        name: "Lime",
        amount: 1,
        unit: "whole",
        category: "Citrus",
      },
      {
        id: "pt-12",
        name: "Vegetable Oil",
        amount: 3,
        unit: "tbsp",
        category: "Oil",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Soak rice noodles in room temperature water for 30 minutes until pliable but still firm. Drain well.",
        duration: 1800,
        tip: "Don't use hot water—it'll make the noodles mushy. They should bend without snapping.",
      },
      {
        number: 2,
        instruction:
          "Mix tamarind paste, fish sauce, and palm sugar in a small bowl until the sugar dissolves. Set the pad thai sauce aside.",
        duration: 60,
      },
      {
        number: 3,
        instruction:
          "Heat a wok over the highest heat. Add oil, then cook shrimp until just pink. Push to the side, crack eggs in, and scramble.",
        duration: 120,
      },
      {
        number: 4,
        instruction:
          "Add drained noodles and the pad thai sauce. Toss constantly, lifting and folding the noodles to coat evenly and develop wok char.",
        duration: 180,
        tip: "Don't stir—toss and flip to get that smoky wok hei flavor.",
      },
      {
        number: 5,
        instruction:
          "Add bean sprouts and green onions. Toss for 30 seconds until just warmed through.",
        duration: 30,
      },
      {
        number: 6,
        instruction:
          "Plate and top with crushed roasted peanuts, extra bean sprouts, and a lime wedge.",
      },
    ],
    nutrition: {
      calories: 510,
      protein: 28,
      carbs: 62,
      fat: 18,
      fiber: 3,
    },
    tasteProfile: {
      spicy: 15,
      sweet: 40,
      salty: 45,
      sour: 35,
      umami: 55,
      rich: 35,
    },
    pairings: ["Thai Iced Tea", "Prawn Crackers"],
    stats: {
      timesCookedToday: 721,
      averageRating: 4.6,
      totalRatings: 5430,
      trendScore: 65,
    },
    tasteModifications: {
      spicy: [
        "Add dried chili flakes when stir-frying the aromatics",
        "Serve with sliced bird's eye chilies in vinegar",
      ],
      sweet: [
        "Increase palm sugar to 3 tablespoons",
        "Add a drizzle of sweet chili sauce when serving",
      ],
      salty: [
        "Add an extra tablespoon of fish sauce",
        "Top with dried shrimp for salty crunch",
      ],
      sour: [
        "Increase tamarind paste and squeeze extra lime generously",
        "Serve with a wedge of lime and chili vinegar",
      ],
      umami: [
        "Add dried shrimp to the wok with the noodles",
        "Mix in a teaspoon of shrimp paste with the sauce",
      ],
      rich: [
        "Add a tablespoon of pork lard for wok cooking",
        "Toss in extra egg yolk with the scrambled egg",
      ],
    },
    troubleshooting: {
      1: [
        {
          problem: "Noodles are breaking apart during stir-frying",
          solution:
            "They were soaked too long. Noodles should be pliable but firm—slightly undersoaked is better than over.",
        },
      ],
      4: [
        {
          problem: "Noodles are clumping together in a sticky mass",
          solution:
            "Add a splash more sauce or water, and use tongs to lift and separate while tossing.",
        },
        {
          problem: "Dish tastes flat and one-dimensional",
          solution:
            "Balance is key—taste and adjust: more tamarind for sour, more sugar for sweet, more fish sauce for salt.",
        },
      ],
    },
  },
  {
    id: "rec_012",
    slug: "lamb-kofta-kebabs",
    title: "Lamb Kofta Kebabs",
    description:
      "Spiced ground lamb shaped onto skewers, grilled until charred, and served with creamy tahini sauce and warm pita.",
    cuisine: "Middle Eastern",
    difficulty: "medium",
    prepTime: 20,
    cookTime: 20,
    servings: 4,
    rating: 4.5,
    trending: false,
    trendChange: 3,
    cardHeight: 420,
    heroImage:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80",
    creator,
    ingredients: [
      {
        id: "lk-1",
        name: "Ground Lamb",
        amount: 500,
        unit: "g",
        category: "Protein",
        substitutions: [
          { name: "Ground Beef", note: "Use 80/20 for similar fat content" },
          { name: "Ground Turkey", note: "Leaner, add olive oil and extra spices to compensate" },
        ],
      },
      {
        id: "lk-2",
        name: "Onion",
        amount: 1,
        unit: "small",
        category: "Aromatics",
      },
      {
        id: "lk-3",
        name: "Fresh Parsley",
        amount: 0.5,
        unit: "cup",
        category: "Herbs",
      },
      {
        id: "lk-4",
        name: "Cumin",
        amount: 2,
        unit: "tsp",
        category: "Spice",
      },
      {
        id: "lk-5",
        name: "Coriander",
        amount: 1,
        unit: "tsp",
        category: "Spice",
      },
      {
        id: "lk-6",
        name: "Cinnamon",
        amount: 0.5,
        unit: "tsp",
        category: "Spice",
      },
      {
        id: "lk-7",
        name: "Tahini",
        amount: 4,
        unit: "tbsp",
        category: "Sauce",
        substitutions: [
          { name: "Greek Yogurt", note: "Tangier alternative; mix with lemon and garlic" },
        ],
      },
      {
        id: "lk-8",
        name: "Lemon",
        amount: 2,
        unit: "whole",
        category: "Citrus",
      },
      {
        id: "lk-9",
        name: "Garlic",
        amount: 4,
        unit: "cloves",
        category: "Aromatics",
      },
      {
        id: "lk-10",
        name: "Pita Bread",
        amount: 4,
        unit: "whole",
        category: "Bread",
      },
      {
        id: "lk-11",
        name: "Salt",
        amount: 1,
        unit: "tsp",
        category: "Seasoning",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Grate the onion on a box grater and squeeze out all liquid. Combine with ground lamb, parsley, cumin, coriander, cinnamon, minced garlic, and salt. Mix until well combined.",
        duration: 300,
        tip: "Grating the onion instead of dicing ensures even distribution and a smoother texture.",
      },
      {
        number: 2,
        instruction:
          "Shape the mixture around flat metal skewers into long oval shapes, about 2cm thick. Refrigerate for 15 minutes to firm up.",
        duration: 900,
      },
      {
        number: 3,
        instruction:
          "Preheat grill or grill pan to high heat. Grill kofta for 4-5 minutes per side until charred and cooked through.",
        duration: 600,
        tip: "Oil the grill grates well to prevent sticking. Don't flip until grill marks form.",
      },
      {
        number: 4,
        instruction:
          "While kofta grills, make the tahini sauce: whisk tahini with lemon juice, a clove of minced garlic, and cold water until smooth and drizzly.",
        duration: 120,
      },
      {
        number: 5,
        instruction:
          "Warm the pita bread on the grill for 30 seconds per side.",
        duration: 60,
      },
      {
        number: 6,
        instruction:
          "Serve kofta on warm pita with tahini sauce, sliced tomatoes, pickled onions, and fresh herbs.",
      },
    ],
    nutrition: {
      calories: 450,
      protein: 32,
      carbs: 28,
      fat: 24,
      fiber: 3,
    },
    tasteProfile: {
      spicy: 25,
      sweet: 10,
      salty: 40,
      sour: 20,
      umami: 55,
      rich: 60,
    },
    pairings: ["Tabbouleh", "Hummus", "Grilled Vegetables"],
    stats: {
      timesCookedToday: 412,
      averageRating: 4.5,
      totalRatings: 3150,
      trendScore: 52,
    },
    tasteModifications: {
      spicy: [
        "Add a teaspoon of harissa paste to the lamb mixture",
        "Mix in red pepper flakes or Aleppo pepper",
      ],
      sweet: [
        "Add a pinch of cinnamon and allspice for warm sweetness",
        "Serve with a pomegranate molasses drizzle",
      ],
      salty: [
        "Increase salt in the meat mixture",
        "Serve with a side of brined olives",
      ],
      sour: [
        "Add more lemon juice to the tahini sauce",
        "Serve with a sumac onion salad",
      ],
      umami: [
        "Add a tablespoon of tomato paste to the meat mixture",
        "Serve with a side of baba ganoush",
      ],
      rich: [
        "Mix in a tablespoon of pine nuts for buttery texture",
        "Drizzle with extra virgin olive oil before serving",
      ],
    },
    troubleshooting: {
      2: [
        {
          problem: "Kofta are falling off the skewers",
          solution:
            "The mixture is too wet. Squeeze more liquid from the onion, and refrigerate longer so the fat firms up.",
        },
      ],
      3: [
        {
          problem: "Kofta are dry after grilling",
          solution:
            "Use fattier ground lamb (at least 20% fat). Don't overcook—remove when internal temp reaches 160°F.",
        },
        {
          problem: "Kofta are crumbling on the grill",
          solution:
            "The mixture wasn't mixed enough. Knead it more to develop the proteins, and make sure it's well chilled.",
        },
      ],
    },
  },
  {
    id: "rec_013",
    slug: "mushroom-risotto",
    title: "Mushroom Risotto",
    description:
      "Creamy Arborio rice slowly cooked with a medley of wild mushrooms, white wine, Parmesan, and finished with truffle oil.",
    cuisine: "Italian",
    difficulty: "hard",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    rating: 4.7,
    trending: false,
    trendChange: 1,
    cardHeight: 360,
    heroImage:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
    creator,
    ingredients: [
      {
        id: "mr-1",
        name: "Arborio Rice",
        amount: 300,
        unit: "g",
        category: "Grain",
        substitutions: [
          { name: "Carnaroli Rice", note: "Even better for risotto—holds its shape and stays creamy" },
        ],
      },
      {
        id: "mr-2",
        name: "Mixed Mushrooms",
        amount: 400,
        unit: "g",
        category: "Produce",
        substitutions: [
          { name: "Dried Porcini", note: "Use 30g dried, rehydrate and use the soaking liquid as stock" },
        ],
      },
      {
        id: "mr-3",
        name: "Chicken or Vegetable Stock",
        amount: 1,
        unit: "L",
        category: "Liquid",
      },
      {
        id: "mr-4",
        name: "Dry White Wine",
        amount: 150,
        unit: "ml",
        category: "Liquid",
        substitutions: [
          { name: "Dry Vermouth", note: "Works identically and keeps longer once opened" },
        ],
      },
      {
        id: "mr-5",
        name: "Parmesan Cheese",
        amount: 80,
        unit: "g",
        category: "Cheese",
      },
      {
        id: "mr-6",
        name: "Shallots",
        amount: 2,
        unit: "medium",
        category: "Aromatics",
      },
      {
        id: "mr-7",
        name: "Garlic",
        amount: 3,
        unit: "cloves",
        category: "Aromatics",
      },
      {
        id: "mr-8",
        name: "Butter",
        amount: 60,
        unit: "g",
        category: "Dairy",
      },
      {
        id: "mr-9",
        name: "Fresh Thyme",
        amount: 4,
        unit: "sprigs",
        category: "Herbs",
      },
      {
        id: "mr-10",
        name: "Truffle Oil",
        amount: 1,
        unit: "tsp",
        category: "Oil",
      },
      {
        id: "mr-11",
        name: "Olive Oil",
        amount: 2,
        unit: "tbsp",
        category: "Oil",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Heat stock in a saucepan and keep it at a gentle simmer. In a separate pan, sauté mushrooms in olive oil over high heat until golden and caramelized. Season and set aside.",
        duration: 480,
        tip: "Don't crowd the mushrooms—cook in batches so they sear instead of steam.",
      },
      {
        number: 2,
        instruction:
          "In a heavy-bottomed pan, melt half the butter. Sauté minced shallots until translucent, then add garlic and thyme.",
        duration: 240,
      },
      {
        number: 3,
        instruction:
          "Add Arborio rice and toast, stirring constantly, until the edges become translucent and the center stays white.",
        duration: 120,
        tip: "Toasting the rice creates a nutty flavor and helps it absorb liquid evenly.",
      },
      {
        number: 4,
        instruction:
          "Pour in the white wine and stir until fully absorbed. Begin adding warm stock one ladle at a time, stirring frequently and waiting until each addition is absorbed before adding the next.",
        duration: 1080,
        tip: "Patience is everything. Each ladle should be nearly absorbed before the next goes in.",
      },
      {
        number: 5,
        instruction:
          "When the rice is al dente and the risotto is creamy and flows like lava, remove from heat. Fold in remaining butter, grated Parmesan, and sautéed mushrooms.",
        duration: 60,
        tip: "This final step (mantecatura) is what makes risotto creamy. Beat it vigorously off heat.",
      },
      {
        number: 6,
        instruction:
          "Plate in warm bowls. Finish with a drizzle of truffle oil and extra Parmesan shavings.",
      },
    ],
    nutrition: {
      calories: 480,
      protein: 16,
      carbs: 58,
      fat: 20,
      fiber: 3,
    },
    tasteProfile: {
      spicy: 5,
      sweet: 10,
      salty: 35,
      sour: 10,
      umami: 80,
      rich: 85,
    },
    pairings: ["Pinot Grigio", "Arugula Salad", "Crusty Bread"],
    stats: {
      timesCookedToday: 356,
      averageRating: 4.7,
      totalRatings: 4780,
      trendScore: 58,
    },
    tasteModifications: {
      spicy: [
        "Add a pinch of white pepper at the end",
        "Include finely minced fresh chili with the shallots",
      ],
      sweet: [
        "Caramelize the shallots longer before adding rice",
        "Add a splash of Marsala wine instead of dry white",
      ],
      salty: [
        "Use Pecorino instead of Parmesan for a saltier punch",
        "Add a few anchovy fillets melted into the butter base",
      ],
      sour: [
        "Add a squeeze of lemon after plating",
        "Stir in a teaspoon of white wine vinegar at the end",
      ],
      umami: [
        "Add dried porcini soaking liquid to the stock",
        "Stir in a teaspoon of white miso paste",
      ],
      rich: [
        "Increase butter in the mantecatura step",
        "Add a spoonful of mascarpone at the end",
      ],
    },
    troubleshooting: {
      4: [
        {
          problem: "Risotto is gluey and stodgy",
          solution:
            "You stirred too aggressively or added too much stock at once. Stir gently and add stock gradually.",
        },
        {
          problem: "Rice is crunchy in the center",
          solution:
            "Keep adding stock and cooking—the rice needs more time. It can take 18-22 minutes total.",
        },
      ],
      5: [
        {
          problem: "Risotto seized up and became thick when cheese was added",
          solution:
            "It was too hot. Let it cool slightly off heat before adding cheese and butter, and add a splash of stock to loosen.",
        },
      ],
    },
  },
  {
    id: "rec_014",
    slug: "chicken-shawarma-bowl",
    title: "Chicken Shawarma Bowl",
    description:
      "Warm spiced chicken carved over fluffy rice with pickled vegetables, hummus, garlic sauce, and fresh herbs.",
    cuisine: "Middle Eastern",
    difficulty: "easy",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    rating: 4.6,
    trending: false,
    trendChange: 6,
    cardHeight: 380,
    heroImage:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80",
    creator,
    ingredients: [
      {
        id: "cs-1",
        name: "Chicken Thighs (boneless)",
        amount: 700,
        unit: "g",
        category: "Protein",
        substitutions: [
          { name: "Chicken Breast", note: "Drier, so don't overcook; slice thin" },
          { name: "Cauliflower Steaks", note: "Roast at high heat with same spice blend for vegan version" },
        ],
      },
      {
        id: "cs-2",
        name: "Cumin",
        amount: 2,
        unit: "tsp",
        category: "Spice",
      },
      {
        id: "cs-3",
        name: "Turmeric",
        amount: 1,
        unit: "tsp",
        category: "Spice",
      },
      {
        id: "cs-4",
        name: "Paprika",
        amount: 2,
        unit: "tsp",
        category: "Spice",
      },
      {
        id: "cs-5",
        name: "Cinnamon",
        amount: 0.5,
        unit: "tsp",
        category: "Spice",
      },
      {
        id: "cs-6",
        name: "Greek Yogurt",
        amount: 100,
        unit: "ml",
        category: "Dairy",
        substitutions: [
          { name: "Coconut Yogurt", note: "Dairy-free option, works well for the marinade" },
        ],
      },
      {
        id: "cs-7",
        name: "Lemon",
        amount: 2,
        unit: "whole",
        category: "Citrus",
      },
      {
        id: "cs-8",
        name: "Garlic",
        amount: 5,
        unit: "cloves",
        category: "Aromatics",
      },
      {
        id: "cs-9",
        name: "Basmati Rice",
        amount: 300,
        unit: "g",
        category: "Grain",
      },
      {
        id: "cs-10",
        name: "Hummus",
        amount: 200,
        unit: "g",
        category: "Sauce",
      },
      {
        id: "cs-11",
        name: "Cucumber",
        amount: 1,
        unit: "whole",
        category: "Produce",
      },
      {
        id: "cs-12",
        name: "Cherry Tomatoes",
        amount: 150,
        unit: "g",
        category: "Produce",
      },
      {
        id: "cs-13",
        name: "Olive Oil",
        amount: 3,
        unit: "tbsp",
        category: "Oil",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Marinate chicken thighs in yogurt, lemon juice, olive oil, cumin, turmeric, paprika, cinnamon, minced garlic, and salt for at least 20 minutes.",
        duration: 1200,
        tip: "Flatten the thighs to even thickness so they cook evenly and quickly.",
      },
      {
        number: 2,
        instruction:
          "Cook basmati rice according to package directions. Fluff with a fork and season with a squeeze of lemon and a drizzle of olive oil.",
        duration: 720,
      },
      {
        number: 3,
        instruction:
          "Heat a cast iron skillet or grill pan over high heat. Cook marinated chicken 5-6 minutes per side until charred and cooked through. Rest for 3 minutes, then slice thin.",
        duration: 720,
        tip: "Don't move the chicken once it's down—let it develop a deep crust.",
      },
      {
        number: 4,
        instruction:
          "Prepare the garlic sauce: blend remaining garlic, lemon juice, olive oil, and a pinch of salt until smooth.",
        duration: 120,
      },
      {
        number: 5,
        instruction:
          "Dice cucumber and halve cherry tomatoes. Toss with a little olive oil, salt, and lemon juice.",
        duration: 120,
      },
      {
        number: 6,
        instruction:
          "Assemble bowls: rice on the bottom, sliced shawarma chicken on top, hummus, fresh vegetables, pickled onions, and drizzle with garlic sauce.",
      },
    ],
    nutrition: {
      calories: 520,
      protein: 38,
      carbs: 48,
      fat: 20,
      fiber: 5,
    },
    tasteProfile: {
      spicy: 20,
      sweet: 10,
      salty: 35,
      sour: 30,
      umami: 45,
      rich: 50,
    },
    pairings: ["Pita Bread", "Pickled Turnips", "Mint Tea"],
    stats: {
      timesCookedToday: 678,
      averageRating: 4.6,
      totalRatings: 4980,
      trendScore: 68,
    },
    tasteModifications: {
      spicy: [
        "Add cayenne pepper to the marinade",
        "Drizzle with a garlic-chili sauce",
      ],
      sweet: [
        "Add pomegranate seeds as a topping",
        "Drizzle pomegranate molasses over the bowl",
      ],
      salty: [
        "Add crumbled feta cheese on top",
        "Include Kalamata olives in the bowl",
      ],
      sour: [
        "Add quick-pickled red onions",
        "Squeeze extra lemon over everything before eating",
      ],
      umami: [
        "Add roasted cherry tomatoes for concentrated flavor",
        "Drizzle with tahini mixed with soy sauce",
      ],
      rich: [
        "Top with a drizzle of extra virgin olive oil",
        "Add avocado slices to the bowl",
      ],
    },
    troubleshooting: {
      1: [
        {
          problem: "Chicken is bland despite marinating",
          solution:
            "Marinate longer (at least 2 hours, or overnight). Score the chicken before marinating to help flavors penetrate.",
        },
      ],
      3: [
        {
          problem: "Chicken is burning on the outside but raw inside",
          solution:
            "Lower the heat to medium-high. Flatten the thighs evenly. The yogurt marinade contains sugar that can char quickly.",
        },
        {
          problem: "Chicken is tough and chewy",
          solution:
            "Use thighs not breast, don't overcook (165°F internal), and always let it rest before slicing.",
        },
      ],
    },
  },
  {
    id: "rec_015",
    slug: "miso-ramen",
    title: "Miso Ramen",
    description:
      "Rich, deeply savory miso-based broth with fresh ramen noodles, chashu pork, soft-boiled egg, and all the fixings.",
    cuisine: "Japanese",
    difficulty: "hard",
    prepTime: 20,
    cookTime: 40,
    servings: 4,
    rating: 4.9,
    trending: false,
    trendChange: 7,
    cardHeight: 420,
    heroImage:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80",
    creator,
    ingredients: [
      {
        id: "mr2-1",
        name: "Fresh Ramen Noodles",
        amount: 400,
        unit: "g",
        category: "Noodle",
        substitutions: [
          { name: "Dried Ramen Noodles", note: "Fresh is far superior, but dried works—cook per package" },
        ],
      },
      {
        id: "mr2-2",
        name: "White Miso Paste",
        amount: 5,
        unit: "tbsp",
        category: "Sauce",
        substitutions: [
          { name: "Red Miso", note: "Stronger and more intense—use 3 tbsp instead" },
        ],
      },
      {
        id: "mr2-3",
        name: "Chicken Stock",
        amount: 1.5,
        unit: "L",
        category: "Liquid",
      },
      {
        id: "mr2-4",
        name: "Pork Belly",
        amount: 500,
        unit: "g",
        category: "Protein",
        substitutions: [
          { name: "Pork Shoulder", note: "Leaner but still braises well for chashu" },
        ],
      },
      {
        id: "mr2-5",
        name: "Eggs",
        amount: 4,
        unit: "large",
        category: "Protein",
      },
      {
        id: "mr2-6",
        name: "Soy Sauce",
        amount: 3,
        unit: "tbsp",
        category: "Sauce",
      },
      {
        id: "mr2-7",
        name: "Mirin",
        amount: 2,
        unit: "tbsp",
        category: "Sauce",
      },
      {
        id: "mr2-8",
        name: "Sake",
        amount: 2,
        unit: "tbsp",
        category: "Sauce",
      },
      {
        id: "mr2-9",
        name: "Sesame Oil",
        amount: 1,
        unit: "tbsp",
        category: "Oil",
      },
      {
        id: "mr2-10",
        name: "Garlic",
        amount: 6,
        unit: "cloves",
        category: "Aromatics",
      },
      {
        id: "mr2-11",
        name: "Ginger",
        amount: 3,
        unit: "inches",
        category: "Aromatics",
      },
      {
        id: "mr2-12",
        name: "Green Onions",
        amount: 4,
        unit: "stalks",
        category: "Produce",
      },
      {
        id: "mr2-13",
        name: "Corn Kernels",
        amount: 100,
        unit: "g",
        category: "Produce",
      },
      {
        id: "mr2-14",
        name: "Nori Sheets",
        amount: 4,
        unit: "sheets",
        category: "Garnish",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Roll the pork belly tightly and tie with kitchen twine. Sear all sides in a hot pan until deeply browned.",
        duration: 300,
        tip: "A tight roll ensures even cooking and beautiful spiral slices.",
      },
      {
        number: 2,
        instruction:
          "Braise the pork belly in a mixture of soy sauce, mirin, sake, and water. Simmer covered for 1.5 hours until tender. Slice into rounds when cool enough to handle.",
        duration: 5400,
        tip: "Save the braising liquid—it's your tare (seasoning base) for the ramen.",
      },
      {
        number: 3,
        instruction:
          "Soft-boil eggs for 6 minutes 30 seconds. Transfer to ice water, peel, and marinate in leftover chashu braising liquid for at least 30 minutes.",
        duration: 2190,
      },
      {
        number: 4,
        instruction:
          "Sauté minced garlic and grated ginger in sesame oil until fragrant. Add chicken stock and bring to a simmer.",
        duration: 300,
      },
      {
        number: 5,
        instruction:
          "Dissolve miso paste into the broth by pushing it through a strainer with a ladle. Do not boil after adding miso.",
        duration: 120,
        tip: "Boiling kills the miso's live cultures and dulls its flavor. Keep it at a gentle simmer.",
      },
      {
        number: 6,
        instruction:
          "Cook ramen noodles in a separate pot of boiling water per package directions. Drain and divide among bowls.",
        duration: 180,
      },
      {
        number: 7,
        instruction:
          "Ladle hot miso broth over the noodles. Top with sliced chashu, halved marinated egg, corn, sliced green onions, and a sheet of nori.",
      },
    ],
    nutrition: {
      calories: 680,
      protein: 42,
      carbs: 54,
      fat: 34,
      fiber: 4,
    },
    tasteProfile: {
      spicy: 10,
      sweet: 15,
      salty: 50,
      sour: 5,
      umami: 90,
      rich: 85,
    },
    pairings: ["Japanese Beer", "Gyoza", "Edamame"],
    stats: {
      timesCookedToday: 489,
      averageRating: 4.9,
      totalRatings: 6120,
      trendScore: 75,
    },
    tasteModifications: {
      spicy: [
        "Add a tablespoon of chili bean paste (tobanjan) to the broth",
        "Top with la-yu (chili sesame oil) and togarashi",
      ],
      sweet: [
        "Add an extra tablespoon of mirin to the broth",
        "Include sweet corn as a topping",
      ],
      salty: [
        "Add extra soy sauce or chashu braising liquid to the broth",
        "Top with mentaiko (seasoned pollock roe)",
      ],
      sour: [
        "Add a splash of rice vinegar to each bowl",
        "Serve with pickled ginger on the side",
      ],
      umami: [
        "Add a piece of kombu to the stock while simmering",
        "Stir in a teaspoon of dried bonito powder",
      ],
      rich: [
        "Float a tablespoon of rendered pork fat on the broth surface",
        "Add a pat of butter to each bowl (Sapporo-style)",
      ],
    },
    troubleshooting: {
      2: [
        {
          problem: "Chashu is tough and chewy",
          solution:
            "It needs more time. Continue braising until a chopstick slides through with no resistance.",
        },
        {
          problem: "Chashu is falling apart when slicing",
          solution:
            "Let it cool completely in the braising liquid before slicing. Refrigerating overnight makes slicing easiest.",
        },
      ],
      5: [
        {
          problem: "Broth tastes flat despite adding miso",
          solution:
            "Add more tare (braising liquid), a splash of soy sauce, and taste again. The broth needs layers of seasoning.",
        },
      ],
    },
  },
];
