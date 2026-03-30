"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { MapPin, Navigation, RotateCw, Utensils, Star, Info, X, Globe } from 'lucide-react';

// --- 多語系類型定義 ---
type Locale = 'zh' | 'en';

// --- 食物類型資料（雙語） ---
const FOOD_CATEGORIES = [
  { id: 1, name: { zh: "自己煮", en: "Cook at Home" }, tag: { zh: "省錢健康", en: "Save & Healthy" }, desc: { zh: "打開冰箱看看有什麼吧！", en: "Check what's in your fridge!" }, mapQuery: { zh: "生鮮超市", en: "grocery store" }, color: "#10B981" },
  { id: 2, name: { zh: "火鍋", en: "Hot Pot" }, tag: { zh: "聚餐首選", en: "Best for Groups" }, desc: { zh: "熱呼呼的最對味", en: "Nothing beats a warm hot pot!" }, mapQuery: { zh: "火鍋", en: "hot pot" }, color: "#EF4444" },
  { id: 3, name: { zh: "牛排", en: "Steak" }, tag: { zh: "大口吃肉", en: "Meat Lovers" }, desc: { zh: "來點蛋白質補充體力", en: "Fuel up with some protein!" }, mapQuery: { zh: "牛排", en: "steakhouse" }, color: "#F97316" },
  { id: 4, name: { zh: "中餐", en: "Chinese" }, tag: { zh: "傳統美味", en: "Traditional Taste" }, desc: { zh: "熟悉的味道最對胃", en: "Classic flavors that hit the spot" }, mapQuery: { zh: "中式餐廳", en: "Chinese restaurant" }, color: "#F59E0B" },
  { id: 5, name: { zh: "西餐", en: "Western" }, tag: { zh: "浪漫精緻", en: "Fine Dining" }, desc: { zh: "享受一下生活儀式感", en: "Treat yourself to something fancy" }, mapQuery: { zh: "西餐廳", en: "Western restaurant" }, color: "#3B82F6" },
  { id: 6, name: { zh: "日式料理", en: "Japanese" }, tag: { zh: "清爽無負擔", en: "Light & Fresh" }, desc: { zh: "壽司、生魚片或定食", en: "Sushi, sashimi, or a set meal" }, mapQuery: { zh: "日式料理", en: "Japanese restaurant" }, color: "#8B5CF6" },
  { id: 7, name: { zh: "速食", en: "Fast Food" }, tag: { zh: "快速方便", en: "Quick & Easy" }, desc: { zh: "快樂水與炸物的誘惑", en: "Fries, burgers & guilty pleasures" }, mapQuery: { zh: "速食", en: "fast food" }, color: "#E11D48" },
  { id: 8, name: { zh: "泰式料理", en: "Thai" }, tag: { zh: "酸辣開胃", en: "Spicy & Sour" }, desc: { zh: "來點重口味刺激味蕾", en: "Wake up your taste buds!" }, mapQuery: { zh: "泰式料理", en: "Thai restaurant" }, color: "#14B8A6" },
  { id: 9, name: { zh: "韓式料理", en: "Korean" }, tag: { zh: "馬西搜唷", en: "Mashisoyo!" }, desc: { zh: "泡菜、烤五花與炸雞", en: "Kimchi, BBQ & fried chicken" }, mapQuery: { zh: "韓式料理", en: "Korean restaurant" }, color: "#EC4899" },
  { id: 10, name: { zh: "義式料理", en: "Italian" }, tag: { zh: "披薩義大利麵", en: "Pizza & Pasta" }, desc: { zh: "濃郁起司與番茄的饗宴", en: "Cheese, tomato & carb heaven" }, mapQuery: { zh: "義式餐廳", en: "Italian restaurant" }, color: "#0EA5E9" },
  { id: 11, name: { zh: "早午餐", en: "Brunch" }, tag: { zh: "慵懶時光", en: "Lazy Morning" }, desc: { zh: "拼盤、漢堡與咖啡", en: "Eggs, toast & good coffee" }, mapQuery: { zh: "早午餐", en: "brunch" }, color: "#84CC16" },
  { id: 12, name: { zh: "燒肉", en: "BBQ" }, tag: { zh: "炭火香氣", en: "Charcoal Grilled" }, desc: { zh: "滋滋作響的烤肉派對", en: "Sizzling meat party!" }, mapQuery: { zh: "燒肉", en: "BBQ restaurant" }, color: "#B91C1C" },
];

// --- UI 翻譯字典 ---
const UI_TEXT = {
  zh: {
    loading: "正在準備今晚吃什麼輪盤...",
    loadingSub: "為您終結選擇困難",
    subtitle: "每天都在煩惱吃什麼？讓命運幫你決定",
    spinning: "命運旋轉中...",
    spinBtn: "立即旋轉",
    resultTitle: "命運的選擇是",
    searchNearby: "搜尋附近",
    tryAgain: "不滿意？再轉一次",
    adLabel: "廣告",
    adSlot: "廣告版位",
    adBanner: "Google AdSense 響應式橫幅",
    adVertical: "垂直摩天大樓廣告",
    adBox: "贊助商推薦 (外送優惠)",
    seoTitle1: "每天都在煩惱「今天吃什麼」？",
    seoBody1: "在快節奏的現代生活中，「午餐吃什麼」、「晚餐吃什麼」或是「深夜宵夜該吃哪一家」，幾乎成了每個人每天必經的靈魂拷問。當打開外送平台或地圖時，過多的選擇往往讓我們陷入「選擇困難症」（Paradox of Choice），導致浪費大量時間在滑手機看餐廳評論，最後卻還是無奈地選擇了同一家便當。為了解決這個全球共有的日常痛點，我們開發了「What to eat tonight? 今晚吃什麼」。",
    seoTitle2: "讓命運輪盤為你做決定！",
    seoBody2a: "What to eat tonight? 是一個專為選擇困難症患者打造的互動式隨機美食抽籤工具。無論您是正在辦公室揪團訂下午茶的上班族、不知道約會該吃什麼的情侶，還是深夜肚子餓的大學生，只需輕點「立即旋轉」按鈕，我們精心設計的物理動態輪盤就會為您隨機抽出下一個美食提案。",
    seoBody2b: "我們的食物資料庫涵蓋了十二種最受歡迎的料理類型，包含：熱呼呼的火鍋、大口吃肉的牛排、清爽無負擔的日式料理、浪漫精緻的西餐、省錢又健康的自己煮生鮮超市，甚至是罪惡感滿滿的速食與香氣四溢的燒烤。總有一個選項能完美命中您的胃口！",
    seoTitle3: "結合地圖導航，一鍵尋找附近美食",
    seoBody3: "抽中想吃的食物類型後該去哪裡買？別擔心！當美食輪盤停止轉動並揭曉結果時，系統會自動為您生成專屬的 Google Maps 深度連結。只要點擊畫面上的「搜尋附近美食」按鈕，就能一鍵開啟您的地圖應用程式，精準定位並列出您所在位置附近符合該食物類型的優質餐廳。從產生靈感到開始出發導航，整個決策過程不到 5 秒鐘，為您打造最流暢、無摩擦的美食決策體驗。",
    seoTitle4: "為什麼你需要這個工具？",
    seoBody4: "心理學研究指出，減少日常瑣碎的決策能有效保留大腦的認知能量，讓您專注在工作與生活上更重要的事情。把「吃什麼」這個煩人的問題交給我們的今晚吃什麼輪盤，您只需要負責好好享受美食帶來的快樂！現在就把本站加入瀏覽器我的最愛（書籤），讓每一次的用餐時間都充滿未知的驚喜與期待吧！",
    mapPrefix: "附近 ",
    footerAbout: "關於我們",
    footerContact: "聯絡我們",
    footerPrivacy: "隱私權政策",
    footerRights: "版權所有",
    footerDesc: "專為選擇困難症患者打造的美食決策工具",
  },
  en: {
    loading: "Preparing What to eat tonight?...",
    loadingSub: "Ending your decision fatigue",
    subtitle: "Can't decide what to eat? Let fate choose for you!",
    spinning: "Spinning fate...",
    spinBtn: "Spin Now",
    resultTitle: "Fate has chosen",
    searchNearby: "Search nearby ",
    tryAgain: "Not feeling it? Spin again!",
    adLabel: "Ad",
    adSlot: "Ad Slot",
    adBanner: "Google AdSense Responsive Banner",
    adVertical: "Vertical Skyscraper Ad",
    adBox: "Sponsored (Delivery Deals)",
    seoTitle1: 'Struggling with "What should I eat today?"',
    seoBody1: "In our fast-paced modern life, deciding what to have for lunch, dinner, or a late-night snack has become a daily existential crisis. With so many options on delivery apps and maps, we often fall into the \"Paradox of Choice\" — spending ages scrolling through restaurant reviews only to end up picking the same old place. To solve this universal daily pain point, we created \"What to eat tonight?\".",
    seoTitle2: "Let the wheel of fate decide for you!",
    seoBody2a: "What to eat tonight? is an interactive random food picker designed for the indecisive. Whether you're an office worker trying to organize a group lunch, a couple who can't agree on a dinner spot, or a hungry college student at midnight — just tap \"Spin Now\" and our physics-based roulette wheel will randomly pick your next meal!",
    seoBody2b: "Our food database covers twelve of the most popular cuisine types, including: comforting hot pot, juicy steak, light Japanese cuisine, elegant Western dining, budget-friendly home cooking, guilt-free fast food, and sizzling BBQ. There's always something to satisfy your cravings!",
    seoTitle3: "Map integration for one-tap navigation",
    seoBody3: "Wondering where to find your chosen cuisine nearby? Don't worry! When the roulette stops, the app generates a custom Google Maps deep link. Just tap the \"Search nearby\" button to instantly open your maps app, pinpointing quality restaurants near you that match the selected food type. From inspiration to navigation in under 5 seconds — the smoothest, friction-free dining decision experience.",
    seoTitle4: "Why do you need this tool?",
    seoBody4: "Psychology research shows that reducing trivial daily decisions helps preserve cognitive energy, letting you focus on what truly matters in work and life. Hand over the annoying \"what to eat\" question to our food roulette — all you need to do is enjoy the meal! Bookmark this site now and let every mealtime be filled with exciting surprises!",
    mapPrefix: "",
    footerAbout: "About Us",
    footerContact: "Contact Us",
    footerPrivacy: "Privacy Policy",
    footerRights: "All rights reserved",
    footerDesc: "A food decision tool built for the indecisive",
  },
};

// --- 廣告版位元件 ---
interface AdSlotProps {
  type?: 'banner' | 'vertical' | 'box';
  placement?: string;
  onClose?: () => void;
  isLive?: boolean;
  adClient?: string;
  adSlotId?: string;
  locale?: Locale;
}

const AdSlot = ({ type = 'banner', placement = '', onClose, isLive = false, adClient = '', adSlotId = '', locale = 'zh' }: AdSlotProps) => {
  const t = UI_TEXT[locale];
  let sizeClasses = '';
  if (type === 'banner') sizeClasses = 'w-full max-w-3xl mx-auto h-[60px] sm:h-[90px]';
  else if (type === 'vertical') sizeClasses = 'w-[120px] lg:w-[160px] h-[400px] lg:h-[500px]';
  else if (type === 'box') sizeClasses = 'w-full h-[80px] mt-4';

  useEffect(() => {
    if (isLive && adClient && adSlotId) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense init failed:", e);
      }
    }
  }, [isLive, adClient, adSlotId]);

  if (isLive) {
    return (
      <div className={`relative shrink-0 overflow-hidden flex justify-center items-center bg-gray-900 ${sizeClasses}`}>
        {onClose && (
          <button onClick={onClose} className="absolute top-1 left-1 p-1 text-gray-400 hover:text-white bg-gray-800/80 rounded-full transition-colors z-10">
            <X className="w-3 h-3" />
          </button>
        )}
        <ins className="adsbygoogle"
             style={{ display: 'block', width: '100%', height: '100%' }}
             data-ad-client={adClient}
             data-ad-slot={adSlotId}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
    );
  }

  return (
    <div className={`relative bg-gray-900/60 flex flex-col items-center justify-center overflow-hidden border border-gray-700 rounded-lg shrink-0 ${sizeClasses}`}>
      <div className="absolute top-1 right-1 px-1 bg-gray-800 rounded text-[10px] text-gray-400">{t.adLabel}</div>
      {onClose && (
        <button onClick={onClose} className="absolute top-1 left-1 p-1 text-gray-400 hover:text-white bg-gray-800/80 rounded-full transition-colors z-10">
          <X className="w-3 h-3" />
        </button>
      )}
      <span className="text-gray-500 font-medium text-sm flex flex-col items-center gap-2 text-center px-2">
        <Info className="w-4 h-4" />
        {placement} {t.adSlot}
      </span>
      {type === 'banner' && <span className="text-xs text-gray-600 mt-1 text-center hidden sm:block">{t.adBanner}</span>}
      {type === 'vertical' && <span className="text-xs text-gray-600 mt-1 text-center">{t.adVertical}</span>}
      {type === 'box' && <span className="text-xs text-gray-600 mt-1 text-center">{t.adBox}</span>}
    </div>
  );
};

// --- 輕量級 Confetti ---
const ConfettiCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 2,
      dx: Math.random() * 4 - 2,
      dy: Math.random() * 4 + 4,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngleInc: (Math.random() * 0.07) + 0.05,
      tiltAngle: 0
    }));

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, index) => {
        p.tiltAngle += p.tiltAngleInc;
        p.y += p.dy;
        p.x += Math.sin(p.tiltAngle) * 2 + p.dx;

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
        ctx.stroke();

        if (p.y > canvas.height) {
          particles[index].y = -10;
          particles[index].x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />;
};

// --- 主應用程式 ---
export default function HomePage() {
  const [appState, setAppState] = useState<'loading' | 'ready'>('loading');
  const [locale, setLocale] = useState<Locale>('zh');
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<typeof FOOD_CATEGORIES[number] | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const [showTopAd, setShowTopAd] = useState(true);
  const [showBottomAd, setShowBottomAd] = useState(true);
  const [showLeftAd, setShowLeftAd] = useState(true);
  const [showRightAd, setShowRightAd] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number>(0);
  const localeRef = useRef<Locale>(locale);

  // 同步 locale 到 ref（供 drawWheel 讀取最新值）
  useEffect(() => {
    localeRef.current = locale;
  }, [locale]);

  const t = UI_TEXT[locale];

  // --- Canvas 輪盤繪製 ---
  const drawWheel = useCallback((currentAngle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = 320;
    const radius = size / 2;
    const dpr = window.devicePixelRatio || 1;
    const currentLocale = localeRef.current;

    if (canvas.width !== size * dpr) {
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
    }

    ctx.clearRect(0, 0, size, size);

    const sliceAngle = (Math.PI * 2) / FOOD_CATEGORIES.length;

    ctx.translate(radius, radius);
    ctx.rotate(currentAngle);

    FOOD_CATEGORIES.forEach((item, i) => {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius - 4, i * sliceAngle - Math.PI / 2, (i + 1) * sliceAngle - Math.PI / 2);
      ctx.fillStyle = item.color;
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#111827';
      ctx.stroke();

      ctx.save();
      ctx.rotate(i * sliceAngle + sliceAngle / 2 - Math.PI / 2);
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.font = currentLocale === 'en' ? "bold 13px 'Noto Sans', sans-serif" : "bold 16px 'Noto Sans', sans-serif";
      const name = item.name[currentLocale];
      const displayName = name.length > 9 ? name.substring(0, 8) + '…' : name;
      ctx.fillText(displayName, radius - 24, 0);
      ctx.restore();
    });

    // Center hub
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#1F2937';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#F59E0B';
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("EAT", 0, 0);

    ctx.rotate(-currentAngle);
    ctx.translate(-radius, -radius);
  }, []);

  // --- 初始化 ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppState('ready');
      drawWheel(0);
    }, 1500);
    return () => clearTimeout(timer);
  }, [drawWheel]);

  // 語言切換時重繪輪盤
  useEffect(() => {
    if (appState === 'ready' && !isSpinning) {
      drawWheel(angleRef.current);
    }
  }, [locale, appState, isSpinning, drawWheel]);

  // --- Web Audio API 音效 ---
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AC();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playTickSound = useCallback(() => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  }, []);

  // --- 旋轉邏輯 ---
  const spinWheel = () => {
    if (isSpinning) return;
    initAudio();
    setIsSpinning(true);
    setResult(null);
    setShowConfetti(false);

    let velocity = Math.random() * 0.15 + 0.35;
    const friction = 0.985;
    let currentAngle = angleRef.current;
    let accumulatedAngle = 0;
    const sliceAngle = (Math.PI * 2) / FOOD_CATEGORIES.length;

    const animate = () => {
      velocity *= friction;
      currentAngle += velocity;
      accumulatedAngle += velocity;

      if (accumulatedAngle >= sliceAngle) {
        playTickSound();
        accumulatedAngle %= sliceAngle;
      }

      angleRef.current = currentAngle % (Math.PI * 2);
      drawWheel(angleRef.current);

      if (velocity > 0.0015) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        const normalizedAngle = (Math.PI * 2 - (angleRef.current % (Math.PI * 2))) % (Math.PI * 2);
        const winningIndex = Math.floor(normalizedAngle / sliceAngle);

        setResult(FOOD_CATEGORIES[winningIndex]);
        setShowConfetti(true);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // --- 語言切換按鈕元件 ---
  const LanguageSwitcher = () => (
    <button
      onClick={() => setLocale(prev => prev === 'zh' ? 'en' : 'zh')}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600 text-sm text-gray-300 hover:text-white transition-all"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">{locale === 'zh' ? 'EN' : '中文'}</span>
    </button>
  );

  const adPlacement = (key: string) => {
    const map: Record<string, Record<Locale, string>> = {
      top: { zh: "上方", en: "Top" },
      bottom: { zh: "下方", en: "Bottom" },
      left: { zh: "左側", en: "Left" },
      right: { zh: "右側", en: "Right" },
      result: { zh: "結果頁", en: "Result" },
    };
    return map[key]?.[locale] ?? key;
  };

  return (
    <div className="min-h-[100dvh] bg-gray-950 text-gray-50 font-sans selection:bg-yellow-500/30 flex flex-col overflow-x-hidden relative">

      {/* 右上角語言切換（固定定位，始終可見） */}
      <div className="fixed top-3 right-3 z-[60]">
        <LanguageSwitcher />
      </div>

      {/* 載入畫面 */}
      {appState === 'loading' && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-900">
          <MapPin className="w-12 h-12 text-yellow-500 animate-bounce mb-4" />
          <h2 className="text-xl font-bold tracking-wider animate-pulse">{t.loading}</h2>
          <p className="text-sm text-gray-400 mt-2">{t.loadingSub}</p>
        </div>
      )}

      {/* 主介面 */}
      <div className={`flex-1 flex flex-col w-full transition-opacity duration-1000 ${appState === 'ready' ? 'opacity-100' : 'opacity-0'}`}>

        {/* 上方橫幅廣告 */}
        {showTopAd && (
          <div className="w-full p-3 bg-gray-900 border-b border-gray-800 shrink-0">
            <AdSlot type="banner" placement={adPlacement('top')} onClose={() => setShowTopAd(false)} locale={locale} />
          </div>
        )}

        {/* 核心內容：左右廣告 + 中間輪盤 */}
        <div className="flex-1 flex flex-row justify-center w-full max-w-7xl mx-auto overflow-hidden">

          {/* 左側廣告 - md 以上 */}
          {showLeftAd && (
            <div className="hidden md:flex flex-col items-center justify-center p-4 border-r border-gray-800/50 shrink-0">
              <AdSlot type="vertical" placement={adPlacement('left')} onClose={() => setShowLeftAd(false)} locale={locale} />
            </div>
          )}

          {/* 中間輪盤 */}
          <div className="flex-1 flex flex-col max-w-md mx-auto w-full relative pb-10">
            <header className="py-6 px-4 text-center shrink-0">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-sm">
                What to eat tonight?
              </h1>
              <p className="text-gray-400 mt-2 text-sm font-medium">{t.subtitle}</p>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-4 relative min-h-[400px]">

              {/* 指標 */}
              <div
                className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[24px] border-t-white"
                style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}
              />

              {/* Canvas 輪盤 */}
              <div className="relative flex justify-center w-full">
                <canvas
                  ref={canvasRef}
                  className={`rounded-full shadow-2xl transition-transform ${isSpinning ? '' : 'hover:scale-105'}`}
                  style={{ boxShadow: '0 0 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.1)' }}
                />
              </div>

              {/* CTA 按鈕 */}
              <button
                onClick={spinWheel}
                disabled={isSpinning}
                className={`mt-10 px-10 py-4 rounded-full text-xl font-bold transition-all transform active:scale-95 shadow-xl ${
                  isSpinning
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-b from-yellow-400 to-orange-500 text-gray-900 hover:shadow-orange-500/50 hover:-translate-y-1'
                }`}
              >
                {isSpinning ? (
                  <span className="flex items-center gap-2">
                    <RotateCw className="animate-spin w-6 h-6" /> {t.spinning}
                  </span>
                ) : (
                  <span className="flex items-center gap-2 tracking-wide">
                    <Utensils className="w-6 h-6" /> {t.spinBtn}
                  </span>
                )}
              </button>
            </main>
          </div>

          {/* 右側廣告 - md 以上 */}
          {showRightAd && (
            <div className="hidden md:flex flex-col items-center justify-center p-4 border-l border-gray-800/50 shrink-0">
              <AdSlot type="vertical" placement={adPlacement('right')} onClose={() => setShowRightAd(false)} locale={locale} />
            </div>
          )}
        </div>

        {/* SEO 文章區塊 */}
        <section className="w-full bg-gray-900/30 border-t border-gray-800 py-12 px-6">
          <article className="max-w-3xl mx-auto space-y-8 text-gray-400 text-sm md:text-base leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-gray-200 mb-3 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-yellow-500" /> {t.seoTitle1}
              </h2>
              <p>{t.seoBody1}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-200 mb-3 flex items-center gap-2">
                <RotateCw className="w-5 h-5 text-yellow-500" /> {t.seoTitle2}
              </h2>
              <p>{t.seoBody2a}</p>
              <p className="mt-2">{t.seoBody2b}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-200 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-yellow-500" /> {t.seoTitle3}
              </h2>
              <p>{t.seoBody3}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-200 mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" /> {t.seoTitle4}
              </h2>
              <p>{t.seoBody4}</p>
            </div>
          </article>
        </section>

        {/* 下方橫幅廣告 */}
        {showBottomAd && (
          <div className="w-full p-3 pb-6 bg-gray-900 border-t border-gray-800 shrink-0">
            <AdSlot type="banner" placement={adPlacement('bottom')} onClose={() => setShowBottomAd(false)} locale={locale} />
          </div>
        )}

        {/* 頁尾導航 */}
        <footer className="w-full bg-gray-900 border-t border-gray-800 py-8 px-6">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
            <h2 className="text-lg font-bold bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              What to eat tonight?
            </h2>
            <p className="text-gray-500 text-sm text-center">{t.footerDesc}</p>
            <nav className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">
                {t.footerAbout}
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">
                {t.footerContact}
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors">
                {t.footerPrivacy}
              </Link>
            </nav>
            <div className="w-16 h-px bg-gray-800" />
            <p className="text-gray-600 text-xs">
              &copy; {new Date().getFullYear()} What to eat tonight? {t.footerRights}.
            </p>
          </div>
        </footer>
      </div>

      {/* 結果彈窗 */}
      {result && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          {showConfetti && <ConfettiCanvas />}

          <div className="bg-gray-800 border border-gray-700 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative z-50">
            <div className="w-16 h-1 bg-gray-600 rounded-full mx-auto mb-6" />

            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-widest text-center mb-1">
              {t.resultTitle}
            </h3>
            <h2 className="text-3xl font-bold text-center text-white mb-6">
              {result.name[locale]}
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex flex-col items-center justify-center bg-gray-900/50 p-4 rounded-xl border border-gray-700/50 text-center">
                <div className="flex items-center text-yellow-500 font-semibold mb-2">
                  <Star className="w-5 h-5 mr-2 fill-current" />
                  {result.tag[locale]}
                </div>
                <div className="text-gray-300 text-sm">
                  {result.desc[locale]}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.mapPrefix + result.mapQuery[locale])}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-blue-900/50"
              >
                <Navigation className="w-5 h-5 mr-2" />
                {t.searchNearby}{result.mapQuery[locale]}
              </a>

              <button
                onClick={() => {
                  setResult(null);
                  setShowConfetti(false);
                }}
                className="w-full bg-transparent hover:bg-gray-700 text-gray-300 font-medium py-3 px-4 rounded-xl transition-colors"
              >
                {t.tryAgain}
              </button>
            </div>

            <AdSlot type="box" placement={adPlacement('result')} locale={locale} />
          </div>
        </div>
      )}
    </div>
  );
}
