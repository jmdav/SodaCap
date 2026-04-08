export const upgrades = {
  // --- MANUAL CLICKING (HAND) ---
  hand1: {
    id: "hand1",
    type: "upgrade",
    name: "Caffeine Pills",
    description: "Increases manual mixing speed.",
    flavor: "A taste of your own medicine!",
    baseCost: 15.0,
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
    description: "Doubles your manual sodas per mix.",
    flavor: "Only a mildly invasive installation process!",
    baseCost: 500.0,
    costMultiplier: 2,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({ ...prev, mixAmount: (prev.mixAmount || 1) * 2 }));
    },
  },
  // --- MIXING (AUTO MIX RATE) ---
  mixing1: {
    id: "mixing1",
    type: "employee",
    name: "Soda Cadet",
    description: "LVL 1: Slowly mixes sodas.",
    flavor: "Supporting local students with minimum wage!",
    baseCost: 20.0,
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
  // --- ADVERTISING (DEMAND) ---
  advertising1: {
    id: "advertising1",
    type: "employee",
    name: "Social Media Novice",
    description: "Slightly increases soda demand.",
    flavor: "Turn that Instagram addiction into a career path!",
    baseCost: 30.0,
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
    baseCost: 150.0,
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

  // --- SUPPLY PRODUCTION (PASSIVE INCOME) ---
  supply1: {
    id: "supply1",
    type: "production",
    name: "Supply Farm",
    description: "Generates syrup and straw passively.",
    flavor: "Your own personal farmstand!",
    baseCost: 500.0,
    costMultiplier: 1.5,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({
        ...prev,
        syrupMakeRate: prev.syrupMakeRate + 0.5,
        strawMakeRate: prev.strawMakeRate + 0.5,
      }));
    },
  },
  supply2: {
    id: "supply2",
    type: "production",
    name: "Industrial Supply Plant",
    description: "Generates large amounts of syrup and straw passively.",
    flavor: "Now we're talking real production capacity!",
    baseCost: 3500.0,
    costMultiplier: 1.5,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({
        ...prev,
        syrupMakeRate: prev.syrupMakeRate + 3.0,
        strawMakeRate: prev.strawMakeRate + 3.0,
      }));
    },
  },
  supply3: {
    id: "supply3",
    type: "production",
    name: "Supply Empire",
    description: "Generates massive amounts of supplies passively.",
    flavor: "You've become a supply mogul.",
    baseCost: 25000.0,
    costMultiplier: 1.5,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({
        ...prev,
        syrupMakeRate: prev.syrupMakeRate + 20.0,
        strawMakeRate: prev.strawMakeRate + 20.0,
      }));
    },
  },

  // --- SUPPLY EFFICIENCY (REDUCE CONSUMPTION) ---
  efficiency1: {
    id: "efficiency1",
    type: "upgrade",
    name: "Portion Control",
    description: "Use 10% less syrup and straw per soda.",
    flavor: "Every drop counts!",
    baseCost: 200.0,
    costMultiplier: 1.3,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({
        ...prev,
        supplyEfficiency: (prev.supplyEfficiency || 1) * 0.9,
      }));
    },
  },
  efficiency2: {
    id: "efficiency2",
    type: "upgrade",
    name: "Precision Recipes",
    description: "Use 20% less syrup and straw per soda.",
    flavor: "Science makes perfect syrup ratios!",
    baseCost: 1500.0,
    costMultiplier: 1.3,
    onPurchase: ({ setStats }) => {
      setStats((prev) => ({
        ...prev,
        supplyEfficiency: (prev.supplyEfficiency || 1) * 0.8,
      }));
    },
  },

  // --- SUPPLIER PARTNERSHIPS (COST REDUCTION) ---
  supplier1: {
    id: "supplier1",
    type: "business",
    name: "Bulk Buyer Agreement",
    description: "Reduce syrup and straw costs by 15%.",
    flavor: "Never pay full price again!",
    baseCost: 300.0,
    costMultiplier: 1.25,
    onPurchase: ({ setBuyPrices }) => {
      setBuyPrices((prev) => ({
        ...prev,
        syrup: prev.syrup * 0.85,
        straw: prev.straw * 0.85,
      }));
    },
  },
  supplier2: {
    id: "supplier2",
    type: "business",
    name: "Wholesale Contract",
    description: "Reduce syrup and straw costs by 30%.",
    flavor: "Direct from the distributor!",
    baseCost: 2000.0,
    costMultiplier: 1.25,
    onPurchase: ({ setBuyPrices }) => {
      setBuyPrices((prev) => ({
        ...prev,
        syrup: prev.syrup * 0.7,
        straw: prev.straw * 0.7,
      }));
    },
  },
  supplier3: {
    id: "supplier3",
    type: "business",
    name: "Producer Partnership",
    description: "Reduce syrup and straw costs by 45%.",
    flavor: "You now own the supply chain.",
    baseCost: 15000.0,
    costMultiplier: 1.25,
    onPurchase: ({ setBuyPrices }) => {
      setBuyPrices((prev) => ({
        ...prev,
        syrup: prev.syrup * 0.55,
        straw: prev.straw * 0.55,
      }));
    },
  },

  // --- PREMIUM BRANDING (PRICE MULTIPLIER) ---
  brand1: {
    id: "brand1",
    type: "business",
    name: "Brand Identity",
    description: "Increase soda selling price by 8%.",
    flavor: "A name means everything in business.",
    baseCost: 400.0,
    costMultiplier: 1.2,
    onPurchase: ({ setSellPrices }) => {
      setSellPrices((prev) => ({
        ...prev,
        soda: prev.soda * 1.08,
      }));
    },
  },
  brand2: {
    id: "brand2",
    type: "business",
    name: "Premium Positioning",
    description: "Increase soda selling price by 25%.",
    flavor: "We're not just soda, we're a lifestyle!",
    baseCost: 2500.0,
    costMultiplier: 1.2,
    onPurchase: ({ setSellPrices }) => {
      setSellPrices((prev) => ({
        ...prev,
        soda: prev.soda * 1.25,
      }));
    },
  },
  brand3: {
    id: "brand3",
    type: "business",
    name: "Luxury Branding",
    description: "Increase soda selling price by 50%.",
    flavor: "Your soda is now a premium experience.",
    baseCost: 20000.0,
    costMultiplier: 1.2,
    onPurchase: ({ setSellPrices }) => {
      setSellPrices((prev) => ({
        ...prev,
        soda: prev.soda * 1.5,
      }));
    },
  },

  // --- SYNERGY UPGRADES ---
  synergy1: {
    id: "synergy1",
    type: "synergy",
    name: "Integrated Supply Chain",
    description: "Efficiency + Suppliers stack: additional 10% cost reduction.",
    flavor: "When systems work together, magic happens.",
    baseCost: 5000.0,
    costMultiplier: 1.4,
    onPurchase: ({ setBuyPrices }) => {
      setBuyPrices((prev) => ({
        ...prev,
        syrup: prev.syrup * 0.9,
        straw: prev.straw * 0.9,
      }));
    },
  },
  synergy2: {
    id: "synergy2",
    type: "synergy",
    name: "Production Synergy",
    description: "Each mixing employee gives +5% to all other auto-mixing.",
    flavor: "Teamwork really does make the dream work!",
    baseCost: 8000.0,
    costMultiplier: 1.4,
    onPurchase: ({ setStats }) => {
      // This bonus is dynamically calculated based on upgradesOwned
      setStats((prev) => ({
        ...prev,
        synergyBonus: (prev.synergyBonus || 0) + 0.05,
      }));
    },
  },
  synergy3: {
    id: "synergy3",
    type: "synergy",
    name: "Revenue Optimization",
    description: "Brand upgrades now multiply soda demand by 2%.",
    flavor: "Higher prices = different customers = more demand somehow?",
    baseCost: 10000.0,
    costMultiplier: 1.4,
    onPurchase: ({ setEconomy }) => {
      setEconomy((prev) => ({
        ...prev,
        demand: prev.demand * 1.06,
        demandSynergyActive: true,
      }));
    },
  },

};
