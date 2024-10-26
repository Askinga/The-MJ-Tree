addLayer("SCH", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Sch", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "MJ Schools", // Name of prestige currency
    baseResource: "MJs", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.000001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "S", description: "Shift+S: Reset for MJ Schools", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    branches["SAC"],
    challenges: {
        11: {
            name: "Cosmicless Challenge",
            challengeDescription: "Every MJ Click and Upgrade Tree upgrades is disabled, Every layer ^0.2 except this layer and buyables scale a lot faster except MJ Booster.",
            canComplete: function() {return player.points.gte("e982000")},
            goalDescription: "Get e982000 MJs.",
            rewardDescription: "Unlock more Galactic MJ Upgrades"
        },
        12: {
            name: "Broken MJs",
            challengeDescription: "^0.01 MJs",
            canComplete: function() {return player.points.gte("e10805")},
            goalDescription: "Get e10805 MJs.",
            rewardDescription: "Beat v2.1.0. Tip: If you reach a certain amount of MJs, you will see a glimpse of the creater, about challenges",
            unlocked() { return (hasChallenge('GLA', 11)) },
	},
    },
})
