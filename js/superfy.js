addLayer("s", {
    name: "superfy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol(){ 
	if (options.layerEmojis == true) sym = "❇️"
	else sym = "S"
	return sym
    }, // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
                points: new Decimal(0),
    }},
    color: "#36ad56",
    requires: new Decimal(5e7), // Can be a function that takes requirement increases into account
    resource: "Super", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.15, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('s', 14)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Superfy.", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tooltip() {
      return 'Superfy'
    },
    resetDescription(){
	return 'Superfy for '
    },
    branches: ["p"], 
    layerShown(){return (hasUpgrade('p', 35) || player.s.unlocked)},
    upgrades: {
      11: {
	title: "Start The Prestige Zen... again?",
	description: "x2 Points and Prestige Points",
	cost: new Decimal(1)
      },
      12: {
	title: "Super gives big boosts!",
	description: "x3 Points and Prestige Points",
	cost: new Decimal(1),
	unlocked(){ return (hasUpgrade('s', 11))}
      },
      13: {
	title: "Super!",
	description: "x4 Points.",
	cost: new Decimal(2),
	unlocked(){ return (hasUpgrade('s', 12))}
      },
      14: {
	title: "Boost it.",
	description: "x2 Super.",
	cost: new Decimal(5),
	unlocked(){ return (hasUpgrade('s', 13))}
      },
      15: {
	title: "Classic boost",
	description: "x2.5 Prestige Points.",
	cost: new Decimal(10),
	unlocked(){ return (hasUpgrade('s', 14))}
      },
    },
    milestones: {
        0: {
            requirementDescription: "1 Super",
            effectDescription: "Automate first row of prestige upgrades!",
            done() {return player.s.points.gte(1)}
        },
	1: {
            requirementDescription: "5 Super",
            effectDescription: "Automate second row of prestige upgrades!",
            done() {return player.s.points.gte(5)}
        },
	2: {
            requirementDescription: "100 Super",
            effectDescription: "Automate third row of prestige upgrades!",
            done() {return player.s.points.gte(100)}
        },
	3: {
            requirementDescription: "1,000 Super",
            effectDescription: "100% of Prestige Points every second!",
            done() {return player.s.points.gte(1000)}
        },
	4: {
            requirementDescription: "10,000 Super",
            effectDescription: "Automatically buy Exponent 1!",
            done() {return player.s.points.gte(10000)}
        },
    },
})
