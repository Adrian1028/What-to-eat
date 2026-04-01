import Link from "next/link";
import { ArrowLeft, Utensils, Brain, Heart, Clock, Flame, Leaf, Globe2, Users, Lightbulb } from "lucide-react";

export const metadata = {
  title: "Food Tips & Dining Guide | What to eat tonight?",
  description: "Discover food tips, dining etiquette, nutrition facts, and cuisine guides to help you make better meal decisions every day.",
};

const ARTICLES = [
  {
    icon: <Brain className="w-6 h-6 text-yellow-500" />,
    title: "The Psychology Behind Decision Fatigue",
    body: "Every day, the average person makes over 35,000 decisions — and about 200 of them are about food alone. This phenomenon, known as \"decision fatigue,\" was first studied by social psychologist Roy F. Baumeister. When our mental energy is depleted from making too many choices, we tend to either make impulsive decisions (ordering junk food) or avoid deciding altogether (skipping meals). The key insight? Reducing trivial decisions — like what to eat — frees up cognitive resources for the choices that truly matter. Tools like food roulettes work because they eliminate the mental burden of choosing, turning a stressful moment into a fun experience.",
  },
  {
    icon: <Heart className="w-6 h-6 text-yellow-500" />,
    title: "Building a Balanced Diet Across Cuisines",
    body: "A balanced diet doesn't mean eating the same \"healthy\" meals every day. In fact, variety is one of the most important principles of nutrition. Different cuisines naturally emphasize different nutrient profiles: Japanese cuisine is rich in omega-3 fatty acids from fish; Indian food provides anti-inflammatory benefits from turmeric and spices; Mediterranean/Italian cooking emphasizes heart-healthy olive oil and fresh vegetables; Korean fermented foods like kimchi are excellent for gut health. By rotating through different cuisine types — which our roulette naturally encourages — you're more likely to achieve nutritional diversity without even trying.",
  },
  {
    icon: <Clock className="w-6 h-6 text-yellow-500" />,
    title: "The Science of Meal Timing",
    body: "When you eat can be just as important as what you eat. Research in chrononutrition suggests that our bodies process food differently depending on the time of day. Breakfast should ideally be consumed within 1-2 hours of waking, providing complex carbohydrates and protein to fuel your morning. Lunch, your largest meal, is best between 12:00-13:00 when digestive enzymes are most active. Dinner should be lighter and consumed at least 2-3 hours before bed to allow proper digestion. Late-night snacking isn't inherently bad — but heavy, greasy foods before sleep can disrupt your circadian rhythm and sleep quality.",
  },
  {
    icon: <Flame className="w-6 h-6 text-yellow-500" />,
    title: "A World Tour of Cooking Methods",
    body: "Every cuisine has signature cooking techniques that define its flavors. Chinese wok cooking (爆炒) uses extremely high heat for mere seconds, creating the coveted \"wok hei\" (breath of the wok). Japanese cuisine emphasizes simplicity — sashimi showcases raw ingredients at their freshest, while tempura uses a light batter for a delicate crunch. Korean BBQ puts the cooking experience at the center of the meal, making dining interactive and social. Thai cuisine masters the balance of sweet, sour, salty, and spicy in every dish. French cuisine elevated slow cooking into an art form with techniques like braising and sous vide. Understanding these methods helps you appreciate each cuisine's unique philosophy.",
  },
  {
    icon: <Leaf className="w-6 h-6 text-yellow-500" />,
    title: "Sustainable Eating: Small Changes, Big Impact",
    body: "The food we choose has a significant environmental footprint. Beef production generates roughly 60 kg of CO₂ per kilogram of food, while chicken produces about 6 kg, and vegetables less than 2 kg. This doesn't mean you need to go fully vegetarian — even small shifts make a difference. Try \"Meatless Mondays\" by spinning the roulette until you land on a plant-friendly option. Choosing local cuisines reduces transportation emissions. Cooking at home (one of our roulette options!) typically generates less food waste than dining out. And when you do eat out, consider portion sizes — restaurant portions are often 2-3 times larger than recommended serving sizes.",
  },
  {
    icon: <Globe2 className="w-6 h-6 text-yellow-500" />,
    title: "Dining Etiquette Around the World",
    body: "Food is deeply cultural, and dining customs vary dramatically. In Japan, slurping noodles is not just acceptable — it's a compliment to the chef, indicating you're enjoying the food. In Italy, asking for parmesan cheese on seafood pasta is considered a culinary faux pas. In India, eating with your left hand is traditionally avoided as it's considered unclean. Korean BBQ has a specific grilling hierarchy — the youngest person at the table typically handles the grilling. In France, bread is placed directly on the table, not on a plate. Tipping customs also vary: 15-20% is expected in the US, while tipping in Japan can actually be considered rude. Understanding these nuances enriches your dining experience immensely.",
  },
  {
    icon: <Users className="w-6 h-6 text-yellow-500" />,
    title: "Group Dining: How to Make Everyone Happy",
    body: "Planning a group meal is one of the hardest coordination challenges in daily life. Here are proven strategies: First, narrow choices early — instead of asking \"Where should we eat?\" (infinite options), ask \"Hot pot or BBQ?\" (binary choice). Second, use elimination rounds — each person vetoes one option until you're left with a winner. Third, embrace the randomness — have everyone spin our food roulette once, and the most popular result wins. Fourth, consider dietary restrictions upfront — ask about allergies and preferences before suggesting restaurants. Finally, rotate the \"decider\" role — assign a different person each week to choose the restaurant, eliminating group debate entirely.",
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
    title: "Budget-Friendly Eating Tips",
    body: "Eating well doesn't require a big budget. Cooking at home is the single most effective way to save money — the average home-cooked meal costs $4-5, while restaurant meals average $15-25. When dining out, lunch specials and set menus often offer the same quality as dinner at 40-60% of the price. Many Asian cuisines — Vietnamese, Thai, Chinese — offer incredibly affordable and filling meals. Night markets and food courts provide variety at lower prices than sit-down restaurants. Apps and loyalty programs can save 10-20% on regular orders. And here's a pro tip: eating dinner slightly earlier (before 6 PM) often qualifies for \"early bird\" specials at many restaurants.",
  },
];

export default function TipsPage() {
  return (
    <div className="min-h-[100dvh] bg-gray-950 text-gray-50 flex flex-col">
      {/* 頂部導航 */}
      <nav className="w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-[60]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            What to eat tonight?
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-gray-400 hover:text-yellow-400 transition-colors">Home</Link>
            <Link href="/tips" className="text-yellow-400 font-medium">Food Tips</Link>
            <Link href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">About</Link>
            <Link href="/contact" className="hidden sm:block text-gray-400 hover:text-yellow-400 transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto w-full px-6 py-12 flex-1">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Roulette
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <Utensils className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Food Tips & Dining Guide
          </h1>
        </div>
        <p className="text-gray-400 mb-12 max-w-2xl">
          Explore our collection of food knowledge, dining tips, and cuisine guides. Whether you&apos;re a foodie or just someone trying to eat better, these articles will help you make more informed and enjoyable meal decisions.
        </p>

        <div className="space-y-10">
          {ARTICLES.map((article, i) => (
            <article key={i} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0 mt-1">{article.icon}</div>
                <h2 className="text-xl font-bold text-gray-200">{article.title}</h2>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">{article.body}</p>
            </article>
          ))}
        </div>
      </div>

      <footer className="w-full bg-gray-900 border-t border-gray-800 py-6 px-6">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/tips" className="text-yellow-400 font-medium">Food Tips</Link>
          <Link href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">About Us</Link>
          <Link href="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">Contact Us</Link>
          <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors">Privacy Policy</Link>
        </div>
        <p className="text-gray-600 text-xs text-center mt-4">&copy; {new Date().getFullYear()} What to eat tonight? All rights reserved.</p>
      </footer>
    </div>
  );
}
