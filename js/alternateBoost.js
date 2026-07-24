addLayer("bo", {
    name: "boosters?", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
	nodeStyle() {return {
        "background": "linear-gradient(#ff0077, #4230ff)",
        "width": "100px",
        "height": "100px",
    }
},
	componentStyles: {
    "prestige-button"() {return { "background": "linear-gradient(#ff0077, #4230ff)",
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
            layerDataReset("bo", keep);
        }
    },
    color: "#7c30ff",
    requires: new Decimal("e9"), // Can be a function that takes requirement increases into account
    resource: "boosters", // Name of prestige currency
    baseResource: "Different Runes", // Name of resource prestige is based on
    baseAmount() {return player.dr.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 10,
    exponent: 1.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for boosters (Uni. 2)", onPress(){if (canReset(this.layer) && inChallenge('universes', 11)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('dr', 22) && inChallenge('universes', 11))},
    effect(){
      let base = new Decimal(2)
      let eff = new Decimal(base).pow(player.bo.points)
      return eff
    },
    effectDescription(){
      return "which is boosting Different Runes by x" + format(layers.bo.effect())
    },
	branches: ["dr"],
})
