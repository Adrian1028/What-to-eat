"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";
import { FOOD_CATEGORIES, type FoodCategory } from "@/lib/food-categories";
import { playTick, playWinSound, resumeAudio } from "@/lib/tick-sound";

interface RouletteWheelProps {
  /** Subset of categories to display (defaults to all) */
  categories?: FoodCategory[];
  /** Size in CSS pixels */
  size?: number;
  /** Called when the wheel finishes spinning */
  onResult?: (category: FoodCategory) => void;
  /** Whether the wheel is currently spinning */
  spinning: boolean;
  /** Trigger a spin */
  onSpin: () => void;
}

// Pointer triangle height
const POINTER_H = 28;

export default function RouletteWheel({
  categories = FOOD_CATEGORIES,
  size = 320,
  onResult,
  spinning,
  onSpin,
}: RouletteWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0); // current rotation in radians
  const lastSegmentRef = useRef(-1); // track segment for tick sound
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [canSpin, setCanSpin] = useState(true);

  const totalWeight = categories.reduce((sum, c) => sum + c.weight, 0);
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  // --- Draw the wheel at the current rotation ---
  const draw = useCallback(
    (rotation: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = (Math.min(w, h) / 2) * 0.88;

      ctx.clearRect(0, 0, w, h);

      // --- Draw segments ---
      let startAngle = rotation;
      for (const cat of categories) {
        const sliceAngle = (cat.weight / totalWeight) * Math.PI * 2;
        const endAngle = startAngle + sliceAngle;

        // Filled segment
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = cat.color;
        ctx.fill();

        // Thin border
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.lineWidth = 1.5 * dpr;
        ctx.stroke();

        // Label text
        const midAngle = startAngle + sliceAngle / 2;
        const textRadius = radius * 0.62;
        const tx = cx + Math.cos(midAngle) * textRadius;
        const ty = cy + Math.sin(midAngle) * textRadius;

        ctx.save();

        // Place emoji and label at fixed positions along the spoke,
        // but keep all text perfectly horizontal (no rotation).
        const emojiR = radius * 0.70;
        const labelR = radius * 0.45;

        // Emoji — always upright
        const ex = cx + Math.cos(midAngle) * emojiR;
        const ey = cy + Math.sin(midAngle) * emojiR;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `${16 * dpr}px sans-serif`;
        ctx.fillText(cat.emoji, ex, ey);

        // Label — always horizontal
        const lx = cx + Math.cos(midAngle) * labelR;
        const ly = cy + Math.sin(midAngle) * labelR;
        ctx.font = `bold ${12 * dpr}px -apple-system, "Segoe UI", sans-serif`;
        ctx.fillStyle = cat.textColor;
        ctx.fillText(cat.label, lx, ly);

        ctx.restore();

        startAngle = endAngle;
      }

      // --- Center hub ---
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.12, 0, Math.PI * 2);
      ctx.fillStyle = "#1F2937";
      ctx.fill();
      ctx.strokeStyle = "#F3F4F6";
      ctx.lineWidth = 2 * dpr;
      ctx.stroke();

      // --- Outer ring ---
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 3 * dpr, 0, Math.PI * 2);
      ctx.strokeStyle = "#374151";
      ctx.lineWidth = 4 * dpr;
      ctx.stroke();

      // --- Pointer triangle (top center) ---
      const pointerH = POINTER_H * dpr;
      const pointerW = 18 * dpr;
      const pointerY = cy - radius - 3 * dpr;
      ctx.beginPath();
      ctx.moveTo(cx, pointerY + pointerH);
      ctx.lineTo(cx - pointerW / 2, pointerY - 4 * dpr);
      ctx.lineTo(cx + pointerW / 2, pointerY - 4 * dpr);
      ctx.closePath();
      ctx.fillStyle = "#EF4444";
      ctx.fill();
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1.5 * dpr;
      ctx.stroke();
    },
    [categories, totalWeight, dpr]
  );

  // --- Initial draw ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    draw(rotationRef.current);
  }, [size, dpr, draw]);

  // --- Determine which segment the pointer is on ---
  const getSegmentAtPointer = useCallback(
    (rotation: number): number => {
      // Pointer is at top (–π/2). Normalize the angle.
      const pointerAngle = -Math.PI / 2;
      let angle = pointerAngle - rotation;
      // Normalize to [0, 2π)
      angle = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

      let cumulative = 0;
      for (let i = 0; i < categories.length; i++) {
        cumulative += (categories[i].weight / totalWeight) * Math.PI * 2;
        if (angle < cumulative) return i;
      }
      return categories.length - 1;
    },
    [categories, totalWeight]
  );

  // --- Spin logic ---
  useEffect(() => {
    if (!spinning) return;

    resumeAudio();
    setCanSpin(false);
    lastSegmentRef.current = -1;

    // 5-10 full rotations + random stop
    const extraRotations = (5 + Math.random() * 5) * Math.PI * 2;
    const targetRotation = rotationRef.current + extraRotations;

    const proxy = { rotation: rotationRef.current };

    tweenRef.current = gsap.to(proxy, {
      rotation: targetRotation,
      duration: 4 + Math.random() * 2,
      ease: "power4.out",
      onUpdate: () => {
        rotationRef.current = proxy.rotation;
        draw(proxy.rotation);

        // Tick sound when crossing a segment boundary
        const seg = getSegmentAtPointer(proxy.rotation);
        if (seg !== lastSegmentRef.current) {
          lastSegmentRef.current = seg;
          playTick();
        }
      },
      onComplete: () => {
        const winIndex = getSegmentAtPointer(proxy.rotation);
        playWinSound();
        setCanSpin(true);
        onResult?.(categories[winIndex]);
      },
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [spinning, draw, getSegmentAtPointer, categories, onResult]);

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <canvas
        ref={canvasRef}
        style={{
          width: size,
          height: size,
          cursor: canSpin && !spinning ? "pointer" : "default",
        }}
        onClick={() => {
          if (canSpin && !spinning) onSpin();
        }}
        role="img"
        aria-label="Food roulette wheel"
      />
    </div>
  );
}
