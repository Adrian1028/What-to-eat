"use client";

import { useState } from "react";
import Link from "next/link";
import { Utensils, ArrowLeft, Globe } from "lucide-react";

type Locale = "zh" | "en";

const TEXT = {
  zh: {
    back: "返回輪盤",
    title: "關於我們",
    intro: "What to eat tonight? 誕生於一個簡單而普遍的困擾——每天都在煩惱要吃什麼。我們相信，選擇下一餐應該是有趣的，而不是令人焦慮的。",
    missionTitle: "我們的使命",
    missionBody: "我們的使命是消除圍繞食物的決策疲勞，將「今天吃什麼？」這個無聊的問題變成一場刺激的遊戲體驗。只需旋轉一次我們的互動式輪盤，就能隨機獲得一個食物類型建議，並一鍵導航到 Google Maps 尋找附近最棒的餐廳。",
    howTitle: "如何運作",
    howBody: "我們的物理模擬輪盤涵蓋了 20 種熱門料理類型——從火鍋、牛排到日式料理、韓式料理、泰式料理等等。只需點擊「立即旋轉」，觀看輪盤伴隨著逼真的減速和令人滿足的滴答聲旋轉，讓命運為您選擇下一餐。輪盤停止後，您可以立即搜尋附近的餐廳。",
    whoTitle: "我們是誰",
    whoBody: "我們是一群來自台灣的美食愛好者和網頁開發者，厭倦了每天花 30 分鐘在外送平台上滑來滑去。我們先為自己打造了這個工具，現在分享給全世界。",
    valuesTitle: "我們的價值觀",
    values: [
      { key: "簡單", val: "不用註冊、不用下載。轉一轉就可以吃飯了。" },
      { key: "隱私", val: "我們尊重您的數據。不追蹤您的位置，也不儲存個人資訊。" },
      { key: "有趣", val: "每一次的用餐選擇都應該帶來一點小確幸。" },
    ],
    footerTips: "美食秘笈",
    footerAbout: "關於我們",
    footerPrivacy: "隱私權政策",
  },
  en: {
    back: "Back to Roulette",
    title: "About Us",
    intro: "What to eat tonight? was born from a simple, universal frustration — the daily struggle of deciding what to eat. We believe that choosing your next meal should be fun, not stressful.",
    missionTitle: "Our Mission",
    missionBody: "Our mission is to eliminate decision fatigue around food by turning the mundane question of \"What should I eat?\" into an exciting, gamified experience. With a single spin of our interactive roulette wheel, you get a random food category suggestion — and a one-tap link to find the best nearby restaurants on Google Maps.",
    howTitle: "How It Works",
    howBody: "Our physics-based roulette wheel features 20 popular cuisine types — from Hot Pot and Steak to Japanese, Korean, Thai, and more. Simply tap \"Spin Now\", watch the wheel spin with realistic deceleration and satisfying tick sounds, and let fate choose your next meal. Once the wheel stops, you can instantly search for nearby restaurants with one tap.",
    whoTitle: "Who We Are",
    whoBody: "We are a small team of food lovers and web developers based in Taiwan who got tired of spending 30 minutes every day scrolling through delivery apps. We built this tool for ourselves first — and now we are sharing it with the world.",
    valuesTitle: "Our Values",
    values: [
      { key: "Simplicity", val: "No sign-up, no downloads. Just spin and eat." },
      { key: "Privacy", val: "We respect your data. We don't track your location or store personal information." },
      { key: "Fun", val: "Every meal decision should spark a little joy." },
    ],
    footerTips: "Food Tips",
    footerAbout: "About Us",
    footerPrivacy: "Privacy Policy",
  },
};

export default function AboutPage() {
  const [locale, setLocale] = useState<Locale>("zh");
  const t = TEXT[locale];

  return (
    <div className="min-h-[100dvh] bg-gray-950 text-gray-50 flex flex-col">
      {/* 導航列 */}
      <nav className="w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-[60]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            What to eat tonight?
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/tips" className="hidden sm:block text-sm text-gray-400 hover:text-yellow-400 transition-colors">{t.footerTips}</Link>
            <Link href="/about" className="hidden sm:block text-sm text-yellow-400 font-medium">{t.footerAbout}</Link>
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

        <div className="flex items-center gap-3 mb-6">
          <Utensils className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            {t.title}
          </h1>
        </div>

        <article className="space-y-6 text-gray-300 leading-relaxed">
          <p><strong className="text-white">What to eat tonight?</strong> {t.intro}</p>

          <h2 className="text-xl font-bold text-gray-200 mt-8">{t.missionTitle}</h2>
          <p>{t.missionBody}</p>

          <h2 className="text-xl font-bold text-gray-200 mt-8">{t.howTitle}</h2>
          <p>{t.howBody}</p>

          <h2 className="text-xl font-bold text-gray-200 mt-8">{t.whoTitle}</h2>
          <p>{t.whoBody}</p>

          <h2 className="text-xl font-bold text-gray-200 mt-8">{t.valuesTitle}</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            {t.values.map((v, i) => (
              <li key={i}><strong className="text-gray-300">{v.key}</strong> — {v.val}</li>
            ))}
          </ul>
        </article>
      </div>

      <footer className="w-full bg-gray-900 border-t border-gray-800 py-6 px-6">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/tips" className="text-gray-400 hover:text-yellow-400 transition-colors">{t.footerTips}</Link>
          <Link href="/about" className="text-yellow-400 font-medium">{t.footerAbout}</Link>
          <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors">{t.footerPrivacy}</Link>
        </div>
        <p className="text-gray-600 text-xs text-center mt-4">&copy; {new Date().getFullYear()} What to eat tonight? All rights reserved.</p>
      </footer>
    </div>
  );
}
