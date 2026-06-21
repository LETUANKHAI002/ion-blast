// audio.js — Engine tổng hợp âm thanh bằng Web Audio API (không cần tải asset bên ngoài)

class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.musicEnabled = true;
    this.soundEnabled = true;
    
    // Nhạc nền nodes
    this.bgmOscs = [];
    this.bgmGain = null;
    this.isPlayingMusic = false;

    // Load cài đặt từ localStorage
    this.loadSettings();
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    } catch (e) {
      console.warn("Trình duyệt không hỗ trợ Web Audio API:", e);
    }
  }

  resumeContext() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  loadSettings() {
    try {
      const settings = JSON.parse(localStorage.getItem('ion_blast_settings') || '{}');
      this.musicEnabled = settings.music !== false;
      this.soundEnabled = settings.sound !== false;
    } catch (e) {
      this.musicEnabled = true;
      this.soundEnabled = true;
    }
  }

  saveSettings() {
    try {
      localStorage.setItem('ion_blast_settings', JSON.stringify({
        music: this.musicEnabled,
        sound: this.soundEnabled
      }));
    } catch (e) {}
  }

  setMusicEnabled(enabled) {
    this.musicEnabled = enabled;
    this.saveSettings();
    if (enabled) {
      this.startMusic();
    } else {
      this.stopMusic();
    }
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
    this.saveSettings();
  }

  // ===== TIẾNG ĐẶT KHỐI (PLACE PIECE) =====
  playPlace() {
    if (!this.soundEnabled) return;
    this.resumeContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  // ===== TIẾNG PHẢN ỨNG HÓA HỌC (CHEMICAL REACTION) =====
  playReaction() {
    if (!this.soundEnabled) return;
    this.resumeContext();
    if (!this.ctx) return;

    const time = this.ctx.currentTime;
    
    // 1. Âm thanh nổ từ Noise Buffer (Nhiễu trắng)
    const bufferSize = this.ctx.sampleRate * 0.4; // 0.4 giây
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, time);
    filter.frequency.exponentialRampToValueAtTime(150, time + 0.4);
    filter.Q.setValueAtTime(2.0, time);

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(0.4, time);
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.4);

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    // 2. Thêm một âm Synth trầm đi kèm để tạo độ dày
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, time);
    osc.frequency.linearRampToValueAtTime(280, time + 0.25);
    
    oscGain.gain.setValueAtTime(0.18, time);
    oscGain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);

    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);

    noiseNode.start(time);
    noiseNode.stop(time + 0.4);

    osc.start(time);
    osc.stop(time + 0.3);
  }

  // ===== TIẾNG XÓA HÀNG/CỘT (LINE CLEAR) =====
  playLineClear() {
    if (!this.soundEnabled) return;
    this.resumeContext();
    if (!this.ctx) return;

    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, time);
    osc.frequency.exponentialRampToValueAtTime(150, time + 0.35);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, time);

    gain.gain.setValueAtTime(0.25, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.35);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(time + 0.35);
  }

  // ===== TIẾNG COMBO STREAK =====
  playStreak(comboIndex) {
    if (!this.soundEnabled) return;
    this.resumeContext();
    if (!this.ctx) return;

    const time = this.ctx.currentTime;
    const baseFreq = 300 + (comboIndex * 80); // Tần số tăng dần theo combo

    // Hợp âm nhanh (Arpeggio)
    const notes = [baseFreq, baseFreq * 1.25, baseFreq * 1.5]; // Chủ, trưởng 3, quãng 5
    notes.forEach((freq, index) => {
      const noteTime = time + (index * 0.06);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);
      
      gain.gain.setValueAtTime(0.15, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.15);
    });
  }

  // ===== TIẾNG GAME OVER =====
  playGameOver() {
    if (!this.soundEnabled) return;
    this.resumeContext();
    if (!this.ctx) return;

    const time = this.ctx.currentTime;
    const notes = [220, 207.65, 196, 174.61]; // A3 -> G#3 -> G3 -> F3 (Hợp âm đi xuống buồn bã)
    
    notes.forEach((freq, index) => {
      const noteTime = time + (index * 0.15);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.15, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.4);
    });
  }

  // ===== NHẠC NỀN (BGM SYNTH PAD) =====
  startMusic() {
    if (!this.musicEnabled || this.isPlayingMusic) return;
    this.resumeContext();
    if (!this.ctx) return;

    this.isPlayingMusic = true;
    const time = this.ctx.currentTime;

    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.setValueAtTime(0.0, time);
    // Fade in nhạc nền từ từ
    this.bgmGain.gain.linearRampToValueAtTime(0.05, time + 2.0);
    this.bgmGain.connect(this.ctx.destination);

    // Chơi hợp âm pad chậm rãi (ví dụ: vòng hợp âm Cmaj7 - Am7 - Fmaj7 - G6)
    const chordProgression = [
      [130.81, 164.81, 196.00, 246.94], // Cmaj7 (C3, E3, G3, B3)
      [110.00, 130.81, 164.81, 196.00], // Am7   (A2, C3, E3, G3)
      [87.31,  130.81, 174.61, 218.08], // Fmaj7 (F2, C3, F3, A3)
      [98.00,  146.83, 196.00, 246.94]  // G6    (G2, D3, G3, B3)
    ];

    let currentChordIdx = 0;

    const playNextChord = () => {
      if (!this.isPlayingMusic) return;

      const duration = 6.0; // Thời gian mỗi hợp âm kéo dài 6s
      const now = this.ctx.currentTime;
      const chord = chordProgression[currentChordIdx];

      // Dọn dẹp osc cũ
      this.bgmOscs = this.bgmOscs.filter(oscObj => {
        if (oscObj.stopTime <= now) {
          return false;
        }
        return true;
      });

      // Tạo các oscillator mới cho hợp âm
      chord.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const localGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Hiệu ứng detune nhỏ để tạo độ dày không gian (chorus effect)
        osc.detune.setValueAtTime((Math.random() * 10) - 5, now);

        // Fade in/out mượt mà cho từng nốt trong hợp âm
        localGain.gain.setValueAtTime(0.0, now);
        localGain.gain.linearRampToValueAtTime(0.25, now + 1.5); // fade in 1.5s
        localGain.gain.setValueAtTime(0.25, now + duration - 1.5);
        localGain.gain.linearRampToValueAtTime(0.0, now + duration); // fade out 1.5s

        osc.connect(localGain);
        localGain.connect(this.bgmGain);

        osc.start(now);
        osc.stop(now + duration);

        this.bgmOscs.push({
          osc,
          stopTime: now + duration
        });
      });

      currentChordIdx = (currentChordIdx + 1) % chordProgression.length;

      // Lên lịch hợp âm tiếp theo trước 0.1s khi kết thúc hợp âm hiện tại
      this.bgmTimeout = setTimeout(playNextChord, (duration - 0.1) * 1000);
    };

    playNextChord();
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.bgmTimeout) {
      clearTimeout(this.bgmTimeout);
    }
    
    // Fade out nhạc nền trước khi ngắt hẳn
    if (this.ctx && this.bgmGain) {
      const now = this.ctx.currentTime;
      try {
        this.bgmGain.gain.setValueAtTime(this.bgmGain.gain.value, now);
        this.bgmGain.gain.linearRampToValueAtTime(0.0, now + 0.5);
      } catch (e) {}
    }

    setTimeout(() => {
      this.bgmOscs.forEach(obj => {
        try {
          obj.osc.stop();
        } catch (e) {}
      });
      this.bgmOscs = [];
      if (this.bgmGain) {
        try {
          this.bgmGain.disconnect();
        } catch(e) {}
          this.bgmGain = null;
      }
    }, 500);
  }
}

// Khởi tạo một đối tượng synthesizer toàn cục
const audio = new AudioSynthesizer();
