addLayer("dr", {
    name: "drUne", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "DR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
	doReset(reset) {
        let keep = [];
        if (! inChallenge("universes", 11)) keep.push("upgrades")
        if (! inChallenge("universes", 11)) keep.push("points")
        if (! inChallenge("universes", 11)) keep.push("milestones")
        if (! inChallenge("universes", 11)) keep.push("buyables")
        if (layers[reset].row > this.row) {
            layerDataReset("dr", keep);
        }
    },
	passiveGeneration() {
		let p = new Decimal(0)
		if ((player.points.gt(0) && hasMilestone('bo', 1)) && inChallenge('universes', 11)) p = p.add(1)
		return p
	},
    color: "#3acb02",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Different Runes", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade('dr', 12)) mult = mult.times(2)
		if (hasUpgrade('dr', 14)) mult = mult.times(3)
		if (hasUpgrade('dr', 15)) mult = mult.times(4)
		if (hasUpgrade('dr', 15)) mult = mult.times(upgradeEffect('dr', 15))
		if (hasUpgrade('water', 74)) mult = mult.times(upgradeEffect('water', 74))
		mult = mult.times(tmp.water.ocean3)
		mult = mult.times(layers.bo.effect())
		mult = mult.times(layers.senur.effect())
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for different runes (Uni. 2)", onPress(){if (canReset(this.layer) && inChallenge('universes', 11)) doReset(this.layer)}},
    ],
    layerShown(){return inChallenge('universes', 11)},
	upgrades: {
		11: {
			title: "Off to a different start",
			description: "x2 Points",
			cost: new Decimal(1),
		},
		12: {
			title: "This feels different",
			description: "x2 Different Runes",
			cost: new Decimal(3),
			unlocked(){ return hasUpgrade('dr', 11) },
		},
		13: {
			title: "I want to get out",
			description: "Unlock more Universal Rune upgrades",
			cost: new Decimal(10),
			unlocked(){ return hasUpgrade('dr', 12) },
		},
		14: {
			title: "Not this again",
			description: "Boost points based on DR and x3 DR",
			cost: new Decimal(15),
			unlocked(){ return (hasUpgrade('uni', 23) || hasMilestone('bo', 0)) },
			effect(){ return player.dr.points.add(1).pow(0.4) },
			effectDisplay(){ return "x"+format(upgradeEffect('dr', 14)) },
		},
		15: {
			title: "*sigh",
			description: "boost DR based on points and x4 DR and unlock more Universal Rune upgrades!",
			cost: new Decimal(333),
			unlocked(){ return hasUpgrade('dr', 14) },
			effect(){ return player.points.add(1).pow(0.05) },
			effectDisplay(){ return "x"+format(upgradeEffect('dr', 15)) },
		},
		21: {
			title: "Multiversal boost 3",
			description: "Points are boosted based on water.",
			cost: new Decimal("5e6"),
			unlocked(){ return hasUpgrade('water', 75) },
			effect(){ return player.water.points.div("e60").pow(0.1).add(1) },
			effectDisplay(){ return "x"+format(upgradeEffect('dr', 21)) },
		},
		22: {
			title: "New layer!?",
			description: "Unlock a new layer. In this universe of course.",
			cost: new Decimal("5e8"),
			unlocked(){ return hasUpgrade('water', 81) },
		},
		23: {
			title: "The opposite way..?",
			description: "ɿɘγɒl wɘn ɒ ʞɔolnU.",
			cost: new Decimal("1e40"),
			unlocked(){ return hasUpgrade('water', 82) },
		},
	},
})
