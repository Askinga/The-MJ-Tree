addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('p', 12)) mult = mult.times(2)
	if (hasUpgrade('p', 13)) mult = mult.times(1.4)
	if (hasUpgrade('p', 14)) mult = mult.times(1.4)
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
    },
    buyables: {
        11: {
            title: "Exponent 1",
            unlocked() { return hasUpgrade("p", 15) },
            cost(x) {
                exp2 = 1.1    
                return new Decimal(30).mul(Decimal.pow(1.25, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                return "Boost points by ^1.01 per level. (compounding) <br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " prestige points" + "<br>Level " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Point gain by ^" + format(buyableEffect(this.layer, this.id))
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
