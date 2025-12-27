addLayer("st", {
    name: "Strength Runes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "StR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ff6600",
    requires: new Decimal(125), // Can be a function that takes requirement increases into account
    resource: "Strength Runes", // Name of prestige currency
    baseResource: "Power Runes", // Name of resource prestige is based on
    baseAmount() {return player.pr.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 1.02,
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset for strength runes (Uni. 1)", onPress(){if (canReset(this.layer) && !(inChallenge('universes', 11))) doReset(this.layer)}},
    ],
    effect(){
		let base = new Decimal(3)
		return new Decimal(base).pow(player.st.points)
	  },
    effectDescription(){ return "which is boosting Power Rune reset time by x" + format(layers.st.effect()) },
    layerShown(){return (hasUpgrade('pr', 35) || player.st.unlocked) && !(inChallenge('universes', 11))},
	branches: ["su"],
})
