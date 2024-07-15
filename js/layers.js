addLayer("p", {
    name: "Upgrade Tree", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "upgrade points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 31)) mult = mult.times(2)
	if (hasUpgrade('p', 34)) mult = mult.times(3)
	if (hasUpgrade('p', 32)) mult = mult.times(upgradeEffect('p', 32))
	if (hasUpgrade('p', 33)) mult = mult.times(upgradeEffect('p', 33))
	return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset for upgrade points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
   tabFormat: {
        "Main": {
            content: [
                ["display-text", "The upgrade tree. The main layer of this game. Has a upgrade tree to boost your production."],
                "main-display",
                "prestige-button",
                "blank",
				["upgrade-tree", [[11, 12, 13], [21, 22], [31, 32, 33, 34], [41]]]
            ]
        },
    },
    tooltip() {
	return "The Upgrade Tree"
    },
    upgrades: {
        11: {
            title: "Double",
            description: "×2 points.",
            cost: new Decimal(1),
        },
        12: {
            title: "Triple",
            description: "×3 points.",
            cost: new Decimal(200),
	    unlocked() { return (hasUpgrade('p', 33)) },
	},
	13: {
            title: "Quadruple",
            description: "×4 points.",
            cost: new Decimal(1000),
	    unlocked() { return (hasUpgrade('p', 12)) },
	},
	21: {
            title: "Booster",
            description: "Boost point gain based on upgrade points.",
            cost: new Decimal(2),
	    branches: [11, 12, 13],
	    unlocked() { return (hasUpgrade('p', 11)) },
	    effect(){
                return player.p.points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
        22: {
            title: "Point booster",
            description: "Boost point gain based on points.",
            cost: new Decimal(10),
	    branches: [11, 12, 13],
	    unlocked() { return (hasUpgrade('p', 21)) },
	    effect(){
                return player.points.add(1).pow(0.125)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
        31: {
            title: "Double currency",
            description: "×2 upgrade points.",
            cost: new Decimal(20),
            branches: [21],
	    unlocked() { return (hasUpgrade('p', 22)) },
	},
        32: {
            title: "Currency booster",
            description: "Boost upgrade point gain based on points.",
            cost: new Decimal(50),
	    branches: [22],
	    unlocked() { return (hasUpgrade('p', 22)) },
	    effect(){
                return player.points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
        33: {
            title: "Currency boosts Currency",
            description: "Boost upgrade point gain based on upgrade points.",
            cost: new Decimal(125),
	    branches: [22],
	    unlocked() { return (hasUpgrade('p', 32)) },
	    effect(){
                return player.p.points.add(1).pow(0.075)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
        34: {
            title: "Triple currency",
            description: "×3 upgrade points.",
            cost: new Decimal(5000),
            branches: [21, 22],
	    unlocked() { return (hasUpgrade('p', 13)) },
	},
        41: {
            title: "New layer",
            description: "Unlock a new layer.",
            cost: new Decimal(20000),
            branches: [31, 32, 33, 34],
	    unlocked() { return (hasUpgrade('p', 34)) },
	},
    },
})

addLayer("r", {
    name: "prestige",
    symbol: "P",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    
    color: "#199fa8",
    requires() {
        let req = new Decimal(25000)
        return req
    }, // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "upgrade points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){
        let visible = false
        if (hasUpgrade('p', 41) || player.r.unlocked) visible = true
       return visible
    },
    tabFormat: {
        "Main": {
            content: [
                ["display-text", "Prestige. The second layer. Has a upgrade tree to boost your production even more."],
                "main-display",
                "prestige-button",
                "blank",
				["upgrade-tree", [[11], [21]]]
            ]
        },
    },
    branches:["p"],
    upgrades: {
        11: {
            title: "Triple again",
            description: "×3 points.",
            cost: new Decimal(1),
        },
        21: {
            title: "Prestige booster",
            description: "Boost point gain based on prestige points.",
            cost: new Decimal(2),
	    branches: [11],
	    unlocked() { return (hasUpgrade('r', 11)) },
	    effect(){
                return player.p.points.add(2).pow(1.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
    },
})
