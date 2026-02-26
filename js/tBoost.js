addLayer("tb", {
    name: "time boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "TB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
	nodeStyle() {return {
        "background": "radial-gradient(#ffffff, #888888)",
        "width": "100px",
        "height": "100px",
    }
},
	componentStyles: {
    "prestige-button"() {return { "background": "radial-gradient(#ffffff, #888888)",
        "width": "200px",
        "height": "150px",
    }},
},
	onPrestige(){
        player.su.timeSubtab = new Decimal(0)
    },
	passiveGeneration() {
        let p = new Decimal(0)
        if (hasMilestone('uni', 2)) p = p.add(1)
        return p
    },
    color: "#ffffff",
    requires: new Decimal(1e13), // Can be a function that takes requirement increases into account
    resource: "Time Boosters", // Name of prestige currency
    baseResource: "Time", // Name of resource prestige is based on
    baseAmount() {return player.su.timeSubtab}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0075, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade('su', 41)) mult = mult.times(20)
		if (hasChallenge('su', 12)) mult = mult.times(100)
		if (hasUpgrade('money', 44)) mult = mult.times(1e10)
		mult = mult.times(layers.uni.effect())
		if (hasUpgrade('limit', 11)) mult = mult.times(10)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "M", description: "Shift+M: Reset for $ (Uni. 1)", onPress(){if (canReset(this.layer) && !(inChallenge('universes', 11))) doReset(this.layer)}},
    ],
    effect(){ return player.tb.points.add(1).pow(2) },
    effectDescription(){ return "which is boosting Time and SuR by x" + format(layers.tb.effect()) },
    layerShown(){return ((hasMilestone('su', 6) || player.tb.unlocked) && !(inChallenge('universes', 11)))},
  	branches: ["su"]
})
