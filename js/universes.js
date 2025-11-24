addLayer("universes", {
    name: "uni", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 9, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#fcba03",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Hello", // Name of prestige currency
    baseResource: "You", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    tooltip(){
      return "Universes"
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade('uni', 14)},
    tabFormat: [
      ["display-text", "Here are the different universes you can go to."],
	  "blank",
      "challenges",
    ],
    challenges: {
    11: {
        name: "Universe 2: Alternate Runes",
        fullDisplay(){
			return '"Alternate runes, alternate stuff"'
	    },
        canComplete: function() {return false},
    },
    },
})
