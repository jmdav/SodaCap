export const upgrades = {
  // --- ADVERTISING (DEMAND) ---
  advertising1: {
    id: "advertising1",
    type: "employee",
    name: "Social Media Novice",
    description: "Slightly increases soda demand.",
    flavor: "Turn that Instagram addiction into a career path!",
    baseCost: 50.0,
    costMultiplier: 1.15,
    onPurchase: ({ setEconomy }) => {
      setEconomy((prev) => ({ ...prev, demand: prev.demand + 5 }));
    },
  },
  advertising2: {
    id: "advertising2",
    type: "employee",
    name: "Social Media Acolyte",
    description: "Increases soda demand.",
    flavor: "They have begun down the dark and twisted way.",
    baseCost: 250.0,
    costMultiplier: 1.15,
    onPurchase: ({ setEconomy }) => {
      setEconomy((prev) => ({ ...prev, demand: prev.demand + 25 }));
    },
  },
  advertising3: {
    id: "advertising3",
    type: "employee",
    name: "Social Media Adept",
    description: "Greatly increases soda demand.",
    flavor: "The Algorithm shall be known to them.",
    baseCost: 1500.0,
    costMultiplier: 1.15,
    onPurchase: ({ setEconomy }) => {
      setEconomy((prev) => ({ ...prev, demand: prev.demand + 120 }));
    },
  },
  advertising4: {
    id: "advertising4",
    type: "employee",
    name: "Social Media Mage",
    description: "Massively increases soda demand.",
    flavor: "As with all things, the mind can be reformed.",
    baseCost: 12000.0,
    costMultiplier: 1.15,
    onPurchase: ({ setEconomy }) => {
      setEconomy((prev) => ({ ...prev, demand: prev.demand + 800 }));
    },
  },
  advertising5: {
    id: "advertising5",
    type: "employee",
    name: "Social Media Archmage",
    description: "Absurdly increases soda demand.",
    flavor: "!¡ᒷᒷ!¡ ᔑリ↸ ᒲ⚍ℸℸᒷ∷",
    baseCost: 100000.0,
    costMultiplier: 1.15,
    onPurchase: ({ setEconomy }) => {
      setEconomy((prev) => ({ ...prev, demand: prev.demand + 5000 }));
    },
  },

  // --- MIXING (AUTO MIX RATE) ---
  mixing1: {
    id: "mixing1",
    type: "employee",
    name: "Soda Cadet",
    description: "LVL 1: Slowly mixes sodas.",
    flavor: "Supporting local students with minimum wage!",
    baseCost: 25.0,
    costMultiplier: 1.15,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({ ...prev, autoMixRate: prev.autoMixRate + 1.0 })); // 1 full soda per second
    },
  },
  mixing2: {
    id: "mixing2",
    type: "employee",
    name: "Soda Specialist",
    description: "LVL 2: Mixes sodas.",
    flavor: "Supporting local students with hands-on experience!",
    baseCost: 150.0,
    costMultiplier: 1.15,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({ ...prev, autoMixRate: prev.autoMixRate + 5.0 }));
    },
  },
  mixing3: {
    id: "mixing3",
    type: "employee",
    name: "Soda Officer",
    description: "LVL 3: Mixes sodas quickly.",
    flavor: "Supporting local students with an internship!",
    baseCost: 1000.0,
    costMultiplier: 1.15,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({ ...prev, autoMixRate: prev.autoMixRate + 30.0 }));
    },
  },
  mixing4: {
    id: "mixing4",
    type: "employee",
    name: "Soda Lieutenant",
    description: "LVL 4: Mixes sodas very quickly.",
    flavor: "Supporting local students with a pension!",
    baseCost: 8000.0,
    costMultiplier: 1.15,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({ ...prev, autoMixRate: prev.autoMixRate + 200 }));
    },
  },
  mixing5: {
    id: "mixing5",
    type: "employee",
    name: "Soda Admiral",
    description: "LVL 5: Mixes sodas absurdly quickly.",
    flavor: "You are the student now.",
    baseCost: 60000.0,
    costMultiplier: 1.15,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({ ...prev, autoMixRate: prev.autoMixRate + 1500 }));
    },
  },

  // --- MANUAL CLICKING (HAND) ---
  hand1: {
    id: "hand1",
    type: "upgrade",
    name: "Caffeine Pills",
    description: "Increases manual mixing speed.",
    flavor: "A taste of your own medicine!",
    baseCost: 20.0,
    costMultiplier: 1.3,
    onPurchase: ({ setStats }) => {
      setStats((prev) => {
        const currentRate = 1 / prev.mixTime;
        const newRate = currentRate + 1;
        return { ...prev, mixTime: Math.max(0.05, 1 / newRate) };
      });
    },
  },
  hand2: {
    id: "hand2",
    type: "upgrade",
    name: "New Blender",
    description: "Produce 1 more soda per manual mix.",
    flavor: "Don't worry about kitchen space, you have plenty!",
    baseCost: 70.0,
    costMultiplier: 1.5,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({ ...prev, mixAmount: (prev.mixAmount || 1) + 1 }));
    },
  },
  hand3: {
    id: "hand3",
    type: "upgrade",
    name: "Bionic Arm",
    description: "Produce 2x more soda per manual mix.",
    flavor: "Only a mildly invasive installation process!",
    baseCost: 500.0,
    costMultiplier: 2,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({ ...prev, mixAmount: (prev.mixAmount || 1) * 2 }));
    },
  },
};
