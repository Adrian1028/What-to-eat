/**
 * Web Audio API tick sound synthesizer.
 * Generates short, high-frequency click sounds without any external audio files.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
  }
  return audioCtx;
}

/** Resume AudioContext after user gesture (required by browsers) */
export function resumeAudio() {
  const ctx = getAudioContext();
  if (ctx?.state === "suspended") {
    ctx.resume();
  }
}

/**
 * Play a single short tick sound.
 * @param pitch - frequency in Hz (default 1800)
 * @param volume - gain 0-1 (default 0.08)
 */
export function playTick(pitch = 1800, volume = 0.08) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "square";
  osc.frequency.setValueAtTime(pitch, ctx.currentTime);

  gain.gain.setValueAtTime(volume, ctx.currentTime);
  // Rapid decay for a crisp click
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.06);
}

/**
 * Play a winning fanfare — ascending tones.
 */
export function playWinSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);

    gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.12);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + i * 0.12 + 0.3
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + i * 0.12);
    osc.stop(ctx.currentTime + i * 0.12 + 0.3);
  });
}
