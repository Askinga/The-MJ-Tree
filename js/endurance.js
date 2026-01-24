addLayer("en", {
    name: "more HP I guess?", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EnR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    onPrestige(){
      player.pr.points = new Decimal(0)
    },
    color: "#18ab00",
    requires: new Decimal(322), // Can be a function that takes requirement increases into account
    resource: "Endurance Runes", // Name of prestige currency
    baseResource: "Power Runes", // Name of resource prestige is based on
    baseAmount() {return player.pr.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "E", description: "Shift+E: Reset for endurance runes (Uni. 1)", onPress(){if (canReset(this.layer) && !(inChallenge('universes', 11))) doReset(this.layer)}},
    ],
    effect(){
		let exp = new Decimal(0.125)
		return player.en.points.pow(exp).div(100).add(1)
	  },
    effectDescription(){ return "which is delaying Power Rune softcap by x" + format(layers.en.effect()) },
    layerShown(){return (hasUpgrade('st', 15) || player.en.unlocked)},
	branches: ["su"]
})
