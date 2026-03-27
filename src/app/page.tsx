"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Navigation, RotateCw, Utensils, Star, Info, X } from 'lucide-react';

// --- 食物類型資料 ---
const FOOD_CATEGORIES = [
  { id: 1, name: "自己煮", tag: "省錢健康", desc: "打開冰箱看看有什麼吧！", mapQuery: "生鮮超市", color: "#10B981" },
  { id: 2, name: "火鍋", tag: "聚餐首選", desc: "熱呼呼的最對味", mapQuery: "火鍋", color: "#EF4444" },
  { id: 3, name: "牛排", tag: "大口吃肉", desc: "來點蛋白質補充體力", mapQuery: "牛排", color: "#F97316" },
  { id: 4, name: "中餐", tag: "傳統美味", desc: "熟悉的味道最對胃", mapQuery: "中式餐廳", color: "#F59E0B" },
  { id: 5, name: "西餐", tag: "浪漫精緻", desc: "享受一下生活儀式感", mapQuery: "西餐廳", color: "#3B82F6" },
  { id: 6, name: "日式料理", tag: "清爽無負擔", desc: "壽司、生魚片或定食", mapQuery: "日式料理", color: "#8B5CF6" },
  { id: 7, name: "速食", tag: "快速方便", desc: "快樂水與炸物的誘惑", mapQuery: "速食", color: "#E11D48" },
  { id: 8, name: "泰式料理", tag: "酸辣開胃", desc: "來點重口味刺激味蕾", mapQuery: "泰式料理", color: "#14B8A6" },
  { id: 9, name: "韓式料理", tag: "馬西搜唷", desc: "泡菜、烤五花與炸雞", mapQuery: "韓式料理", color: "#EC4899" },
  { id: 10, name: "義式料理", tag: "披薩義大利麵", desc: "濃郁起司與番茄的饗宴", mapQuery: "義式餐廳", color: "#0EA5E9" },
  { id: 11, name: "早午餐", tag: "慵懶時光", desc: "拼盤、漢堡與咖啡", mapQuery: "早午餐", color: "#84CC16" },
  { id: 12, name: "燒肉", tag: "炭火香氣", desc: "滋滋作響的烤肉派對", mapQuery: "燒肉", color: "#B91C1C" },
];

// --- 廣告版位元件 ---
interface AdSlotProps {
  type?: 'banner' | 'vertical' | 'box';
  placement?: string;
  onClose?: () => void;
  isLive?: boolean;
  adClient?: string;
  adSlotId?: string;
}

const AdSlot = ({ type = 'banner', placement = '', onClose, isLive = false, adClient = '', adSlotId = '' }: AdSlotProps) => {
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
      <div className="absolute top-1 right-1 px-1 bg-gray-800 rounded text-[10px] text-gray-400">廣告</div>
      {onClose && (
        <button onClick={onClose} className="absolute top-1 left-1 p-1 text-gray-400 hover:text-white bg-gray-800/80 rounded-full transition-colors z-10">
          <X className="w-3 h-3" />
        </button>
      )}
      <span className="text-gray-500 font-medium text-sm flex flex-col items-center gap-2 text-center px-2">
        <Info className="w-4 h-4" />
        {placement} 廣告版位
      </span>
      {type === 'banner' && <span className="text-xs text-gray-600 mt-1 text-center hidden sm:block">Google AdSense 響應式橫幅</span>}
      {type === 'vertical' && <span className="text-xs text-gray-600 mt-1 text-center">垂直摩天大樓廣告</span>}
      {type === 'box' && <span className="text-xs text-gray-600 mt-1 text-center">贊助商推薦 (外送優惠)</span>}
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

  // --- Canvas 輪盤繪製 ---
  const drawWheel = useCallback((currentAngle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = 320;
    const radius = size / 2;
    const dpr = window.devicePixelRatio || 1;

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
      ctx.font = "bold 16px 'Noto Sans', sans-serif";
      const displayName = item.name.length > 7 ? item.name.substring(0, 6) + '...' : item.name;
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

  return (
    <div className="min-h-[100dvh] bg-gray-950 text-gray-50 font-sans flex flex-col overflow-hidden relative">

      {/* 載入畫面 */}
      {appState === 'loading' && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-900">
          <MapPin className="w-12 h-12 text-yellow-500 animate-bounce mb-4" />
          <h2 className="text-xl font-bold tracking-wider animate-pulse">正在準備美食輪盤...</h2>
          <p className="text-sm text-gray-400 mt-2">載入食物類別與廣告版位中</p>
        </div>
      )}

      {/* 主介面 */}
      <div className={`flex-1 flex flex-col w-full transition-opacity duration-1000 ${appState === 'ready' ? 'opacity-100' : 'opacity-0'}`}>

        {/* 上方橫幅廣告 */}
        {showTopAd && (
          <div className="w-full p-3 bg-gray-900 border-b border-gray-800 shrink-0">
            <AdSlot type="banner" placement="上方" onClose={() => setShowTopAd(false)} />
          </div>
        )}

        {/* 核心內容：左右廣告 + 中間輪盤 */}
        <div className="flex-1 flex flex-row justify-center w-full max-w-7xl mx-auto overflow-hidden">

          {/* 左側廣告 - md 以上 */}
          {showLeftAd && (
            <div className="hidden md:flex flex-col items-center justify-center p-4 border-r border-gray-800/50 shrink-0">
              <AdSlot type="vertical" placement="左側" onClose={() => setShowLeftAd(false)} />
            </div>
          )}

          {/* 中間輪盤 */}
          <div className="flex-1 flex flex-col max-w-md mx-auto w-full relative">
            <header className="py-6 px-4 text-center shrink-0">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-sm">
                What to eat now?
              </h1>
              <p className="text-gray-400 mt-2 text-sm font-medium">終結選擇困難，讓命運決定下一餐</p>
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
                    <RotateCw className="animate-spin w-6 h-6" /> 命運旋轉中...
                  </span>
                ) : (
                  <span className="flex items-center gap-2 tracking-wide">
                    <Utensils className="w-6 h-6" /> 立即旋轉
                  </span>
                )}
              </button>
            </main>
          </div>

          {/* 右側廣告 - md 以上 */}
          {showRightAd && (
            <div className="hidden md:flex flex-col items-center justify-center p-4 border-l border-gray-800/50 shrink-0">
              <AdSlot type="vertical" placement="右側" onClose={() => setShowRightAd(false)} />
            </div>
          )}
        </div>

        {/* 下方橫幅廣告 */}
        {showBottomAd && (
          <div className="w-full p-3 pb-6 bg-gray-900 border-t border-gray-800 shrink-0">
            <AdSlot type="banner" placement="下方" onClose={() => setShowBottomAd(false)} />
          </div>
        )}
      </div>

      {/* 結果彈窗 */}
      {result && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          {showConfetti && <ConfettiCanvas />}

          <div className="bg-gray-800 border border-gray-700 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative z-50">
            <div className="w-16 h-1 bg-gray-600 rounded-full mx-auto mb-6" />

            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-widest text-center mb-1">
              命運的選擇是
            </h3>
            <h2 className="text-3xl font-bold text-center text-white mb-6">
              {result.name}
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex flex-col items-center justify-center bg-gray-900/50 p-4 rounded-xl border border-gray-700/50 text-center">
                <div className="flex items-center text-yellow-500 font-semibold mb-2">
                  <Star className="w-5 h-5 mr-2 fill-current" />
                  {result.tag}
                </div>
                <div className="text-gray-300 text-sm">
                  {result.desc}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("附近 " + result.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-blue-900/50"
              >
                <Navigation className="w-5 h-5 mr-2" />
                搜尋附近{result.mapQuery}
              </a>

              <button
                onClick={() => {
                  setResult(null);
                  setShowConfetti(false);
                }}
                className="w-full bg-transparent hover:bg-gray-700 text-gray-300 font-medium py-3 px-4 rounded-xl transition-colors"
              >
                不滿意？再轉一次
              </button>
            </div>

            <AdSlot type="box" placement="結果頁" />
          </div>
        </div>
      )}
    </div>
  );
}
