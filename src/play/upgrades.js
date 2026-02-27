export const UPGRADES = {
  advertising1: {
    id: "advertising1",
    type: "employee",
    name: "Social Media Novice",
    description: "Slightly increases soda demand.",
    flavor: "Turn that Instagram addiction into a career path!",
    baseCost: 100.00,
    costMultiplier: 1.5, // Each level costs 50% more than the last
    onPurchase: ({ setEconomy }) => {
      setEconomy((prev) => ({ 
        ...prev, 
        demand: prev.demand + 1 
      }));
    }
  },
  advertising2: {
    id: "advertising2",
    type: "employee",
    name: "Social Media Acolyte",
    description: "Increases soda demand.",
    flavor: "They have begun down the dark and twisted way.",
    baseCost: 1000.00,
    costMultiplier: 1.5, // Each level costs 50% more than the last
    onPurchase: ({ setEconomy }) => {
      setEconomy((prev) => ({ 
        ...prev, 
        demand: prev.demand + 5
      }));
    }
  },
  advertising3: {
    id: "advertising3",
    type: "employee",
    name: "Social Media Adept",
    description: "Greatly increases soda demand.",
    flavor: "The Algorithm shall be known to them.",
    baseCost: 10000.00,
    costMultiplier: 1.5, // Each level costs 50% more than the last
    onPurchase: ({ setEconomy }) => {
      setEconomy((prev) => ({ 
        ...prev, 
        demand: prev.demand + 20
      }));
    }
  },
  advertising4: {
    id: "advertising4",
    type: "employee",
    name: "Social Media Mage",
    description: "Massively increases soda demand.",
    flavor: "As with all things, the mind can be reformed.",
    baseCost: 100000.00,
    costMultiplier: 1.5, // Each level costs 50% more than the last
    onPurchase: ({ setEconomy }) => {
      setEconomy((prev) => ({ 
        ...prev, 
        demand: prev.demand + 80
      }));
    }
  },
  advertising5: {
    id: "advertising5",
    type: "employee",
    name: "Social Media Archmage",
    description: "Absurdly increases soda demand.",
    flavor: "!¡ᒷᒷ!¡ ᔑリ↸ ᒲ⚍ℸℸᒷ∷",
    baseCost: 1000000.00,
    costMultiplier: 1.5, // Each level costs 50% more than the last
    onPurchase: ({ setEconomy }) => {
      setEconomy((prev) => ({ 
        ...prev, 
        demand: prev.demand + 400
      }));
    }
  },
  mixing1: {
    id: "mixing1",
    type: "employee",
    name: "Soda Cadet",
    description: "LVL 1: Slowly mixes sodas.",
    flavor: "Supporting local students with minimum wage!",
    baseCost: 50.00,
    costMultiplier: 1.8,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({ 
        ...prev, 
        autoMixRate: prev.autoMixRate + 0.2
      }));
    }
  },
  mixing2: {
    id: "mixing2",
    type: "employee",
    name: "Soda Specialist",
    description: "LVL 2: Mixes sodas.",
    flavor: "Supporting local students with hands-on experience!",
    baseCost: 200.00,
    costMultiplier: 1.8,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({ 
        ...prev, 
        autoMixRate: prev.autoMixRate + 0.6
      }));
    }
  },
  mixing3: {
    id: "mixing3",
    type: "employee",
    name: "Soda Officer",
    description: "LVL 3: Mixes sodas quickly.",
    flavor: "Supporting local students with an internship!",
    baseCost: 800.00,
    costMultiplier: 1.8,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({ 
        ...prev, 
        autoMixRate: prev.autoMixRate + 2
      }));
    }
  },
  mixing4: {
    id: "mixing4",
    type: "employee",
    name: "Soda Lieutenant",
    description: "LVL 4: Mixes sodas very quickly.",
    flavor: "Supporting local students with a pension!",
    baseCost: 3000.00,
    costMultiplier: 1.8,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({ 
        ...prev, 
        autoMixRate: prev.autoMixRate + 6
      }));
    }
  },
  mixing5: {
    id: "mixing5",
    type: "employee",
    name: "Soda Admiral",
    description: "LVL 5: Mixes sodas absurdly quickly.",
    flavor: "You are the student now.",
    baseCost: 20000.00,
    costMultiplier: 1.8,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({ 
        ...prev, 
        autoMixRate: prev.autoMixRate + 30
      }));
    }
  },
};