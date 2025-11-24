addLayer("e", {
    name: "extreme runes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ER", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
	passiveGeneration(){
		let p = new Decimal(0)
		if (hasUpgrade('e', 12) || hasMilestone('su', 3)) p = p.add(1)
		return p
	},
	automate(){
		if (hasMilestone('su', 4)) {
		    if (canBuyBuyable("e", 11)) setBuyableAmount("e", 11, player.e.points.max(2).log(25).sub(1).root(1).floor().add(1))
			if (canBuyBuyable("e", 12)) setBuyableAmount("e", 12, player.e.points.max(2).log(50).sub(1).root(1).floor().add(1))
			if (canBuyBuyable("e", 13)) buyBuyable('e', 13)
		}
	},
	autoUpgrade(){ return hasMilestone('su', 3) },
	doReset(e) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[e].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
        
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
	    if (hasMilestone('su', 0)) keep.push("milestones");
    
        // Stage 4, do the actual data resetautomate() {
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },
    color: "#ff5252",
    requires: new Decimal(390), // Can be a function that takes requirement increases into account
    resource: "Extreme Runes", // Name of prestige currency
    baseResource: "Levels", // Name of resource prestige is based on
    baseAmount() {return player.l.level}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade('e', 11)) mult = mult.times(4)
		if (hasUpgrade('e', 12)) mult = mult.times(2.5)
		if (hasUpgrade('e', 13)) mult = mult.times(3)
		if (hasUpgrade('e', 14)) mult = mult.times(4)
		if (hasUpgrade('e', 15)) mult = mult.times(10)
		if (hasUpgrade('e', 21)) mult = mult.times(20)
		if (hasUpgrade('e', 22)) mult = mult.times(40)
		if (hasUpgrade('e', 23)) mult = mult.times(100)
		if (hasUpgrade('e', 24)) mult = mult.times(1000)
		if (hasUpgrade('e', 25)) mult = mult.times(10000)
		if (hasUpgrade('e', 31)) mult = mult.times(25000)
		if (hasUpgrade('e', 32)) mult = mult.times(50000)
		if (hasUpgrade('e', 33)) mult = mult.times(upgradeEffect('e', 33))
		if (hasUpgrade('e', 35)) mult = mult.times(100000)
		if (hasMilestone('XP', 9)) mult = mult.times(tmp.XP.boost5)
		mult = mult.times(buyableEffect('e', 11))
		mult = mult.times(layers.su.effect())
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: Reset for extreme runes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('u', 25) || player.e.unlocked && !(inChallenge('universes', 11)))},
	  branches: ["l"],
    effect(){ return player.e.points.add(1).pow(20) },
    effectDescription(){ return "which is boosting XP and points by x" + format(layers.e.effect()) },
	milestones: {
    0: {
        requirementDescription: "1 extreme rune",
        effectDescription: "Keep Level Milestones, x2.5 UR. (Timewall)",
        done() { return player.e.points.gte(1) }
    },
	1: {
        requirementDescription: "2 extreme runes",
        effectDescription: "Keep Meta Rune Milestones, autobuy it and it resets nothing. x10 UR",
        done() { return player.e.points.gte(2) }
    },
	2: {
        requirementDescription: "3 extreme runes",
        effectDescription: "Keep Level and Ultra Rune Passive Generation x10000 BR",
        done() { return player.e.points.gte(3) }
    },
	3: {
        requirementDescription: "4 extreme runes",
        effectDescription: "Autobuy Row 3 Upgrades",
        done() { return player.e.points.gte(4) }
    },
	},
	upgrades: {
    11: {
		title: "The extreme",
        description: "xe1500 point gain, x4 extreme runes and set levels to your best XP.",
        cost: new Decimal(5),
    },
	12: {
		title: "The extreme 2",
        description: "xe1000 point gain, x2.5 extreme runes and 100% Extreme Runes per second.",
        cost: new Decimal(50),
		unlocked(){ return hasUpgrade('e', 11) },
    },
	13: {
		title: "The extreme 3",
        description: "xe2000 point gain, x3 extreme runes and unlock a buyable.",
        cost: new Decimal(2000),
		unlocked(){ return hasUpgrade('e', 12) },
    },
	14: {
		title: "Something going on?!",
        description: "x4 Extreme Runes. Unlock a buyable.",
        cost: new Decimal(100000),
		unlocked(){ return hasUpgrade('e', 13) },
    },
	15: {
		title: "Insane.",
        description: "x10 Extreme Runes and xe2500 points. Unlock a buyable",
        cost: new Decimal(500000),
		unlocked(){ return hasUpgrade('e', 14) },
    },
	15: {
		title: "Insane.",
        description: "x10 Extreme Runes and xe2500 points. Unlock a buyable.",
        cost: new Decimal(500000),
		unlocked(){ return hasUpgrade('e', 14) },
    },	
	21: {
		title: "I wish it went slower!",
        description: "x20 Extreme Runes and xe3000 points. Boost UR based on ER.",
        cost: new Decimal("e7"),
		unlocked(){ return hasUpgrade('e', 15) },
		effect(){ return player.e.points.add(1).pow(3) },
		effectDisplay(){ return "x"+format(upgradeEffect('e', 21)) },
    },
	22: {
		title: "Please.",
        description: "x40 Extreme Runes. :(",
        cost: new Decimal("e9"),
		unlocked(){ return hasUpgrade('e', 21) },
    },
	23: {
		title: ":(",
        description: "x100 Extreme Runes and xe4000 Points.",
        cost: new Decimal("e11"),
		unlocked(){ return hasUpgrade('e', 22) },
    },
	24: {
		title: ":|",
        description: "x1000 Extreme Runes and xe5000 Points.",
        cost: new Decimal("5e13"),
		unlocked(){ return hasUpgrade('e', 23) },
    },
	25: {
		title: ">:|",
        description: "x10000 Extreme Runes and xe7500 Points.",
        cost: new Decimal("5e17"),
		unlocked(){ return hasUpgrade('e', 24) },
    },
	31: {
		title: ">:(",
        description: "x25000 Extreme Runes and xe10000 Points.",
        cost: new Decimal("5e22"),
		unlocked(){ return hasUpgrade('e', 25) },
    },
	32: {
		title: ">:O",
        description: "x50000 Extreme Runes and xe12000 Points. +^0.02 XP",
        cost: new Decimal("2e28"),
		unlocked(){ return hasUpgrade('e', 31) },
    },
	33: {
		title: ":)",
        description: "Boost Extreme Runes based on points.",
        cost: new Decimal("4e34"),
		unlocked(){ return hasUpgrade('e', 32) },
		effect(){ return player.points.add(1).log(10).add(1).pow(1.25) },
		effectDisplay(){ return "x"+format(upgradeEffect('e', 33)) },
    },
	34: {
		title: ":D",
        description: "Boost Points based on Prestige Points.",
        cost: new Decimal("7e42"),
		unlocked(){ return hasUpgrade('e', 33) },
		effect(){ return player.p.points.add(1).pow(0.5) },
		effectDisplay(){ return "x"+format(upgradeEffect('e', 34)) },
    },
	35: {
		title: "D:<",
        description: "x100000 Extreme Runes and xe12500 Points. Unlock a new layer.",
        cost: new Decimal("e43"),
		unlocked(){ return hasUpgrade('e', 34) },
    },
	},
	buyables: {
	11: {
		unlocked(){ return hasUpgrade('e', 13) },
		title: "The First Buyable",
        cost(x) { return new Decimal(25).pow(x) },
        display() { return "x2 Extreme Runes per purchase<br>Cost: " + format(this.cost()) + " Extreme Runes<br>Bought: " + format(getBuyableAmount('e', 11)) + "<br>Effect: x" + format(buyableEffect('e', 11)) + " Extreme Runes" },
        canAfford() { return player.e.points.gte(this.cost()) },
        buy() {
            player.e.points = player.e.points.sub(this.cost())
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
		unlocked(){ return hasUpgrade('e', 14) },
		title: "The Second Buyable",
        cost(x) { return new Decimal(50).pow(x) },
        display() { return "xe1000 points per purchase<br>Cost: " + format(this.cost()) + " Extreme Runes<br>Bought: " + format(getBuyableAmount('e', 12)) + "<br>Effect: x" + format(buyableEffect('e', 12)) + " Points" },
        canAfford() { return player.e.points.gte(this.cost()) },
        buy() {
            player.e.points = player.e.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal("e1000")
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
    },
	13: {
		unlocked(){ return hasUpgrade('e', 15) },
		title: "The Third Buyable",
        cost(x) { return new Decimal(30).pow(x.pow(1.3)) },
        display() { return "+^0.005 XP per purchase<br>Cost: " + format(this.cost()) + " Extreme Runes<br>Bought: " + format(getBuyableAmount('e', 13)) + "/30<br>Effect: +^" + format(buyableEffect('e', 13)) + " XP" },
        canAfford() { return player.e.points.gte(this.cost()) },
        buy() {
            player.e.points = player.e.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal("0.005")
			let base2 = x
			return base1.times(base2)
		},
		purchaseLimit: 30,
    },
	},
})
