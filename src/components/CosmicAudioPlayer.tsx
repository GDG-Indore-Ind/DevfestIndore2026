"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles, Radio } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * CosmicAudioPlayer generates a gentle, non-intrusive ambient space-synth drone
 * using native browser Web Audio API synthesis. Zero external assets/mp3s required,
 * completely zero-latency, respectful of user autoplay policies.
 */
export default function CosmicAudioPlayer() {
  const { isDark } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  // Initialize synth voices
  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Low-pass filter for smooth ambient warmth
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);
      filter.connect(masterGain);
      filterRef.current = filter;

      // Subtle LFO (Low-Frequency Oscillator) to slowly sweep filter cutoff
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // slow cosmic pulse
      lfoGain.gain.setValueAtTime(140, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      lfoRef.current = lfo;

      // Polyphonic warm harmonic chords (Root: 108Hz ~ A2 / 162Hz ~ E3 / 216Hz ~ A3 / 270Hz ~ C#4)
      const freqs = [108.0, 162.0, 216.0, 324.0];
      const oscs: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        // Alternate sine and gentle triangle for rich harmonic warmth
        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        // Subtle micro-detune for lush stereophonic chorus feel
        osc.frequency.setValueAtTime(freq + (idx === 1 ? 0.35 : idx === 3 ? -0.4 : 0), ctx.currentTime);

        const voiceVol = idx === 0 ? 0.35 : idx === 1 ? 0.22 : 0.15;
        oscGain.gain.setValueAtTime(voiceVol, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        oscs.push(osc);
      });

      oscillatorsRef.current = oscs;
    } catch {
      // AudioContext not supported
    }
  };

  const togglePlay = () => {
    setHasInteracted(true);

    if (!audioCtxRef.current) {
      initAudio();
    }

    if (!audioCtxRef.current || !masterGainRef.current) return;

    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    if (isPlaying) {
      // Smooth fade out
      masterGainRef.current.gain.cancelScheduledValues(now);
      masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, now);
      masterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      setIsPlaying(false);
    } else {
      // Smooth fade in
      masterGainRef.current.gain.cancelScheduledValues(now);
      masterGainRef.current.gain.setValueAtTime(0.0001, now);
      masterGainRef.current.gain.exponentialRampToValueAtTime(volume, now + 1.8);
      setIsPlaying(true);
    }
  };

  // Adjust volume
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (masterGainRef.current && audioCtxRef.current && isPlaying) {
      const now = audioCtxRef.current.currentTime;
      masterGainRef.current.gain.cancelScheduledValues(now);
      masterGainRef.current.gain.linearRampToValueAtTime(newVol, now + 0.1);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        try {
          audioCtxRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 flex items-center gap-2 group">
      {/* Floating Audio Controller Capsule */}
      <div
        className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 ${
          isPlaying
            ? isDark
              ? "bg-[#0d0d0d]/90 border-[#4285f4]/50 shadow-[0_0_25px_rgba(66,133,244,0.35)]"
              : "bg-white/95 border-blue-400 shadow-[0_4px_20px_rgba(66,133,244,0.25)]"
            : isDark
            ? "bg-[#0d0d0d]/80 border-white/15 hover:border-white/30"
            : "bg-white/90 border-gray-300/80 hover:border-gray-400"
        }`}
      >
        {/* Play / Pause Interactive Button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Mute Cosmic Ambient Soundscape" : "Play Cosmic Ambient Soundscape"}
          className={`flex items-center gap-2 text-xs font-mono font-bold transition-colors cursor-pointer select-none ${
            isPlaying
              ? "text-[#4285f4]"
              : isDark
              ? "text-white/80 hover:text-white"
              : "text-gray-700 hover:text-gray-900"
          }`}
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-[#4285f4] animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-gray-400" />
          )}

          <span className="hidden sm:inline">
            {isPlaying ? "Cosmic Drone ON" : "Space Ambience"}
          </span>
        </button>

        {/* Animated Soundwave Frequency Bars when Playing */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-3.5 px-1">
            <span className="w-0.5 bg-[#4285f4] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2.5" />
            <span className="w-0.5 bg-[#ea4335] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.15s] h-3.5" />
            <span className="w-0.5 bg-[#f9ab00] rounded-full animate-[pulse_0.75s_ease-in-out_infinite_0.3s] h-2" />
            <span className="w-0.5 bg-[#34a853] rounded-full animate-[pulse_0.85s_ease-in-out_infinite_0.45s] h-3" />
          </div>
        ) : (
          <Radio className="w-3.5 h-3.5 text-gray-400 opacity-60" />
        )}

        {/* Volume slider (shows on hover) */}
        {isPlaying && (
          <div className="hidden group-hover:flex items-center pl-1 border-l border-gray-300/40 dark:border-white/15">
            <input
              type="range"
              min="0.05"
              max="0.6"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              aria-label="Cosmic Volume"
              className="w-14 h-1 bg-gray-300 dark:bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#4285f4]"
            />
          </div>
        )}
      </div>

      {/* Helpful First-Visit Pulsing Hint (fades out once interacted) */}
      {!hasInteracted && (
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 dark:bg-white/10 text-[11px] font-mono text-white/90 border border-white/20 backdrop-blur-md shadow-lg pointer-events-none animate-bounce">
          <Sparkles className="w-3 h-3 text-[#f9ab00]" />
          <span>Ambient sound available</span>
        </div>
      )}
    </div>
  );
}
