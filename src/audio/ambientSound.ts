/**
 * Subtle Cinematic Ambient Sound Generator
 * Generates an organic, warm vinyl hiss and gentle acoustic tones
 * using procedural Web Audio API with zero external media files.
 */

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private isMuted: boolean = false;

  public init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.startSubtleDrone();
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!this.masterGain || !this.ctx) return;
    const target = muted ? 0 : 0.5;
    this.masterGain.gain.linearRampToValueAtTime(target, this.ctx.currentTime + 0.1);
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Soft vinyl crackle & warm atmospheric drone
  private startSubtleDrone() {
    if (!this.ctx || !this.masterGain) return;

    // Dual low warm sine oscillators (A24 style cinematic pad)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(110, this.ctx.currentTime); // A2

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(164.8, this.ctx.currentTime); // E3 fifth harmonic

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, this.ctx.currentTime);

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.ambientGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 3);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(this.ambientGain);
    this.ambientGain.connect(this.masterGain);

    osc1.start();
    osc2.start();
  }

  // Tactile paper slide / gentle chime on memory inspection
  public playCardInspect() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, t); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, t + 0.08); // E5

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.09, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.45);
  }

  // Gentle transition click on next/prev
  public playNavClick() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(160, t + 0.04);

    gain.gain.setValueAtTime(0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.05);
  }
}

export const ambientSound = new AmbientSoundEngine();
