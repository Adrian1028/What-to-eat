"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Utensils, Brain, Heart, Clock, Flame, Leaf, Globe2, Users, Lightbulb, Globe } from "lucide-react";

type Locale = "zh" | "en";

const ARTICLES: Record<Locale, { title: string; body: string }[]> = {
  zh: [
    {
      title: "決策疲勞的心理學",
      body: "每個人每天平均要做超過 35,000 個決定，其中大約 200 個與食物有關。這種現象被稱為「決策疲勞」，最早由社會心理學家 Roy F. Baumeister 提出。當我們的心智能量因為做太多選擇而耗盡時，我們往往會做出衝動的決定（點垃圾食物）或完全逃避決定（乾脆不吃）。關鍵的啟示是什麼？減少瑣碎的決定——比如吃什麼——能釋放認知資源，讓我們專注在真正重要的選擇上。像美食輪盤這樣的工具之所以有效，是因為它消除了選擇的心理負擔，將壓力時刻轉變為有趣的體驗。",
    },
    {
      title: "跨料理的均衡飲食",
      body: "均衡飲食不代表每天吃一樣的「健康」餐點。事實上，多樣性是營養學最重要的原則之一。不同的料理自然強調不同的營養素：日式料理富含來自魚類的 Omega-3 脂肪酸；印度料理的薑黃和香料提供抗發炎效果；地中海/義式料理強調有益心臟健康的橄欖油和新鮮蔬菜；韓式發酵食品如泡菜對腸道健康極為有益。透過輪替不同的料理類型——這正是我們的輪盤自然鼓勵的方式——你更有可能在不刻意的情況下實現營養多樣性。",
    },
    {
      title: "用餐時間的科學",
      body: "「什麼時候吃」可能和「吃什麼」一樣重要。時間營養學的研究表明，我們的身體會根據一天中的不同時間，以不同方式處理食物。早餐理想上應在起床後 1-2 小時內食用，提供複合碳水化合物和蛋白質為早晨供能。午餐作為一天中最大的一餐，最佳時間是 12:00-13:00，此時消化酵素最為活躍。晚餐應該清淡，並在睡前至少 2-3 小時食用，以確保適當消化。深夜吃宵夜本身並不壞——但睡前吃油膩的食物會影響你的生理時鐘和睡眠品質。",
    },
    {
      title: "世界各地的烹飪方法巡禮",
      body: "每種料理都有定義其風味的標誌性烹飪技術。中式的爆炒使用極高的溫度在短短數秒內完成，創造出令人垂涎的「鑊氣」。日式料理強調簡約——生魚片展示最新鮮的原材料，天婦羅使用輕薄的麵衣呈現細緻的酥脆口感。韓式烤肉將烹飪體驗放在用餐的中心，使就餐變得互動且具有社交性。泰式料理掌握了每道菜中酸、甜、鹹、辣的完美平衡。法式料理將慢煮提升為藝術形式，如燉煮和舒肥法。了解這些方法有助於你欣賞每種料理獨特的飲食哲學。",
    },
    {
      title: "永續飲食：小改變，大影響",
      body: "我們選擇的食物對環境有重大影響。牛肉的生產每公斤食物大約產生 60 公斤的二氧化碳，雞肉約 6 公斤，蔬菜則不到 2 公斤。這不代表你需要完全吃素——即使是小的轉變也能產生影響。試試「無肉星期一」，轉動輪盤直到轉到素食友善的選項。選擇當地料理可以減少運輸排放。在家煮（我們輪盤上的選項之一！）通常比外食產生更少的食物浪費。而且當你外食時，注意份量——餐廳的份量往往是建議量的 2-3 倍。",
    },
    {
      title: "世界各地的用餐禮儀",
      body: "飲食與文化密不可分，用餐習俗差異極大。在日本，吃麵條時發出吸溜聲不僅可以接受——更是對廚師的讚美，表示你很享受這道菜。在義大利，在海鮮義大利麵上要求帕瑪森起司被視為美食大忌。在印度，傳統上避免用左手吃飯，因為這被認為是不潔的。韓式烤肉有特定的烤肉階層——桌上最年輕的人通常負責烤肉。在法國，麵包直接放在桌上，而不是放在盤子裡。小費習慣也各不相同：在美國，15-20% 是預期的，而在日本，給小費實際上可能被認為是粗魯的。了解這些細微差別能極大地豐富你的用餐體驗。",
    },
    {
      title: "聚餐的藝術：如何讓所有人都滿意",
      body: "規劃一次團體聚餐是日常生活中最困難的協調挑戰之一。以下是經過驗證的策略：首先，及早縮小選擇——不要問「我們去哪吃？」（無限選項），而是問「火鍋還是燒肉？」（二選一）。其次，使用淘汰制——每人淘汰一個選項，直到剩下最後贏家。第三，擁抱隨機性——讓每個人各轉一次我們的美食輪盤，出現最多的結果就是今天的答案。第四，提前考慮飲食限制——在建議餐廳之前先詢問過敏和偏好。最後，輪流擔任「決定者」——每週指定不同的人選餐廳，徹底消除團體爭論。",
    },
    {
      title: "省錢吃好的秘訣",
      body: "吃得好不一定要花大錢。在家煮是省錢最有效的方式——平均一餐家常菜的成本約 100-150 元，而餐廳用餐平均 300-600 元。外食時，午餐特惠和套餐通常以晚餐 40-60% 的價格提供同等品質。許多亞洲料理——越南、泰式、中式——提供經濟實惠且分量十足的餐點。夜市和美食街以比正式餐廳更低的價格提供多樣選擇。外送 App 的會員和集點活動可以節省 10-20% 的日常訂單費用。還有一個小秘訣：稍早一點吃晚餐（下午 6 點前）往往能享受許多餐廳的「早鳥優惠」。",
    },
  ],
  en: [
    {
      title: "The Psychology Behind Decision Fatigue",
      body: "Every day, the average person makes over 35,000 decisions — and about 200 of them are about food alone. This phenomenon, known as \"decision fatigue,\" was first studied by social psychologist Roy F. Baumeister. When our mental energy is depleted from making too many choices, we tend to either make impulsive decisions (ordering junk food) or avoid deciding altogether (skipping meals). The key insight? Reducing trivial decisions — like what to eat — frees up cognitive resources for the choices that truly matter. Tools like food roulettes work because they eliminate the mental burden of choosing, turning a stressful moment into a fun experience.",
    },
    {
      title: "Building a Balanced Diet Across Cuisines",
      body: "A balanced diet doesn't mean eating the same \"healthy\" meals every day. In fact, variety is one of the most important principles of nutrition. Different cuisines naturally emphasize different nutrient profiles: Japanese cuisine is rich in omega-3 fatty acids from fish; Indian food provides anti-inflammatory benefits from turmeric and spices; Mediterranean/Italian cooking emphasizes heart-healthy olive oil and fresh vegetables; Korean fermented foods like kimchi are excellent for gut health. By rotating through different cuisine types — which our roulette naturally encourages — you're more likely to achieve nutritional diversity without even trying.",
    },
    {
      title: "The Science of Meal Timing",
      body: "When you eat can be just as important as what you eat. Research in chrononutrition suggests that our bodies process food differently depending on the time of day. Breakfast should ideally be consumed within 1-2 hours of waking, providing complex carbohydrates and protein to fuel your morning. Lunch, your largest meal, is best between 12:00-13:00 when digestive enzymes are most active. Dinner should be lighter and consumed at least 2-3 hours before bed to allow proper digestion. Late-night snacking isn't inherently bad — but heavy, greasy foods before sleep can disrupt your circadian rhythm and sleep quality.",
    },
    {
      title: "A World Tour of Cooking Methods",
      body: "Every cuisine has signature cooking techniques that define its flavors. Chinese wok cooking uses extremely high heat for mere seconds, creating the coveted \"wok hei\" (breath of the wok). Japanese cuisine emphasizes simplicity — sashimi showcases raw ingredients at their freshest, while tempura uses a light batter for a delicate crunch. Korean BBQ puts the cooking experience at the center of the meal, making dining interactive and social. Thai cuisine masters the balance of sweet, sour, salty, and spicy in every dish. French cuisine elevated slow cooking into an art form with techniques like braising and sous vide.",
    },
    {
      title: "Sustainable Eating: Small Changes, Big Impact",
      body: "The food we choose has a significant environmental footprint. Beef production generates roughly 60 kg of CO₂ per kilogram of food, while chicken produces about 6 kg, and vegetables less than 2 kg. This doesn't mean you need to go fully vegetarian — even small shifts make a difference. Try \"Meatless Mondays\" by spinning the roulette until you land on a plant-friendly option. Choosing local cuisines reduces transportation emissions. Cooking at home (one of our roulette options!) typically generates less food waste than dining out.",
    },
    {
      title: "Dining Etiquette Around the World",
      body: "Food is deeply cultural, and dining customs vary dramatically. In Japan, slurping noodles is a compliment to the chef. In Italy, asking for parmesan on seafood pasta is a faux pas. In India, eating with your left hand is traditionally avoided. Korean BBQ has a grilling hierarchy — the youngest person typically handles the grilling. In France, bread is placed directly on the table. Tipping customs also vary: 15-20% is expected in the US, while tipping in Japan can be considered rude. Understanding these nuances enriches your dining experience immensely.",
    },
    {
      title: "Group Dining: How to Make Everyone Happy",
      body: "Planning a group meal is one of the hardest coordination challenges in daily life. Here are proven strategies: First, narrow choices early — instead of asking \"Where should we eat?\" ask \"Hot pot or BBQ?\" Second, use elimination rounds — each person vetoes one option until you're left with a winner. Third, embrace the randomness — have everyone spin our food roulette once, and the most popular result wins. Fourth, consider dietary restrictions upfront. Finally, rotate the \"decider\" role — assign a different person each week to choose the restaurant, eliminating group debate entirely.",
    },
    {
      title: "Budget-Friendly Eating Tips",
      body: "Eating well doesn't require a big budget. Cooking at home is the single most effective way to save money — the average home-cooked meal costs $4-5, while restaurant meals average $15-25. When dining out, lunch specials and set menus often offer the same quality as dinner at 40-60% of the price. Many Asian cuisines — Vietnamese, Thai, Chinese — offer incredibly affordable and filling meals. Night markets and food courts provide variety at lower prices. Apps and loyalty programs can save 10-20% on regular orders. Pro tip: eating dinner before 6 PM often qualifies for \"early bird\" specials.",
    },
  ],
};

const ICONS = [
  <Brain key="brain" className="w-6 h-6 text-yellow-500" />,
  <Heart key="heart" className="w-6 h-6 text-yellow-500" />,
  <Clock key="clock" className="w-6 h-6 text-yellow-500" />,
  <Flame key="flame" className="w-6 h-6 text-yellow-500" />,
  <Leaf key="leaf" className="w-6 h-6 text-yellow-500" />,
  <Globe2 key="globe" className="w-6 h-6 text-yellow-500" />,
  <Users key="users" className="w-6 h-6 text-yellow-500" />,
  <Lightbulb key="bulb" className="w-6 h-6 text-yellow-500" />,
];

const UI = {
  zh: {
    back: "返回輪盤",
    title: "美食秘笈與用餐指南",
    subtitle: "探索我們的美食知識、用餐技巧與料理指南。無論你是美食達人還是只想吃得更好的人，這些文章都能幫助你做出更明智、更愉快的用餐決定。",
    navHome: "首頁",
    navTips: "美食秘笈",
    navAbout: "關於我們",
    footerTips: "美食秘笈",
    footerAbout: "關於我們",
    footerPrivacy: "隱私權政策",
  },
  en: {
    back: "Back to Roulette",
    title: "Food Tips & Dining Guide",
    subtitle: "Explore our collection of food knowledge, dining tips, and cuisine guides. Whether you're a foodie or just someone trying to eat better, these articles will help you make more informed and enjoyable meal decisions.",
    navHome: "Home",
    navTips: "Food Tips",
    navAbout: "About",
    footerTips: "Food Tips",
    footerAbout: "About Us",
    footerPrivacy: "Privacy Policy",
  },
};

export default function TipsPage() {
  const [locale, setLocale] = useState<Locale>("zh");
  const t = UI[locale];
  const articles = ARTICLES[locale];

  return (
    <div className="min-h-[100dvh] bg-gray-950 text-gray-50 flex flex-col">
      {/* 導航列 */}
      <nav className="w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-[60]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            What to eat tonight?
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="hidden sm:block text-sm text-gray-400 hover:text-yellow-400 transition-colors">{t.navHome}</Link>
            <Link href="/tips" className="hidden sm:block text-sm text-yellow-400 font-medium">{t.navTips}</Link>
            <Link href="/about" className="hidden sm:block text-sm text-gray-400 hover:text-yellow-400 transition-colors">{t.navAbout}</Link>
            <button
              onClick={() => setLocale(prev => prev === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600 text-sm text-gray-300 hover:text-white transition-all"
              aria-label="Switch language"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{locale === 'zh' ? 'EN' : '中文'}</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto w-full px-6 py-12 flex-1">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> {t.back}
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <Utensils className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            {t.title}
          </h1>
        </div>
        <p className="text-gray-400 mb-12 max-w-2xl">{t.subtitle}</p>

        <div className="space-y-10">
          {articles.map((article, i) => (
            <article key={i} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0 mt-1">{ICONS[i]}</div>
                <h2 className="text-xl font-bold text-gray-200">{article.title}</h2>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">{article.body}</p>
            </article>
          ))}
        </div>
      </div>

      <footer className="w-full bg-gray-900 border-t border-gray-800 py-6 px-6">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/tips" className="text-yellow-400 font-medium">{t.footerTips}</Link>
          <Link href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">{t.footerAbout}</Link>
          <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors">{t.footerPrivacy}</Link>
        </div>
        <p className="text-gray-600 text-xs text-center mt-4">&copy; {new Date().getFullYear()} What to eat tonight? All rights reserved.</p>
      </footer>
    </div>
  );
}
