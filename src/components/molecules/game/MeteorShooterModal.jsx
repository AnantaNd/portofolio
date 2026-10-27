import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  FaTimes,
  FaPlay,
  FaRedo,
  FaVolumeMute,
  FaVolumeUp,
  FaGamepad,
  FaTrophy,
  FaShieldAlt,
  FaBolt,
  FaCrosshairs,
} from "react-icons/fa";
import { IoRocketOutline, IoClose } from "react-icons/io5";

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
    if (this.ctx && this.ctx.state === "suspended") {
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
      osc.type = "sawtooth";
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
      filter.type = "lowpass";
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
      osc.type = "triangle";
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
      osc.type = "sawtooth";
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
}

const sfx = new SoundFX();

export default function MeteorShooterModal({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [gameState, setGameState] = useState("start"); // 'start' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return Number(localStorage.getItem("meteor_highscore") || 0);
  });
  const [lives, setLives] = useState(3);
  const [wave, setWave] = useState(1);
  const [soundOn, setSoundOn] = useState(true);
  const [tripleShotTimer, setTripleShotTimer] = useState(0);

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
    if (gameState === "start") {
      gameRef.current.player.x = targetW / 2;
      gameRef.current.player.y = targetH - 65;
    }
  }, [gameState]);

  useEffect(() => {
    if (isOpen) {
      updateCanvasDimensions();
      const timer = setTimeout(updateCanvasDimensions, 50);
      window.addEventListener("resize", updateCanvasDimensions);
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
        clearTimeout(timer);
        window.removeEventListener("resize", updateCanvasDimensions);
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
    g.spawnInterval = 1200;
    g.lasers = [];
    g.meteors = [];
    g.particles = [];
    g.powerups = [];
    g.player.x = g.width / 2;
    g.player.y = g.height - 65;
    g.player.shield = false;
    g.player.tripleShotTime = 0;
    g.player.lastShotTime = 0;
    g.keys.shoot = false;

    setScore(0);
    setLives(3);
    setWave(1);
    setTripleShotTimer(0);
    setGameState("playing");
  };

  // Keyboard controls listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (["ArrowLeft", "KeyA"].includes(e.code)) {
        gameRef.current.keys.left = true;
      }
      if (["ArrowRight", "KeyD"].includes(e.code)) {
        gameRef.current.keys.right = true;
      }
      if (["ArrowUp", "KeyW"].includes(e.code)) {
        gameRef.current.keys.up = true;
      }
      if (["ArrowDown", "KeyS"].includes(e.code)) {
        gameRef.current.keys.down = true;
      }
      if (e.code === "Space") {
        e.preventDefault();
        gameRef.current.keys.shoot = true;
        if (gameState !== "playing") {
          startGame();
        }
      }
    };

    const handleKeyUp = (e) => {
      if (["ArrowLeft", "KeyA"].includes(e.code)) {
        gameRef.current.keys.left = false;
      }
      if (["ArrowRight", "KeyD"].includes(e.code)) {
        gameRef.current.keys.right = false;
      }
      if (["ArrowUp", "KeyW"].includes(e.code)) {
        gameRef.current.keys.up = false;
      }
      if (["ArrowDown", "KeyS"].includes(e.code)) {
        gameRef.current.keys.down = false;
      }
      if (e.code === "Space") {
        gameRef.current.keys.shoot = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isOpen, gameState]);

  // Touch & Mouse direct position controls
  const handlePointerMove = (e) => {
    if (gameState !== "playing" || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const relativeX = clientX - rect.left;
    const relativeY = clientY - rect.top;

    if (relativeX >= 15 && relativeX <= gameRef.current.width - 15) {
      gameRef.current.player.x = relativeX;
    }
    // Allow slight vertical movement
    if (relativeY >= gameRef.current.height * 0.5 && relativeY <= gameRef.current.height - 30) {
      gameRef.current.player.y = relativeY;
    }
  };

  const handlePointerDown = (e) => {
    if (gameState === "playing") {
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
    const ctx = canvas.getContext("2d");

    let lastTime = performance.now();

    const loop = (currentTime) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const g = gameRef.current;
      const width = g.width;
      const height = g.height;
      const p = g.player;

      // 1. CLEAR & BACKGROUND
      ctx.fillStyle = "#030014";
      ctx.fillRect(0, 0, width, height);

      // Stars parallax
      ctx.fillStyle = "#FFFFFF";
      g.stars.forEach((star) => {
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
      const glowGrad = ctx.createRadialGradient(
        width / 2,
        -20,
        10,
        width / 2,
        -20,
        width * 0.8
      );
      glowGrad.addColorStop(0, "rgba(249, 115, 22, 0.25)");
      glowGrad.addColorStop(0.5, "rgba(139, 92, 246, 0.15)");
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. PLAYING UPDATES
      if (gameState === "playing") {
        // Player keyboard motion
        if (g.keys.left) p.x -= p.speed;
        if (g.keys.right) p.x += p.speed;
        if (g.keys.up) p.y -= p.speed;
        if (g.keys.down) p.y += p.speed;

        // Boundaries
        p.x = Math.max(18, Math.min(width - 18, p.x));
        p.y = Math.max(height * 0.45, Math.min(height - 35, p.y));

        // Tilt calculation
        const targetTilt = g.keys.left ? -0.3 : g.keys.right ? 0.3 : 0;
        p.tilt += (targetTilt - p.tilt) * 0.2;

        // Triple shot cooldown count
        if (p.tripleShotTime > 0) {
          p.tripleShotTime -= delta;
          setTripleShotTimer(Math.ceil(p.tripleShotTime));
        }

        // Automatic / Pressed Shooting
        const shootInterval = 180; // ms between lasers
        if (g.keys.shoot && currentTime - p.lastShotTime > shootInterval) {
          p.lastShotTime = currentTime;
          sfx.laser();

          if (p.tripleShotTime > 0) {
            // Triple spread
            g.lasers.push(
              { x: p.x, y: p.y - 18, vx: 0, vy: -12, color: "#F59E0B" },
              { x: p.x - 10, y: p.y - 12, vx: -2.2, vy: -11.5, color: "#06B6D4" },
              { x: p.x + 10, y: p.y - 12, vx: 2.2, vy: -11.5, color: "#06B6D4" }
            );
          } else {
            // Dual laser
            g.lasers.push(
              { x: p.x - 7, y: p.y - 16, vx: 0, vy: -12, color: "#F97316" },
              { x: p.x + 7, y: p.y - 16, vx: 0, vy: -12, color: "#F97316" }
            );
          }
        }

        // Spawn Meteors
        if (currentTime - g.lastSpawnTime > g.spawnInterval) {
          g.lastSpawnTime = currentTime;
          // Meteor types: regular, fast, huge boss
          const roll = Math.random();
          let type = "regular";
          let radius = 16 + Math.random() * 8;
          let hp = 1;
          let speed = 2.0 + Math.random() * 1.5 + g.wave * 0.25;
          let color = "#E06D28";

          if (roll > 0.85) {
            type = "huge";
            radius = 32 + Math.random() * 8;
            hp = 4;
            speed = 1.3 + g.wave * 0.15;
            color = "#A855F7";
          } else if (roll < 0.25) {
            type = "fast";
            radius = 12;
            hp = 1;
            speed = 3.6 + Math.random() * 1.2 + g.wave * 0.3;
            color = "#EF4444";
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
          g.spawnInterval = Math.max(450, 1200 - g.score * 0.35);
        }

        // Level / Wave progression
        const currentWave = Math.floor(g.score / 600) + 1;
        if (currentWave !== g.wave) {
          g.wave = currentWave;
          setWave(currentWave);
        }
      }

      // 3. UPDATE & DRAW LASERS
      for (let i = g.lasers.length - 1; i >= 0; i--) {
        const l = g.lasers[i];
        l.x += l.vx;
        l.y += l.vy;

        // Draw laser with neon glow
        ctx.save();
        ctx.shadowColor = l.color;
        ctx.shadowBlur = 10;
        ctx.strokeStyle = l.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(l.x - l.vx * 0.8, l.y + 10);
        ctx.stroke();
        ctx.restore();

        // Offscreen check
        if (l.y < -20 || l.x < -10 || l.x > width + 10) {
          g.lasers.splice(i, 1);
        }
      }

      // 4. UPDATE & DRAW METEORS
      for (let i = g.meteors.length - 1; i >= 0; i--) {
        const m = g.meteors[i];
        m.y += m.speed;
        m.rotation += m.rotSpeed;

        // Meteor Trail / Aura
        ctx.save();
        ctx.translate(m.x, m.y);
        ctx.rotate(m.rotation);

        // Core rock gradient
        const rockGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, m.radius);
        rockGrad.addColorStop(0, "#FDBA74");
        rockGrad.addColorStop(0.35, m.color);
        rockGrad.addColorStop(1, "#1E112A");

        ctx.fillStyle = rockGrad;
        ctx.shadowColor = m.color;
        ctx.shadowBlur = m.type === "huge" ? 18 : 8;
        ctx.beginPath();
        m.vertices.forEach((v, idx) => {
          if (idx === 0) ctx.moveTo(v.x, v.y);
          else ctx.lineTo(v.x, v.y);
        });
        ctx.closePath();
        ctx.fill();

        // Inner glowing craters
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.beginPath();
        ctx.arc(-m.radius * 0.3, -m.radius * 0.2, m.radius * 0.22, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Laser vs Meteor Collision
        for (let j = g.lasers.length - 1; j >= 0; j--) {
          const l = g.lasers[j];
          const dist = Math.hypot(m.x - l.x, m.y - l.y);
          if (dist < m.radius + 6) {
            // Hit!
            m.hp -= 1;
            g.lasers.splice(j, 1);

            // Small sparks
            for (let k = 0; k < 4; k++) {
              g.particles.push({
                x: l.x,
                y: l.y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                size: Math.random() * 2.5 + 1,
                color: "#FCD34D",
                alpha: 1,
                life: 0.35,
              });
            }

            if (m.hp <= 0) {
              // Meteor destroyed!
              sfx.explosion(m.type === "huge");
              const earnedPts = m.type === "huge" ? 150 : m.type === "fast" ? 80 : 40;
              g.score += earnedPts;
              setScore(g.score);

              // Explosion Debris
              const particleCount = m.type === "huge" ? 28 : 14;
              for (let k = 0; k < particleCount; k++) {
                const angle = Math.random() * Math.PI * 2;
                const spd = Math.random() * 5 + 1.5;
                g.particles.push({
                  x: m.x,
                  y: m.y,
                  vx: Math.cos(angle) * spd,
                  vy: Math.sin(angle) * spd,
                  size: Math.random() * 3.5 + 1.5,
                  color: k % 2 === 0 ? "#F97316" : "#F59E0B",
                  alpha: 1,
                  life: 0.55 + Math.random() * 0.3,
                });
              }

              // Power-up Drop Chance
              if (Math.random() < 0.16) {
                const pType = Math.random() > 0.5 ? "triple" : "shield";
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
        if (gameState === "playing" && g.meteors[i]) {
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
                color: "#EF4444",
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
                setGameState("gameover");
                if (g.score > highScore) {
                  setHighScore(g.score);
                  localStorage.setItem("meteor_highscore", g.score);
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

      // 5. POWERUPS
      for (let i = g.powerups.length - 1; i >= 0; i--) {
        const pu = g.powerups[i];
        pu.y += pu.vy;
        pu.pulse += 0.08;

        const glowSize = Math.sin(pu.pulse) * 3 + 12;
        ctx.save();
        ctx.shadowColor = pu.type === "triple" ? "#F59E0B" : "#06B6D4";
        ctx.shadowBlur = 12;
        ctx.fillStyle = pu.type === "triple" ? "#F59E0B" : "#06B6D4";
        ctx.beginPath();
        ctx.arc(pu.x, pu.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Icon inside
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 10px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(pu.type === "triple" ? "3X" : "SHD", pu.x, pu.y);
        ctx.restore();

        // Powerup collision with player
        const dist = Math.hypot(pu.x - p.x, pu.y - p.y);
        if (dist < 26) {
          sfx.powerup();
          if (pu.type === "triple") {
            p.tripleShotTime = 9; // 9 seconds of triple shot
            setTripleShotTimer(9);
          } else {
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
      if (gameState !== "gameover") {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.tilt);

        // Thruster flame with pulsing animation
        const flameLength = 14 + Math.random() * 8;
        const flameGrad = ctx.createLinearGradient(0, 15, 0, 15 + flameLength);
        flameGrad.addColorStop(0, "#F59E0B");
        flameGrad.addColorStop(0.5, "#F97316");
        flameGrad.addColorStop(1, "transparent");
        ctx.fillStyle = flameGrad;
        ctx.beginPath();
        ctx.moveTo(-6, 16);
        ctx.lineTo(0, 16 + flameLength);
        ctx.lineTo(6, 16);
        ctx.closePath();
        ctx.fill();

        // Hull / Body (Futuristic Interceptor)
        ctx.shadowColor = "#8B5CF6";
        ctx.shadowBlur = 12;
        ctx.fillStyle = "#120B29";
        ctx.strokeStyle = "#8B5CF6";
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
        ctx.fillStyle = "#06B6D4";
        ctx.shadowColor = "#06B6D4";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.ellipse(0, -4, 3.5, 9, 0, 0, Math.PI * 2);
        ctx.fill();

        // Wing cannons accent
        ctx.fillStyle = "#F97316";
        ctx.fillRect(-14, 2, 2.5, 6);
        ctx.fillRect(11.5, 2, 2.5, 6);

        // Energy Shield Sphere
        if (p.shield) {
          ctx.strokeStyle = "#06B6D4";
          ctx.lineWidth = 2;
          ctx.shadowColor = "#06B6D4";
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.arc(0, 0, 26, 0, Math.PI * 2);
          ctx.stroke();
        }

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Window Container */}
      <div
        ref={containerRef}
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
              title={soundOn ? "Mute SFX" : "Unmute SFX"}
            >
              {soundOn ? <FaVolumeUp size={14} className="text-accent-2" /> : <FaVolumeMute size={14} />}
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

        {/* Live HUD Bar (Score, Lives, Power-ups) */}
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

          {/* Active Buffs */}
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
                    i < lives
                      ? "bg-accent shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                      : "bg-white/10"
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
        >
          <canvas ref={canvasRef} className="block cursor-crosshair max-w-full" />

          {/* Start Screen Overlay */}
          {gameState === "start" && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20 animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-accent to-secondary p-0.5 shadow-xl shadow-accent/30 mb-4 animate-bounce">
                <div className="w-full h-full bg-[#050212] rounded-[14px] flex items-center justify-center">
                  <IoRocketOutline size={28} className="text-accent-2 rotate-45" />
                </div>
              </div>

              <h2 className="text-2xl font-black text-white tracking-tight">
                METEOR STRIKE
              </h2>
              <p className="text-xs text-text/70 mt-1 max-w-[260px] leading-relaxed">
                Anomalous asteroid cluster detected near the event horizon. Defend the orbital station!
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
                <div className="flex items-center justify-between">
                  <span className="text-tenary">Power-ups:</span>
                  <span>3X Laser &amp; Shield</span>
                </div>
              </div>

              <button
                type="button"
                onClick={startGame}
                className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-white font-bold text-sm tracking-wide shadow-lg shadow-accent/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <FaPlay size={12} /> LAUNCH DEFENSE
              </button>
            </div>
          )}

          {/* Game Over Screen Overlay */}
          {gameState === "gameover" && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20 animate-fadeIn">
              <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold mb-1">
                CRITICAL HULL BREACH
              </span>
              <h2 className="text-3xl font-black text-white tracking-tight">
                MISSION FAILED
              </h2>

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

        {/* Mobile Control Pad Bar for easy thumbs play */}
        <div className="w-full p-2.5 bg-black/60 border-t border-white/[0.06] flex items-center justify-between gap-2 sm:hidden select-none">
          <div className="flex items-center gap-1.5 flex-1">
            <button
              type="button"
              className="flex-1 py-2.5 bg-white/[0.06] active:bg-accent/40 rounded-xl text-center text-xs font-mono text-white/90 border border-white/10 font-bold active:scale-95 transition-all select-none touch-manipulation"
              onPointerDown={() => {
                gameRef.current.keys.left = true;
              }}
              onPointerUp={() => {
                gameRef.current.keys.left = false;
              }}
              onPointerLeave={() => {
                gameRef.current.keys.left = false;
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                gameRef.current.keys.left = true;
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                gameRef.current.keys.left = false;
              }}
            >
              ◄ LEFT
            </button>
            <button
              type="button"
              className="flex-1 py-2.5 bg-white/[0.06] active:bg-accent/40 rounded-xl text-center text-xs font-mono text-white/90 border border-white/10 font-bold active:scale-95 transition-all select-none touch-manipulation"
              onPointerDown={() => {
                gameRef.current.keys.right = true;
              }}
              onPointerUp={() => {
                gameRef.current.keys.right = false;
              }}
              onPointerLeave={() => {
                gameRef.current.keys.right = false;
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                gameRef.current.keys.right = true;
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                gameRef.current.keys.right = false;
              }}
            >
              RIGHT ►
            </button>
          </div>

          <button
            type="button"
            className="flex-1 py-2.5 bg-accent/30 active:bg-accent/60 rounded-xl text-center text-xs font-mono text-accent-2 border border-accent/40 font-bold active:scale-95 transition-all flex items-center justify-center gap-1 select-none touch-manipulation"
            onPointerDown={() => {
              gameRef.current.keys.shoot = true;
            }}
            onPointerUp={() => {
              gameRef.current.keys.shoot = false;
            }}
            onPointerLeave={() => {
              gameRef.current.keys.shoot = false;
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              gameRef.current.keys.shoot = true;
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              gameRef.current.keys.shoot = false;
            }}
          >
            <FaCrosshairs size={12} /> FIRE
          </button>
        </div>
      </div>
    </div>
  );
}
