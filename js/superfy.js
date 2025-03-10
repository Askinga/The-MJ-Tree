addLayer("s", {
    name: "superfy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol(){ 
	if (options.layerEmojis == true) sym = "❇️"
	else sym = "S"
	return sym
    }, // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
                points: new Decimal(0),
    }},
    color: "#36ad56",
    passiveGeneration(){
	    let passive = new Decimal(0)
	    if (hasUpgrade('m', 12) || hasAchievement('A', 45)) passive = passive.add(0.05)
	    if (hasUpgrade('m', 14)) passive = passive.times(5)
	    return passive
    },
    requires: new Decimal(5e7), // Can be a function that takes requirement increases into account
    resource: "Super", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.15, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('s', 14)) mult = mult.times(2)
	if (hasUpgrade('s', 22)) mult = mult.times(3)
	if (hasUpgrade('s', 24)) mult = mult.times(3)  
	if (hasUpgrade('s', 31)) mult = mult.times(upgradeEffect('s', 31))  
	if (hasUpgrade('s', 32)) mult = mult.times(6)  
	if (hasUpgrade('s', 33)) mult = mult.times(upgradeEffect('s', 33))  
	if (hasUpgrade('s', 34)) mult = mult.times(2.5)
	if (hasUpgrade('m', 11)) mult = mult.times(3)
	if (hasUpgrade('m', 12)) mult = mult.times(4)
	if (hasUpgrade('m', 14)) mult = mult.times(3.5)
	if (hasUpgrade('m', 25)) mult = mult.times(5)
	if (hasUpgrade('m', 33)) mult = mult.times(upgradeEffect('m', 33))  
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
    automate(){
	if (hasMilestone('m', 0) || hasAchievement('A', 45)) {
		buyUpgrade('s', 11);
		buyUpgrade('s', 12);
		buyUpgrade('s', 13);
		buyUpgrade('s', 14);
		buyUpgrade('s', 15);
	}
	if (hasMilestone('m', 1) || hasAchievement('A', 45)) {
		buyUpgrade('s', 21);
		buyUpgrade('s', 22);
		buyUpgrade('s', 23);
		buyUpgrade('s', 24);
		buyUpgrade('s', 25);
	}
	if (hasMilestone('m', 2) || hasAchievement('A', 45)) {
		buyUpgrade('s', 31);
		buyUpgrade('s', 32);
		buyUpgrade('s', 33);
		buyUpgrade('s', 34);
		buyUpgrade('s', 35);
	}
    },
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
      21: {
	title: "Classic boost",
	description: "x2 Points.",
	cost: new Decimal(15),
	unlocked(){ return (hasUpgrade('s', 15))}
      },
      22: {
	title: "Classic boost",
	description: "x3 Super.",
	cost: new Decimal(25),
	unlocked(){ return (hasUpgrade('s', 21))}
      },
      23: {
	title: "Super Growing",
	description: "Boost points based on super.",
	cost: new Decimal(100),
	effect(){
	    return player[this.layer].points.add(1).pow(0.4)
	},
	effectDisplay(){
	    return format(upgradeEffect(this.layer, this.id))+'x'
	},
	unlocked(){ return (hasUpgrade('s', 22))}
      },
      24: {
	title: "The Trio",
	description: "x3 Super, Prestige Points and Points.",
	cost: new Decimal(125),
	unlocked(){ return (hasUpgrade('s', 23))}
      },
      25: {
	title: "Super Growing 2",
	description: "Boost prestige points based on super.",
	cost: new Decimal(500),
	effect(){
	    return player[this.layer].points.add(1).pow(0.3)
	},
	effectDisplay(){
	    return format(upgradeEffect(this.layer, this.id))+'x'
	},
	unlocked(){ return (hasUpgrade('s', 24))}
      },
      31: {
	title: "Super Growing 3",
	description: "Boost super based on the amount of Exponent 1.",
	cost: new Decimal(1500),
	effect(){
	    return getBuyableAmount('p', 11).add(1).pow(0.25)
	},
	effectDisplay(){
	    return format(upgradeEffect(this.layer, this.id))+'x'
	},
	unlocked(){ return (hasUpgrade('s', 25))}
      },
      32: {
	title: "BIG BOOST but nerf",
	description: "x6 Super, Prestige Points and Points. but ^0.95 points.",
	cost: new Decimal(10000),
	unlocked(){ return (hasUpgrade('s', 31))}
      },
      33: {
	title: "Super Growing 4",
	description: "Boost super based on super.",
	cost: new Decimal(200000),
	effect(){
	    return player[this.layer].points.add(1).pow(0.1)
	},
	effectDisplay(){
	    return format(upgradeEffect(this.layer, this.id))+'x'
	},
	unlocked(){ return (hasUpgrade('s', 32))}
      },
      34: {
	title: "Mega soon!",
	description: "x2.5 Super",
	cost: new Decimal(750000),
	unlocked(){ return (hasUpgrade('s', 33))}
      },
      35: {
	title: "Mega!",
	description: "Unlock a new layer.",
	cost: new Decimal(2e6),
	unlocked(){ return (hasUpgrade('s', 34))}
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
