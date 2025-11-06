addLayer("logs", {
    name: "Logs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🪵", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
	passiveGeneration(){
		let p = new Decimal(0)
		p = p.add(buyableEffect('logs', 13).div(100))
		p = p.times(buyableEffect('logs', 23).add(1))
		return p
	},
    color: "#735245",
    requires: new Decimal("e1.8e6"), // Can be a function that takes requirement increases into account
    resource: "Logs", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		mult = mult.times(buyableEffect('logs', 11))
		mult = mult.times(buyableEffect('logs', 21))
		if (hasUpgrade('logs', 11)) mult = mult.times(3)
		if (hasUpgrade('logs', 12)) mult = mult.times(2)
		if (hasUpgrade('logs', 13)) mult = mult.times(3)
		if (hasUpgrade('logs', 14)) mult = mult.times(4)
		if (hasUpgrade('logs', 15)) mult = mult.times(5)
		if (hasUpgrade('logs', 21)) mult = mult.times(6)
		if (hasUpgrade('logs', 22)) mult = mult.times(7)
		if (hasUpgrade('logs', 23)) mult = mult.times(8)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    resetsNothing(){ return true },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasMilestone('XP', 12) || player.logs.unlocked)},
	branches: ["m"],
    effect(){
	  let pow = new Decimal(25000)
	  pow = pow.add(buyableEffect('logs', 12))
	  pow = pow.add(buyableEffect('logs', 22))
      return player.logs.points.add(1).pow(pow)
    },
    effectDescription(){
      return 'which is boosting Points by x' + format(layers.logs.effect())
    },
	buyables: {
	11: {
		title: "Stronger Axe",
        cost(x) { return new Decimal(10).pow(x).times(100) },
        display() { return "x2 Logs.<br>Cost: " + format(this.cost()) + " Logs<br>Bought: " + format(getBuyableAmount('logs', 11)) + "<br>Effect: x" + format(buyableEffect('logs', 11)) + " Logs" },
        canAfford() { return player.logs.points.gte(this.cost()) },
        buy() {
            player.logs.points = player.logs.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(2)
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
    },
	12: {
		title: "Pointy Logs",
        cost(x) { return new Decimal(1.125).pow(x).times(10) },
        display() { return "+100 Log effect exponent.<br>Cost: " + format(this.cost()) + " Logs<br>Bought: " + format(getBuyableAmount('logs', 12)) + "<br>Effect: +" + format(buyableEffect('logs', 12)) + " Log effect exponent" },
        canAfford() { return player.logs.points.gte(this.cost()) },
        buy() {
            player.logs.points = player.logs.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(100)
			let base2 = x
			let expo = new Decimal(1)
			return base1.times(Decimal.times(base2, expo))
		},
    },
	13: {
		title: "Auto Cutting Robot",
        cost(x) { return new Decimal(1.2).pow(x).times(100) },
        display() { return "+10% Logs per second.<br>Cost: " + format(this.cost()) + " Logs<br>Bought: " + format(getBuyableAmount('logs', 13)) + "<br>Effect: +" + format(buyableEffect('logs', 13)) + "% Log passive gain" },
        canAfford() { return player.logs.points.gte(this.cost()) },
        buy() {
            player.logs.points = player.logs.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(10)
			let base2 = x
			let expo = new Decimal(1)
			return base1.times(Decimal.times(base2, expo))
		},
    },
	21: {
		unlocked(){ return hasUpgrade('logs', 15) },
		title: "Swing faster",
        cost(x) { return new Decimal(10).pow(x.pow(1.1)).times(1000000) },
        display() { return "x2.5 Logs.<br>Cost: " + format(this.cost()) + " Logs<br>Bought: " + format(getBuyableAmount('logs', 21)) + "<br>Effect: x" + format(buyableEffect('logs', 21)) + " Logs" },
        canAfford() { return player.logs.points.gte(this.cost()) },
        buy() {
            player.logs.points = player.logs.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(2.5)
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
    },
	22: {
		unlocked(){ return hasUpgrade('logs', 15) },
		title: "Pointer Logs",
        cost(x) { return new Decimal(1.3).pow(x).times(1000000) },
        display() { return "+250 Log effect exponent.<br>Cost: " + format(this.cost()) + " Logs<br>Bought: " + format(getBuyableAmount('logs', 22)) + "<br>Effect: +" + format(buyableEffect('logs', 22)) + " Log effect exponent" },
        canAfford() { return player.logs.points.gte(this.cost()) },
        buy() {
            player.logs.points = player.logs.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(250)
			let base2 = x
			let expo = new Decimal(1)
			return base1.times(Decimal.times(base2, expo))
		},
    },
	23: {
		unlocked(){ return hasUpgrade('logs', 15) },
		title: "Send out more robots",
        cost(x) { return new Decimal(1.4).pow(x.pow(x.div(200).add(1))).times(1000000) },
        display() { return "+x1 Logs per second.<br>Cost: " + format(this.cost()) + " Logs<br>Bought: " + format(getBuyableAmount('logs', 23)) + "<br>Effect: +x" + format(buyableEffect('logs', 23)) + " Log passive gain" },
        canAfford() { return player.logs.points.gte(this.cost()) },
        buy() {
            player.logs.points = player.logs.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1)
			let base2 = x
			let expo = new Decimal(1)
			return base1.times(Decimal.times(base2, expo))
		},
    },
	},
	upgrades: {
		11: {
			title: "Efficient Axe",
			description: "x3 Logs",
			cost: new Decimal(300)
		},
		12: {
			title: "2-Headed Axe",
			description: "x2 Logs",
			cost: new Decimal(1000),
			unlocked(){ return hasUpgrade('logs', 11) },
		},
		13: {
			title: "3-Headed Axe",
			description: "x3 Logs",
			cost: new Decimal(5000),
			unlocked(){ return hasUpgrade('logs', 12) },
		},
		14: {
			title: "Fire Axe",
			description: "x4 Logs",
			cost: new Decimal(100000),
			unlocked(){ return hasUpgrade('logs', 13) },
		},
		15: {
			title: "Upgrade your axe",
			description: "x5 Logs and unlock 3 new buyables",
			cost: new Decimal(1000000),
			unlocked(){ return hasUpgrade('logs', 14) },
		},
	    21: {
			title: "Efficiency 1",
			description: "x6 Logs",
			cost: new Decimal("1e12"),
			unlocked(){ return hasUpgrade('logs', 15) },
		},
		22: {
			title: "Efficiency 2",
			description: "x7 Logs",
			cost: new Decimal("1e15"),
			unlocked(){ return hasUpgrade('logs', 21) },
		},
		23: {
			title: "Efficiency 3",
			description: "x8 Logs",
			cost: new Decimal("1e18"),
			unlocked(){ return hasUpgrade('logs', 22) },
		},
	},
})
