export const upgrades = {
  // --- ADVERTISING (DEMAND) ---
  // Boosted base yields so the player can actually sell their early stock
  advertising1: {
    id: "advertising1",
    type: "employee",
    name: "Social Media Novice",
    description: "Slightly increases soda demand.",
    flavor: "Turn that Instagram addiction into a career path!",
    baseCost: 50.00, // Halved the cost to get them started
    costMultiplier: 1.15,
    onPurchase: ({ setEconomy }) => {
      setEconomy((prev) => ({ ...prev, demand: prev.demand + 5 })); // 2.5x more effective
    }
  },
  advertising2: {
    id: "advertising2",
    type: "employee",
    name: "Social Media Acolyte",
    description: "Increases soda demand.",
    flavor: "They have begun down the dark and twisted way.",
    baseCost: 250.00, // Smoother bridge from Tier 1
    costMultiplier: 1.15,
    onPurchase: ({ setEconomy }) => {
      setEconomy((prev) => ({ ...prev, demand: prev.demand + 25 }));
    }
  },
  advertising3: {
    id: "advertising3",
    type: "employee",
    name: "Social Media Adept",
    description: "Greatly increases soda demand.",
    flavor: "The Algorithm shall be known to them.",
    baseCost: 1500.00,
    costMultiplier: 1.15,
    onPurchase: ({ setEconomy }) => {
      setEconomy((prev) => ({ ...prev, demand: prev.demand + 120 }));
    }
  },
  advertising4: {
    id: "advertising4",
    type: "employee",
    name: "Social Media Mage",
    description: "Massively increases soda demand.",
    flavor: "As with all things, the mind can be reformed.",
    baseCost: 12000.00,
    costMultiplier: 1.15,
    onPurchase: ({ setEconomy }) => {
      setEconomy((prev) => ({ ...prev, demand: prev.demand + 800 }));
    }
  },
  advertising5: {
    id: "advertising5",
    type: "employee",
    name: "Social Media Archmage",
    description: "Absurdly increases soda demand.",
    flavor: "!¡ᒷᒷ!¡ ᔑリ↸ ᒲ⚍ℸℸᒷ∷",
    baseCost: 100000.00,
    costMultiplier: 1.15,
    onPurchase: ({ setEconomy }) => {
      setEconomy((prev) => ({ ...prev, demand: prev.demand + 5000 }));
    }
  },

  // --- MIXING (AUTO MIX RATE) ---
  // Made early tiers actually feel like a noticeable speed upgrade
  mixing1: {
    id: "mixing1",
    type: "employee",
    name: "Soda Cadet",
    description: "LVL 1: Slowly mixes sodas.",
    flavor: "Supporting local students with minimum wage!",
    baseCost: 25.00, // Very cheap early hook
    costMultiplier: 1.15,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({ ...prev, autoMixRate: prev.autoMixRate + 1.0 })); // 1 full soda per second
    }
  },
  mixing2: {
    id: "mixing2",
    type: "employee",
    name: "Soda Specialist",
    description: "LVL 2: Mixes sodas.",
    flavor: "Supporting local students with hands-on experience!",
    baseCost: 150.00,
    costMultiplier: 1.15,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({ ...prev, autoMixRate: prev.autoMixRate + 5.0 })); // 5 sodas per second
    }
  },
  mixing3: {
    id: "mixing3",
    type: "employee",
    name: "Soda Officer",
    description: "LVL 3: Mixes sodas quickly.",
    flavor: "Supporting local students with an internship!",
    baseCost: 1000.00,
    costMultiplier: 1.15,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({ ...prev, autoMixRate: prev.autoMixRate + 30.0 })); 
    }
  },
  mixing4: {
    id: "mixing4",
    type: "employee",
    name: "Soda Lieutenant",
    description: "LVL 4: Mixes sodas very quickly.",
    flavor: "Supporting local students with a pension!",
    baseCost: 8000.00,
    costMultiplier: 1.15,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({ ...prev, autoMixRate: prev.autoMixRate + 200 })); 
    }
  },
  mixing5: {
    id: "mixing5",
    type: "employee",
    name: "Soda Admiral",
    description: "LVL 5: Mixes sodas absurdly quickly.",
    flavor: "You are the student now.",
    baseCost: 60000.00,
    costMultiplier: 1.15,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({ ...prev, autoMixRate: prev.autoMixRate + 1500 })); 
    }
  },

  // --- MANUAL CLICKING (HAND) ---
  // Kept mostly the same, but cheapened the entry points
  hand1: {
    id: "hand1",
    type: "upgrade",
    name: "Caffeine Pill",
    description: "Increases manual mixing speed.",
    flavor: "A taste of your own medicine.",
    baseCost: 20.00, // Instant gratification upgrade
    costMultiplier: 1.2,
    onPurchase: ({ setStats }) => {
      setStats((prev) => {
        const currentRate = 1 / prev.mixTime; 
        const newRate = currentRate + 0.5; // Slightly stronger buff
        return { ...prev, mixTime: Math.max(0.05, 1 / newRate) };
      });
    }
  },
  hand2: {
    id: "hand2",
    type: "upgrade",
    name: "Bionic Arm",
    description: "Produce 1 more soda per manual mix.",
    flavor: "Only a mildly invasive installation process!",
    baseCost: 300.00,
    costMultiplier: 1.5, 
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({ ...prev, mixAmount: (prev.mixAmount || 1) + 1 }));
    }
  },
  market1: {
    id: "market1",
    type: "upgrade",
    name: "Supplier Contracts",
    description: "Reduces market volatility by 20%.",
    flavor: "There is peace in order...",
    baseCost: 1000.00,
    costMultiplier: 1.4,
    onPurchase: ({ setEconomy }) => {
      setEconomy((prev) => ({ 
        ...prev, 
        volatility: Math.max(0.05, prev.volatility * 0.8) 
      }));
    }
  },
  market2: {
    id: "market2",
    type: "upgrade",
    name: "Shady Deals",
    description: "Increases market volatility by 20%.",
    flavor: "...but profit in chaos. ",
    baseCost: 1000.00,
    costMultiplier: 1.4,
    onPurchase: ({ setEconomy }) => {
      setEconomy((prev) => ({ 
        ...prev, 
        volatility: Math.max(0.05, prev.volatility * 1.2) 
      }));
    }
  },
  market3: {
    id: "market3",
    type: "upgrade",
    name: "Questionable Tactics",
    description: "Increases the base sell ratio by 5%.",
    flavor: "Seems ethical enough!",
    baseCost: 2500.00,
    costMultiplier: 1.5,
    onPurchase: ({ setEconomy }) => {
      setEconomy((prev) => ({ 
        ...prev, 
        // Increases the floor for how much soda sells for relative to buying materials
        sellRatio: prev.sellRatio * 1.05 
      }));
    }
  },
};