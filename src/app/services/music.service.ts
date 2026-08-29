import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private audio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  public isPlaying = false;
  private timer: any = null;
  private noteIndex = 0;
  private isUsingCustomAudio = false;

  // "Tum Hi Ho / Tujh Mein Rab Dikhta Hai" - Deeply Committed Hindi Romantic Anthem Notes (Hz)
  // "Hum tere bin ab reh nahi sakte... Kyunki tum hi ho, ab tum hi ho, zindagi ab tum hi ho..."
  private hindiRomanticMelody = [
    // "Hum tere bin ab reh nahi sakte"
    { f: 329.63, d: 0.6 }, // E4
    { f: 369.99, d: 0.6 }, // F#4
    { f: 392.00, d: 0.6 }, // G4
    { f: 369.99, d: 0.6 }, // F#4
    { f: 329.63, d: 0.9 }, // E4
    { f: 293.66, d: 0.6 }, // D4
    { f: 329.63, d: 1.2 }, // E4

    // "Tere bina kya wajood mera"
    { f: 329.63, d: 0.6 },
    { f: 369.99, d: 0.6 },
    { f: 392.00, d: 0.6 },
    { f: 369.99, d: 0.6 },
    { f: 329.63, d: 0.9 },
    { f: 293.66, d: 0.6 },
    { f: 246.94, d: 1.4 }, // B3

    // "Tujh se juda agar ho jaayenge"
    { f: 329.63, d: 0.6 },
    { f: 369.99, d: 0.6 },
    { f: 392.00, d: 0.6 },
    { f: 440.00, d: 0.6 }, // A4
    { f: 392.00, d: 0.8 },
    { f: 369.99, d: 0.6 },
    { f: 329.63, d: 1.2 },

    // "Toh khud se hi ho jaayenge juda"
    { f: 293.66, d: 0.6 },
    { f: 329.63, d: 0.6 },
    { f: 369.99, d: 0.8 },
    { f: 329.63, d: 0.6 },
    { f: 293.66, d: 0.6 },
    { f: 277.18, d: 0.6 }, // C#4
    { f: 246.94, d: 1.5 }, // B3

    // Chorus: "Kyunki Tum Hi Ho..."
    { f: 493.88, d: 0.8 }, // B4 - "Kyun-"
    { f: 440.00, d: 0.6 }, // A4 - "-ki"
    { f: 392.00, d: 1.2 }, // G4 - "Tum"
    { f: 369.99, d: 0.8 }, // F#4 - "Hi"
    { f: 329.63, d: 1.6 }, // E4 - "Ho..."

    // "Ab tum hi ho..."
    { f: 493.88, d: 0.8 },
    { f: 440.00, d: 0.6 },
    { f: 392.00, d: 1.2 },
    { f: 369.99, d: 0.8 },
    { f: 329.63, d: 1.6 },

    // "Zindagi ab tum hi ho..."
    { f: 440.00, d: 0.6 },
    { f: 392.00, d: 0.6 },
    { f: 369.99, d: 0.6 },
    { f: 329.63, d: 0.6 },
    { f: 293.66, d: 0.8 },
    { f: 329.63, d: 1.8 },

    // "Chain bhi, mera dard bhi..."
    { f: 392.00, d: 0.6 },
    { f: 440.00, d: 0.6 },
    { f: 493.88, d: 1.0 },
    { f: 440.00, d: 0.6 },
    { f: 392.00, d: 0.6 },
    { f: 369.99, d: 1.2 },

    // "Meri aashiqui ab tum hi ho..."
    { f: 329.63, d: 0.6 },
    { f: 369.99, d: 0.6 },
    { f: 392.00, d: 0.6 },
    { f: 440.00, d: 0.8 },
    { f: 369.99, d: 0.8 },
    { f: 329.63, d: 2.2 }
  ];

  constructor() {
    this.setupAudio();
  }

  private setupAudio(): void {
    if (typeof window === 'undefined') return;

    this.audio = new Audio();
    this.audio.src = 'music.mp3';
    this.audio.loop = true;
    this.audio.volume = 0.45;
    this.audio.preload = 'auto';

    this.audio.addEventListener('error', () => {
      if (this.audio && !this.audio.src.includes('music.mps.mp3')) {
        this.audio.src = 'music.mps.mp3';
        this.play();
      }
    });

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.isUsingCustomAudio = true;
    });

    // 1. Immediate unmuted play attempt as soon as script runs
    this.play();

    // 2. Instant play / unmute on ANY user presence (even 1 pixel mouse move or scroll)
    const instantUnmuteAndPlay = () => {
      if (this.audio) {
        this.audio.muted = false;
        this.audio.volume = 0.45;
        this.audio.play().then(() => {
          this.isPlaying = true;
          this.isUsingCustomAudio = true;
        }).catch(() => {});
      }
    };

    // Listen to all ambient events (movement, scroll, hover, touch, click)
    const events = ['mousemove', 'pointermove', 'wheel', 'scroll', 'mouseenter', 'touchstart', 'click', 'keydown', 'focus'];
    events.forEach(event => {
      window.addEventListener(event, instantUnmuteAndPlay, { passive: true });
    });

    // Trigger on document ready as well
    if (document.readyState === 'complete') {
      this.play();
    } else {
      window.addEventListener('load', () => this.play(), { once: true });
    }
  }

  play(): void {
    if (typeof window === 'undefined' || !this.audio) return;

    this.audio.muted = false;
    this.audio.volume = 0.45;

    const promise = this.audio.play();
    if (promise !== undefined) {
      promise.then(() => {
        this.isPlaying = true;
        this.isUsingCustomAudio = true;
      }).catch(() => {
        // If strict browser policy blocks unmuted audio on load, start muted then unmute on first pixel movement
        if (this.audio) {
          this.audio.muted = true;
          this.audio.play().then(() => {
            this.isPlaying = true;
          }).catch(() => {});
        }
      });
    }
  }

  private playSynthesizedHindiMelody(): void {
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }

      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      if (!this.isPlaying) {
        this.isPlaying = true;
        this.scheduleNextNote();
      }
    } catch (e) {
      // Audio context handling
    }
  }

  private playTone(freq: number, duration: number): void {
    if (!this.audioCtx || !this.isPlaying || this.isUsingCustomAudio) return;

    try {
      const now = this.audioCtx.currentTime;
      
      // Warm acoustic flute / violin / piano hybrid tone
      const osc = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now); // Sweet overtone

      // Smooth romantic envelope
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.exponentialRampToValueAtTime(0.16, now + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration * 1.5);

      const osc2Gain = this.audioCtx.createGain();
      osc2Gain.gain.setValueAtTime(0.04, now);
      osc2Gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.2);

      osc.connect(gainNode);
      osc2.connect(osc2Gain);
      osc2Gain.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + duration * 1.7);
      osc2.stop(now + duration * 1.7);
    } catch (e) {
      // Audio context handling
    }
  }

  private scheduleNextNote(): void {
    if (!this.isPlaying || this.isUsingCustomAudio) return;

    const currentNote = this.hindiRomanticMelody[this.noteIndex];
    this.playTone(currentNote.f, currentNote.d);

    this.noteIndex = (this.noteIndex + 1) % this.hindiRomanticMelody.length;
    const intervalMs = currentNote.d * 820;

    this.timer = setTimeout(() => {
      this.scheduleNextNote();
    }, intervalMs);
  }
}

