// Tip: 11 means Column 1, Row 1 for upgrades, milestones, etc
addLayer("p", {
    name: "MJ", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🧍", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    doReset(p) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[p].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
        for(i=1;i<6;i++){ //rows
            for(v=1;v<2;v++){ //columns
              if ((hasUpgrade('b', 15)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
	}
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
    
        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ffffff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "MJs", // Name of prestige currency
    passiveGeneration() {
        if (hasUpgrade('p', 21)) return 2
	if (hasUpgrade('b', 13)) return 0.1
        return 0
    },
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
	mult = mult.times(layers.b.effect())
	if (hasUpgrade('b', 11)) mult = mult.times(3.5)
	if (hasUpgrade('b', 14)) mult = mult.times(upgradeEffect('b', 14))
	if (hasUpgrade('b', 15)) mult = mult.times(2.25)
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
            title: "Point multi 1",
            description: "×1.5 points.",
            cost: new Decimal(3),
        },
        12: {
            title: "Point Base Improver 1",
            description: "Add to base point gain based on points.",
            cost: new Decimal(9),
            effect(){
                return player.points.pow(0.2)
            },
            effectDisplay() { return "+" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            unlocked() { return (hasUpgrade('p', 11)) },
	},
        13: {
            title: "MJ Multiplier to Points 1",
            description: "Multiply point gain based on MJs.",
            cost: new Decimal(14),
            effect(){
                return player.p.points.add(1).pow(0.15)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            unlocked() { return (hasUpgrade('p', 12)) },
	},
        14: {
            title: "MJ multi 1",
            description: "×2 MJs.",
            cost: new Decimal(25),
            unlocked() { return (hasUpgrade('p', 13)) },
	},
        15: {
            title: "Point multi 2",
            description: "×2 points and unlock a new layer.",
            cost: new Decimal(50),
            unlocked() { return (hasUpgrade('p', 14)) },
	}, 
        21: {
            title: "Row 2!",
            description: "÷4 MJ Buses cost and get 200% of MJ gain per second!.",
            cost: new Decimal(30000),
            unlocked() { return (hasUpgrade('b', 15)) },
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
        if (hasUpgrade('p', 21)) req = req.div(4)
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
    branches:["p"],
    effect(){
    let apow = 0.825
	let eff = player.b.points.add(1).pow(apow)
       return eff
        },
        effectDescription() {
            let desc = "multiplying MJ and point gain by " + format(tmp[this.layer].effect);
            return desc;
        },
    upgrades: {
        11: {
            title: "Buses!",
            description: "×3.5 MJs.",
            cost: new Decimal(1),
        },
        12: {
            title: "Pi Point Multi 1",
            description: "×π points.",
            cost: new Decimal(3),
            unlocked() { return (hasUpgrade('b', 11)) },
	},
        13: {
            title: "Passive Gain 1",
            description: "Get 10% of MJ gain per second.",
            cost: new Decimal(4),
            unlocked() { return (hasUpgrade('b', 12)) },
	},
        14: {
            title: "MJ Booster 1",
            description: "Multiply MJ gain based on MJs.",
            cost: new Decimal(4),
            effect(){
                return player.p.points.add(1).pow(0.075)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            unlocked() { return (hasUpgrade('b', 13)) },
	},
        15: {
            title: "Keeping 1",
            description: "Keep Row 1 MJ upgrades and unlock a new row of MJ upgrades! And also ×2.25 MJs",
            cost: new Decimal(4),
            unlocked() { return (hasUpgrade('b', 14)) },
	},
    },
})
