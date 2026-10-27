import { useCallback, useEffect, useRef, useState } from 'react';
import { FaBolt, FaPlay, FaRedo, FaTrophy, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { IoClose, IoRocketOutline } from 'react-icons/io5';

// Synthesized Sound Effects via Web Audio API (Zero external assets needed)
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  laser() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(850, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.12);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  explosion(isBig = false) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const duration = isBig ? 0.35 : 0.2;
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(isBig ? 450 : 750, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + duration);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(isBig ? 0.35 : 0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    } catch (e) {}
  }

  powerup() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.25);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }

  gameOver() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.45);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {}
  }

  bossAlert() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      for (let i = 0; i < 2; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        const startTime = now + i * 0.18;
        osc.frequency.setValueAtTime(360, startTime);
        osc.frequency.exponentialRampToValueAtTime(140, startTime + 0.16);
        gain.gain.setValueAtTime(0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.16);
      }
    } catch (e) {}
  }

  bossShot() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.18);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch (e) {}
  }

  skillUnlocked() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [440, 554, 659, 880];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const startTime = now + idx * 0.08;
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.24, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch (e) {}
  }
}

const sfx = new SoundFX();

const BOSS_NAMES = [
  'INFERNO COLOSSUS',
  'VOID BEHEMOTH',
  'PULSAR OMEGA',
  'DARK MATTER TITAN',
  'SINGULARITY DREADNOUGHT',
];

const BOSS_THEMES = [
  { primary: '#EA580C', secondary: '#F97316', core: '#FDE047' },
  { primary: '#9333EA', secondary: '#C084FC', core: '#F472B6' },
  { primary: '#0891B2', secondary: '#22D3EE', core: '#67E8F9' },
  { primary: '#DC2626', secondary: '#F87171', core: '#FCA5A5' },
  { primary: '#D97706', secondary: '#FBBF24', core: '#FEF08A' },
];

const WEAPONS = {
  default: {
    id: 'default',
    name: 'Dual Plasma',
    icon: '🔫',
    color: '#F97316',
    badge: 'DEFAULT',
    desc: 'Rapid dual plasma laser',
  },
  fire: {
    id: 'fire',
    name: 'Inferno Flame',
    icon: '🔥',
    color: '#EF4444',
    badge: 'FIRE AoE',
    desc: 'Explosive fireballs with area splash damage',
    elements: ['fire'],
  },
  ice: {
    id: 'ice',
    name: 'Glacial Frost',
    icon: '❄️',
    color: '#38BDF8',
    badge: 'ICE SLOW',
    desc: 'Freezes and slows targets down by 50%',
    elements: ['ice'],
  },
  lightning: {
    id: 'lightning',
    name: 'Tesla Arc',
    icon: '⚡',
    color: '#FACC15',
    badge: 'VOLT CHAIN',
    desc: 'Chains electric damage to adjacent enemies',
    elements: ['lightning'],
  },
  rocket: {
    id: 'rocket',
    name: 'Micro Missile',
    icon: '🚀',
    color: '#F59E0B',
    badge: 'HOMING 2X',
    desc: 'Self-guided homing missiles with heavy blast',
    elements: ['rocket'],
  },
  poison: {
    id: 'poison',
    name: 'Venom Spitter',
    icon: '☠️',
    color: '#A3E635',
    badge: 'POISON DoT',
    desc: 'Poison damage over time',
    elements: ['poison'],
  },
  wind: {
    id: 'wind',
    name: 'Cyclone Lance',
    icon: '🌪️',
    color: '#67E8F9',
    badge: 'WIND PIERCE',
    desc: 'Fast piercing wind blades',
    elements: ['wind'],
  },
  earth: {
    id: 'earth',
    name: 'Quake Shard',
    icon: '🪨',
    color: '#C08457',
    badge: 'EARTH BURST',
    desc: 'Heavy shards with impact damage',
    elements: ['earth'],
  },
  light: {
    id: 'light',
    name: 'Solar Ray',
    icon: '☀️',
    color: '#FDE68A',
    badge: 'SOLAR BEAM',
    desc: 'High-speed radiant bolts',
    elements: ['light'],
  },
  shadow: {
    id: 'shadow',
    name: 'Abyss Orb',
    icon: '🌑',
    color: '#C084FC',
    badge: 'VOID BURST',
    desc: 'Dark orbs that deal bonus damage',
    elements: ['shadow'],
  },
  ice_lightning: {
    id: 'ice_lightning',
    name: 'Permafrost Storm',
    icon: '🌩️',
    color: '#67E8F9',
    badge: 'ICE + VOLT',
    desc: 'Freezing lightning chains',
    elements: ['ice', 'lightning'],
  },
  fire_lightning: {
    id: 'fire_lightning',
    name: 'Plasma Inferno',
    icon: '⚡🔥',
    color: '#FB7185',
    badge: 'PLASMA AoE',
    desc: 'Explosive plasma that chains to nearby targets',
    elements: ['fire', 'lightning'],
  },
  ice_wind: {
    id: 'ice_wind',
    name: 'Absolute Zero',
    icon: '❄️🌪️',
    color: '#A5F3FC',
    badge: 'FROST PIERCER',
    desc: 'Piercing frost blades that slow targets',
    elements: ['ice', 'wind'],
  },
  poison_fire: {
    id: 'poison_fire',
    name: 'Toxic Blaze',
    icon: '☣️🔥',
    color: '#BEF264',
    badge: 'TOXIC AoE',
    desc: 'Burning poison spreads damage around impact',
    elements: ['poison', 'fire'],
  },
  shadow_light: {
    id: 'shadow_light',
    name: 'Eclipse Beam',
    icon: '🌘',
    color: '#E9D5FF',
    badge: 'ECLIPSE',
    desc: 'Light and void energy with bonus damage',
    elements: ['shadow', 'light'],
  },
  rocket_lightning: {
    id: 'rocket_lightning',
    name: 'Storm Seeker',
    icon: '🚀⚡',
    color: '#FDE047',
    badge: 'HOMING CHAIN',
    desc: 'Homing missiles that arc lightning on impact',
    elements: ['rocket', 'lightning'],
  },
};

const ELEMENT_COMBOS = {
  'ice+lightning': 'ice_lightning',
  'fire+lightning': 'fire_lightning',
  'ice+wind': 'ice_wind',
  'fire+poison': 'poison_fire',
  'light+shadow': 'shadow_light',
  'lightning+rocket': 'rocket_lightning',
};

const ELEMENT_SKILLS = [
  'fire',
  'ice',
  'lightning',
  'rocket',
  'poison',
  'wind',
  'earth',
  'light',
  'shadow',
];

const getWeaponElements = weaponId => WEAPONS[weaponId]?.elements || [];
const combineWeapons = (currentId, pickedId) => {
  const current = getWeaponElements(currentId);
  const picked = getWeaponElements(pickedId);
  if (!current.length) return pickedId;
  if (!picked.length) return 'default';
  if (current.length === 1 && picked.length === 1 && current[0] === picked[0]) return currentId;
  const key = [...new Set([...current, ...picked])].sort().join('+');
  return ELEMENT_COMBOS[key] || 'default';
};

export default function MeteorShooterModal({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [gameState, setGameState] = useState('start'); // 'start' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return Number(localStorage.getItem('meteor_highscore') || 0);
  });
  const [lives, setLives] = useState(3);
  const [wave, setWave] = useState(1);
  const [soundOn, setSoundOn] = useState(true);
  const [tripleShotTimer, setTripleShotTimer] = useState(0);
  const [weapon, setWeapon] = useState('default');

  // References for mutable game loop state to avoid React re-render lag
  const gameRef = useRef({
    player: {
      x: 200,
      y: 460,
      width: 32,
      height: 38,
      speed: 6.5,
      tilt: 0,
      shield: false,
      tripleShotTime: 0,
      lastShotTime: 0,
      weapon: 'default',
    },
    keys: {
      left: false,
      right: false,
      up: false,
      down: false,
      shoot: false,
    },
    lasers: [],
    meteors: [],
    particles: [],
    stars: [],
    powerups: [],
    waveKills: 0,
    boss: null,
    bossProjectiles: [],
    bossWarning: null,
    bossVictory: null,
    lastSpawnTime: 0,
    spawnInterval: 1200,
    width: 400,
    height: 550,
    score: 0,
    lives: 3,
    wave: 1,
    animationId: null,
    touchX: null,
  });

  // Toggle sound
  const toggleSound = () => {
    sfx.enabled = !soundOn;
    setSoundOn(!soundOn);
  };

  // Resize canvas according to display width
  const updateCanvasDimensions = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const contWidth = containerRef.current.clientWidth || 360;
    // Keep responsive ratio on mobile, cap max width to 420px
    const targetW = Math.max(300, Math.min(contWidth, 420));
    const targetH = Math.max(420, Math.min(window.innerHeight * 0.68, targetW * 1.35));

    const canvas = canvasRef.current;
    canvas.width = targetW;
    canvas.height = targetH;

    gameRef.current.width = targetW;
    gameRef.current.height = targetH;
    if (gameState === 'start') {
      gameRef.current.player.x = targetW / 2;
      gameRef.current.player.y = targetH - 80;
    }
  }, [gameState]);

  useEffect(() => {
    if (isOpen) {
      // Lock background page from scrolling and receiving touch gestures while game modal is active
      const origBodyOverflow = document.body.style.overflow;
      const origHtmlOverflow = document.documentElement.style.overflow;
      const origTouchAction = document.body.style.touchAction;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      const preventBackgroundTouch = e => {
        if (containerRef.current && containerRef.current.contains(e.target)) {
          return;
        }
        e.preventDefault();
      };
      window.addEventListener('touchmove', preventBackgroundTouch, { passive: false });

      updateCanvasDimensions();
      const timer = setTimeout(updateCanvasDimensions, 50);
      window.addEventListener('resize', updateCanvasDimensions);
      // Init stars
      const stars = [];
      const w = gameRef.current.width || 400;
      const h = gameRef.current.height || 550;
      for (let i = 0; i < 60; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 1.8 + 0.6,
          speed: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.7 + 0.3,
        });
      }
      gameRef.current.stars = stars;
      return () => {
        document.body.style.overflow = origBodyOverflow;
        document.documentElement.style.overflow = origHtmlOverflow;
        document.body.style.touchAction = origTouchAction;
        window.removeEventListener('touchmove', preventBackgroundTouch);
        clearTimeout(timer);
        window.removeEventListener('resize', updateCanvasDimensions);
        if (gameRef.current.animationId) {
          cancelAnimationFrame(gameRef.current.animationId);
        }
      };
    }
  }, [isOpen, updateCanvasDimensions]);

  // Start / Restart Game
  const startGame = () => {
    sfx.init();
    const g = gameRef.current;
    g.score = 0;
    g.lives = 3;
    g.wave = 1;
    g.waveKills = 0;
    g.boss = null;
    g.bossProjectiles = [];
    g.bossWarning = null;
    g.bossVictory = null;
    g.spawnInterval = 1200;
    g.lasers = [];
    g.meteors = [];
    g.particles = [];
    g.powerups = [];
    g.player.x = g.width / 2;
    g.player.y = g.height - 80;
    g.player.shield = false;
    g.player.tripleShotTime = 0;
    g.player.lastShotTime = 0;
    g.player.weapon = 'default';
    g.keys.shoot = false;

    setScore(0);
    setLives(3);
    setWave(1);
    setTripleShotTimer(0);
    setWeapon('default');
    setGameState('playing');
  };

  // Keyboard controls listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = e => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        gameRef.current.keys.left = true;
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        gameRef.current.keys.right = true;
      }
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        gameRef.current.keys.up = true;
      }
      if (['ArrowDown', 'KeyS'].includes(e.code)) {
        gameRef.current.keys.down = true;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        gameRef.current.keys.shoot = true;
        if (gameState !== 'playing') {
          startGame();
        }
      }
    };

    const handleKeyUp = e => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        gameRef.current.keys.left = false;
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        gameRef.current.keys.right = false;
      }
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        gameRef.current.keys.up = false;
      }
      if (['ArrowDown', 'KeyS'].includes(e.code)) {
        gameRef.current.keys.down = false;
      }
      if (e.code === 'Space') {
        gameRef.current.keys.shoot = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, gameState]);

  // Touch & Mouse direct position controls
  const handlePointerMove = e => {
    if (gameState !== 'playing' || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const isTouch = Boolean(
      (e.touches && e.touches.length > 0) ||
      e.pointerType === 'touch' ||
      ('ontouchstart' in window && (e.touches || e.pointerType))
    );
    const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
    const relativeX = clientX - rect.left;
    const relativeY = clientY - rect.top;

    // Offset roket ke atas ~55px agar roket terlihat jelas di atas ujung jari dan tidak tertutup saat dimainkan di HP
    const touchYOffset = isTouch ? 55 : 0;
    const targetY = relativeY - touchYOffset;

    if (relativeX >= 15 && relativeX <= gameRef.current.width - 15) {
      gameRef.current.player.x = relativeX;
    }
    // Allow responsive vertical movement
    if (targetY >= gameRef.current.height * 0.35 && targetY <= gameRef.current.height - 48) {
      gameRef.current.player.y = targetY;
    }
  };

  const handlePointerDown = e => {
    if (gameState === 'playing') {
      gameRef.current.keys.shoot = true;
      handlePointerMove(e);
    }
  };

  const handlePointerUp = () => {
    gameRef.current.keys.shoot = false;
  };

  // Main Canvas Render & Physics Loop
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let lastTime = performance.now();

    const loop = currentTime => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const g = gameRef.current;
      const width = g.width;
      const height = g.height;
      const p = g.player;

      // 1. CLEAR & BACKGROUND
      ctx.fillStyle = '#030014';
      ctx.fillRect(0, 0, width, height);

      // Stars parallax
      ctx.fillStyle = '#FFFFFF';
      g.stars.forEach(star => {
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      // Accretion disk ambient glow at top
      const glowGrad = ctx.createRadialGradient(width / 2, -20, 10, width / 2, -20, width * 0.8);
      glowGrad.addColorStop(0, 'rgba(249, 115, 22, 0.25)');
      glowGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.15)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. PLAYING UPDATES
      if (gameState === 'playing') {
        // Player keyboard motion
        if (g.keys.left) p.x -= p.speed;
        if (g.keys.right) p.x += p.speed;
        if (g.keys.up) p.y -= p.speed;
        if (g.keys.down) p.y += p.speed;

        // Boundaries
        p.x = Math.max(18, Math.min(width - 18, p.x));
        p.y = Math.max(height * 0.35, Math.min(height - 48, p.y));

        // Tilt calculation
        const targetTilt = g.keys.left ? -0.3 : g.keys.right ? 0.3 : 0;
        p.tilt += (targetTilt - p.tilt) * 0.2;

        // Triple shot cooldown count
        if (p.tripleShotTime > 0) {
          p.tripleShotTime -= delta;
          setTripleShotTimer(Math.ceil(p.tripleShotTime));
        }

        // Automatic / Pressed Shooting with Permanent Elemental Weapon
        const currentWep = p.weapon || 'default';
        const wepInfo = WEAPONS[currentWep] || WEAPONS.default;
        const shootInterval =
          currentWep === 'rocket' ? 280 : currentWep === 'lightning' ? 150 : 180;

        if (g.keys.shoot && currentTime - p.lastShotTime > shootInterval) {
          p.lastShotTime = currentTime;
          sfx.laser();

          const makeShot = (x, y, vx, vy) => ({
            x,
            y,
            vx,
            vy,
            type: currentWep,
            elements: getWeaponElements(currentWep),
            color: wepInfo.color,
            radius: currentWep === 'rocket' ? 5.5 : currentWep === 'fire' ? 4.5 : 3.5,
            damage: currentWep === 'rocket' ? 2 : 1,
            life: 0,
          });

          if (p.tripleShotTime > 0) {
            // Triple spread with active elemental weapon!
            g.lasers.push(
              makeShot(p.x, p.y - 18, 0, -12),
              makeShot(p.x - 10, p.y - 12, -2.2, -11.5),
              makeShot(p.x + 10, p.y - 12, 2.2, -11.5)
            );
          } else {
            // Dual laser with active elemental weapon!
            g.lasers.push(makeShot(p.x - 7, p.y - 16, 0, -12), makeShot(p.x + 7, p.y - 16, 0, -12));
          }
        }

        // Wave Boss Trigger Check: When wave kill quota is met, summon the Wave Boss!
        const targetKillsForBoss = 8 + g.wave * 3; // e.g. Wave 1: 8 meteors, Wave 2: 10 meteors
        if (!g.boss && !g.bossWarning && g.waveKills >= targetKillsForBoss) {
          const themeIndex = (g.wave - 1) % BOSS_THEMES.length;
          const theme = BOSS_THEMES[themeIndex];
          const bossName = BOSS_NAMES[Math.min(g.wave - 1, BOSS_NAMES.length - 1)];
          const bossRadius = Math.min(36 + g.wave * 3, 54);
          const bossHp = 16 + (g.wave - 1) * 12;

          const numVerts = 10 + Math.floor(Math.random() * 4);
          const vertices = [];
          for (let vi = 0; vi < numVerts; vi++) {
            const angle = (vi / numVerts) * Math.PI * 2;
            const r = bossRadius * (0.85 + Math.random() * 0.3);
            vertices.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
          }

          g.boss = {
            name: bossName,
            x: width / 2,
            y: -bossRadius - 25,
            targetY: 85,
            radius: bossRadius,
            hp: bossHp,
            maxHp: bossHp,
            vx: 1.8 + g.wave * 0.25,
            theme,
            rotation: 0,
            rotSpeed: 0.012,
            lastAttackTime: currentTime + 1000,
            attackInterval: Math.max(1500, 2400 - g.wave * 100),
            vertices,
            flashTimer: 0,
          };

          sfx.bossAlert();
          g.bossWarning = {
            text: `⚠️ TITAN DETECTED: ${bossName} ⚠️`,
            timer: 2.5,
          };
        }

        // Countdown Boss Warning / Victory Banners
        if (g.bossWarning) {
          g.bossWarning.timer -= delta;
          if (g.bossWarning.timer <= 0) g.bossWarning = null;
        }
        if (g.bossVictory) {
          g.bossVictory.timer -= delta;
          if (g.bossVictory.timer <= 0) g.bossVictory = null;
        }

        // Spawn Regular Meteors only when Boss is NOT active
        if (
          !g.boss &&
          (!g.bossWarning || g.bossWarning.timer <= 0) &&
          currentTime - g.lastSpawnTime > g.spawnInterval
        ) {
          g.lastSpawnTime = currentTime;
          // Meteor types: regular, fast, huge rock
          const roll = Math.random();
          let type = 'regular';
          let radius = 16 + Math.random() * 8;
          let hp = 1;
          let speed = 2.0 + Math.random() * 1.5 + g.wave * 0.25;
          let color = '#E06D28';

          if (roll > 0.91) {
            type = 'huge';
            radius = 30 + Math.random() * 6;
            hp = 3;
            speed = 1.3 + g.wave * 0.15;
            color = '#A855F7';
          } else if (roll < 0.34) {
            type = 'fast';
            radius = 12;
            hp = 1;
            speed = 3.6 + Math.random() * 1.2 + g.wave * 0.3;
            color = '#EF4444';
          }

          // Generate jagged polygon vertices
          const numVerts = 7 + Math.floor(Math.random() * 4);
          const vertices = [];
          for (let i = 0; i < numVerts; i++) {
            const angle = (i / numVerts) * Math.PI * 2;
            const r = radius * (0.8 + Math.random() * 0.4);
            vertices.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
          }

          g.meteors.push({
            x: 20 + Math.random() * (width - 40),
            y: -radius - 10,
            radius,
            hp,
            maxHp: hp,
            speed,
            color,
            type,
            rotation: 0,
            rotSpeed: (Math.random() - 0.5) * 0.05,
            vertices,
          });

          // Accelerate spawn frequency gradually
          g.spawnInterval = Math.max(280, 1150 - g.wave * 55 - g.score * 0.3);
        }
      }

      // 3. UPDATE & DRAW ELEMENTAL PROJECTILES
      for (let i = g.lasers.length - 1; i >= 0; i--) {
        const l = g.lasers[i];

        // Homing behavior for Micro Missiles
        if (l.type === 'rocket') {
          let target = null;
          if (g.boss && g.boss.y > -20) {
            target = g.boss;
          } else {
            let closestDist = 9999;
            for (const m of g.meteors) {
              if (m.y < l.y + 30) {
                const d = Math.hypot(m.x - l.x, m.y - l.y);
                if (d < closestDist) {
                  closestDist = d;
                  target = m;
                }
              }
            }
          }
          if (target) {
            const dx = target.x - l.x;
            l.vx += Math.sign(dx) * 0.42;
            l.vx = Math.max(-4.2, Math.min(4.2, l.vx));
          }

          // Missile smoke trail
          if (Math.random() < 0.35) {
            g.particles.push({
              x: l.x,
              y: l.y + 6,
              vx: (Math.random() - 0.5) * 0.6,
              vy: 1.5,
              size: 2,
              color: '#94A3B8',
              alpha: 0.5,
              life: 0.3,
            });
          }
        }

        l.x += l.vx;
        l.y += l.vy;

        // Custom visuals for each elemental weapon
        ctx.save();
        if (l.type === 'rocket') {
          ctx.translate(l.x, l.y);
          ctx.rotate(Math.atan2(l.vy, l.vx) + Math.PI / 2);
          ctx.fillStyle = '#F59E0B';
          ctx.shadowColor = '#F97316';
          ctx.shadowBlur = 10;
          ctx.fillRect(-2.5, -6, 5, 12);
          ctx.fillStyle = '#EF4444';
          ctx.beginPath();
          ctx.moveTo(-2.5, -6);
          ctx.lineTo(0, -11);
          ctx.lineTo(2.5, -6);
          ctx.closePath();
          ctx.fill();
        } else if (l.type === 'fire') {
          ctx.shadowColor = '#EF4444';
          ctx.shadowBlur = 14;
          ctx.fillStyle = '#EF4444';
          ctx.beginPath();
          ctx.arc(l.x, l.y, 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#FDE047';
          ctx.beginPath();
          ctx.arc(l.x, l.y, 2.2, 0, Math.PI * 2);
          ctx.fill();
        } else if (l.type === 'ice') {
          ctx.shadowColor = '#38BDF8';
          ctx.shadowBlur = 12;
          ctx.fillStyle = '#38BDF8';
          ctx.beginPath();
          ctx.moveTo(l.x, l.y - 7);
          ctx.lineTo(l.x + 3.5, l.y);
          ctx.lineTo(l.x, l.y + 7);
          ctx.lineTo(l.x - 3.5, l.y);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(l.x, l.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (l.type === 'poison' || l.type === 'poison_fire') {
          ctx.shadowColor = l.color;
          ctx.shadowBlur = 14;
          ctx.fillStyle = l.color;
          ctx.beginPath();
          ctx.arc(l.x, l.y, 4.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (l.type === 'wind' || l.type === 'ice_wind') {
          ctx.shadowColor = l.color;
          ctx.shadowBlur = 12;
          ctx.fillStyle = l.color;
          ctx.beginPath();
          ctx.moveTo(l.x, l.y - 9);
          ctx.lineTo(l.x + 4, l.y);
          ctx.lineTo(l.x, l.y + 9);
          ctx.lineTo(l.x - 4, l.y);
          ctx.closePath();
          ctx.fill();
        } else if (l.type === 'earth') {
          ctx.shadowColor = l.color;
          ctx.shadowBlur = 10;
          ctx.fillStyle = l.color;
          ctx.beginPath();
          ctx.moveTo(l.x, l.y - 6);
          ctx.lineTo(l.x + 5, l.y + 3);
          ctx.lineTo(l.x - 4, l.y + 5);
          ctx.closePath();
          ctx.fill();
        } else if (l.type === 'light' || l.type === 'shadow_light') {
          ctx.shadowColor = l.color;
          ctx.shadowBlur = 18;
          ctx.strokeStyle = l.color;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(l.x, l.y + 8);
          ctx.lineTo(l.x, l.y - 8);
          ctx.stroke();
        } else if (l.type === 'shadow') {
          ctx.shadowColor = l.color;
          ctx.shadowBlur = 15;
          ctx.fillStyle = l.color;
          ctx.beginPath();
          ctx.arc(l.x, l.y, 5, 0, Math.PI * 2);
          ctx.fill();
        } else if (
          l.type === 'lightning' ||
          l.type === 'ice_lightning' ||
          l.type === 'fire_lightning' ||
          l.type === 'rocket_lightning'
        ) {
          ctx.shadowColor = '#FACC15';
          ctx.shadowBlur = 14;
          ctx.strokeStyle = '#FACC15';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(l.x, l.y);
          ctx.lineTo(l.x + (Math.random() - 0.5) * 5, l.y + 6);
          ctx.lineTo(l.x, l.y + 14);
          ctx.stroke();
        } else {
          // Standard laser
          ctx.shadowColor = l.color;
          ctx.shadowBlur = 10;
          ctx.strokeStyle = l.color;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(l.x, l.y);
          ctx.lineTo(l.x - l.vx * 0.8, l.y + 10);
          ctx.stroke();
        }
        ctx.restore();

        // Offscreen check
        if (l.y < -25 || l.x < -15 || l.x > width + 15) {
          g.lasers.splice(i, 1);
        }
      }

      // 4. UPDATE & DRAW METEORS
      for (let i = g.meteors.length - 1; i >= 0; i--) {
        const m = g.meteors[i];
        if (m.slowTimer > 0) m.slowTimer -= delta;
        if (m.poisonTimer > 0) {
          m.poisonTimer -= delta;
          m.poisonTick = (m.poisonTick || 0) + delta;
          if (m.poisonTick >= 0.5) {
            m.hp -= 1;
            m.poisonTick = 0;
          }
        }
        m.y += m.speed;
        m.rotation += m.rotSpeed;

        // Meteor Trail / Aura
        ctx.save();
        ctx.translate(m.x, m.y);
        ctx.rotate(m.rotation);

        // Core rock gradient
        const rockGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, m.radius);
        rockGrad.addColorStop(0, '#FDBA74');
        rockGrad.addColorStop(0.35, m.color);
        rockGrad.addColorStop(1, '#1E112A');

        ctx.fillStyle = rockGrad;
        ctx.shadowColor = m.color;
        ctx.shadowBlur = m.type === 'huge' ? 18 : 8;
        ctx.beginPath();
        m.vertices.forEach((v, idx) => {
          if (idx === 0) ctx.moveTo(v.x, v.y);
          else ctx.lineTo(v.x, v.y);
        });
        ctx.closePath();
        ctx.fill();

        // Inner glowing craters
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.arc(-m.radius * 0.3, -m.radius * 0.2, m.radius * 0.22, 0, Math.PI * 2);
        ctx.fill();

        // Frost crystal overlay if slowed by Ice weapon
        if (m.slowTimer > 0) {
          ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
          ctx.beginPath();
          ctx.arc(0, 0, m.radius + 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // Laser vs Meteor Collision
        for (let j = g.lasers.length - 1; j >= 0; j--) {
          const l = g.lasers[j];
          const dist = Math.hypot(m.x - l.x, m.y - l.y);
          if (dist < m.radius + 6) {
            // Hit!
            const elements = l.elements || getWeaponElements(l.type);
            const dmg =
              (l.damage || 1) + (elements.includes('earth') || elements.includes('shadow') ? 1 : 0);
            m.hp -= dmg;
            if (elements.includes('poison')) {
              m.poisonTimer = 2.5;
              m.poisonDamage = 0.5;
            }
            const hitType = l.type;
            const hitX = l.x;
            const hitY = l.y;
            g.lasers.splice(j, 1);

            // Special Elemental On-Hit Effects:
            if ((l.elements || getWeaponElements(hitType)).includes('fire')) {
              // AoE Fire Splash
              for (const otherM of g.meteors) {
                if (otherM !== m && Math.hypot(otherM.x - hitX, otherM.y - hitY) < 50) {
                  otherM.hp -= 1;
                }
              }
              if (g.boss && Math.hypot(g.boss.x - hitX, g.boss.y - hitY) < 55) {
                g.boss.hp -= 1;
                g.boss.flashTimer = 0.08;
              }
              for (let k = 0; k < 10; k++) {
                const angle = Math.random() * Math.PI * 2;
                const spd = Math.random() * 4 + 1.5;
                g.particles.push({
                  x: hitX,
                  y: hitY,
                  vx: Math.cos(angle) * spd,
                  vy: Math.sin(angle) * spd,
                  size: Math.random() * 3 + 1.5,
                  color: k % 2 === 0 ? '#EF4444' : '#F59E0B',
                  alpha: 1,
                  life: 0.4,
                });
              }
            } else if ((l.elements || getWeaponElements(hitType)).includes('ice')) {
              // Ice Freeze & Slow
              m.slowTimer = 3.5;
              m.speed = Math.max(0.6, m.speed * 0.45);
              for (let k = 0; k < 8; k++) {
                g.particles.push({
                  x: hitX,
                  y: hitY,
                  vx: (Math.random() - 0.5) * 4,
                  vy: (Math.random() - 0.5) * 4,
                  size: Math.random() * 2.5 + 1,
                  color: '#38BDF8',
                  alpha: 1,
                  life: 0.4,
                });
              }
            } else if ((l.elements || getWeaponElements(hitType)).includes('lightning')) {
              // Lightning Chain Arc to nearby meteors
              let chained = 0;
              for (const otherM of g.meteors) {
                if (otherM !== m && chained < 2) {
                  const d = Math.hypot(otherM.x - hitX, otherM.y - hitY);
                  if (d < 130) {
                    otherM.hp -= 1;
                    chained++;
                    for (let k = 0; k < 4; k++) {
                      g.particles.push({
                        x: (hitX + otherM.x) / 2,
                        y: (hitY + otherM.y) / 2,
                        vx: (Math.random() - 0.5) * 4,
                        vy: (Math.random() - 0.5) * 4,
                        size: 2,
                        color: '#FACC15',
                        alpha: 1,
                        life: 0.3,
                      });
                    }
                  }
                }
              }
            } else if ((l.elements || getWeaponElements(hitType)).includes('rocket')) {
              // Rocket heavy blast particles
              for (let k = 0; k < 12; k++) {
                const angle = Math.random() * Math.PI * 2;
                const spd = Math.random() * 5 + 1.5;
                g.particles.push({
                  x: hitX,
                  y: hitY,
                  vx: Math.cos(angle) * spd,
                  vy: Math.sin(angle) * spd,
                  size: Math.random() * 3.5 + 1.5,
                  color: '#F59E0B',
                  alpha: 1,
                  life: 0.45,
                });
              }
            }

            // Small hit sparks
            for (let k = 0; k < 4; k++) {
              g.particles.push({
                x: hitX,
                y: hitY,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                size: Math.random() * 2.5 + 1,
                color: '#FCD34D',
                alpha: 1,
                life: 0.35,
              });
            }

            if (m.hp <= 0) {
              // Meteor destroyed!
              sfx.explosion(m.type === 'huge');
              const earnedPts = m.type === 'huge' ? 150 : m.type === 'fast' ? 80 : 40;
              g.score += earnedPts;
              setScore(g.score);
              g.waveKills += 1;

              // Explosion Debris
              const particleCount = m.type === 'huge' ? 28 : 14;
              for (let k = 0; k < particleCount; k++) {
                const angle = Math.random() * Math.PI * 2;
                const spd = Math.random() * 5 + 1.5;
                g.particles.push({
                  x: m.x,
                  y: m.y,
                  vx: Math.cos(angle) * spd,
                  vy: Math.sin(angle) * spd,
                  size: Math.random() * 3.5 + 1.5,
                  color: k % 2 === 0 ? '#F97316' : '#F59E0B',
                  alpha: 1,
                  life: 0.55 + Math.random() * 0.3,
                });
              }

              // Power-up Drop Chance
              if (Math.random() < Math.min(0.28, 0.16 + g.wave * 0.01)) {
                const pType = Math.random() > 0.5 ? 'triple' : 'shield';
                g.powerups.push({
                  x: m.x,
                  y: m.y,
                  type: pType,
                  vy: 2.0,
                  pulse: 0,
                });
              }

              g.meteors.splice(i, 1);
              break;
            }
          }
        }

        // Meteor vs Player Collision
        if (gameState === 'playing' && g.meteors[i]) {
          const pDist = Math.hypot(m.x - p.x, m.y - p.y);
          if (pDist < m.radius + 16) {
            // Player struck
            g.meteors.splice(i, 1);
            sfx.explosion(true);

            // Screen flash / shockwave
            for (let k = 0; k < 25; k++) {
              const angle = Math.random() * Math.PI * 2;
              const spd = Math.random() * 6 + 2;
              g.particles.push({
                x: p.x,
                y: p.y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                size: Math.random() * 4 + 2,
                color: '#EF4444',
                alpha: 1,
                life: 0.6,
              });
            }

            if (p.shield) {
              p.shield = false;
            } else {
              g.lives -= 1;
              setLives(g.lives);
              if (g.lives <= 0) {
                // Game Over!
                sfx.gameOver();
                setGameState('gameover');
                if (g.score > highScore) {
                  setHighScore(g.score);
                  localStorage.setItem('meteor_highscore', g.score);
                }
              }
            }
          }
        }

        // Passed offscreen
        if (m.y > height + 50) {
          g.meteors.splice(i, 1);
        }
      }

      // 4.5. UPDATE & DRAW WAVE TITAN BOSS
      if (g.boss) {
        const b = g.boss;
        b.rotation += b.rotSpeed;
        if (b.flashTimer > 0) b.flashTimer -= delta;

        // Smooth entry into upper combat arena
        if (b.y < b.targetY) {
          b.y += 1.8;
        } else {
          // Patrol side to side
          b.x += b.vx;
          if (b.x > width - b.radius - 12) {
            b.x = width - b.radius - 12;
            b.vx *= -1;
          } else if (b.x < b.radius + 12) {
            b.x = b.radius + 12;
            b.vx *= -1;
          }
        }

        // Boss Plasma Weapon Attack
        if (currentTime - b.lastAttackTime > b.attackInterval && b.y >= b.targetY - 15) {
          b.lastAttackTime = currentTime;
          sfx.bossShot();
          if (g.wave === 1) {
            // Wave 1: Single focused plasma ball
            g.bossProjectiles.push({
              x: b.x,
              y: b.y + b.radius * 0.7,
              vx: 0,
              vy: 3.5,
              radius: 6.5,
              color: b.theme.secondary,
            });
          } else if (g.wave === 2) {
            // Wave 2: Dual plasma stream
            g.bossProjectiles.push(
              {
                x: b.x - 14,
                y: b.y + b.radius * 0.7,
                vx: -1.3,
                vy: 3.6,
                radius: 6.5,
                color: b.theme.secondary,
              },
              {
                x: b.x + 14,
                y: b.y + b.radius * 0.7,
                vx: 1.3,
                vy: 3.6,
                radius: 6.5,
                color: b.theme.secondary,
              }
            );
          } else {
            // Wave 3+: Triple plasma spread
            g.bossProjectiles.push(
              {
                x: b.x,
                y: b.y + b.radius * 0.7,
                vx: 0,
                vy: 3.8,
                radius: 7,
                color: b.theme.secondary,
              },
              {
                x: b.x - 16,
                y: b.y + b.radius * 0.7,
                vx: -2.0,
                vy: 3.5,
                radius: 7,
                color: b.theme.secondary,
              },
              {
                x: b.x + 16,
                y: b.y + b.radius * 0.7,
                vx: 2.0,
                vy: 3.5,
                radius: 7,
                color: b.theme.secondary,
              }
            );
          }
        }

        // Render Boss Rock & Energy Shield
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rotation);

        // Radiant Outer Aura
        ctx.shadowColor = b.theme.secondary;
        ctx.shadowBlur = 24;
        ctx.strokeStyle = b.theme.secondary;
        ctx.lineWidth = 2.8;
        ctx.beginPath();
        ctx.arc(0, 0, b.radius + 6, 0, Math.PI * 2);
        ctx.stroke();

        // Polygon Rock Core
        if (b.flashTimer > 0) {
          ctx.fillStyle = '#FFFFFF';
        } else {
          const bossGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, b.radius);
          bossGrad.addColorStop(0, b.theme.core);
          bossGrad.addColorStop(0.35, b.theme.primary);
          bossGrad.addColorStop(1, '#080214');
          ctx.fillStyle = bossGrad;
        }

        ctx.beginPath();
        b.vertices.forEach((v, idx) => {
          if (idx === 0) ctx.moveTo(v.x, v.y);
          else ctx.lineTo(v.x, v.y);
        });
        ctx.closePath();
        ctx.fill();

        // Glowing center core
        ctx.fillStyle = b.theme.core;
        ctx.beginPath();
        ctx.arc(0, 0, b.radius * 0.28, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Top Screen Boss Health Bar
        const barW = Math.min(width - 40, 280);
        const barH = 10;
        const barX = (width - barW) / 2;
        const barY = 16;
        const hpRatio = Math.max(0, b.hp / b.maxHp);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fillRect(barX - 2, barY - 14, barW + 4, barH + 18);
        ctx.strokeStyle = b.theme.secondary;
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barW, barH);

        const hpGrad = ctx.createLinearGradient(barX, barY, barX + barW * hpRatio, barY);
        hpGrad.addColorStop(0, b.theme.primary);
        hpGrad.addColorStop(1, b.theme.secondary);
        ctx.fillStyle = hpGrad;
        ctx.fillRect(barX, barY, barW * hpRatio, barH);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 9.5px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(`⚡ BOSS: ${b.name} (${b.hp}/${b.maxHp} HP)`, width / 2, barY - 2);

        // Player Laser Collision with Boss
        for (let j = g.lasers.length - 1; j >= 0; j--) {
          const l = g.lasers[j];
          const dist = Math.hypot(b.x - l.x, b.y - l.y);
          if (dist < b.radius + 8) {
            const dmg = l.damage || 1;
            b.hp -= dmg;
            b.flashTimer = 0.08;
            const hitType = l.type;
            const hitX = l.x;
            const hitY = l.y;
            g.lasers.splice(j, 1);

            // Special on-hit visual feedback for boss
            if (hitType === 'ice') {
              b.slowTimer = 2.5;
            } else if ((l.elements || getWeaponElements(hitType)).includes('fire')) {
              for (let k = 0; k < 6; k++) {
                g.particles.push({
                  x: hitX,
                  y: hitY,
                  vx: (Math.random() - 0.5) * 5,
                  vy: (Math.random() - 0.5) * 5,
                  size: 3,
                  color: '#EF4444',
                  alpha: 1,
                  life: 0.35,
                });
              }
            } else if ((l.elements || getWeaponElements(hitType)).includes('lightning')) {
              for (let k = 0; k < 6; k++) {
                g.particles.push({
                  x: hitX,
                  y: hitY,
                  vx: (Math.random() - 0.5) * 5,
                  vy: (Math.random() - 0.5) * 5,
                  size: 2.5,
                  color: '#FACC15',
                  alpha: 1,
                  life: 0.35,
                });
              }
            }

            for (let k = 0; k < 4; k++) {
              g.particles.push({
                x: hitX,
                y: hitY,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                size: Math.random() * 2.5 + 1.2,
                color: b.theme.core,
                alpha: 1,
                life: 0.35,
              });
            }

            if (b.hp <= 0) {
              sfx.explosion(true);
              const earnedPts = 1200 * g.wave;
              g.score += earnedPts;
              setScore(g.score);

              // Supernova Explosion
              for (let k = 0; k < 50; k++) {
                const angle = Math.random() * Math.PI * 2;
                const spd = Math.random() * 7 + 2;
                g.particles.push({
                  x: b.x,
                  y: b.y,
                  vx: Math.cos(angle) * spd,
                  vy: Math.sin(angle) * spd,
                  size: Math.random() * 4.5 + 2,
                  color: k % 3 === 0 ? b.theme.core : k % 3 === 1 ? b.theme.primary : '#FFFFFF',
                  alpha: 1,
                  life: 0.8 + Math.random() * 0.4,
                });
              }

              // Guaranteed Drop: Permanent Elemental Skill Core + Powerups!
              const skillOrder = ELEMENT_SKILLS;
              const droppedSkill = skillOrder[(g.wave - 1) % skillOrder.length];

              g.powerups.push(
                { x: b.x, y: b.y - 14, type: 'skill', weaponType: droppedSkill, vy: 1.6, pulse: 0 },
                { x: b.x - 24, y: b.y + 12, type: 'triple', vy: 2.2, pulse: 0 },
                { x: b.x + 24, y: b.y + 12, type: 'shield', vy: 2.2, pulse: 0 }
              );

              const defeatedName = b.name;
              g.boss = null;
              g.wave += 1;
              g.waveKills = 0;
              setWave(g.wave);
              g.bossVictory = {
                text: `🏆 ${defeatedName} OBLITERATED! GRAB THE SKILL CORE!`,
                timer: 3.5,
              };
              break;
            }
          }
        }

        // Direct collision Boss vs Player
        if (g.boss) {
          const pDist = Math.hypot(b.x - p.x, b.y - p.y);
          if (pDist < b.radius + 18) {
            sfx.explosion(true);
            if (p.shield) {
              p.shield = false;
            } else {
              g.lives -= 1;
              setLives(g.lives);
              if (g.lives <= 0) {
                sfx.gameOver();
                setGameState('gameover');
                if (g.score > highScore) {
                  setHighScore(g.score);
                  localStorage.setItem('meteor_highscore', g.score);
                }
              }
            }
          }
        }
      }

      // 4.6. UPDATE & DRAW BOSS PROJECTILES
      for (let i = g.bossProjectiles.length - 1; i >= 0; i--) {
        const bp = g.bossProjectiles[i];
        bp.x += bp.vx;
        bp.y += bp.vy;

        ctx.save();
        ctx.shadowColor = bp.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = bp.color;
        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Hit player
        const pDist = Math.hypot(bp.x - p.x, bp.y - p.y);
        if (pDist < bp.radius + 16) {
          g.bossProjectiles.splice(i, 1);
          sfx.explosion(false);

          if (p.shield) {
            p.shield = false;
          } else {
            g.lives -= 1;
            setLives(g.lives);
            if (g.lives <= 0) {
              sfx.gameOver();
              setGameState('gameover');
              if (g.score > highScore) {
                setHighScore(g.score);
                localStorage.setItem('meteor_highscore', g.score);
              }
            }
          }
          continue;
        }

        // Player laser intercepts boss projectile
        for (let j = g.lasers.length - 1; j >= 0; j--) {
          const l = g.lasers[j];
          const lDist = Math.hypot(bp.x - l.x, bp.y - l.y);
          if (lDist < bp.radius + 6) {
            g.bossProjectiles.splice(i, 1);
            g.lasers.splice(j, 1);
            for (let k = 0; k < 5; k++) {
              g.particles.push({
                x: bp.x,
                y: bp.y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                size: Math.random() * 2 + 1,
                color: '#F59E0B',
                alpha: 1,
                life: 0.3,
              });
            }
            break;
          }
        }

        if (bp.y > height + 20 || bp.x < -20 || bp.x > width + 20) {
          g.bossProjectiles.splice(i, 1);
        }
      }

      // 5. POWERUPS & ELEMENTAL SKILL CORES
      for (let i = g.powerups.length - 1; i >= 0; i--) {
        const pu = g.powerups[i];
        pu.y += pu.vy;
        pu.pulse += 0.08;

        if (pu.type === 'skill') {
          const wep = WEAPONS[pu.weaponType] || WEAPONS.fire;
          const glowSize = Math.sin(pu.pulse) * 3 + 14;
          ctx.save();
          ctx.shadowColor = wep.color;
          ctx.shadowBlur = 20;
          ctx.fillStyle = wep.color;
          ctx.beginPath();
          ctx.arc(pu.x, pu.y, glowSize, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(pu.x, pu.y, glowSize + 3, 0, Math.PI * 2);
          ctx.stroke();

          // Icon / Badge
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 9px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const label = (wep.badge || pu.weaponType).slice(0, 8);
          ctx.fillText(label, pu.x, pu.y);
          ctx.restore();
        } else {
          const glowSize = Math.sin(pu.pulse) * 3 + 12;
          ctx.save();
          ctx.shadowColor = pu.type === 'triple' ? '#F59E0B' : '#06B6D4';
          ctx.shadowBlur = 12;
          ctx.fillStyle = pu.type === 'triple' ? '#F59E0B' : '#06B6D4';
          ctx.beginPath();
          ctx.arc(pu.x, pu.y, glowSize, 0, Math.PI * 2);
          ctx.fill();

          // Icon inside
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 10px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(pu.type === 'triple' ? '3X' : 'SHD', pu.x, pu.y);
          ctx.restore();
        }

        // Powerup collision with player
        const dist = Math.hypot(pu.x - p.x, pu.y - p.y);
        if (dist < 28) {
          if (pu.type === 'skill') {
            sfx.skillUnlocked();
            const previousWeapon = p.weapon || 'default';
            const combinedWeapon = combineWeapons(previousWeapon, pu.weaponType);
            p.weapon = combinedWeapon;
            setWeapon(combinedWeapon);
            const wName = WEAPONS[combinedWeapon]?.name || 'Dual Plasma';
            const comboSucceeded = combinedWeapon !== 'default' && combinedWeapon !== pu.weaponType;

            g.bossVictory = {
              text: comboSucceeded
                ? `⚡ COMBO FORGED: ${wName.toUpperCase()}!`
                : combinedWeapon === 'default'
                  ? '💥 ELEMENTS CLASHED! WEAPON RESET TO DEFAULT!'
                  : `✨ WEAPON: ${wName.toUpperCase()} EQUIPPED!`,
              timer: 3.5,
            };
            for (let k = 0; k < 24; k++) {
              const angle = Math.random() * Math.PI * 2;
              const spd = Math.random() * 5 + 1.5;
              g.particles.push({
                x: pu.x,
                y: pu.y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                size: Math.random() * 3 + 1.5,
                color: WEAPONS[pu.weaponType]?.color || '#FFFFFF',
                alpha: 1,
                life: 0.55,
              });
            }
          } else if (pu.type === 'triple') {
            sfx.powerup();
            p.tripleShotTime = 9; // 9 seconds of triple shot
            setTripleShotTimer(9);
          } else {
            sfx.powerup();
            p.shield = true;
          }
          g.powerups.splice(i, 1);
        } else if (pu.y > height + 20) {
          g.powerups.splice(i, 1);
        }
      }

      // 6. PARTICLES
      for (let i = g.particles.length - 1; i >= 0; i--) {
        const pt = g.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= delta / pt.life;

        if (pt.alpha <= 0) {
          g.particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.fillStyle = pt.color;
        ctx.shadowColor = pt.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 7. DRAW PLAYER SPACESHIP
      if (gameState !== 'gameover') {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.tilt);

        // Thruster flame with pulsing animation
        const flameLength = 14 + Math.random() * 8;
        const flameGrad = ctx.createLinearGradient(0, 15, 0, 15 + flameLength);
        flameGrad.addColorStop(0, '#F59E0B');
        flameGrad.addColorStop(0.5, '#F97316');
        flameGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = flameGrad;
        ctx.beginPath();
        ctx.moveTo(-6, 16);
        ctx.lineTo(0, 16 + flameLength);
        ctx.lineTo(6, 16);
        ctx.closePath();
        ctx.fill();

        // Hull / Body (Futuristic Interceptor)
        ctx.shadowColor = '#8B5CF6';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#120B29';
        ctx.strokeStyle = '#8B5CF6';
        ctx.lineWidth = 1.8;

        ctx.beginPath();
        ctx.moveTo(0, -20); // nose tip
        ctx.lineTo(16, 14); // right wing tip
        ctx.lineTo(8, 10);
        ctx.lineTo(0, 14); // rear center
        ctx.lineTo(-8, 10);
        ctx.lineTo(-16, 14); // left wing tip
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Cockpit canopy glow (Cyan Photon)
        ctx.fillStyle = '#06B6D4';
        ctx.shadowColor = '#06B6D4';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.ellipse(0, -4, 3.5, 9, 0, 0, Math.PI * 2);
        ctx.fill();

        // Wing cannons accent
        ctx.fillStyle = '#F97316';
        ctx.fillRect(-14, 2, 2.5, 6);
        ctx.fillRect(11.5, 2, 2.5, 6);

        // Energy Shield Sphere
        if (p.shield) {
          ctx.strokeStyle = '#06B6D4';
          ctx.lineWidth = 2;
          ctx.shadowColor = '#06B6D4';
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.arc(0, 0, 26, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      }

      // 8. WARNING & VICTORY BANNERS
      if (g.bossWarning && g.bossWarning.timer > 0) {
        ctx.save();
        ctx.fillStyle = 'rgba(220, 38, 38, 0.35)';
        ctx.fillRect(0, height * 0.4, width, 44);
        ctx.strokeStyle = '#EF4444';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(0, height * 0.4, width, 44);

        ctx.fillStyle = '#FEF08A';
        ctx.shadowColor = '#EF4444';
        ctx.shadowBlur = 10;
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(g.bossWarning.text, width / 2, height * 0.4 + 22);
        ctx.restore();
      }

      if (g.bossVictory && g.bossVictory.timer > 0) {
        ctx.save();
        ctx.fillStyle = 'rgba(16, 185, 129, 0.35)';
        ctx.fillRect(0, height * 0.4, width, 44);
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(0, height * 0.4, width, 44);

        ctx.fillStyle = '#A7F3D0';
        ctx.shadowColor = '#10B981';
        ctx.shadowBlur = 10;
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(g.bossVictory.text, width / 2, height * 0.4 + 22);
        ctx.restore();
      }

      gameRef.current.animationId = requestAnimationFrame(loop);
    };

    gameRef.current.animationId = requestAnimationFrame(loop);
    return () => {
      if (gameRef.current.animationId) cancelAnimationFrame(gameRef.current.animationId);
    };
  }, [isOpen, gameState, highScore]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn touch-none select-none overflow-hidden"
      onClick={e => {
        // Prevent background clicks from doing anything, only close if backdrop clicked when not playing
        if (e.target === e.currentTarget && gameState !== 'playing') {
          onClose();
        }
      }}
    >
      {/* Modal Window Container */}
      <div
        ref={containerRef}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-[440px] bg-[#070417]/95 border border-purple-500/30 rounded-3xl shadow-[0_0_60px_rgba(139,92,246,0.3)] overflow-hidden flex flex-col items-center"
      >
        {/* Top Header Bar */}
        <div className="w-full px-4 py-3 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-accent/20 text-accent-2 border border-accent/30">
              <IoRocketOutline size={16} className="rotate-45" />
            </span>
            <div>
              <h3 className="text-white font-bold text-sm tracking-wide flex items-center gap-1.5">
                METEOR INTERCEPTOR
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-secondary border border-purple-500/30">
                  WAVE {wave}
                </span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Sound Toggle Button */}
            <button
              type="button"
              onClick={toggleSound}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-text/70 hover:text-white transition-colors"
              title={soundOn ? 'Mute SFX' : 'Unmute SFX'}
            >
              {soundOn ? (
                <FaVolumeUp size={14} className="text-accent-2" />
              ) : (
                <FaVolumeMute size={14} />
              )}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-text/70 hover:text-white transition-colors"
              title="Close Game"
            >
              <IoClose size={18} />
            </button>
          </div>
        </div>

        {/* Live HUD Bar (Score, Lives, Power-ups & Active Skill) */}
        <div className="w-full px-4 py-2 bg-black/40 border-b border-white/[0.05] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-text/70">
              <span className="text-[10px] text-text/40">SCORE</span>
              <span className="text-white font-bold text-sm">{score}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-text/60">
              <FaTrophy size={11} className="text-accent-2" />
              <span>{highScore}</span>
            </div>
          </div>

          {/* Active Permanent Weapon Badge */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[10px]">
            <span>{WEAPONS[weapon]?.icon || '🔫'}</span>
            <span
              className="font-bold tracking-wider"
              style={{ color: WEAPONS[weapon]?.color || '#F97316' }}
            >
              {WEAPONS[weapon]?.badge || 'DEFAULT'}
            </span>
          </div>

          {/* Active Buffs & Lives */}
          <div className="flex items-center gap-2">
            {tripleShotTimer > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-2/20 text-accent-2 text-[10px] font-bold border border-accent-2/30 animate-pulse">
                <FaBolt size={9} /> 3X LASER ({tripleShotTimer}s)
              </span>
            )}

            {/* Lives Remaining */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i < lives ? 'bg-accent shadow-[0_0_8px_rgba(249,115,22,0.8)]' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Game Canvas Container */}
        <div
          className="relative w-full flex justify-center bg-[#02000c] touch-none select-none overflow-hidden"
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onTouchMove={handlePointerMove}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
        >
          <canvas ref={canvasRef} className="block cursor-crosshair max-w-full" />

          {/* Start Screen Overlay */}
          {gameState === 'start' && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-start overflow-y-auto p-4 sm:p-6 text-center z-20 animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-accent to-secondary p-0.5 shadow-xl shadow-accent/30 mb-4 animate-bounce">
                <div className="w-full h-full bg-[#050212] rounded-[14px] flex items-center justify-center">
                  <IoRocketOutline size={28} className="text-accent-2 rotate-45" />
                </div>
              </div>

              <h2 className="text-2xl font-black text-white tracking-tight">METEOR STRIKE</h2>
              <p className="text-xs text-text/70 mt-1 max-w-[260px] leading-relaxed">
                Anomalous asteroid cluster detected near the event horizon. Defend the orbital
                station!
              </p>

              {/* Controls Guidance */}
              <div className="mt-4 p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-[11px] font-mono text-left w-full max-w-[280px] space-y-1.5 text-text/80">
                <div className="flex items-center justify-between">
                  <span className="text-accent-2">Desktop:</span>
                  <span>A/D or Arrows + Space</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Mobile:</span>
                  <span>Touch &amp; Drag ship to fire</span>
                </div>
              </div>

              {/* Element Fusion Guide */}
              <div className="mt-3 p-3 rounded-2xl bg-black/40 border border-cyan-400/20 text-left w-full max-w-[280px]">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-xs font-black tracking-wider text-cyan-200">
                    ELEMENT FUSION
                  </h3>
                  <span className="text-[9px] font-mono text-white/50">PICK 2 ELEMENTS</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1.5 text-[10px] sm:text-[11px] font-mono">
                  <span className="text-white/75">❄️ Ice + ⚡ Lightning</span>
                  <span className="text-cyan-200 text-right">Permafrost Storm</span>
                  <span className="text-white/75">🔥 Fire + ⚡ Lightning</span>
                  <span className="text-rose-300 text-right">Plasma Inferno</span>
                  <span className="text-white/75">❄️ Ice + 🌪️ Wind</span>
                  <span className="text-sky-200 text-right">Absolute Zero</span>
                  <span className="text-white/75">☠️ Poison + 🔥 Fire</span>
                  <span className="text-lime-200 text-right">Toxic Blaze</span>
                  <span className="text-white/75">☀️ Light + 🌑 Shadow</span>
                  <span className="text-violet-200 text-right">Eclipse Beam</span>
                  <span className="text-white/75">🚀 Rocket + ⚡ Lightning</span>
                  <span className="text-yellow-200 text-right">Storm Seeker</span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/10 text-[10px] leading-relaxed text-white/55">
                  ❄️ Ice + 🔥 Fire tidak cocok: fusion gagal dan senjata kembali ke{' '}
                  <span className="font-bold text-orange-300">🔫 Dual Plasma</span>.
                </div>
              </div>

              <button
                type="button"
                onClick={startGame}
                className="mt-4 mb-1 px-6 py-2.5 rounded-full bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-white font-bold text-sm tracking-wide shadow-lg shadow-accent/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shrink-0"
              >
                <FaPlay size={12} /> LAUNCH DEFENSE
              </button>
            </div>
          )}

          {/* Game Over Screen Overlay */}
          {gameState === 'gameover' && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20 animate-fadeIn">
              <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold mb-1">
                CRITICAL HULL BREACH
              </span>
              <h2 className="text-3xl font-black text-white tracking-tight">MISSION FAILED</h2>

              <div className="mt-5 p-4 rounded-2xl bg-white/[0.04] border border-white/10 w-full max-w-[260px] space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-text/60">Final Score:</span>
                  <span className="text-lg font-bold text-accent-2">{score}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono border-t border-white/[0.06] pt-2">
                  <span className="text-text/60">High Score:</span>
                  <span className="text-sm font-bold text-white">{highScore}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono border-t border-white/[0.06] pt-2">
                  <span className="text-text/60">Wave Reached:</span>
                  <span className="text-sm font-bold text-secondary">WAVE {wave}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={startGame}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-white font-bold text-xs tracking-wider shadow-lg shadow-accent/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <FaRedo size={12} /> RETRY MISSION
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-text/80 hover:text-white font-semibold text-xs tracking-wider border border-white/10 transition-all cursor-pointer"
                >
                  EXIT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
