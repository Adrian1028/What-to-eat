export interface FoodCategory {
  id: string;
  label: string;
  emoji: string;
  color: string;
  textColor: string;
  /** Higher weight = larger slice on the wheel */
  weight: number;
  /** Google Places keyword for BFF search */
  searchKeyword: string;
}

export const FOOD_CATEGORIES: FoodCategory[] = [
  {
    id: "steak",
    label: "牛排",
    emoji: "🥩",
    color: "#B91C1C",
    textColor: "#FFFFFF",
    weight: 1,
    searchKeyword: "steak",
  },
  {
    id: "hotpot",
    label: "火鍋",
    emoji: "🍲",
    color: "#DC2626",
    textColor: "#FFFFFF",
    weight: 1,
    searchKeyword: "hotpot",
  },
  {
    id: "chinese",
    label: "中餐",
    emoji: "🥢",
    color: "#D97706",
    textColor: "#FFFFFF",
    weight: 1,
    searchKeyword: "chinese restaurant",
  },
  {
    id: "western",
    label: "西餐",
    emoji: "🍝",
    color: "#059669",
    textColor: "#FFFFFF",
    weight: 1,
    searchKeyword: "western restaurant",
  },
  {
    id: "japanese",
    label: "日式",
    emoji: "🍣",
    color: "#2563EB",
    textColor: "#FFFFFF",
    weight: 1,
    searchKeyword: "japanese restaurant",
  },
  {
    id: "korean",
    label: "韓式",
    emoji: "🥘",
    color: "#7C3AED",
    textColor: "#FFFFFF",
    weight: 1,
    searchKeyword: "korean restaurant",
  },
  {
    id: "breakfast",
    label: "早午餐",
    emoji: "🥞",
    color: "#F59E0B",
    textColor: "#1F2937",
    weight: 1,
    searchKeyword: "brunch breakfast",
  },
  {
    id: "fastfood",
    label: "速食",
    emoji: "🍔",
    color: "#EA580C",
    textColor: "#FFFFFF",
    weight: 1,
    searchKeyword: "fast food",
  },
  {
    id: "seafood",
    label: "海鮮",
    emoji: "🦐",
    color: "#0891B2",
    textColor: "#FFFFFF",
    weight: 1,
    searchKeyword: "seafood",
  },
  {
    id: "cookhome",
    label: "自己煮",
    emoji: "🏠",
    color: "#65A30D",
    textColor: "#FFFFFF",
    weight: 1,
    searchKeyword: "",
  },
  {
    id: "thai",
    label: "泰式",
    emoji: "🍜",
    color: "#E11D48",
    textColor: "#FFFFFF",
    weight: 1,
    searchKeyword: "thai restaurant",
  },
  {
    id: "dessert",
    label: "甜點",
    emoji: "🍰",
    color: "#EC4899",
    textColor: "#FFFFFF",
    weight: 1,
    searchKeyword: "dessert cafe",
  },
];
