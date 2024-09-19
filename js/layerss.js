addLayer("SCH", {
    name: "Schools", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Sch", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    		students: new Decimal(0),
    		thoughts: new Decimal(0),
    }},
    color: "#ffbf00",
    requires: new Decimal("e26081500"), // Can be a function that takes requirement increases into account
    resource: "MJ Schools", // Name of prestige currency
    baseResource: "MJs", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.00000001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    displayRow: 7,
    hotkeys: [
        {key: "S", description: "Shift+S: Reset for MJ Schools", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){
        let visible = false
        if (hasChallenge('SAC', 21) || player.SCH.unlocked) visible = true
       return visible
},
    branches:["SAC", "GLA"],
    upgrades: {
        11: {
            title: "Everything Reset!!!!",
            description: "Here is a upgrade to help you recover: ×e1.000e6 MJ gain, keep Hyper MJ Upgrades again, ×100 Galactical MJs, ^1.01 MJs.",
            cost: new Decimal(1),
        },
        12: {
            title: "Boosts are needed",
            description: "Cube Super MJ gain",
            cost: new Decimal(2),
            unlocked() { return (hasUpgrade('SCH', 11)) },
	},
    },
})
