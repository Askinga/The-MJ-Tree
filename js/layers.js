addLayer("p", {
    name: "MJ", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🧍", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ffffff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "MJs", // Name of prestige currency
    effect(){
    let rpow = 0.5
	let eff = player.p.points.pow(rpow)
       return eff
        },
        effectDescription() {
            let desc = "adding " + format(tmp[this.layer].effect) + " to base point gain.";
            return desc;
        },
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 14)) mult = mult.times(2)
	return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for MJs", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Point multi",
            description: "×1.5 points.",
            cost: new Decimal(5),
        },
        12: {
            title: "Point Base Improver",
            description: "Add to base point gain based on points.",
            cost: new Decimal(20),
            effect(){
                return player.points.pow(0.2)
            },
            effectDisplay() { return "+" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            unlocked() { return (hasUpgrade('p', 11)) },
	},
        13: {
            title: "MJ Multiplier to Points",
            description: "Multiply point gain based on MJs.",
            cost: new Decimal(30),
            effect(){
                return player.p.points.add(1).pow(0.15)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            unlocked() { return (hasUpgrade('p', 12)) },
	},
        14: {
            title: "MJ multi",
            description: "×2 MJs.",
            cost: new Decimal(50),
            unlocked() { return (hasUpgrade('p', 13)) },
	},
        15: {
            title: "Point multi 2",
            description: "×2 points and unlock a new layer.",
            cost: new Decimal(125),
            unlocked() { return (hasUpgrade('p', 14)) },
	}, 
    },
})

addLayer("b", {
    name: "MJ Buses",
    symbol: "🚌",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#caed1c",
    requires() {
        let req = new Decimal(200)
        return req
    }, // Can be a function that takes requirement increases into account
    resource: "MJ Buses", // Name of prestige currency
    baseResource: "MJs", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for MJ Buses", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    resetDescription: 'Reset MJ layer for ',
    layerShown(){
        let visible = false
        if (hasUpgrade('p', 15) || player.b.unlocked) visible = true
       return visible
    },
    branches:["p"]
})
