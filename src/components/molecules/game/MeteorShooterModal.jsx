import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { FaPlay, FaRedo, FaTrophy, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
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

const BOSS_SKILLS = [
  {
    id: 'fan',
    name: 'Nova Fan',
    description: 'Fires bullets in a wide fan spread',
    color: '#FBBF24',
  },
  {
    id: 'radial',
    name: 'Starburst',
    description: 'Releases bullets in a full circle',
    color: '#C084FC',
  },
  {
    id: 'burst',
    name: 'Triple Hunt',
    description: 'Fires a burst of aimed bullets in succession',
    color: '#22D3EE',
  },
  {
    id: 'cross',
    name: 'Crossfire',
    description: 'Fires crossing bullets from each side of the boss',
    color: '#4ADE80',
  },
  {
    id: 'rain',
    name: 'Meteor Rain',
    description: 'Bullet rain with a wide spread pattern',
    color: '#60A5FA',
  },
  {
    id: 'spiral',
    name: 'Void Spiral',
    description: 'Fires bullets in a rotating spiral',
    color: '#E879F9',
  },
];

const pickBossSkills = (wave, previousIds = []) => {
  const shuffled = [...BOSS_SKILLS].sort(() => Math.random() - 0.5);
  const count = Math.min(wave >= 5 ? 4 : wave >= 3 ? 3 : 2, BOSS_SKILLS.length);
  let picked = shuffled.slice(0, count);
  // Avoid repeating the exact same skill set on consecutive waves.
  if (
    picked
      .map(skill => skill.id)
      .sort()
      .join('|') === [...previousIds].sort().join('|')
  ) {
    picked = shuffled.slice(count, count * 2);
  }
  return picked.length ? picked : shuffled.slice(0, count);
};

// Boss elemental fusions are independent from the boss's random attack skills.
const BOSS_ELEMENT_COMBOS = [
  {
    id: 'froststorm',
    name: 'Froststorm',
    icon: '❄️⚡',
    elements: ['ice', 'lightning'],
    color: '#67E8F9',
    description: 'fast electric shots that slow movement',
  },
  {
    id: 'plasma',
    name: 'Plasma Overlord',
    icon: '🔥⚡',
    elements: ['fire', 'lightning'],
    color: '#FB7185',
    description: 'fast, larger plasma shots',
  },
  {
    id: 'absolute-zero',
    name: 'Absolute Zero',
    icon: '❄️🌪️',
    elements: ['ice', 'wind'],
    color: '#38BDF8',
    description: 'quick shots that briefly slow movement',
  },
  {
    id: 'toxic-blaze',
    name: 'Toxic Devourer',
    icon: '☠️🔥',
    elements: ['poison', 'fire'],
    color: '#A3E635',
    description: 'slow toxic fireballs with a larger hit radius',
  },
  {
    id: 'eclipse',
    name: 'Eclipse Tyrant',
    icon: '🌑☀️',
    elements: ['shadow', 'light'],
    color: '#C084FC',
    description: 'small, fast piercing-feeling void rays',
  },
  {
    id: 'storm-seeker',
    name: 'Storm Hunter',
    icon: '🚀⚡',
    elements: ['rocket', 'lightning'],
    color: '#FBBF24',
    description: 'homing electric missiles',
  },
];

const pickBossElementCombo = previousId => {
  const choices = BOSS_ELEMENT_COMBOS.filter(combo => combo.id !== previousId);
  const pool = choices.length ? choices : BOSS_ELEMENT_COMBOS;
  return pool[Math.floor(Math.random() * pool.length)];
};

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
    desc: 'Freezing lightning chains; lower damage and limited chain range',
    elements: ['ice', 'lightning'],
  },
  fire_lightning: {
    id: 'fire_lightning',
    name: 'Plasma Inferno',
    icon: '⚡🔥',
    color: '#FB7185',
    badge: 'PLASMA AoE',
    desc: 'High burst damage and burn; slow shots and long cooldown',
    elements: ['fire', 'lightning'],
  },
  ice_wind: {
    id: 'ice_wind',
    name: 'Absolute Zero',
    icon: '❄️🌪️',
    color: '#A5F3FC',
    badge: 'FROST PIERCER',
    desc: 'Piercing frost blades; low damage and slow freeze buildup',
    elements: ['ice', 'wind'],
  },
  poison_fire: {
    id: 'poison_fire',
    name: 'Toxic Blaze',
    icon: '☣️🔥',
    color: '#BEF264',
    badge: 'TOXIC AoE',
    desc: 'Poison and burn over time; low initial damage',
    elements: ['poison', 'fire'],
  },
  shadow_light: {
    id: 'shadow_light',
    name: 'Eclipse Beam',
    icon: '🌘',
    color: '#E9D5FF',
    badge: 'ECLIPSE',
    desc: 'Piercing beam with bonus damage; straight-line aim and long cooldown',
    elements: ['shadow', 'light'],
  },
  rocket_lightning: {
    id: 'rocket_lightning',
    name: 'Storm Seeker',
    icon: '🚀⚡',
    color: '#FDE047',
    badge: 'HOMING CHAIN',
    desc: 'Homing missiles with limited lightning chains and slow firing',
    elements: ['rocket', 'lightning'],
  },
  fire_ice: {
    id: 'fire_ice',
    name: 'Thermal Shatter',
    icon: '🔥❄️',
    color: '#F472B6',
    badge: 'STEAM SHOCK',
    desc: 'Thermal shock causing explosive steam and freeze vulnerability',
    elements: ['fire', 'ice'],
  },
  fire_rocket: {
    id: 'fire_rocket',
    name: 'Hellfire Warhead',
    icon: '🚀🔥',
    color: '#EA580C',
    badge: 'BLAST MISSILE',
    desc: 'High-yield explosive missiles with expansive fireball radius',
    elements: ['fire', 'rocket'],
  },
  fire_wind: {
    id: 'fire_wind',
    name: 'Firestorm Lance',
    icon: '🔥🌪️',
    color: '#F97316',
    badge: 'FIRE VORTEX',
    desc: 'High-speed piercing flame vortices cutting through enemies',
    elements: ['fire', 'wind'],
  },
  earth_fire: {
    id: 'earth_fire',
    name: 'Magma Eruption',
    icon: '🌋',
    color: '#C2410C',
    badge: 'MOLTEN IMPACT',
    desc: 'Molten rock bursts that crush armor and leave burning magma',
    elements: ['earth', 'fire'],
  },
  fire_light: {
    id: 'fire_light',
    name: 'Solar Supernova',
    icon: '☀️🔥',
    color: '#FBBF24',
    badge: 'SOLAR FLARE',
    desc: 'Blinding radiant rays with incinerating splash explosions',
    elements: ['fire', 'light'],
  },
  fire_shadow: {
    id: 'fire_shadow',
    name: 'Abyssal Hellfire',
    icon: '🌑🔥',
    color: '#9333EA',
    badge: 'NETHER FLAME',
    desc: 'Devastating dark flames consuming enemies with void blast',
    elements: ['fire', 'shadow'],
  },
  ice_rocket: {
    id: 'ice_rocket',
    name: 'Cryo Torpedo',
    icon: '🚀❄️',
    color: '#38BDF8',
    badge: 'FROST MISSILE',
    desc: 'Homing glacial torpedoes that detonate with freezing shrapnel',
    elements: ['ice', 'rocket'],
  },
  ice_poison: {
    id: 'ice_poison',
    name: 'Cryo Venom',
    icon: '❄️☠️',
    color: '#2DD4BF',
    badge: 'FROST TOXIN',
    desc: 'Deep freezing venom that severely slows and corrodes targets',
    elements: ['ice', 'poison'],
  },
  earth_ice: {
    id: 'earth_ice',
    name: 'Glacial Permafrost',
    icon: '🪨❄️',
    color: '#7DD3FC',
    badge: 'FROST SHARDS',
    desc: 'Heavy crystalline frost chunks with massive impact and slow',
    elements: ['earth', 'ice'],
  },
  ice_light: {
    id: 'ice_light',
    name: 'Aurora Prism',
    icon: '🌈',
    color: '#BAE6FD',
    badge: 'AURORA BEAM',
    desc: 'Prismatic radiant rays freezing enemies along laser beam paths',
    elements: ['ice', 'light'],
  },
  ice_shadow: {
    id: 'ice_shadow',
    name: 'Black Ice',
    icon: '🌑❄️',
    color: '#818CF8',
    badge: 'VOID FROST',
    desc: 'Frigid void chill that freezes targets and shatters defenses',
    elements: ['ice', 'shadow'],
  },
  lightning_poison: {
    id: 'lightning_poison',
    name: 'Neurotoxin Arc',
    icon: '⚡☠️',
    color: '#84CC16',
    badge: 'BIO SHOCK',
    desc: 'Electrified neurotoxin that chains lethal poison between targets',
    elements: ['lightning', 'poison'],
  },
  lightning_wind: {
    id: 'lightning_wind',
    name: 'Thunder Tempest',
    icon: '⚡🌪️',
    color: '#38BDF8',
    badge: 'TEMPEST',
    desc: 'High-velocity thunderous gusts arcing lightning across lanes',
    elements: ['lightning', 'wind'],
  },
  earth_lightning: {
    id: 'earth_lightning',
    name: 'Tectonic Surge',
    icon: '🪨⚡',
    color: '#EAB308',
    badge: 'SEISMIC ARC',
    desc: 'Heavy charged minerals triggering seismic electrical bursts',
    elements: ['earth', 'lightning'],
  },
  light_lightning: {
    id: 'light_lightning',
    name: 'Divine Thunderbolt',
    icon: '☀️⚡',
    color: '#FEF08A',
    badge: 'HOLY THUNDER',
    desc: 'Ultra-fast radiant lightning arcs striking targets instantly',
    elements: ['light', 'lightning'],
  },
  lightning_shadow: {
    id: 'lightning_shadow',
    name: 'Void Spark',
    icon: '🌑⚡',
    color: '#A855F7',
    badge: 'DARK VOLT',
    desc: 'High-damage shadow bolts chaining destructive void surges',
    elements: ['lightning', 'shadow'],
  },
  poison_rocket: {
    id: 'poison_rocket',
    name: 'Bio-Hazard Warhead',
    icon: '🚀☠️',
    color: '#4ADE80',
    badge: 'TOXIC MISSILE',
    desc: 'Homing warheads erupting into corrosive acid gas clouds',
    elements: ['poison', 'rocket'],
  },
  rocket_wind: {
    id: 'rocket_wind',
    name: 'Turboflyer Missile',
    icon: '🚀🌪️',
    color: '#22D3EE',
    badge: 'AERO MISSILE',
    desc: 'Supersonic missiles piercing through targets with vortex thrust',
    elements: ['rocket', 'wind'],
  },
  earth_rocket: {
    id: 'earth_rocket',
    name: 'Bunker Buster',
    icon: '🚀🪨',
    color: '#D97706',
    badge: 'HEAVY IMPACT',
    desc: 'Devastating armor-piercing kinetic rockets with massive knockback',
    elements: ['earth', 'rocket'],
  },
  light_rocket: {
    id: 'light_rocket',
    name: 'Photon Missile',
    icon: '🚀☀️',
    color: '#FDE047',
    badge: 'PHOTON HOMING',
    desc: 'High-speed light-propelled missiles with radiant splash blasts',
    elements: ['light', 'rocket'],
  },
  rocket_shadow: {
    id: 'rocket_shadow',
    name: 'Dreadnought Core',
    icon: '🚀🌑',
    color: '#7C3AED',
    badge: 'VOID TORPEDO',
    desc: 'Heavy homing void cores causing gravitational implode damage',
    elements: ['rocket', 'shadow'],
  },
  poison_wind: {
    id: 'poison_wind',
    name: 'Miasma Cyclone',
    icon: '☠️🌪️',
    color: '#10B981',
    badge: 'VENOM GALE',
    desc: 'Toxic vortex dispersing piercing corrosive spores everywhere',
    elements: ['poison', 'wind'],
  },
  earth_poison: {
    id: 'earth_poison',
    name: 'Venom Geode',
    icon: '🪨☠️',
    color: '#65A30D',
    badge: 'ACID SHARD',
    desc: 'Dense toxic minerals fracturing into corrosive acid shrapnel',
    elements: ['earth', 'poison'],
  },
  light_poison: {
    id: 'light_poison',
    name: 'Purifying Rot',
    icon: '☀️☠️',
    color: '#A3E635',
    badge: 'RADIANT TOXIN',
    desc: 'Luminous virulent rays that rapidly infect and burn foes',
    elements: ['light', 'poison'],
  },
  poison_shadow: {
    id: 'poison_shadow',
    name: 'Corrupting Plague',
    icon: '🌑☠️',
    color: '#4C1D95',
    badge: 'VOID DECAY',
    desc: 'Withering shadow plague draining hit points with high DoT',
    elements: ['poison', 'shadow'],
  },
  earth_wind: {
    id: 'earth_wind',
    name: 'Sandstorm Scythe',
    icon: '🪨🌪️',
    color: '#D97706',
    badge: 'DUST SCYTHE',
    desc: 'Abrasive piercing dust storms grinding down meteor hulls',
    elements: ['earth', 'wind'],
  },
  light_wind: {
    id: 'light_wind',
    name: 'Zephyr Ray',
    icon: '☀️🌪️',
    color: '#BAE6FD',
    badge: 'SOLAR BREEZE',
    desc: 'Swift solar winds with high firing rate and piercing radiance',
    elements: ['light', 'wind'],
  },
  shadow_wind: {
    id: 'shadow_wind',
    name: 'Nether Gale',
    icon: '🌑🌪️',
    color: '#6366F1',
    badge: 'VOID SLASH',
    desc: 'Crescent void blades cutting swift swathes through enemy waves',
    elements: ['shadow', 'wind'],
  },
  earth_light: {
    id: 'earth_light',
    name: 'Crystal Prism',
    icon: '🪨☀️',
    color: '#FDE68A',
    badge: 'PRISM SHARD',
    desc: 'Reflective crystal spikes delivering heavy radiant impact',
    elements: ['earth', 'light'],
  },
  earth_shadow: {
    id: 'earth_shadow',
    name: 'Obsidian Oblivion',
    icon: '🪨🌑',
    color: '#475569',
    badge: 'DARK METEOR',
    desc: 'Ultra-dense dark matter chunks that crush enemy armor',
    elements: ['earth', 'shadow'],
  },
};

const ELEMENT_COMBOS = {
  // Fire combinations
  'fire+ice': 'fire_ice',
  'fire+lightning': 'fire_lightning',
  'fire+rocket': 'fire_rocket',
  'fire+poison': 'poison_fire',
  'fire+wind': 'fire_wind',
  'earth+fire': 'earth_fire',
  'fire+light': 'fire_light',
  'fire+shadow': 'fire_shadow',

  // Ice combinations
  'ice+lightning': 'ice_lightning',
  'ice+rocket': 'ice_rocket',
  'ice+poison': 'ice_poison',
  'ice+wind': 'ice_wind',
  'earth+ice': 'earth_ice',
  'ice+light': 'ice_light',
  'ice+shadow': 'ice_shadow',

  // Lightning combinations
  'lightning+rocket': 'rocket_lightning',
  'lightning+poison': 'lightning_poison',
  'lightning+wind': 'lightning_wind',
  'earth+lightning': 'earth_lightning',
  'light+lightning': 'light_lightning',
  'lightning+shadow': 'lightning_shadow',

  // Rocket combinations
  'poison+rocket': 'poison_rocket',
  'rocket+wind': 'rocket_wind',
  'earth+rocket': 'earth_rocket',
  'light+rocket': 'light_rocket',
  'rocket+shadow': 'rocket_shadow',

  // Poison combinations
  'poison+wind': 'poison_wind',
  'earth+poison': 'earth_poison',
  'light+poison': 'light_poison',
  'poison+shadow': 'poison_shadow',

  // Wind combinations
  'earth+wind': 'earth_wind',
  'light+wind': 'light_wind',
  'shadow+wind': 'shadow_wind',

  // Earth combinations
  'earth+light': 'earth_light',
  'earth+shadow': 'earth_shadow',

  // Light + Shadow
  'light+shadow': 'shadow_light',
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

// Balance values: damage is relative to the default laser (1 damage).
// Longer intervals and lower damage keep strong fusion effects from becoming overpowered.
const WEAPON_BALANCE = {
  // Original fusions
  ice_lightning: { interval: 230, damage: 0.75, chainLimit: 2 },
  fire_lightning: { interval: 270, damage: 1.5, projectileSpeed: 9 },
  ice_wind: { interval: 240, damage: 0.55, projectileSpeed: 10, pierce: true },
  poison_fire: { interval: 210, damage: 0.4, poisonDuration: 3, poisonDamage: 0.5 },
  shadow_light: { interval: 250, damage: 1.2, pierce: true },
  rocket_lightning: { interval: 290, damage: 1, chainLimit: 2, projectileSpeed: 10 },

  // Fire fusions
  fire_ice: { interval: 220, damage: 1.1, projectileSpeed: 10 },
  fire_rocket: { interval: 280, damage: 1.8, projectileSpeed: 10 },
  fire_wind: { interval: 200, damage: 0.9, projectileSpeed: 11, pierce: true },
  earth_fire: { interval: 240, damage: 1.4 },
  fire_light: { interval: 190, damage: 1.2, projectileSpeed: 12 },
  fire_shadow: { interval: 230, damage: 1.4 },

  // Ice fusions
  ice_rocket: { interval: 270, damage: 1.3, projectileSpeed: 10 },
  ice_poison: { interval: 210, damage: 0.6, poisonDuration: 3, poisonDamage: 0.6 },
  earth_ice: { interval: 250, damage: 1.3 },
  ice_light: { interval: 200, damage: 0.9, projectileSpeed: 12, pierce: true },
  ice_shadow: { interval: 220, damage: 1.1 },

  // Lightning fusions
  lightning_poison: {
    interval: 200,
    damage: 0.7,
    chainLimit: 2,
    poisonDuration: 2.5,
    poisonDamage: 0.5,
  },
  lightning_wind: { interval: 180, damage: 0.8, projectileSpeed: 11, chainLimit: 2 },
  earth_lightning: { interval: 230, damage: 1.3, chainLimit: 2 },
  light_lightning: { interval: 170, damage: 1.0, projectileSpeed: 13, chainLimit: 3 },
  lightning_shadow: { interval: 210, damage: 1.2, chainLimit: 2 },

  // Rocket fusions
  poison_rocket: { interval: 280, damage: 1.2, poisonDuration: 3, poisonDamage: 0.6 },
  rocket_wind: { interval: 260, damage: 1.1, projectileSpeed: 11, pierce: true },
  earth_rocket: { interval: 300, damage: 1.9, projectileSpeed: 9 },
  light_rocket: { interval: 240, damage: 1.3, projectileSpeed: 11 },
  rocket_shadow: { interval: 280, damage: 1.6, projectileSpeed: 10 },

  // Poison fusions
  poison_wind: {
    interval: 190,
    damage: 0.6,
    projectileSpeed: 10,
    pierce: true,
    poisonDuration: 2.5,
    poisonDamage: 0.5,
  },
  earth_poison: { interval: 220, damage: 1.1, poisonDuration: 3, poisonDamage: 0.6 },
  light_poison: {
    interval: 190,
    damage: 0.8,
    projectileSpeed: 11,
    poisonDuration: 2.5,
    poisonDamage: 0.5,
  },
  poison_shadow: { interval: 210, damage: 0.9, poisonDuration: 3.5, poisonDamage: 0.7 },

  // Wind fusions
  earth_wind: { interval: 210, damage: 0.9, projectileSpeed: 10, pierce: true },
  light_wind: { interval: 170, damage: 0.8, projectileSpeed: 12, pierce: true },
  shadow_wind: { interval: 190, damage: 1.0, projectileSpeed: 11, pierce: true },

  // Earth fusions
  earth_light: { interval: 200, damage: 1.3, projectileSpeed: 11 },
  earth_shadow: { interval: 240, damage: 1.5 },
};

const CHEAT_COMBOS = [
  {
    keys: ['KeyT', 'KeyF'],
    weapon: 'poison_fire',
    label: 'T + F',
    name: 'Toxic Blaze (Poison+Fire)',
  },
  {
    keys: ['KeyI', 'KeyL'],
    weapon: 'ice_lightning',
    label: 'I + L',
    name: 'Permafrost Storm (Ice+Volt)',
  },
  {
    keys: ['KeyF', 'KeyL'],
    weapon: 'fire_lightning',
    label: 'F + L',
    name: 'Plasma Inferno (Fire+Volt)',
  },
  { keys: ['KeyI', 'KeyW'], weapon: 'ice_wind', label: 'I + W', name: 'Absolute Zero (Ice+Wind)' },
  {
    keys: ['KeyH', 'KeyL'],
    weapon: 'shadow_light',
    label: 'H + L',
    name: 'Eclipse Beam (Shadow+Light)',
  },
  {
    keys: ['KeyR', 'KeyL'],
    weapon: 'rocket_lightning',
    label: 'R + L',
    name: 'Storm Seeker (Rocket+Volt)',
  },
  {
    keys: ['KeyF', 'KeyI'],
    weapon: 'fire_ice',
    label: 'F + I',
    name: 'Thermal Shatter (Fire+Ice)',
  },
  {
    keys: ['KeyF', 'KeyR'],
    weapon: 'fire_rocket',
    label: 'F + R',
    name: 'Hellfire Warhead (Fire+Rocket)',
  },
  {
    keys: ['KeyF', 'KeyW'],
    weapon: 'fire_wind',
    label: 'F + W',
    name: 'Firestorm Lance (Fire+Wind)',
  },
  {
    keys: ['KeyE', 'KeyF'],
    weapon: 'earth_fire',
    label: 'E + F',
    name: 'Magma Eruption (Earth+Fire)',
  },
  {
    keys: ['KeyS', 'KeyF'],
    weapon: 'fire_light',
    label: 'S + F',
    name: 'Solar Supernova (Fire+Light)',
  },
  {
    keys: ['KeyA', 'KeyF'],
    weapon: 'fire_shadow',
    label: 'A + F',
    name: 'Abyssal Hellfire (Fire+Shadow)',
  },
  {
    keys: ['KeyI', 'KeyR'],
    weapon: 'ice_rocket',
    label: 'I + R',
    name: 'Cryo Torpedo (Ice+Rocket)',
  },
  { keys: ['KeyI', 'KeyP'], weapon: 'ice_poison', label: 'I + P', name: 'Cryo Venom (Ice+Poison)' },
  {
    keys: ['KeyE', 'KeyI'],
    weapon: 'earth_ice',
    label: 'E + I',
    name: 'Glacial Permafrost (Earth+Ice)',
  },
  { keys: ['KeyS', 'KeyI'], weapon: 'ice_light', label: 'S + I', name: 'Aurora Prism (Ice+Light)' },
  { keys: ['KeyA', 'KeyI'], weapon: 'ice_shadow', label: 'A + I', name: 'Black Ice (Ice+Shadow)' },
  {
    keys: ['KeyL', 'KeyP'],
    weapon: 'lightning_poison',
    label: 'L + P',
    name: 'Neurotoxin Arc (Volt+Poison)',
  },
  {
    keys: ['KeyL', 'KeyW'],
    weapon: 'lightning_wind',
    label: 'L + W',
    name: 'Thunder Tempest (Volt+Wind)',
  },
  {
    keys: ['KeyE', 'KeyL'],
    weapon: 'earth_lightning',
    label: 'E + L',
    name: 'Tectonic Surge (Earth+Volt)',
  },
  {
    keys: ['KeyS', 'KeyL'],
    weapon: 'light_lightning',
    label: 'S + L',
    name: 'Divine Thunder (Light+Volt)',
  },
  {
    keys: ['KeyA', 'KeyL'],
    weapon: 'lightning_shadow',
    label: 'A + L',
    name: 'Void Spark (Volt+Shadow)',
  },
  {
    keys: ['KeyR', 'KeyP'],
    weapon: 'poison_rocket',
    label: 'R + P',
    name: 'Bio-Hazard Warhead (Rocket+Poison)',
  },
  {
    keys: ['KeyR', 'KeyW'],
    weapon: 'rocket_wind',
    label: 'R + W',
    name: 'Turboflyer Missile (Rocket+Wind)',
  },
  {
    keys: ['KeyE', 'KeyR'],
    weapon: 'earth_rocket',
    label: 'E + R',
    name: 'Bunker Buster (Earth+Rocket)',
  },
  {
    keys: ['KeyS', 'KeyR'],
    weapon: 'light_rocket',
    label: 'S + R',
    name: 'Photon Missile (Light+Rocket)',
  },
  {
    keys: ['KeyA', 'KeyR'],
    weapon: 'rocket_shadow',
    label: 'A + R',
    name: 'Dreadnought Core (Rocket+Shadow)',
  },
  {
    keys: ['KeyP', 'KeyW'],
    weapon: 'poison_wind',
    label: 'P + W',
    name: 'Miasma Cyclone (Poison+Wind)',
  },
  {
    keys: ['KeyE', 'KeyP'],
    weapon: 'earth_poison',
    label: 'E + P',
    name: 'Venom Geode (Earth+Poison)',
  },
  {
    keys: ['KeyS', 'KeyP'],
    weapon: 'light_poison',
    label: 'S + P',
    name: 'Purifying Rot (Light+Poison)',
  },
  {
    keys: ['KeyA', 'KeyP'],
    weapon: 'poison_shadow',
    label: 'A + P',
    name: 'Corrupting Plague (Poison+Shadow)',
  },
  {
    keys: ['KeyE', 'KeyW'],
    weapon: 'earth_wind',
    label: 'E + W',
    name: 'Sandstorm Scythe (Earth+Wind)',
  },
  { keys: ['KeyS', 'KeyW'], weapon: 'light_wind', label: 'S + W', name: 'Zephyr Ray (Light+Wind)' },
  {
    keys: ['KeyA', 'KeyW'],
    weapon: 'shadow_wind',
    label: 'A + W',
    name: 'Nether Gale (Shadow+Wind)',
  },
  {
    keys: ['KeyE', 'KeyS'],
    weapon: 'earth_light',
    label: 'E + S',
    name: 'Crystal Prism (Earth+Light)',
  },
  {
    keys: ['KeyE', 'KeyA'],
    weapon: 'earth_shadow',
    label: 'E + A',
    name: 'Obsidian Oblivion (Earth+Shadow)',
  },
];

const AWAKEN_CHEATS = [
  { code: 'Digit1', element: 'fire', label: '⌥ / Ctrl + 1', name: 'Fire' },
  { code: 'Digit2', element: 'ice', label: '⌥ / Ctrl + 2', name: 'Ice' },
  { code: 'Digit3', element: 'poison', label: '⌥ / Ctrl + 3', name: 'Poison' },
  { code: 'Digit4', element: 'earth', label: '⌥ / Ctrl + 4', name: 'Earth' },
  { code: 'Digit5', element: 'lightning', label: '⌥ / Ctrl + 5', name: 'Volt' },
  { code: 'Digit6', element: 'wind', label: '⌥ / Ctrl + 6', name: 'Wind' },
  { code: 'Digit7', element: 'light', label: '⌥ / Ctrl + 7', name: 'Light' },
  { code: 'Digit8', element: 'shadow', label: '⌥ / Ctrl + 8', name: 'Shadow' },
  { code: 'Digit9', element: 'rocket', label: '⌥ / Ctrl + 9', name: 'Rocket' },
];

const getWeaponElements = weaponId => WEAPONS[weaponId]?.elements || [];

// Element awaken progression: a fusion keeps BOTH elements while repeated pickups
// strengthen only the element that was picked (maximum level 3).
const processWeaponStack = (player, pickedId) => {
  const currentWeapon = player.weapon || 'default';
  const currentElements = getWeaponElements(currentWeapon);
  const pickedElements = getWeaponElements(pickedId);
  const pickedElement = pickedElements[0] || pickedId;
  const awakenedLevels = { ...(player.awakenedLevels || {}) };

  if (!currentElements.length) {
    return {
      newWeapon: pickedId,
      stackLevel: 1,
      awakenElement: null,
      awakenedLevels: {},
      type: 'equip',
    };
  }

  // Picking an element already present in the weapon awakens that element,
  // without replacing the other element in a fusion.
  if (currentElements.includes(pickedElement)) {
    const nextLevel = Math.min(3, (awakenedLevels[pickedElement] || 0) + 1);
    awakenedLevels[pickedElement] = nextLevel;
    return {
      newWeapon: currentWeapon,
      stackLevel: nextLevel,
      awakenElement: pickedElement,
      awakenedLevels,
      type: 'awaken',
    };
  }

  // A new element upgrades a single-element weapon into a fusion.
  if (currentElements.length === 1) {
    const comboKey = [currentElements[0], pickedElement].sort().join('+');
    const fusionId = ELEMENT_COMBOS[comboKey] || pickedId;
    return {
      newWeapon: fusionId,
      stackLevel: 0,
      awakenElement: null,
      awakenedLevels: {},
      type: fusionId !== pickedId ? 'fusion' : 'switch',
    };
  }

  // A completely different element switches the weapon and clears old awaken stacks.
  return {
    newWeapon: pickedId,
    stackLevel: 1,
    awakenElement: null,
    awakenedLevels: {},
    type: 'switch',
  };
};

const combineWeapons = (currentId, pickedId) => {
  const current = getWeaponElements(currentId);
  const picked = getWeaponElements(pickedId);
  if (!current.length) return pickedId;
  if (!picked.length) return pickedId || 'default';
  if (current.length === 1 && picked.length === 1 && current[0] === picked[0]) return currentId;
  const key = [...new Set([...current, ...picked])].sort().join('+');
  return ELEMENT_COMBOS[key] || pickedId;
};

// ---------------------------------------------------------------------------
// Projectile renderers (forward = -Y; canvas is already translated & rotated)
// ---------------------------------------------------------------------------
const flameShape = (ctx, w, h, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.bezierCurveTo(w * 1.2, h * 0.2, w * 1.1, -h * 0.8, 0, -h * 0.8);
  ctx.bezierCurveTo(-w * 1.1, -h * 0.8, -w * 1.2, h * 0.2, 0, h);
  ctx.closePath();
  ctx.fill();
};

const EARTH_SHARD = [
  [0, -10],
  [4, -5],
  [6, 1],
  [3, 7],
  [-2, 8],
  [-6, 2],
  [-4, -5],
];

const PROJECTILE_DRAWERS = {
  default(ctx, t, color) {
    const g = ctx.createLinearGradient(0, -8, 0, 18);
    g.addColorStop(0, '#FFFFFF');
    g.addColorStop(0.25, color);
    g.addColorStop(1, 'rgba(249,115,22,0)');
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(0, -9);
    ctx.quadraticCurveTo(3.2, -4, 2.4, 18);
    ctx.lineTo(-2.4, 18);
    ctx.quadraticCurveTo(-3.2, -4, 0, -9);
    ctx.fill();
  },

  fire(ctx, t) {
    const f = Math.sin(t * 40) * 1.4;
    ctx.shadowColor = '#F97316';
    ctx.shadowBlur = 18;
    const tail = ctx.createLinearGradient(0, 2, 0, 26);
    tail.addColorStop(0, 'rgba(249,115,22,0.8)');
    tail.addColorStop(1, 'rgba(239,68,68,0)');
    ctx.fillStyle = tail;
    ctx.beginPath();
    ctx.moveTo(-4, 2);
    ctx.quadraticCurveTo(-2 + f, 14, f, 26);
    ctx.quadraticCurveTo(2 - f, 14, 4, 2);
    ctx.fill();
    flameShape(ctx, 5.5, 10 + f * 0.3, '#EF4444');
    flameShape(ctx, 3.8, 7.5, '#F97316');
    flameShape(ctx, 2, 4.5, '#FDE047');
  },

  ice(ctx, t) {
    ctx.shadowColor = '#38BDF8';
    ctx.shadowBlur = 14;
    // snowflake trail
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = `rgba(186,230,253,${0.6 - i * 0.18})`;
      ctx.beginPath();
      ctx.arc(Math.sin(t * 20 + i * 2) * 2, 14 + i * 6, 1.8 - i * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
    const g = ctx.createLinearGradient(-5, -11, 5, 10);
    g.addColorStop(0, '#E0F2FE');
    g.addColorStop(0.5, '#38BDF8');
    g.addColorStop(1, '#0369A1');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(0, -12);
    ctx.lineTo(4.5, -3);
    ctx.lineTo(3.5, 6);
    ctx.lineTo(0, 10);
    ctx.lineTo(-3.5, 6);
    ctx.lineTo(-4.5, -3);
    ctx.closePath();
    ctx.fill();
    // facet
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.beginPath();
    ctx.moveTo(0, -12);
    ctx.lineTo(4.5, -3);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, -12);
    ctx.lineTo(0, 10);
    ctx.stroke();
  },

  lightning(ctx, t) {
    const n = 6;
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const y = -13 + (i * 28) / n;
      const x = i === 0 || i === n ? 0 : Math.sin(t * 60 + i * 2.3) * 4.5;
      pts.push([x, y]);
    }
    const path = () => {
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    };
    ctx.lineJoin = 'round';
    ctx.shadowColor = '#FACC15';
    ctx.shadowBlur = 18;
    ctx.strokeStyle = 'rgba(250,204,21,0.55)';
    ctx.lineWidth = 5;
    path();
    ctx.stroke();
    ctx.strokeStyle = '#FEF9C3';
    ctx.lineWidth = 1.8;
    path();
    ctx.stroke();
    // small branch
    const [bx, by] = pts[3];
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(bx + 5, by + 4);
    ctx.stroke();
  },

  rocket(ctx, t) {
    const f = Math.sin(t * 50) * 2;
    ctx.shadowColor = '#F59E0B';
    ctx.shadowBlur = 12;
    // exhaust flame
    const fl = ctx.createLinearGradient(0, 7, 0, 22 + f);
    fl.addColorStop(0, '#FDE047');
    fl.addColorStop(0.5, '#F97316');
    fl.addColorStop(1, 'rgba(239,68,68,0)');
    ctx.fillStyle = fl;
    ctx.beginPath();
    ctx.moveTo(-2.6, 7);
    ctx.lineTo(0, 22 + f);
    ctx.lineTo(2.6, 7);
    ctx.fill();
    // fins
    ctx.fillStyle = '#B91C1C';
    ctx.beginPath();
    ctx.moveTo(-2.6, 2);
    ctx.lineTo(-6, 9);
    ctx.lineTo(-2.6, 7);
    ctx.moveTo(2.6, 2);
    ctx.lineTo(6, 9);
    ctx.lineTo(2.6, 7);
    ctx.fill();
    // body
    ctx.fillStyle = '#E2E8F0';
    ctx.fillRect(-2.8, -6, 5.6, 14);
    ctx.fillStyle = '#94A3B8';
    ctx.fillRect(0.6, -6, 2.2, 14);
    // nose cone
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.moveTo(-2.8, -6);
    ctx.quadraticCurveTo(0, -15, 2.8, -6);
    ctx.fill();
    // window
    ctx.fillStyle = '#38BDF8';
    ctx.beginPath();
    ctx.arc(0, -1, 1.4, 0, Math.PI * 2);
    ctx.fill();
  },

  poison(ctx, t) {
    ctx.shadowColor = '#A3E635';
    ctx.shadowBlur = 14;
    // dripping trail
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = `rgba(132,204,22,${0.55 - i * 0.15})`;
      ctx.beginPath();
      ctx.arc(Math.sin(t * 12 + i * 2.4) * 2.2, 11 + i * 6, 2.6 - i * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }
    const g = ctx.createRadialGradient(-1.5, -2, 1, 0, 0, 8);
    g.addColorStop(0, '#ECFCCB');
    g.addColorStop(0.5, '#84CC16');
    g.addColorStop(1, '#3F6212');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(0, 12);
    ctx.bezierCurveTo(8, 6, 7, -9, 0, -9);
    ctx.bezierCurveTo(-7, -9, -8, 6, 0, 12);
    ctx.fill();
    // bubbles
    ctx.fillStyle = 'rgba(236,252,203,0.8)';
    ctx.beginPath();
    ctx.arc(-2, -2, 1.5, 0, Math.PI * 2);
    ctx.arc(2, 3, 1, 0, Math.PI * 2);
    ctx.fill();
  },

  wind(ctx, t) {
    ctx.shadowColor = '#67E8F9';
    ctx.shadowBlur = 12;
    // swirl streaks behind the blade
    ctx.strokeStyle = 'rgba(165,243,252,0.55)';
    ctx.lineWidth = 1.2;
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 4, 4);
      ctx.quadraticCurveTo(i * 4 + Math.sin(t * 15 + i) * 3, 14, i * 4, 22);
      ctx.stroke();
    }
    // crescent blade
    const g = ctx.createLinearGradient(0, -12, 0, 4);
    g.addColorStop(0, '#FFFFFF');
    g.addColorStop(1, '#22D3EE');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(-8, 4);
    ctx.quadraticCurveTo(0, -18, 8, 4);
    ctx.quadraticCurveTo(0, -6, -8, 4);
    ctx.fill();
  },

  earth(ctx, t) {
    ctx.rotate(t * 5);
    ctx.shadowColor = '#C08457';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#92643A';
    ctx.beginPath();
    EARTH_SHARD.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#C08457';
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(4, -5);
    ctx.lineTo(0, 0);
    ctx.lineTo(-4, -5);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#5B3A1E';
    ctx.lineWidth = 1;
    ctx.beginPath();
    EARTH_SHARD.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.stroke();
  },

  light(ctx, t) {
    const g = ctx.createLinearGradient(0, -12, 0, 24);
    g.addColorStop(0, '#FFFFFF');
    g.addColorStop(0.3, 'rgba(254,240,138,0.9)');
    g.addColorStop(1, 'rgba(253,224,71,0)');
    ctx.shadowColor = '#FEF08A';
    ctx.shadowBlur = 22;
    ctx.fillStyle = g;
    ctx.fillRect(-2, -12, 4, 36);
    // 4-point flare
    const s = 1 + Math.sin(t * 30) * 0.15;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(0, -14 * s);
    ctx.lineTo(1.6, -7.6);
    ctx.lineTo(6 * s, -6);
    ctx.lineTo(1.6, -4.4);
    ctx.lineTo(0, 2 * s);
    ctx.lineTo(-1.6, -4.4);
    ctx.lineTo(-6 * s, -6);
    ctx.lineTo(-1.6, -7.6);
    ctx.closePath();
    ctx.fill();
  },

  shadow(ctx, t) {
    ctx.shadowColor = '#A855F7';
    ctx.shadowBlur = 18;
    // dark mist tail
    const tail = ctx.createLinearGradient(0, 0, 0, 22);
    tail.addColorStop(0, 'rgba(88,28,135,0.7)');
    tail.addColorStop(1, 'rgba(88,28,135,0)');
    ctx.fillStyle = tail;
    ctx.beginPath();
    ctx.moveTo(-5, 0);
    ctx.quadraticCurveTo(Math.sin(t * 10) * 3, 12, 0, 22);
    ctx.quadraticCurveTo(Math.sin(t * 10) * 3, 12, 5, 0);
    ctx.fill();
    const g = ctx.createRadialGradient(0, 0, 1, 0, 0, 7);
    g.addColorStop(0, '#0F0524');
    g.addColorStop(0.7, '#3B0764');
    g.addColorStop(1, '#7E22CE');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, 6.5, 0, Math.PI * 2);
    ctx.fill();
    // pulsing ring
    ctx.strokeStyle = `rgba(216,180,254,${0.6 + Math.sin(t * 12) * 0.3})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, 8.5 + Math.sin(t * 12), 0, Math.PI * 2);
    ctx.stroke();
  },
};

// Draw order: "body" elements first, effect elements layered on top.
const PROJECTILE_ORDER = [
  'rocket',
  'earth',
  'shadow',
  'ice',
  'poison',
  'wind',
  'fire',
  'lightning',
  'light',
];

// Projectiles are pre-rendered once into small offscreen sprites (a few animation frames),
// so the game loop only does a cheap drawImage per bullet instead of gradients + shadowBlur.
const SPRITE_SIZE = 64;
const SPRITE_FRAMES = 6;
const SPRITE_FPS = 15;
const projectileSpriteCache = new Map();

const renderProjectileSprite = (sctx, elements, color, t) => {
  sctx.translate(SPRITE_SIZE / 2, SPRITE_SIZE / 2);
  if (!elements.length) {
    PROJECTILE_DRAWERS.default(sctx, t, color);
    return;
  }
  const sorted = [...elements].sort(
    (a, b) => PROJECTILE_ORDER.indexOf(a) - PROJECTILE_ORDER.indexOf(b)
  );
  sorted.forEach((el, idx) => {
    const draw = PROJECTILE_DRAWERS[el];
    if (!draw) return;
    sctx.save();
    if (idx > 0) {
      // Second element of a fusion: smaller, additive glow layered on the first
      sctx.scale(0.72, 0.72);
      sctx.globalCompositeOperation = 'lighter';
    }
    draw(sctx, t + idx * 0.7, color);
    sctx.restore();
  });
};

const getProjectileSprites = (elements, color) => {
  const key = `${elements.join('+') || 'default'}|${color}`;
  let frames = projectileSpriteCache.get(key);
  if (frames) return frames;
  frames = [];
  for (let f = 0; f < SPRITE_FRAMES; f++) {
    const c = document.createElement('canvas');
    c.width = SPRITE_SIZE;
    c.height = SPRITE_SIZE;
    // One full earth-shard rotation (5 rad/s) is spread over all frames.
    renderProjectileSprite(
      c.getContext('2d'),
      elements,
      color,
      (f * Math.PI * 2) / 5 / SPRITE_FRAMES
    );
    frames.push(c);
  }
  projectileSpriteCache.set(key, frames);
  return frames;
};

// Awaken visuals are static, tiny offscreen sprites. Build each element/level once;
// never create gradients, paths, or shadowBlur inside the per-frame projectile loop.
const AWAKEN_SPRITE_SIZE = 64;
const awakenSpriteCache = new Map();
const AWAKEN_COLORS = {
  fire: '#FB923C',
  ice: '#7DD3FC',
  poison: '#A3E635',
  earth: '#C08457',
  lightning: '#FDE047',
  wind: '#67E8F9',
  light: '#FEF08A',
  shadow: '#C084FC',
  rocket: '#F59E0B',
};

const getAwakenSprite = (element, level) => {
  const safeLevel = Math.max(1, Math.min(3, level || 1));
  const key = `${element}:${safeLevel}`;
  const cached = awakenSpriteCache.get(key);
  if (cached) return cached;

  const sprite = document.createElement('canvas');
  sprite.width = AWAKEN_SPRITE_SIZE;
  sprite.height = AWAKEN_SPRITE_SIZE;
  const c = sprite.getContext('2d');
  if (!c) return null;

  const color = AWAKEN_COLORS[element] || '#FFFFFF';
  const center = AWAKEN_SPRITE_SIZE / 2;
  const radius = 10 + safeLevel * 2;
  c.translate(center, center);
  c.lineCap = 'round';
  c.lineJoin = 'round';

  // Crisp layered emblem: all paths are baked into a cached sprite, never drawn per frame.
  // The brighter inner stroke keeps the Awaken readable over busy projectile colors.
  c.globalAlpha = 0.38;
  c.fillStyle = color;
  c.beginPath();
  c.arc(0, 0, 8 + safeLevel * 1.5, 0, Math.PI * 2);
  c.fill();
  c.globalAlpha = 0.95;
  c.strokeStyle = color;
  c.lineWidth = safeLevel === 3 ? 2.1 : 1.5;

  const polygon = (points, close = true) => {
    c.beginPath();
    points.forEach(([x, y], index) => (index ? c.lineTo(x, y) : c.moveTo(x, y)));
    if (close) c.closePath();
    c.stroke();
  };
  const starPoints = (outer, inner, count, offset = -Math.PI / 2) => {
    const points = [];
    for (let i = 0; i < count * 2; i++) {
      const a = offset + (Math.PI * i) / count;
      const r = i % 2 === 0 ? outer : inner;
      points.push([Math.cos(a) * r, Math.sin(a) * r]);
    }
    return points;
  };

  // Fire Awaken gets a full flame silhouette (not a generic emblem): layered
  // tongues, a hot core, ember sparks, and level-specific flame crowns. This is
  // rendered once into the sprite cache, so none of these paths run per frame.
  if (element === 'fire') {
    const flame = (scale, yOffset, fill) => {
      c.save();
      c.translate(0, yOffset);
      c.scale(scale, scale);
      c.fillStyle = fill;
      c.beginPath();
      c.moveTo(0, 23);
      c.bezierCurveTo(-12, 18, -19, 10, -14, 0);
      c.bezierCurveTo(-13, -5, -8, -7, -7, -16);
      c.bezierCurveTo(-1, -11, 1, -7, 0, -2);
      c.bezierCurveTo(7, -9, 9, -15, 8, -22);
      c.bezierCurveTo(19, -11, 22, 0, 17, 11);
      c.bezierCurveTo(14, 18, 7, 22, 0, 23);
      c.closePath();
      c.fill();
      c.restore();
    };

    // Rear flame tongues create a recognizable fire crown.
    flame(0.78, -1, '#B91C1C');
    flame(0.94, 1, '#EA580C');
    flame(0.67, 2, '#FB923C');
    // Bright inner flame / molten core.
    c.fillStyle = '#FDE047';
    c.beginPath();
    c.moveTo(0, 17);
    c.bezierCurveTo(-7, 12, -8, 5, -4, -1);
    c.bezierCurveTo(-2, -4, -1, -7, 0, -11);
    c.bezierCurveTo(7, -3, 8, 4, 5, 10);
    c.bezierCurveTo(4, 14, 2, 16, 0, 17);
    c.closePath();
    c.fill();
    c.fillStyle = '#FFF7CC';
    c.beginPath();
    c.ellipse(0, 8, 2.8, 6.5, 0, 0, Math.PI * 2);
    c.fill();

    // Embers are baked into the sprite; higher levels have more sparks.
    c.fillStyle = safeLevel >= 3 ? '#FFF7CC' : '#FBBF24';
    const embers = [
      [-18, 4, 1.5],
      [16, -5, 1.4],
      [-12, -15, 1.1],
      [12, 13, 1.2],
      [2, -25, 1.1],
      [-22, -8, 0.9],
    ];
    embers.slice(0, safeLevel + 2).forEach(([x, y, r]) => {
      c.beginPath();
      c.arc(x, y, r, 0, Math.PI * 2);
      c.fill();
    });

    // Awaken levels add flame-shaped side flares rather than a shared geometric frame.
    if (safeLevel >= 2) {
      c.strokeStyle = '#FDBA74';
      c.lineWidth = 2;
      c.globalAlpha = 0.95;
      for (const side of [-1, 1]) {
        c.save();
        c.scale(side, 1);
        c.beginPath();
        c.moveTo(10, 13);
        c.quadraticCurveTo(23, 4, 18, -9);
        c.quadraticCurveTo(17, -1, 12, 1);
        c.stroke();
        c.restore();
      }
      c.globalAlpha = 1;
    }
    if (safeLevel >= 3) {
      c.strokeStyle = '#FDE047';
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(-8, -20);
      c.quadraticCurveTo(-2, -29, 0, -31);
      c.quadraticCurveTo(5, -25, 8, -20);
      c.stroke();
      c.fillStyle = '#FFF7CC';
      c.beginPath();
      c.arc(0, -28, 1.7, 0, Math.PI * 2);
      c.fill();
    }

    awakenSpriteCache.set(key, sprite);
    return sprite;
  }

  // Each element has a distinct silhouette rather than sharing generic circles.
  if (element === 'fire') {
    for (let i = 0; i < 3 + safeLevel; i++) {
      const a = (Math.PI * 2 * i) / (3 + safeLevel);
      c.save();
      c.rotate(a);
      polygon([
        [0, -radius - 7],
        [4, -radius],
        [1.5, -radius + 2],
        [0, -radius + 6],
        [-3, -radius],
      ]);
      c.restore();
    }
    polygon(starPoints(8 + safeLevel, 3.5, 4));
  } else if (element === 'ice') {
    polygon([
      [0, -radius - 3],
      [radius * 0.72, -radius * 0.55],
      [radius, 0],
      [radius * 0.72, radius * 0.55],
      [0, radius + 3],
      [-radius * 0.72, radius * 0.55],
      [-radius, 0],
      [-radius * 0.72, -radius * 0.55],
    ]);
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      c.beginPath();
      c.moveTo(Math.cos(a) * 4, Math.sin(a) * 4);
      c.lineTo(Math.cos(a) * (radius + 5), Math.sin(a) * (radius + 5));
      c.stroke();
    }
  } else if (element === 'poison') {
    c.beginPath();
    c.arc(0, 0, radius * 0.72, 0, Math.PI * 2);
    c.stroke();
    for (let i = 0; i < 3 + safeLevel; i++) {
      const a = (Math.PI * 2 * i) / (3 + safeLevel);
      const x = Math.cos(a) * (radius + 3),
        y = Math.sin(a) * (radius + 3);
      c.beginPath();
      c.arc(x, y, 2 + (i % 2), 0, Math.PI * 2);
      c.stroke();
    }
    c.beginPath();
    c.arc(-3, -2, 2, 0, Math.PI * 2);
    c.fillStyle = color;
    c.fill();
  } else if (element === 'earth') {
    polygon([
      [0, -radius - 4],
      [radius * 0.82, -radius * 0.2],
      [radius * 0.58, radius * 0.8],
      [-radius * 0.18, radius + 2],
      [-radius, radius * 0.15],
      [-radius * 0.62, -radius * 0.72],
    ]);
    polygon(
      [
        [-4, -radius * 0.3],
        [2, -2],
        [-3, 4],
        [4, radius * 0.5],
      ],
      false
    );
  } else if (element === 'lightning') {
    polygon(
      [
        [3, -radius - 5],
        [-radius * 0.48, -1],
        [0, -1],
        [-4, radius + 4],
        [radius * 0.58, -3],
        [radius * 0.08, -3],
      ],
      false
    );
    for (const side of [-1, 1])
      polygon(
        [
          [side * 2, -3],
          [side * (radius + 4), -radius * 0.48],
        ],
        false
      );
  } else if (element === 'wind') {
    for (let i = 0; i < 3; i++) {
      c.beginPath();
      c.arc(-2, 1, radius - i * 4, -Math.PI * 0.15 + i * 0.18, Math.PI * 1.25 + i * 0.18);
      c.stroke();
    }
    polygon(
      [
        [radius * 0.45, -radius * 0.7],
        [radius + 5, -radius * 0.2],
        [radius * 0.55, radius * 0.05],
      ],
      false
    );
  } else if (element === 'light') {
    polygon(starPoints(radius + 5, 5, 8));
    polygon(starPoints(7, 2.5, 4));
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      c.beginPath();
      c.moveTo(Math.cos(a) * (radius + 6), Math.sin(a) * (radius + 6));
      c.lineTo(Math.cos(a) * (radius + 9), Math.sin(a) * (radius + 9));
      c.stroke();
    }
  } else if (element === 'shadow') {
    c.beginPath();
    c.arc(0, 0, radius + 1, 0.2, Math.PI * 1.8);
    c.stroke();
    c.beginPath();
    c.arc(2, -1, radius * 0.55, Math.PI, Math.PI * 2.65);
    c.stroke();
    polygon(
      [
        [0, -7],
        [5, 0],
        [0, 7],
        [-4, 1],
      ],
      true
    );
  } else {
    // Rocket: compact missile outline with fins and exhaust chevrons.
    polygon([
      [0, -radius - 5],
      [radius * 0.42, -radius * 0.1],
      [radius * 0.32, radius * 0.58],
      [0, radius * 0.35],
      [-radius * 0.32, radius * 0.58],
      [-radius * 0.42, -radius * 0.1],
    ]);
    polygon(
      [
        [-radius * 0.35, radius * 0.12],
        [-radius - 2, radius * 0.58],
        [-radius * 0.25, radius * 0.58],
      ],
      true
    );
    polygon(
      [
        [radius * 0.35, radius * 0.12],
        [radius + 2, radius * 0.58],
        [radius * 0.25, radius * 0.58],
      ],
      true
    );
    polygon(
      [
        [-4, radius + 2],
        [0, radius + 6],
        [4, radius + 2],
      ],
      false
    );
  }

  // Level-up frame: Lv2 adds one diamond orbit; Lv3 adds a second segmented orbit.
  c.globalAlpha = 0.72;
  if (safeLevel >= 2) {
    c.save();
    c.rotate(Math.PI / 4);
    c.strokeRect(-radius - 3, -radius - 3, (radius + 3) * 2, (radius + 3) * 2);
    c.restore();
  }
  if (safeLevel >= 3) {
    c.lineWidth = 1.2;
    c.beginPath();
    c.arc(0, 0, radius + 9, -0.35, 1.05);
    c.stroke();
    c.beginPath();
    c.arc(0, 0, radius + 9, 1.75, 3.15);
    c.stroke();
    c.beginPath();
    c.arc(0, 0, radius + 9, 3.85, 5.2);
    c.stroke();
  }

  // Element-specific filled core makes the projectile silhouette readable at a glance.
  c.globalAlpha = 0.96;
  c.fillStyle = color;
  c.beginPath();
  if (element === 'fire') {
    c.moveTo(0, -8 - safeLevel);
    c.quadraticCurveTo(8, 1, 0, 8);
    c.quadraticCurveTo(-7, 1, 0, -8 - safeLevel);
  } else if (element === 'ice') {
    c.moveTo(0, -8);
    c.lineTo(6, 0);
    c.lineTo(0, 8);
    c.lineTo(-6, 0);
    c.closePath();
  } else if (element === 'poison') {
    c.arc(0, 0, 6 + safeLevel, 0, Math.PI * 2);
  } else if (element === 'earth') {
    c.moveTo(0, -8);
    c.lineTo(7, -2);
    c.lineTo(4, 7);
    c.lineTo(-5, 6);
    c.lineTo(-7, -3);
    c.closePath();
  } else if (element === 'lightning') {
    c.moveTo(3, -9);
    c.lineTo(-5, 1);
    c.lineTo(0, 1);
    c.lineTo(-3, 9);
    c.lineTo(6, -2);
    c.lineTo(1, -2);
    c.closePath();
  } else if (element === 'wind') {
    c.moveTo(-7, -5);
    c.quadraticCurveTo(8, -8, 5, 1);
    c.quadraticCurveTo(2, 7, -5, 5);
    c.lineTo(1, 1);
    c.lineTo(-7, -5);
    c.closePath();
  } else if (element === 'light') {
    c.moveTo(0, -9);
    c.lineTo(3, -3);
    c.lineTo(9, 0);
    c.lineTo(3, 3);
    c.lineTo(0, 9);
    c.lineTo(-3, 3);
    c.lineTo(-9, 0);
    c.lineTo(-3, -3);
    c.closePath();
  } else if (element === 'shadow') {
    c.moveTo(0, -9);
    c.quadraticCurveTo(10, -2, 4, 7);
    c.lineTo(-2, 5);
    c.quadraticCurveTo(-9, -2, 0, -9);
    c.closePath();
  } else {
    c.moveTo(0, -10);
    c.lineTo(5, 0);
    c.lineTo(3, 6);
    c.lineTo(0, 4);
    c.lineTo(-3, 6);
    c.lineTo(-5, 0);
    c.closePath();
  }
  c.fill();
  c.globalAlpha = 1;
  c.fillStyle = '#FFFFFF';
  c.beginPath();
  c.arc(0, 0, safeLevel === 3 ? 2.5 : 1.8, 0, Math.PI * 2);
  c.fill();
  awakenSpriteCache.set(key, sprite);
  return sprite;
};

const drawElementProjectile = (ctx, l, time) => {
  const elements = l.elements?.length ? l.elements : getWeaponElements(l.type);
  const frames = getProjectileSprites(elements, l.color || '#F97316');
  if (l.spritePhase === undefined) l.spritePhase = Math.floor(Math.random() * SPRITE_FRAMES);
  const frame = frames[(Math.floor(time * SPRITE_FPS) + l.spritePhase) % SPRITE_FRAMES];
  ctx.save();
  ctx.translate(l.x, l.y);
  ctx.rotate(Math.atan2(l.vy, l.vx) + Math.PI / 2); // 0 = facing up
  // Awakened shots use the element's own silhouette as the primary projectile.
  // Keep the normal projectile faintly visible for fusion identity, then draw the
  // cached, element-specific Awaken shape on top (no per-frame path construction).
  const awakenLevel = l.awakenLevel || 0;
  const hasAwaken = awakenLevel > 0 && l.awakenElement && elements.includes(l.awakenElement);
  if (hasAwaken) {
    ctx.globalAlpha = elements.length > 1 ? 0.28 : 0.38;
    ctx.drawImage(frame, -SPRITE_SIZE / 2, -SPRITE_SIZE / 2);
    ctx.globalAlpha = 1;
    const awakenSprite = getAwakenSprite(l.awakenElement, awakenLevel);
    if (awakenSprite) {
      const awakenSize = 18 + awakenLevel * 2; // Compact Awaken overlay: Lv.1 20px, Lv.2 22px, Lv.3 24px
      ctx.drawImage(awakenSprite, -awakenSize / 2, -awakenSize / 2, awakenSize, awakenSize);
    }
  } else {
    ctx.drawImage(frame, -SPRITE_SIZE / 2, -SPRITE_SIZE / 2);
  }
  ctx.restore();
};

// Jarak pesawat di atas jari saat main pakai touch (px) agar pas dan tidak terlalu tinggi
const TOUCH_Y_OFFSET = 75;

// Posisi vertikal awal pesawat di layar touch (rasio dari tinggi canvas)
const TOUCH_START_Y_RATIO = 0.72;

const isCoarsePointer = () =>
  typeof window !== 'undefined' && Boolean(window.matchMedia?.('(pointer: coarse)').matches);

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
  const [weapon, setWeapon] = useState('default');
  const [activeAbilities, setActiveAbilities] = useState([]);
  const [playerHp, setPlayerHp] = useState(100);

  const ABILITY_INFO = {
    triple: { name: 'Triple Shot', icon: '3X', color: '#F59E0B' },
    ricochet: { name: 'Ricochet', icon: '↗', color: '#34D399' },
    piercing: { name: 'Piercing', icon: '➤', color: '#A78BFA' },
    rapid: { name: 'Rapid Fire', icon: '2X', color: '#F43F5E' },
  };

  const grantAbility = ability => {
    const g = gameRef.current;
    const current = [...(g.player.abilities || [])];
    if (current.includes(ability)) {
      // Picking the same ability again refreshes it without consuming a slot.
      setActiveAbilities(current);
      return;
    }
    // Keep only three abilities; the oldest one is replaced by the new pickup.
    const next = [...current, ability].slice(-3);
    g.player.abilities = next;
    setActiveAbilities(next);
    g.bossVictory = {
      text:
        current.length >= 3
          ? `🔄 ${ABILITY_INFO[ability].name.toUpperCase()} REPLACED OLDEST ABILITY!`
          : `✨ ${ABILITY_INFO[ability].name.toUpperCase()} UNLOCKED!`,
      timer: 2.5,
    };
  };

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
      hp: 100,
      maxHp: 100,
      abilities: [],
      lastShotTime: 0,
      weapon: 'default',
      awakenElement: null,
      stackLevel: 0,
      awakenedLevels: {},
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
    lastBossSkillIds: [],
    lastBossElementComboId: null,
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

  // Resize canvas according to display width & height
  const updateCanvasDimensions = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const contWidth = containerRef.current.clientWidth || 360;
    const contHeight =
      containerRef.current.clientHeight ||
      (typeof window !== 'undefined' ? window.innerHeight : 600);

    // Keep responsive ratio on mobile, cap max width to 420px
    const targetW = Math.max(300, Math.min(contWidth, 420));
    // Header (~52px) + HUD (~40px) = ~92px. Menggunakan tinggi container langsung agar tidak stretch
    const availableH = Math.max(320, contHeight - 96);
    const targetH = Math.min(availableH, Math.round(targetW * 1.75));

    const canvas = canvasRef.current;
    canvas.width = targetW;
    canvas.height = targetH;

    gameRef.current.width = targetW;
    gameRef.current.height = targetH;
    if (gameState === 'start') {
      gameRef.current.player.x = targetW / 2;
      gameRef.current.player.y = isCoarsePointer() ? targetH * TOUCH_START_Y_RATIO : targetH - 80;
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
    g.lastBossElementComboId = null;
    g.lastBossSkillIds = [];
    g.bossWarning = null;
    g.bossVictory = null;
    g.spawnInterval = 1200;
    g.lasers = [];
    g.meteors = [];
    g.particles = [];
    g.powerups = [];
    g.player.x = g.width / 2;
    // Di mobile pesawat mulai lebih ke depan (atas) supaya tidak tertutup jari
    g.player.y = isCoarsePointer() ? g.height * TOUCH_START_Y_RATIO : g.height - 80;
    g.player.shield = false;
    g.player.bossSlowTimer = 0;
    g.player.tripleShotTime = 0;
    g.player.abilities = [];
    g.player.lastShotTime = 0;
    g.player.weapon = 'default';
    g.player.stackLevel = 0;
    g.player.awakenElement = null;
    g.player.awakenedLevels = {};
    g.player.hp = 100;
    g.player.maxHp = 100;
    g.keys.shoot = false;
    g.cheatKeys = {};
    g.lastCheatTime = 0;

    setScore(0);
    setLives(3);
    setWave(1);
    setActiveAbilities([]);
    setWeapon('default');
    setGameState('playing');
  };

  // Keyboard controls listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = e => {
      const g = gameRef.current;
      g.cheatKeys = g.cheatKeys || {};
      g.cheatKeys[e.code] = true;

      // Awaken cheat: Option/Alt + 1..9, or Control + 1..9 (Mac-friendly fallback).
      // Check physical key codes as well as key values to support different keyboard layouts
      // and the numeric keypad.
      const normalizedDigitCode = e.code.startsWith('Numpad')
        ? `Digit${e.code.slice('Numpad'.length)}`
        : e.code;
      const digitFromKey = /^[1-9]$/.test(e.key) ? `Digit${e.key}` : null;
      const awakenKeyCode = AWAKEN_CHEATS.some(item => item.code === normalizedDigitCode)
        ? normalizedDigitCode
        : digitFromKey;
      const awakenModifierPressed = e.altKey || e.ctrlKey;

      if (
        gameState === 'playing' &&
        !e.repeat &&
        awakenModifierPressed &&
        awakenKeyCode &&
        Date.now() - (g.lastCheatTime || 0) > 350
      ) {
        const awakenCheat = AWAKEN_CHEATS.find(item => item.code === awakenKeyCode);
        if (awakenCheat) {
          e.preventDefault();
          const player = g.player;
          const currentElements = getWeaponElements(player.weapon || 'default');
          const alreadyHasElement = currentElements.includes(awakenCheat.element);

          // Keep an existing fusion if it contains the selected element. If the
          // current weapon is a single element, create a fusion where available.
          // An unrelated two-element fusion is replaced to avoid a 3-element weapon.
          if (!alreadyHasElement) {
            if (currentElements.length === 1) {
              const comboKey = [...currentElements, awakenCheat.element].sort().join('+');
              player.weapon = ELEMENT_COMBOS[comboKey] || awakenCheat.element;
            } else {
              player.weapon = awakenCheat.element;
            }
          }

          player.stackLevel = 3;
          player.awakenElement = awakenCheat.element;
          player.awakenedLevels = { ...(player.awakenedLevels || {}), [awakenCheat.element]: 3 };
          player.lastShotTime = 0;
          g.lastCheatTime = Date.now();
          setWeapon(player.weapon);
          g.bossVictory = {
            text: `✨ ${awakenCheat.name.toUpperCase()} AWAKENED · LV 3`,
            timer: 2.5,
          };
          return;
        }
      }

      // Cheat combos: hold two keys simultaneously to instantly activate a fusion weapon.
      if (gameState === 'playing' && !e.repeat && Date.now() - (g.lastCheatTime || 0) > 350) {
        const cheat = CHEAT_COMBOS.find(combo => combo.keys.every(key => g.cheatKeys[key]));
        if (cheat) {
          g.player.weapon = cheat.weapon;
          g.player.stackLevel = 1;
          g.player.awakenElement = null;
          g.player.awakenedLevels = {};
          // Reset cooldown so the fusion weapon can fire immediately.
          g.player.lastShotTime = 0;
          g.lastCheatTime = Date.now();
          setWeapon(cheat.weapon);
        }
      }

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
      if (gameRef.current.cheatKeys) delete gameRef.current.cheatKeys[e.code];
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
      (e.touches && e.touches.length > 0) || e.pointerType === 'touch' || isCoarsePointer()
    );
    const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
    const relativeX = clientX - rect.left;
    const relativeY = clientY - rect.top;

    // Di mobile pesawat diposisikan jauh di depan (atas) jari supaya tidak tertutup
    const targetY = relativeY - (isTouch ? TOUCH_Y_OFFSET : 0);

    if (relativeX >= 15 && relativeX <= gameRef.current.width - 15) {
      gameRef.current.player.x = relativeX;
    }
    // Clamp (bukan skip) supaya pesawat tetap mengikuti jari walau offset disesuaikan
    const minY = gameRef.current.height * 0.35;
    const maxY = gameRef.current.height - (isTouch ? 55 : 48);
    gameRef.current.player.y = Math.max(minY, Math.min(maxY, targetY));
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
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });
      ctx.globalAlpha = 1.0;

      // Accretion disk ambient glow at top
      const glowKey = `${width}x${height}`;
      if (g.glowKey !== glowKey) {
        const grad = ctx.createRadialGradient(width / 2, -20, 10, width / 2, -20, width * 0.8);
        grad.addColorStop(0, 'rgba(249, 115, 22, 0.25)');
        grad.addColorStop(0.5, 'rgba(139, 92, 246, 0.15)');
        grad.addColorStop(1, 'transparent');
        g.glowGrad = grad;
        g.glowKey = glowKey;
      }
      ctx.fillStyle = g.glowGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. PLAYING UPDATES
      if (gameState === 'playing') {
        // Boss elemental effects can temporarily slow player movement.
        if (p.bossSlowTimer > 0) p.bossSlowTimer = Math.max(0, p.bossSlowTimer - delta);
        const playerMoveSpeed = p.speed * (p.bossSlowTimer > 0 ? 0.62 : 1);

        // Player keyboard motion
        if (g.keys.left) p.x -= playerMoveSpeed;
        if (g.keys.right) p.x += playerMoveSpeed;
        if (g.keys.up) p.y -= playerMoveSpeed;
        if (g.keys.down) p.y += playerMoveSpeed;

        // Boundaries
        p.x = Math.max(18, Math.min(width - 18, p.x));
        p.y = Math.max(height * 0.35, Math.min(height - 48, p.y));

        // Tilt calculation
        const targetTilt = g.keys.left ? -0.3 : g.keys.right ? 0.3 : 0;
        p.tilt += (targetTilt - p.tilt) * 0.2;

        // Abilities persist for the whole run until replaced by a new pickup.
        const playerAbilities = p.abilities || [];

        // Automatic / Pressed Shooting with Permanent Elemental Weapon
        const currentWep = p.weapon || 'default';
        const wepInfo = WEAPONS[currentWep] || WEAPONS.default;
        const weaponBalance = WEAPON_BALANCE[currentWep] || {};
        const baseShootInterval =
          weaponBalance.interval ??
          (currentWep === 'rocket' ? 280 : currentWep === 'lightning' ? 150 : 180);
        // Rapid Fire ability = 2x attack speed
        const shootInterval = playerAbilities.includes('rapid')
          ? baseShootInterval / 2
          : baseShootInterval;

        if (g.keys.shoot && currentTime - p.lastShotTime > shootInterval) {
          p.lastShotTime = currentTime;
          sfx.laser();

          const makeShot = (x, y, vx, vy) => ({
            x,
            y,
            vx,
            vy: weaponBalance.projectileSpeed ? -weaponBalance.projectileSpeed : vy,
            type: currentWep,
            elements: getWeaponElements(currentWep),
            awakenElement: p.awakenElement,
            awakenLevel: p.awakenElement ? p.awakenedLevels?.[p.awakenElement] || 0 : 0,
            color: wepInfo.color,
            radius:
              currentWep === 'rocket' || currentWep === 'rocket_lightning'
                ? 5.5
                : currentWep === 'fire'
                  ? 4.5
                  : 3.5,
            damage: (currentWep === 'rocket' ? 2 : 1) * (weaponBalance.damage ?? 1),
            pierce:
              Boolean(weaponBalance.pierce) ||
              playerAbilities.includes('piercing') ||
              playerAbilities.includes('ricochet'),
            ricochet: playerAbilities.includes('ricochet'),
            hitTargets: [],
            hitBoss: false,
            life: 0,
          });

          if (playerAbilities.includes('triple')) {
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
        const targetKillsForBoss = Math.max(5, 5 + g.wave * 2); // Wave 1: 7 kills, Wave 2: 9 kills
        if (!g.boss && !g.bossWarning && g.waveKills >= targetKillsForBoss) {
          const themeIndex = (g.wave - 1) % BOSS_THEMES.length;
          const theme = BOSS_THEMES[themeIndex];
          const bossName = BOSS_NAMES[Math.min(g.wave - 1, BOSS_NAMES.length - 1)];
          const bossRadius = Math.min(36 + g.wave * 3, 54);
          const bossHp = 65 + (g.wave - 1) * 35; // More durable bosses with stronger scaling each wave

          const numVerts = 10 + Math.floor(Math.random() * 4);
          const vertices = [];
          for (let vi = 0; vi < numVerts; vi++) {
            const angle = (vi / numVerts) * Math.PI * 2;
            const r = bossRadius * (0.85 + Math.random() * 0.3);
            vertices.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
          }

          const bossSkills = pickBossSkills(g.wave, g.lastBossSkillIds);
          g.lastBossSkillIds = bossSkills.map(skill => skill.id);
          const bossElementCombo = pickBossElementCombo(g.lastBossElementComboId);
          g.lastBossElementComboId = bossElementCombo.id;

          g.boss = {
            name: bossName,
            skills: bossSkills,
            elementCombo: bossElementCombo,
            elements: bossElementCombo.elements,
            spiralAngle: Math.random() * Math.PI * 2,
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
            attackInterval: Math.max(1050, 1900 - g.wave * 90),
            vertices,
            flashTimer: 0,
          };

          sfx.bossAlert();
          g.bossWarning = {
            text: `⚠️ ${bossElementCombo.icon} ${bossElementCombo.name.toUpperCase()} — ${bossName} ⚠️`,
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
        if (l.type === 'rocket' || (l.elements || []).includes('rocket')) {
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
        drawElementProjectile(ctx, l, currentTime / 1000);

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
            m.hp -= m.poisonDamage ?? 1;
            m.poisonTick = 0;
          }
        }
        m.y += m.speed;
        m.rotation += m.rotSpeed;

        // Meteor Trail / Aura
        ctx.save();
        ctx.translate(m.x, m.y);

        // Fire trail behind meteor (upward, since meteor moves downward)
        if (m.type === 'fast' || m.type === 'huge') {
          const trailLen = m.type === 'huge' ? m.radius * 1.8 : m.radius * 1.4;
          const trailGrad = ctx.createLinearGradient(0, -m.radius, 0, -m.radius - trailLen);
          trailGrad.addColorStop(
            0,
            m.type === 'fast' ? 'rgba(239,68,68,0.7)' : 'rgba(168,85,247,0.6)'
          );
          trailGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = trailGrad;
          ctx.beginPath();
          ctx.ellipse(
            0,
            -m.radius - trailLen / 2,
            m.radius * 0.45,
            trailLen / 2,
            0,
            0,
            Math.PI * 2
          );
          ctx.fill();
        } else {
          const trailGrad = ctx.createLinearGradient(0, -m.radius, 0, -m.radius - m.radius * 1.2);
          trailGrad.addColorStop(0, 'rgba(253,186,116,0.5)');
          trailGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = trailGrad;
          ctx.beginPath();
          ctx.ellipse(
            0,
            -m.radius - m.radius * 0.6,
            m.radius * 0.3,
            m.radius * 0.6,
            0,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        ctx.rotate(m.rotation);

        // Outer glow ring
        ctx.shadowColor = m.type === 'huge' ? '#A855F7' : m.type === 'fast' ? '#EF4444' : '#F97316';
        ctx.shadowBlur = m.type === 'huge' ? 18 : 10;

        // Core rock gradient
        const rockGrad = ctx.createRadialGradient(
          -m.radius * 0.25,
          -m.radius * 0.25,
          1,
          0,
          0,
          m.radius
        );
        if (m.type === 'huge') {
          rockGrad.addColorStop(0, '#D8B4FE');
          rockGrad.addColorStop(0.3, '#A855F7');
          rockGrad.addColorStop(0.7, '#581C87');
          rockGrad.addColorStop(1, '#0D0015');
        } else if (m.type === 'fast') {
          rockGrad.addColorStop(0, '#FCA5A5');
          rockGrad.addColorStop(0.3, '#EF4444');
          rockGrad.addColorStop(0.7, '#7F1D1D');
          rockGrad.addColorStop(1, '#1A0000');
        } else {
          rockGrad.addColorStop(0, '#FDBA74');
          rockGrad.addColorStop(0.3, '#E06D28');
          rockGrad.addColorStop(0.7, '#7C2D12');
          rockGrad.addColorStop(1, '#1E0800');
        }

        ctx.fillStyle = rockGrad;
        ctx.beginPath();
        m.vertices.forEach((v, idx) => {
          if (idx === 0) ctx.moveTo(v.x, v.y);
          else ctx.lineTo(v.x, v.y);
        });
        ctx.closePath();
        ctx.fill();

        // Edge highlight stroke
        ctx.strokeStyle =
          m.type === 'huge'
            ? 'rgba(216,180,254,0.45)'
            : m.type === 'fast'
              ? 'rgba(252,165,165,0.4)'
              : 'rgba(253,186,116,0.35)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Craters
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(0,0,0,0.55)';
        ctx.beginPath();
        ctx.arc(-m.radius * 0.3, -m.radius * 0.2, m.radius * 0.22, 0, Math.PI * 2);
        ctx.fill();
        if (m.radius > 18) {
          ctx.fillStyle = 'rgba(0,0,0,0.35)';
          ctx.beginPath();
          ctx.arc(m.radius * 0.25, m.radius * 0.15, m.radius * 0.15, 0, Math.PI * 2);
          ctx.fill();
        }
        // Crater highlight rim
        ctx.strokeStyle = m.type === 'huge' ? 'rgba(216,180,254,0.25)' : 'rgba(253,186,116,0.2)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(-m.radius * 0.3, -m.radius * 0.2, m.radius * 0.22, 0, Math.PI * 2);
        ctx.stroke();

        // HP bar on meteor (only if multi-hit)
        if (m.maxHp > 1) {
          const bw = m.radius * 1.6;
          const bx = -bw / 2;
          const by = m.radius + 4;
          ctx.fillStyle = 'rgba(0,0,0,0.55)';
          ctx.fillRect(bx - 1, by - 1, bw + 2, 6);
          ctx.fillStyle = m.type === 'huge' ? '#A855F7' : '#F97316';
          ctx.fillRect(bx, by, bw * Math.max(0, m.hp / m.maxHp), 4);
        }

        // Frost crystal overlay if slowed by Ice weapon
        if (m.slowTimer > 0) {
          ctx.fillStyle = 'rgba(56, 189, 248, 0.28)';
          ctx.beginPath();
          ctx.arc(0, 0, m.radius + 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = 'rgba(147,210,252,0.6)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(0, 0, m.radius + 3, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();

        // Laser vs Meteor Collision
        for (let j = g.lasers.length - 1; j >= 0; j--) {
          const l = g.lasers[j];
          const dist = Math.hypot(m.x - l.x, m.y - l.y);
          if (dist < m.radius + 6) {
            if (l.pierce && l.hitTargets?.includes(m)) continue;
            // Hit!
            const elements = l.elements || getWeaponElements(l.type);
            const awakenBonus =
              l.awakenElement && elements.includes(l.awakenElement)
                ? Math.min(0.12, (l.awakenLevel || 0) * 0.04)
                : 0;
            const dmg =
              (l.damage || 1) * (1 + awakenBonus) +
              (elements.includes('earth') || elements.includes('shadow') ? 1 : 0);
            m.hp -= dmg;
            if (elements.includes('poison')) {
              const balance = WEAPON_BALANCE[l.type] || {};
              const poisonAwaken = l.awakenElement === 'poison' ? l.awakenLevel || 0 : 0;
              m.poisonTimer = Math.min(4.0, (balance.poisonDuration ?? 2.5) + poisonAwaken * 0.25);
              m.poisonDamage =
                (balance.poisonDamage ?? 0.5) * (1 + Math.min(0.15, poisonAwaken * 0.05));
            }
            const hitType = l.type;
            const hitX = l.x;
            const hitY = l.y;
            if (l.pierce) {
              l.hitTargets = [...(l.hitTargets || []), m];
              if (l.ricochet) {
                // Ricochet bends toward another nearby meteor after each hit.
                const nextTarget = g.meteors.find(
                  other => other !== m && !l.hitTargets.includes(other)
                );
                if (nextTarget) {
                  const angle = Math.atan2(nextTarget.y - l.y, nextTarget.x - l.x);
                  const speed = Math.max(10, Math.hypot(l.vx, l.vy));
                  l.vx = Math.cos(angle) * speed;
                  l.vy = Math.sin(angle) * speed;
                } else {
                  g.lasers.splice(j, 1);
                }
              }
            } else {
              g.lasers.splice(j, 1);
            }

            // Special Elemental On-Hit Effects:
            if ((l.elements || getWeaponElements(hitType)).includes('fire')) {
              // AoE Fire Splash
              for (const otherM of g.meteors) {
                if (
                  otherM !== m &&
                  Math.hypot(otherM.x - hitX, otherM.y - hitY) <
                    50 + (l.awakenElement === 'fire' ? (l.awakenLevel || 0) * 4 : 0)
                ) {
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
            }
            if ((l.elements || getWeaponElements(hitType)).includes('ice')) {
              // Ice Freeze & Slow
              const iceAwaken = l.awakenElement === 'ice' ? l.awakenLevel || 0 : 0;
              m.slowTimer = Math.min(4.5, 3.0 + iceAwaken * 0.35);
              m.speed = Math.max(0.75, m.speed * (iceAwaken >= 3 ? 0.55 : 0.65));
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
            }
            if ((l.elements || getWeaponElements(hitType)).includes('lightning')) {
              // Lightning Chain Arc to nearby meteors
              let chained = 0;
              const chainLimit = (WEAPON_BALANCE[hitType] || {}).chainLimit ?? 2;
              for (const otherM of g.meteors) {
                if (otherM !== m && chained < chainLimit) {
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
            }
            if ((l.elements || getWeaponElements(hitType)).includes('rocket')) {
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

            // Absolute Zero pulls nearby meteors inward, but deals reduced direct damage.
            if (
              (l.elements || getWeaponElements(hitType)).includes('ice') &&
              (l.elements || getWeaponElements(hitType)).includes('wind')
            ) {
              for (const otherM of g.meteors) {
                if (otherM !== m) {
                  const pullDistance = Math.hypot(otherM.x - hitX, otherM.y - hitY);
                  if (pullDistance < 80 && pullDistance > 0) {
                    otherM.x += ((hitX - otherM.x) / pullDistance) * 4;
                    otherM.y += ((hitY - otherM.y) / pullDistance) * 4;
                  }
                }
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

              // Power-up & Health Drop Chance
              // Drop health healing 5% with RNG chance (~22%)
              if (Math.random() < 0.22) {
                g.powerups.push({
                  x: m.x,
                  y: m.y,
                  type: 'health',
                  vy: 2.0,
                  pulse: 0,
                });
              } else if (Math.random() < Math.min(0.28, 0.16 + g.wave * 0.01)) {
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
              const dmgAmt = m.type === 'huge' ? 35 : m.type === 'fast' ? 20 : 25;
              p.hp = Math.max(0, (p.hp ?? 100) - dmgAmt);
              setPlayerHp(p.hp);
              if (p.hp <= 0) {
                p.hp = 100;
                g.lives -= 1;
                setLives(g.lives);
                setPlayerHp(100);
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

        // Random skill attacks: each boss receives a different skill combination per wave.
        if (currentTime - b.lastAttackTime > b.attackInterval && b.y >= b.targetY - 15) {
          b.lastAttackTime = currentTime;
          sfx.bossShot();
          const skill = b.skills[Math.floor(Math.random() * b.skills.length)] || BOSS_SKILLS[0];
          const originY = b.y + b.radius * 0.7;
          const elementCombo = b.elementCombo || BOSS_ELEMENT_COMBOS[0];
          const bossElements = b.elements || elementCombo.elements || [];
          const baseColor = elementCombo.color || skill.color || b.theme.secondary;
          const makeBossShot = (angle, speed = 3.5, radius = 6.5, x = b.x, y = originY) => {
            const isHoming = bossElements.includes('rocket');
            const adjustedSpeed = speed * (bossElements.includes('lightning') ? 1.05 : 1);
            const adjustedRadius =
              radius *
              (bossElements.includes('fire') || bossElements.includes('poison') ? 1.16 : 1);
            g.bossProjectiles.push({
              x,
              y,
              vx: Math.cos(angle) * adjustedSpeed,
              vy: Math.sin(angle) * adjustedSpeed,
              radius: adjustedRadius,
              color: baseColor,
              elements: bossElements,
              homing: isHoming,
              homingTimer: isHoming ? 1.8 : 0, // Homing hanya aktif selama 1.8 detik agar bisa di-dodge
              lifetime: 4.5, // Seluruh projectile boss memiliki batas waktu/lifetime agar tidak menumpuk di arena
              fusionId: elementCombo.id,
            });
          };
          const aimAngle = Math.atan2(p.y - originY, p.x - b.x);

          switch (skill.id) {
            case 'fan':
              // Fan — 5 shots spread, moderate speed
              for (let n = -2; n <= 2; n++)
                makeBossShot(Math.PI / 2 + n * 0.26, 3.0 + g.wave * 0.05, 5.8);
              break;
            case 'radial':
              // Radial — 8 bullets full circle, slower speed to be dodgeable
              for (let n = 0; n < 8; n++)
                makeBossShot((Math.PI * 2 * n) / 8 + b.rotation, 2.5 + g.wave * 0.08, 5.5);
              break;
            case 'burst':
              // Burst — 3 aimed shots with slight angle spread
              for (let n = -1; n <= 1; n++)
                makeBossShot(aimAngle + n * 0.22, 3.4 + g.wave * 0.06, 5.8);
              break;
            case 'cross':
              // Cross — 2 origin points x 3 shots each
              for (let n = -1; n <= 1; n++) {
                makeBossShot(Math.PI / 2 + n * 0.32, 3.0, 5.5, b.x - b.radius * 0.55, originY);
                makeBossShot(Math.PI / 2 + n * 0.32, 3.0, 5.5, b.x + b.radius * 0.55, originY);
              }
              break;
            case 'rain':
              // Rain — 5 shots (was 7), spread reduced
              for (let n = 0; n < 5; n++) {
                const spreadX = b.x + (Math.random() - 0.5) * Math.min(width * 0.65, 200);
                g.bossProjectiles.push({
                  x: Math.max(16, Math.min(width - 16, spreadX)),
                  y: originY,
                  vx: (p.x - spreadX) * 0.004,
                  vy:
                    (2.8 + Math.random() * 0.6 + g.wave * 0.06) *
                    (bossElements.includes('lightning') ? 1.1 : 1),
                  radius:
                    5.2 *
                    (bossElements.includes('fire') || bossElements.includes('poison') ? 1.1 : 1),
                  color: baseColor,
                  elements: bossElements,
                  homing: bossElements.includes('rocket'),
                  homingTimer: bossElements.includes('rocket') ? 1.8 : 0,
                  lifetime: 4.5,
                  fusionId: elementCombo.id,
                });
              }
              break;
            case 'spiral':
              // Spiral — 3 arms (was 4), slower rotation
              b.spiralAngle = (b.spiralAngle || 0) + 0.38;
              for (let n = 0; n < 3; n++) {
                makeBossShot(b.spiralAngle + (Math.PI * 2 * n) / 3, 2.8 + g.wave * 0.07, 5.5);
              }
              break;
            default:
              makeBossShot(aimAngle, 3.2, 5.8);
          }
        }
        // Render Boss Rock & Energy Shield
        ctx.save();
        ctx.translate(b.x, b.y);

        // Rotating outer energy rings
        const ringTime = currentTime / 1000;
        for (let ri = 0; ri < 3; ri++) {
          const ringR = b.radius + 8 + ri * 7;
          const ringAlpha = 0.25 - ri * 0.06;
          const ringStart = (ringTime * (ri % 2 === 0 ? 1.2 : -0.9)) % (Math.PI * 2);
          ctx.strokeStyle = b.theme.secondary;
          ctx.globalAlpha = ringAlpha;
          ctx.lineWidth = 1.8 - ri * 0.4;
          ctx.beginPath();
          ctx.arc(0, 0, ringR, ringStart, ringStart + Math.PI * 1.6);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;

        // Orbiting energy nodes
        for (let ni = 0; ni < 3; ni++) {
          const nodeAngle = ringTime * 1.4 + (ni * Math.PI * 2) / 3;
          const nodeR = b.radius + 14;
          const nx = Math.cos(nodeAngle) * nodeR;
          const ny = Math.sin(nodeAngle) * nodeR;
          ctx.shadowColor = b.theme.core;
          ctx.shadowBlur = 10;
          ctx.fillStyle = b.theme.core;
          ctx.beginPath();
          ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;

        ctx.rotate(b.rotation);

        // Outer glow aura on body
        ctx.shadowColor = b.theme.secondary;
        ctx.shadowBlur = 22;
        ctx.strokeStyle = b.theme.secondary;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        b.vertices.forEach((v, idx) => {
          if (idx === 0) ctx.moveTo(v.x, v.y);
          else ctx.lineTo(v.x, v.y);
        });
        ctx.closePath();
        ctx.stroke();

        // Polygon Rock Core
        if (b.flashTimer > 0) {
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = '#FFFFFF';
          ctx.shadowBlur = 30;
        } else {
          const bossGrad = ctx.createRadialGradient(
            -b.radius * 0.2,
            -b.radius * 0.2,
            3,
            0,
            0,
            b.radius
          );
          bossGrad.addColorStop(0, b.theme.core);
          bossGrad.addColorStop(0.25, b.theme.secondary);
          bossGrad.addColorStop(0.6, b.theme.primary);
          bossGrad.addColorStop(1, '#050112');
          ctx.fillStyle = bossGrad;
        }

        ctx.beginPath();
        b.vertices.forEach((v, idx) => {
          if (idx === 0) ctx.moveTo(v.x, v.y);
          else ctx.lineTo(v.x, v.y);
        });
        ctx.closePath();
        ctx.fill();

        // Surface detail lines
        if (b.flashTimer <= 0) {
          ctx.strokeStyle = 'rgba(255,255,255,0.1)';
          ctx.lineWidth = 0.8;
          for (let si = 0; si < 4; si++) {
            const sv = b.vertices[si * Math.floor(b.vertices.length / 4)];
            if (sv) {
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.lineTo(sv.x * 0.7, sv.y * 0.7);
              ctx.stroke();
            }
          }
        }

        // Glowing pulsing center core
        const coreSize = b.radius * 0.28 + Math.sin(ringTime * 3) * b.radius * 0.04;
        const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, coreSize);
        coreGrad.addColorStop(0, '#FFFFFF');
        coreGrad.addColorStop(0.4, b.theme.core);
        coreGrad.addColorStop(1, b.theme.primary);
        ctx.shadowColor = b.theme.core;
        ctx.shadowBlur = 20;
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(0, 0, coreSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Top Screen Boss Health Bar — enhanced
        const barW = Math.min(width - 32, 320);
        const barH = 13;
        const barX = (width - barW) / 2;
        const barY = 18;
        const hpRatio = Math.max(0, b.hp / b.maxHp);

        // Background panel
        ctx.fillStyle = 'rgba(0,0,0,0.82)';
        ctx.fillRect(barX - 6, barY - 16, barW + 12, barH + 30);
        ctx.strokeStyle = b.theme.secondary + '88';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(barX - 6, barY - 16, barW + 12, barH + 30);

        // Boss name
        ctx.fillStyle = b.theme.core;
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.shadowColor = b.theme.secondary;
        ctx.shadowBlur = 6;
        ctx.fillText(`⚡ ${b.name}`, width / 2, barY - 2);
        ctx.shadowBlur = 0;

        // HP bar background
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fillRect(barX, barY, barW, barH);
        ctx.strokeStyle = b.theme.secondary + 'AA';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barW, barH);

        // HP bar fill with gradient + color by phase
        const hpGrad = ctx.createLinearGradient(barX, barY, barX + barW, barY);
        if (hpRatio > 0.6) {
          hpGrad.addColorStop(0, b.theme.primary);
          hpGrad.addColorStop(1, b.theme.secondary);
        } else if (hpRatio > 0.3) {
          hpGrad.addColorStop(0, '#F59E0B');
          hpGrad.addColorStop(1, '#F97316');
        } else {
          hpGrad.addColorStop(0, '#DC2626');
          hpGrad.addColorStop(1, '#EF4444');
        }
        ctx.fillStyle = hpGrad;
        ctx.fillRect(barX, barY, barW * hpRatio, barH);

        // Segment ticks every 25%
        ctx.strokeStyle = 'rgba(0,0,0,0.4)';
        ctx.lineWidth = 1;
        for (let seg = 1; seg < 4; seg++) {
          const sx = barX + barW * seg * 0.25;
          ctx.beginPath();
          ctx.moveTo(sx, barY);
          ctx.lineTo(sx, barY + barH);
          ctx.stroke();
        }

        // HP text inside bar
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 8px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${Math.ceil(b.hp)} / ${b.maxHp} HP`, width / 2, barY + barH / 2);

        // Skill label below bar
        ctx.font = '7.5px monospace';
        ctx.fillStyle = b.skills?.[0]?.color || b.theme.secondary;
        ctx.textBaseline = 'top';
        const skillLabel = (b.skills || []).map(skill => skill.name).join(' • ');
        ctx.fillText(
          `${b.elementCombo?.icon || '⚡'} ${b.elementCombo?.name || ''} | ${skillLabel}`,
          width / 2,
          barY + barH + 3
        );
        ctx.shadowBlur = 0;

        // Player Laser Collision with Boss
        for (let j = g.lasers.length - 1; j >= 0; j--) {
          const l = g.lasers[j];
          const dist = Math.hypot(b.x - l.x, b.y - l.y);
          if (dist < b.radius + 8) {
            if (l.pierce && l.hitBoss) continue;
            const dmg = l.damage || 1;
            b.hp -= dmg;
            b.flashTimer = 0.08;
            const hitType = l.type;
            const hitX = l.x;
            const hitY = l.y;
            if (l.pierce) {
              l.hitBoss = true;
            } else {
              g.lasers.splice(j, 1);
            }

            // Special on-hit visual feedback for boss
            if ((l.elements || getWeaponElements(hitType)).includes('ice')) {
              b.slowTimer = Math.max(b.slowTimer || 0, 1.25);
            }
            if ((l.elements || getWeaponElements(hitType)).includes('fire')) {
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

              // Boss drops a weapon core, one random permanent ability, and a shield.
              const skillOrder = ELEMENT_SKILLS;
              const droppedSkill = skillOrder[(g.wave - 1) % skillOrder.length];

              const abilityDrops = ['triple', 'ricochet', 'piercing', 'rapid'];
              const droppedAbility = abilityDrops[Math.floor(Math.random() * abilityDrops.length)];
              g.powerups.push(
                { x: b.x, y: b.y - 14, type: 'skill', weaponType: droppedSkill, vy: 1.6, pulse: 0 },
                {
                  x: b.x - 24,
                  y: b.y + 12,
                  type: 'ability',
                  abilityType: droppedAbility,
                  vy: 2.2,
                  pulse: 0,
                },
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
              p.hp = Math.max(0, (p.hp ?? 100) - 40);
              setPlayerHp(p.hp);
              if (p.hp <= 0) {
                p.hp = 100;
                g.lives -= 1;
                setLives(g.lives);
                setPlayerHp(100);
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
      }

      // 4.6. UPDATE & DRAW BOSS PROJECTILES
      for (let i = g.bossProjectiles.length - 1; i >= 0; i--) {
        const bp = g.bossProjectiles[i];

        // Some boss shots (e.g. Hunter Shot) expire automatically after a short duration.
        if (typeof bp.lifetime === 'number') {
          bp.lifetime -= delta;
          if (bp.lifetime <= 0) {
            g.bossProjectiles.splice(i, 1);
            continue;
          }
        }

        if (bp.homing) {
          if (typeof bp.homingTimer === 'number') {
            bp.homingTimer -= delta;
            if (bp.homingTimer <= 0) {
              bp.homing = false;
            }
          }
          if (bp.homing) {
            const targetAngle = Math.atan2(p.y - bp.y, p.x - bp.x);
            const currentAngle = Math.atan2(bp.vy, bp.vx);
            const angleDiff = Math.atan2(
              Math.sin(targetAngle - currentAngle),
              Math.cos(targetAngle - currentAngle)
            );
            // Belokan diperhalus (0.024 radian/frame vs sebelumnya 0.045) agar fair dan bisa dihindari pemain
            const nextAngle = currentAngle + Math.max(-0.024, Math.min(0.024, angleDiff));
            const speed = Math.hypot(bp.vx, bp.vy);
            bp.vx = Math.cos(nextAngle) * speed;
            bp.vy = Math.sin(nextAngle) * speed;
          }
        }
        bp.x += bp.vx;
        bp.y += bp.vy;

        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = bp.color;
        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.radius * 1.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
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

          const projectileElements = bp.elements || [];
          if (projectileElements.includes('ice')) {
            p.bossSlowTimer = Math.max(p.bossSlowTimer || 0, 1.6);
          }
          for (let particle = 0; particle < 7; particle++) {
            g.particles.push({
              x: p.x,
              y: p.y,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4,
              size: 2 + Math.random() * 2,
              color: bp.color || '#F59E0B',
              alpha: 1,
              life: 0.35,
            });
          }

          if (p.shield) {
            p.shield = false;
          } else {
            p.hp = Math.max(0, (p.hp ?? 100) - 20);
            setPlayerHp(p.hp);
            if (p.hp <= 0) {
              p.hp = 100;
              g.lives -= 1;
              setLives(g.lives);
              setPlayerHp(100);
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
          continue;
        }

        // Boss projectiles are immune to player lasers and cannot be destroyed by shooting.

        if (bp.y > height + 20 || bp.x < -20 || bp.x > width + 20) {
          g.bossProjectiles.splice(i, 1);
        }
      }

      // 5. POWERUPS & ELEMENTAL SKILL CORES
      for (let i = g.powerups.length - 1; i >= 0; i--) {
        const pu = g.powerups[i];
        pu.y += pu.vy;
        pu.pulse += 0.08;

        if (pu.type === 'health') {
          // Draw health orb
          const glowSize = Math.sin(pu.pulse) * 2 + 11;
          ctx.save();
          ctx.shadowColor = '#22C55E';
          ctx.shadowBlur = 18;
          ctx.fillStyle = '#15803D';
          ctx.beginPath();
          ctx.arc(pu.x, pu.y, glowSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#4ADE80';
          ctx.beginPath();
          ctx.arc(pu.x, pu.y, glowSize * 0.65, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#86EFAC';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(pu.x, pu.y, glowSize + 3, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(pu.x - 1.2, pu.y - 5, 2.4, 10);
          ctx.fillRect(pu.x - 5, pu.y - 1.2, 10, 2.4);
          ctx.fillStyle = '#BBF7D0';
          ctx.font = 'bold 7px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('+5%', pu.x, pu.y + glowSize + 8);
          ctx.restore();
        } else if (pu.type === 'skill') {
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
          const abilityInfo = ABILITY_INFO[pu.abilityType] || ABILITY_INFO.triple;
          const powerupColor = pu.type === 'ability' ? abilityInfo.color : '#06B6D4';
          ctx.shadowColor = powerupColor;
          ctx.shadowBlur = 12;
          ctx.fillStyle = powerupColor;
          ctx.beginPath();
          ctx.arc(pu.x, pu.y, glowSize, 0, Math.PI * 2);
          ctx.fill();

          // Icon inside
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 10px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(pu.type === 'ability' ? abilityInfo.icon : 'SHD', pu.x, pu.y);
          ctx.restore();
        }

        // Powerup collision with player
        const dist = Math.hypot(pu.x - p.x, pu.y - p.y);
        if (dist < 28) {
          if (pu.type === 'health') {
            const healAmt = Math.round((p.maxHp ?? 100) * 0.05);
            p.hp = Math.min(p.maxHp ?? 100, (p.hp ?? 100) + healAmt);
            setPlayerHp(p.hp);
            sfx.powerup();
          } else if (pu.type === 'skill') {
            sfx.skillUnlocked();
            const previousWeapon = p.weapon || 'default';
            const progression = processWeaponStack(p, pu.weaponType);
            const combinedWeapon = progression.newWeapon;
            p.weapon = combinedWeapon;
            p.stackLevel = progression.stackLevel;
            p.awakenElement = progression.awakenElement;
            p.awakenedLevels = progression.awakenedLevels;
            setWeapon(combinedWeapon);
            const wName = WEAPONS[combinedWeapon]?.name || 'Dual Plasma';
            const awakenName =
              WEAPONS[progression.awakenElement]?.name || progression.awakenElement;
            const comboSucceeded = progression.type === 'fusion';

            g.bossVictory = {
              text:
                progression.type === 'awaken'
                  ? `✨ ${awakenName.toUpperCase()} AWAKENED · LV ${progression.stackLevel}/3`
                  : comboSucceeded
                    ? `⚡ COMBO FORGED: ${wName.toUpperCase()}!`
                    : progression.type === 'switch'
                      ? `🔄 SWITCHED TO ${wName.toUpperCase()}!`
                      : `✨ WEAPON: ${wName.toUpperCase()} EQUIPPED!`,
              timer: 2.5,
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
          } else if (pu.type === 'ability') {
            sfx.powerup();
            grantAbility(pu.abilityType);
          } else {
            sfx.powerup();
            p.shield = true;
          }
          g.powerups.splice(i, 1);
        } else if (pu.y > height + 20) {
          g.powerups.splice(i, 1);
        }
      }

      // 6. PARTICLES (capped; drop the oldest when too many)
      if (g.particles.length > 180) g.particles.splice(0, g.particles.length - 180);
      for (let i = g.particles.length - 1; i >= 0; i--) {
        const pt = g.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= delta / pt.life;

        if (pt.alpha <= 0) {
          g.particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.fillStyle = pt.color;
        ctx.fillRect(pt.x - pt.size, pt.y - pt.size, pt.size * 2, pt.size * 2);
      }
      ctx.globalAlpha = 1;

      // 7. DRAW PLAYER SPACESHIP
      if (gameState !== 'gameover') {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.tilt);

        const shipTime = currentTime / 1000;

        // Engine glow underneath
        const engineGlow = ctx.createRadialGradient(0, 18, 0, 0, 18, 20);
        engineGlow.addColorStop(0, 'rgba(139,92,246,0.35)');
        engineGlow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = engineGlow;
        ctx.beginPath();
        ctx.arc(0, 18, 20, 0, Math.PI * 2);
        ctx.fill();

        // Left engine flame
        const flameL = 13 + Math.sin(shipTime * 18) * 5;
        const flameGradL = ctx.createLinearGradient(-7, 14, -7, 14 + flameL);
        flameGradL.addColorStop(0, '#FDE047');
        flameGradL.addColorStop(0.4, '#F97316');
        flameGradL.addColorStop(1, 'rgba(239,68,68,0)');
        ctx.fillStyle = flameGradL;
        ctx.beginPath();
        ctx.moveTo(-10, 14);
        ctx.quadraticCurveTo(
          -7 + Math.sin(shipTime * 22) * 1.5,
          14 + flameL * 0.6,
          -7,
          14 + flameL
        );
        ctx.quadraticCurveTo(-4, 14 + flameL * 0.6, -4, 14);
        ctx.fill();

        // Right engine flame
        const flameR = 13 + Math.sin(shipTime * 18 + 1.2) * 5;
        const flameGradR = ctx.createLinearGradient(7, 14, 7, 14 + flameR);
        flameGradR.addColorStop(0, '#FDE047');
        flameGradR.addColorStop(0.4, '#F97316');
        flameGradR.addColorStop(1, 'rgba(239,68,68,0)');
        ctx.fillStyle = flameGradR;
        ctx.beginPath();
        ctx.moveTo(4, 14);
        ctx.quadraticCurveTo(
          7 + Math.sin(shipTime * 22 + 0.8) * 1.5,
          14 + flameR * 0.6,
          7,
          14 + flameR
        );
        ctx.quadraticCurveTo(10, 14 + flameR * 0.6, 10, 14);
        ctx.fill();

        // Hull glow
        ctx.shadowColor = '#8B5CF6';
        ctx.shadowBlur = 16;

        // Main body
        ctx.fillStyle = '#0D0820';
        ctx.strokeStyle = '#7C3AED';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(0, -22);
        ctx.lineTo(5, -12);
        ctx.lineTo(18, 12);
        ctx.lineTo(10, 9);
        ctx.lineTo(6, 14);
        ctx.lineTo(0, 12);
        ctx.lineTo(-6, 14);
        ctx.lineTo(-10, 9);
        ctx.lineTo(-18, 12);
        ctx.lineTo(-5, -12);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Wing accent stripes
        ctx.fillStyle = '#4C1D95';
        ctx.beginPath();
        ctx.moveTo(-18, 12);
        ctx.lineTo(-10, 9);
        ctx.lineTo(-12, 13);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(18, 12);
        ctx.lineTo(10, 9);
        ctx.lineTo(12, 13);
        ctx.closePath();
        ctx.fill();

        // Center spine
        ctx.strokeStyle = 'rgba(139,92,246,0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -22);
        ctx.lineTo(0, 12);
        ctx.stroke();

        // Cockpit canopy
        const canopyGrad = ctx.createRadialGradient(-1.5, -8, 1, 0, -5, 8);
        canopyGrad.addColorStop(0, '#E0F2FE');
        canopyGrad.addColorStop(0.4, '#0EA5E9');
        canopyGrad.addColorStop(1, '#0369A1');
        ctx.fillStyle = canopyGrad;
        ctx.shadowColor = '#38BDF8';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.ellipse(0, -7, 4, 9, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cockpit reflection
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath();
        ctx.ellipse(-1.2, -10, 1.5, 3.5, -0.3, 0, Math.PI * 2);
        ctx.fill();

        // Wing cannon barrels
        ctx.shadowColor = '#F97316';
        ctx.shadowBlur = 8;
        ctx.fillStyle = '#1E1E2E';
        ctx.strokeStyle = '#F97316';
        ctx.lineWidth = 1;
        ctx.fillRect(-15.5, 0, 3, 9);
        ctx.strokeRect(-15.5, 0, 3, 9);
        ctx.fillRect(12.5, 0, 3, 9);
        ctx.strokeRect(12.5, 0, 3, 9);

        // Engine pods
        ctx.fillStyle = '#1C1035';
        ctx.strokeStyle = '#6D28D9';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(-7, 11, 3.5, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(7, 11, 3.5, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Energy Shield
        if (p.shield) {
          const shieldAlpha = 0.5 + Math.sin(shipTime * 6) * 0.2;
          ctx.globalAlpha = shieldAlpha;
          ctx.strokeStyle = '#22D3EE';
          ctx.lineWidth = 2.2;
          ctx.shadowColor = '#22D3EE';
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.arc(0, 0, 28, 0, Math.PI * 2);
          ctx.stroke();
          ctx.strokeStyle = 'rgba(34,211,238,0.35)';
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.arc(0, 0, 28, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        ctx.restore();
      }

      // 7.5. PLAYER HP BAR — drawn on canvas bottom
      if (gameState === 'playing') {
        const phpRatio = Math.max(0, (p.hp ?? 100) / (p.maxHp ?? 100));
        const phpW = Math.min(width - 80, 200);
        const phpH = 7;
        const phpX = (width - phpW) / 2;
        const phpY = height - 18;

        // Background
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(phpX - 2, phpY - 2, phpW + 4, phpH + 4);
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 0.8;
        ctx.strokeRect(phpX - 2, phpY - 2, phpW + 4, phpH + 4);

        // HP fill
        const phpGrad = ctx.createLinearGradient(phpX, phpY, phpX + phpW, phpY);
        if (phpRatio > 0.6) {
          phpGrad.addColorStop(0, '#16A34A');
          phpGrad.addColorStop(1, '#4ADE80');
        } else if (phpRatio > 0.3) {
          phpGrad.addColorStop(0, '#D97706');
          phpGrad.addColorStop(1, '#FCD34D');
        } else {
          phpGrad.addColorStop(0, '#B91C1C');
          phpGrad.addColorStop(1, '#F87171');
        }
        ctx.fillStyle = phpGrad;
        ctx.fillRect(phpX, phpY, phpW * phpRatio, phpH);

        // Label
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '7px monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('HP', phpX - 18, phpY + phpH / 2);
        ctx.textAlign = 'right';
        ctx.fillText(`${Math.ceil(p.hp ?? 100)}%`, phpX + phpW + 20, phpY + phpH / 2);
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
      className="fixed inset-0 z-[100] flex items-stretch justify-center p-0 bg-black/95 animate-fadeIn touch-none select-none overflow-hidden"
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
        className="relative w-full max-w-[440px] h-[100dvh] max-h-[100dvh] bg-[#070417]/95 border-x border-purple-500/30 shadow-[0_0_60px_rgba(139,92,246,0.3)] overflow-hidden flex flex-col items-center pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
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
            <div
              className="flex items-center gap-1 px-2 py-1"
              aria-label={`${lives} ${lives === 1 ? 'life' : 'lives'} remaining`}
              title={`${lives} ${lives === 1 ? 'nyawa tersisa' : 'nyawa tersisa'}`}
            >
              <span className="text-rose-400" aria-hidden="true">
                ♥
              </span>
              <span className="font-bold tabular-nums text-white">{lives}</span>
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
        </div>

        {/* Game Canvas Container */}
        <div
          className="relative w-full flex-1 min-h-0 flex items-center justify-center bg-[#02000c] touch-none select-none overflow-hidden"
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onTouchMove={handlePointerMove}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
        >
          <canvas ref={canvasRef} className="block cursor-crosshair max-w-full" />

          {/* Compact ability badges live inside the game screen */}
          <div
            className="absolute bottom-4 left-3 z-10 flex items-center gap-1.5 pointer-events-none"
            aria-label="Active abilities"
          >
            {Array.from({ length: 3 }).map((_, index) => {
              const ability = activeAbilities[index];
              const info = ability ? ABILITY_INFO[ability] : null;
              return (
                <div
                  key={index}
                  title={info ? info.name : 'Empty ability slot'}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border backdrop-blur-md transition-all duration-200 ${
                    info ? 'bg-black/70 shadow-lg' : 'border-white/10 bg-black/35'
                  }`}
                  style={
                    info
                      ? {
                          borderColor: `${info.color}99`,
                          color: info.color,
                          boxShadow: `0 0 14px ${info.color}25`,
                        }
                      : undefined
                  }
                >
                  {info ? (
                    <span className="text-base font-black leading-none">{info.icon}</span>
                  ) : (
                    <span className="text-[10px] font-bold text-white/25">+</span>
                  )}
                </div>
              );
            })}
            <span className="ml-0.5 rounded-md bg-black/45 px-1.5 py-1 text-[9px] font-bold tracking-wider text-white/50 backdrop-blur-sm">
              SKILL
            </span>
          </div>

          {/* Active elemental badges, mirrored from the ability badge style */}
          <div
            className="absolute bottom-4 right-3 z-10 flex items-center justify-end gap-1.5 pointer-events-none"
            aria-label="Active elements"
          >
            {(() => {
              const elements = getWeaponElements(weapon);
              return (
                <>
                  <span className="mr-0.5 rounded-md bg-black/45 px-1.5 py-1 text-[9px] font-bold tracking-wider text-white/50 backdrop-blur-sm">
                    ELEMENT
                  </span>
                  {(elements.length ? elements : ['default']).map((element, index) => {
                    const info = WEAPONS[element];
                    const isDefault = element === 'default';
                    return (
                      <div
                        key={`${element}-${index}`}
                        title={isDefault ? 'No element equipped' : info?.name || element}
                        className={`flex h-9 w-9 items-center justify-center rounded-xl border backdrop-blur-md transition-all duration-200 ${
                          isDefault ? 'border-white/10 bg-black/35' : 'bg-black/70 shadow-lg'
                        }`}
                        style={
                          !isDefault && info
                            ? {
                                borderColor: `${info.color}99`,
                                color: info.color,
                                boxShadow: `0 0 14px ${info.color}25`,
                              }
                            : undefined
                        }
                      >
                        {isDefault ? (
                          <span className="text-[10px] font-bold text-white/25">—</span>
                        ) : (
                          <span className="text-base leading-none">{info?.icon || '✦'}</span>
                        )}
                      </div>
                    );
                  })}
                </>
              );
            })()}
          </div>

          {/* Start Screen Overlay */}
          {gameState === 'start' && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-start overflow-y-auto p-4 sm:p-6 text-center z-20 animate-fadeIn">
              {/* Start Button — pinned at top */}

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
              <button
                type="button"
                onClick={startGame}
                className="mb-2 mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-white font-bold text-sm tracking-wide shadow-lg shadow-accent/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shrink-0"
              >
                <FaPlay size={12} /> LAUNCH DEFENSE
              </button>
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

              {/* Keyboard Awaken and Fusion Cheats */}
              <div className="mt-3 p-3 rounded-2xl bg-fuchsia-500/[0.08] border border-fuchsia-400/25 text-left w-full max-w-[280px]">
                <h3 className="text-xs font-black tracking-wider text-amber-200 mb-2">
                  AWAKEN CHEATS · LV 3
                </h3>
                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[10px] sm:text-[11px] font-mono mb-3">
                  {AWAKEN_CHEATS.map(item => (
                    <Fragment key={item.element}>
                      <span className="text-amber-200 font-bold">{item.label}</span>
                      <span className="text-white/75">{item.name}</span>
                    </Fragment>
                  ))}
                </div>
                <h3 className="text-xs font-black tracking-wider text-fuchsia-200 mb-2">
                  KEYBOARD FUSION CHEATS
                </h3>
                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-[10px] sm:text-[11px] font-mono">
                  {CHEAT_COMBOS.map(combo => (
                    <Fragment key={combo.weapon}>
                      <span className="text-fuchsia-200 font-bold">{combo.label}</span>
                      <span className="text-white/75">{combo.name}</span>
                    </Fragment>
                  ))}
                </div>
                <p className="text-[9px] text-white/50 mt-2">
                  Mac: tekan Option (⌥) + angka; jika tidak tertangkap browser, gunakan Control +
                  angka. Windows: Alt + angka. Untuk fusion, tahan kedua tombol kombinasi bersamaan
                  saat game berjalan.
                </p>
              </div>

              {/* Element Fusion Guide */}
              <div className="mt-3 p-3 rounded-2xl bg-black/40 border border-cyan-400/20 text-left w-full max-w-[280px]">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-xs font-black tracking-wider text-cyan-200">
                    ALL-ELEMENT FUSION
                  </h3>
                  <span className="text-[9px] font-mono text-cyan-400 font-bold">
                    36 COMBINATIONS
                  </span>
                </div>
                <p className="text-[10px] text-white/70 leading-relaxed mb-2.5">
                  Setiap pasang elemen kini dapat digabungkan menjadi senjata fusion unik! Ambil
                  elemen kedua untuk menempa fusi dahsyat.
                </p>
                <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5 scrollbar-thin scrollbar-thumb-white/20">
                  <div className="grid grid-cols-[1fr_auto] gap-x-2 gap-y-1 text-[10px] font-mono">
                    <span className="text-white/75">🔥 Fire + ❄️ Ice</span>
                    <span className="text-pink-300 text-right">Thermal Shatter</span>
                    <span className="text-white/75">🔥 Fire + ⚡ Lightning</span>
                    <span className="text-rose-300 text-right">Plasma Inferno</span>
                    <span className="text-white/75">🔥 Fire + 🚀 Rocket</span>
                    <span className="text-orange-400 text-right">Hellfire Warhead</span>
                    <span className="text-white/75">🔥 Fire + ☠️ Poison</span>
                    <span className="text-lime-200 text-right">Toxic Blaze</span>
                    <span className="text-white/75">🔥 Fire + 🌪️ Wind</span>
                    <span className="text-orange-300 text-right">Firestorm Lance</span>
                    <span className="text-white/75">🪨 Earth + 🔥 Fire</span>
                    <span className="text-amber-400 text-right">Magma Eruption</span>
                    <span className="text-white/75">☀️ Light + 🔥 Fire</span>
                    <span className="text-yellow-300 text-right">Solar Supernova</span>
                    <span className="text-white/75">🌑 Shadow + 🔥 Fire</span>
                    <span className="text-purple-400 text-right">Abyssal Hellfire</span>
                    <span className="text-white/75">❄️ Ice + ⚡ Lightning</span>
                    <span className="text-cyan-200 text-right">Permafrost Storm</span>
                    <span className="text-white/75">❄️ Ice + 🚀 Rocket</span>
                    <span className="text-sky-300 text-right">Cryo Torpedo</span>
                    <span className="text-white/75">❄️ Ice + ☠️ Poison</span>
                    <span className="text-teal-300 text-right">Cryo Venom</span>
                    <span className="text-white/75">❄️ Ice + 🌪️ Wind</span>
                    <span className="text-sky-200 text-right">Absolute Zero</span>
                    <span className="text-white/75">🪨 Earth + ❄️ Ice</span>
                    <span className="text-blue-300 text-right">Glacial Permafrost</span>
                    <span className="text-white/75">☀️ Light + ❄️ Ice</span>
                    <span className="text-indigo-200 text-right">Aurora Prism</span>
                    <span className="text-white/75">🌑 Shadow + ❄️ Ice</span>
                    <span className="text-indigo-400 text-right">Black Ice</span>
                    <span className="text-white/75">🚀 Rocket + ⚡ Lightning</span>
                    <span className="text-yellow-200 text-right">Storm Seeker</span>
                    <span className="text-white/75">⚡ Lightning + ☠️ Poison</span>
                    <span className="text-lime-400 text-right">Neurotoxin Arc</span>
                    <span className="text-white/75">⚡ Lightning + 🌪️ Wind</span>
                    <span className="text-cyan-300 text-right">Thunder Tempest</span>
                    <span className="text-white/75">🪨 Earth + ⚡ Lightning</span>
                    <span className="text-yellow-400 text-right">Tectonic Surge</span>
                    <span className="text-white/75">☀️ Light + ⚡ Lightning</span>
                    <span className="text-amber-200 text-right">Divine Thunder</span>
                    <span className="text-white/75">🌑 Shadow + ⚡ Lightning</span>
                    <span className="text-purple-300 text-right">Void Spark</span>
                    <span className="text-white/75">🚀 Rocket + ☠️ Poison</span>
                    <span className="text-green-300 text-right">Bio-Hazard Warhead</span>
                    <span className="text-white/75">🚀 Rocket + 🌪️ Wind</span>
                    <span className="text-cyan-400 text-right">Turboflyer Missile</span>
                    <span className="text-white/75">🪨 Earth + 🚀 Rocket</span>
                    <span className="text-amber-500 text-right">Bunker Buster</span>
                    <span className="text-white/75">☀️ Light + 🚀 Rocket</span>
                    <span className="text-yellow-300 text-right">Photon Missile</span>
                    <span className="text-white/75">🌑 Shadow + 🚀 Rocket</span>
                    <span className="text-violet-400 text-right">Dreadnought Core</span>
                    <span className="text-white/75">☠️ Poison + 🌪️ Wind</span>
                    <span className="text-emerald-300 text-right">Miasma Cyclone</span>
                    <span className="text-white/75">🪨 Earth + ☠️ Poison</span>
                    <span className="text-lime-500 text-right">Venom Geode</span>
                    <span className="text-white/75">☀️ Light + ☠️ Poison</span>
                    <span className="text-lime-300 text-right">Purifying Rot</span>
                    <span className="text-white/75">🌑 Shadow + ☠️ Poison</span>
                    <span className="text-purple-500 text-right">Corrupting Plague</span>
                    <span className="text-white/75">🪨 Earth + 🌪️ Wind</span>
                    <span className="text-amber-400 text-right">Sandstorm Scythe</span>
                    <span className="text-white/75">☀️ Light + 🌪️ Wind</span>
                    <span className="text-sky-300 text-right">Zephyr Ray</span>
                    <span className="text-white/75">🌑 Shadow + 🌪️ Wind</span>
                    <span className="text-indigo-400 text-right">Nether Gale</span>
                    <span className="text-white/75">🪨 Earth + ☀️ Light</span>
                    <span className="text-amber-200 text-right">Crystal Prism</span>
                    <span className="text-white/75">🪨 Earth + 🌑 Shadow</span>
                    <span className="text-slate-300 text-right">Obsidian Oblivion</span>
                    <span className="text-white/75">☀️ Light + 🌑 Shadow</span>
                    <span className="text-violet-200 text-right">Eclipse Beam</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-white/10 text-[10px] leading-relaxed text-white/55">
                  Jika mengambil elemen baru saat sudah memegang fusion weapon, senjata akan
                  langsung beralih ke elemen drop terakhir yang diambil.
                </div>
              </div>
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
