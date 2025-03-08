addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol(){ 
	if (options.layerEmojis == "true") sym = "⬆️"
	else sym = "P"
	return sym
    }, // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires(){ 
	let req = new Decimal(10) 
	if (hasUpgrade('p', 32)) req = req.div(upgradeEffect('p', 32)) 
	return req
    }, // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('p', 12)) mult = mult.times(2)
	if (hasUpgrade('p', 13)) mult = mult.times(1.4)
	if (hasUpgrade('p', 14)) mult = mult.times(1.75)
	if (hasUpgrade('p', 23)) mult = mult.times(upgradeEffect('p', 23))
	if (hasUpgrade('p', 24)) mult = mult.times(upgradeEffect('p', 24))
	if (hasUpgrade('p', 25)) mult = mult.times(upgradeEffect('p', 25))
	if (hasUpgrade('p', 31)) mult = mult.times(5)
	if (hasUpgrade('p', 34)) mult = mult.times(5)
	if (hasUpgrade('s', 11)) mult = mult.times(2)
	if (hasUpgrade('s', 12)) mult = mult.times(3) 
	if (hasUpgrade('s', 15)) mult = mult.times(2.5) 
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    tabFormat: {
	main: {
	    content: [
		"main-display",
		"blank",
		"prestige-button",
		"resource-display",
		"blank",
		"upgrades",
	    ]
	},
	exponents: {
	    unlocked(){ return (hasUpgrade('p', 15))},
		content: [
		    "main-display",
		    "blank",
		    "prestige-button",
		    "resource-display",
		    "blank",
		    ["display-text", 'Here are exponents. The buyables give a exponential boost to a resource. More buyables will appear here in the future.'],
		    "blank",
		    "buyables",
		]
	},
    },
    automate(){
	if (hasMilestone('s', 0)) {
		buyUpgrade('p', 11);
		buyUpgrade('p', 12);
		buyUpgrade('p', 13);
		buyUpgrade('p', 14);
		buyUpgrade('p', 15);
	}
	if (hasMilestone('s', 1)) {
		buyUpgrade('p', 21);
		buyUpgrade('p', 22);
		buyUpgrade('p', 23);
		buyUpgrade('p', 24);
		buyUpgrade('p', 25);
	}
    },

		
    upgrades: {
      11: {
	title: "Start The Prestige Zen",
	description: "x2 Points",
	cost: new Decimal(1)
      },
      12: {
	title: "Layer multiplier",
	description: "x2 Prestige Points",
	cost: new Decimal(3),
	unlocked(){ return (hasUpgrade('p', 11))}
      },
      13: {
	title: "Double Upgrade",
	description: "x1.4 Prestige Points and Points",
	cost: new Decimal(7),
	unlocked(){ return (hasUpgrade('p', 12))}
      },
      14: {
	title: "Better Boost",
	description: "x1.75 Prestige Points and Points",
	cost: new Decimal(13),
	unlocked(){ return (hasUpgrade('p', 13))}
      },
      15: {
	title: "Exponent",
	description: "Unlock Exponents",
	cost: new Decimal(25),
	unlocked(){ return (hasUpgrade('p', 14))}
      },
      21: {
	title: "Growing",
	description: "Boost points based on prestige points.",
	cost: new Decimal(40),
	effect(){
	    return player[this.layer].points.add(1).pow(0.25)
	},
	effectDisplay(){
	    return format(upgradeEffect(this.layer, this.id))+'x'
	},
	unlocked(){ return (hasUpgrade('p', 15))}
      },
      22: {
	title: "Growing 2",
	description: "Boost points based on the current amount of Exponent 1.",
	cost: new Decimal(100),
	effect(){
	    return getBuyableAmount('p', 11).add(1)
	},
	effectDisplay(){
	    return format(upgradeEffect(this.layer, this.id))+'x'
	},
	unlocked(){ return (hasUpgrade('p', 21))}
      },
      23: {
	title: "Growing 3",
	description: "Boost prestige points based on points.",
	cost: new Decimal(1000),
	effect(){
	    return player.points.add(1).pow(0.085)
	},
	effectDisplay(){
	    return format(upgradeEffect(this.layer, this.id))+'x'
	},
	unlocked(){ return (hasUpgrade('p', 22))}
      },
      24: {
	title: "Growing 4",
	description: "Boost prestige points based on prestige points.",
	cost: new Decimal(2500),
	effect(){
	    return player[this.layer].points.add(1).pow(0.05)
	},
	effectDisplay(){
	    return format(upgradeEffect(this.layer, this.id))+'x'
	},
	unlocked(){ return (hasUpgrade('p', 23))}
      },
      25: {
	title: "Growing 5",
	description: "Boost prestige points based on the current amount of Exponent 1.",
	cost: new Decimal(6000),
	effect(){
	    return getBuyableAmount('p', 11).add(1).pow(0.5)
	},
	effectDisplay(){
	    return format(upgradeEffect(this.layer, this.id))+'x'
	},
	unlocked(){ return (hasUpgrade('p', 24))}
      },
      31: {
	title: "Mega Multiplier",
	description: "x5 Points and Prestige Points",
	cost: new Decimal(20000),
	unlocked(){ return (hasUpgrade('p', 25))}
      },
      32: {
	title: "Shrinking 1",
	description: "Divide prestige point requirement based on points",
	cost: new Decimal(1e6),
	effect(){
	    return new Decimal(1).times(player.points.add(1).pow(0.1))
	},
	effectDisplay(){
	    return '/'+format(upgradeEffect(this.layer, this.id))
	},
	unlocked(){ return (hasUpgrade('p', 31))}
      },
      33: {
	title: "Growing 6",
	description: "Boost points based on points.",
	cost: new Decimal(2e6),
	effect(){
	    return player.points.add(1).pow(0.035)
	},
	effectDisplay(){
	    return format(upgradeEffect(this.layer, this.id))+'x'
	},
	unlocked(){ return (hasUpgrade('p', 32))}
      },
      34: {
	title: "Mega Multiplier ^ 0.5",
	description: "x5 Prestige Points",
	cost: new Decimal(4e6),
	unlocked(){ return (hasUpgrade('p', 33))}
      },
      35: {
	title: "Layer 2",
	description: "Unlock a new layer.",
	cost: new Decimal(4e7),
	unlocked(){ return (hasUpgrade('p', 34))}
      },
    },
    buyables: {
        11: {
            title: "Exponent 1",
            unlocked() { return hasUpgrade("p", 15) },
            cost(x) {
                exp2 = 1.04
                return new Decimal(30).mul(Decimal.pow(1.25, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                return "Boost points by ^1.01 per level. (compounding) " + "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " prestige points" + "<br>Level " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Point gain by ^" + format(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base1 = new Decimal(1.01)
                base2 = x
                expo = new Decimal(1)
                eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            tooltip() {
                return "Cost Formula: 30 x 1.25^Amt x Amt^(" + exp2 + "^Amt). Effect formula: " + format(base1) + "^(" + format(base2) + "^" + expo + ")."
            }
        },
    },
})
