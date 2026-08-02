addLayer("senur", {
    name: "Яυnɘƨ...", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Я", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
	nodeStyle() {return {
        "background": "radial-gradient(#4c89ba, #7fabed)",
        "width": "100px",
        "height": "100px",
    }
},
	componentStyles: {
    "prestige-button"() {return { "background": "radial-gradient(#4c89ba, #7fabed)",
        "width": "200px",
        "height": "150px",
    }},
},
	doReset(reset) {
        let keep = [];
        if (! inChallenge("universes", 11)) keep.push("upgrades")
        if (! inChallenge("universes", 11)) keep.push("points")
        if (! inChallenge("universes", 11)) keep.push("milestones")
        if (! inChallenge("universes", 11)) keep.push("buyables")
        if (layers[reset].row > this.row) {
            layerDataReset("senur", keep);
        }
    },
    color: "#4c89ba",
    requires: new Decimal("e40"), // Can be a function that takes requirement increases into account
    resource: "Яυnɘƨ", // Name of prestige currency
    baseResource: "Different Runes", // Name of resource prestige is based on
    baseAmount() {return player.dr.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.24, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade('senur', 13)) mult = mult.times(4)
		if (hasUpgrade('water', 84)) mult = mult.times(buyableEffect('water', 31))
		if (hasMilestone('bo', 4)) mult = mult.times(5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "R", description: "Shift+R: Reset for Яυnɘƨ (Uni. 2)", onPress(){if (canReset(this.layer) && inChallenge('universes', 11)) doReset(this.layer)}},
    ],
    layerShown(){return ((hasUpgrade('dr', 23) || player.senur.unlocked) && inChallenge('universes', 11)) },
    effect(){
      let expo = new Decimal(0.5)
	  if (hasUpgrade('senur', 14)) expo = expo.add(0.1)
      let eff = player.senur.points.add(1).pow(expo)
      return eff
    },
    effectDescription(){
      return "which is boosting Different Runes by x" + format(layers.senur.effect())
    },
	branches: ["dr"],
	upgrades: {
		11: {
			title: "Why is it reversed?",
			description: "x3 Different Runes.",
			cost: new Decimal(2)
		},
		12: {
			title: "Oh I get it now",
			description: "+0.1 Booster base.",
			cost: new Decimal(10),
			unlocked(){ return hasUpgrade('senur', 11) },
		},
		13: {
			title: "Runes when reversed is senuR.",
			description: "x4 Яυnɘƨ.",
			cost: new Decimal(30),
			unlocked(){ return hasUpgrade('senur', 12) },
		},
		14: {
			title: "Boosting the reversed.",
			description: "+0.1 Яυnɘƨ effect exponent.",
			cost: new Decimal(1000),
			unlocked(){ return hasUpgrade('senur', 13) },
		},
		15: {
			title: "Points are now reversed.",
			description: "Яυnɘƨ boost Points.",
			cost: new Decimal(25000),
			effect(){ return player.senur.points.add(1).pow(0.4) },
			effectDisplay(){ return "x"+format(upgradeEffect('senur', 15)) },
			unlocked(){ return hasUpgrade('senur', 14) },
		},
	},
})
