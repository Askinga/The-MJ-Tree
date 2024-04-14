addLayer("p", {
    name: "MJ points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MJ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#05199c",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "MJ points", // Name of prestige currency
    baseResource: "MJs", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    passiveGeneration() {
        if (hasMilestone('S', 0)) return 1
        if (hasMilestone('C', 0)) return 1
	return 0
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('S', 11)) mult = mult.times(10)
	if (hasUpgrade('S', 12)) mult = mult.times(upgradeEffect('S', 12))
        if (hasUpgrade('S', 13)) mult = mult.times(upgradeEffect('S', 13))
	if (hasUpgrade('S', 23)) mult = mult.pow(1.08)
        if (hasUpgrade('L', 13)) mult = mult.times(1000)
	if (inChallenge('S', 11)) mult = mult.pow(0.3)
	if (hasChallenge('S', 11)) mult = mult.pow(1.1)
	if (inChallenge('G', 11)) mult = mult.pow(0.8)
	if (inChallenge('H', 11)) mult = mult.pow(0.5)
	if (hasUpgrade('G', 11)) mult = mult.times(1000)
	if (hasUpgrade('H', 11)) mult = mult.times(1e20)
	if (hasUpgrade('L', 35)) mult = mult.times(1e25)
	if (hasUpgrade('L', 42)) mult = mult.pow(1.011)
	return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
	return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for MJ points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    upgrades: {
        11: {
            title: "MJ Doubler",
            description: "Double your MJ gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "MJ Boost",
            description: "Multiply MJ gain based on MJ points.",
            cost: new Decimal(4),
            effect(){
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "MJs boost MJs",
            description: "MJ gain is boosted by MJs.",
            cost: new Decimal(18),
            effect(){
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
	21: {
            title: "MJ Swarm",
            description: "×10 MJ gain.",
            cost: new Decimal(150),
	},
	22: {
            title: "MJ Boost but nerfed",
            description: "Multiply MJ gain based on MJ points with a reduced effect.",
            cost: new Decimal(13000),
            effect(){
                return player[this.layer].points.add(1).pow(0.33)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        23: {
            title: "Last upgrade until the next layer!",
            description: "×1000 MJ gain.",
            cost: new Decimal(550000000),
	},
    },
    milestones: {
        0: {
            requirementDescription: "40 MJ Points",
            effectDescription: "Multiply MJ gain by 4.",
            done() { return player.p.points >= (40) }
        },
        1: {
            requirementDescription: "1,000 MJ Points",
            effectDescription: "Multiply MJ gain by 15.",
            done() { return player.p.points >= (1000) }
        },
        2: {
            requirementDescription: "1,000,000 MJ Points",
            effectDescription: "Multiply MJ gain by 250.",
            done() { return player.p.points >= (1000000) }
        },
    },
})

addLayer("S", {
    name: "Super MJ Points",
    symbol: "SMJ",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#0ec466",
    requires: new Decimal(1e11), // Can be a function that takes requirement increases into account
    resource: "Super MJ Points", // Name of prestige currency
    baseResource: "MJ Points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1425, // Prestige currency exponent
    passiveGeneration() {
        if (hasUpgrade('S', 15)) return 0.075
        if (hasUpgrade('L', 15)) return 1
	return 0
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('S', 21)) mult = mult.times(10)
	if (hasUpgrade('S', 22)) mult = mult.times(upgradeEffect('S', 22))
	if (hasMilestone('S', 1)) mult = mult.times(10)
	if (hasMilestone('S', 2)) mult = mult.times(20)
	if (inChallenge('G', 11)) mult = mult.pow(0.8)
	if (inChallenge('H', 11)) mult = mult.pow(0.5)
	if (hasChallenge('G', 11)) mult = mult.pow(1.05)
	if (hasUpgrade('G', 11)) mult = mult.times(10)
	if (hasUpgrade('G', 13)) mult = mult.times(25)
	if (hasUpgrade('H', 11)) mult = mult.times(1e6)
	if (hasUpgrade('L', 34)) mult = mult.times(1e10)
	if (hasUpgrade('L', 43)) mult = mult.pow(1.012)
	if (hasUpgrade('L', 55)) mult = mult.times(upgradeEffect('L', 55))
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "S", description: "S: Reset for Super MJ Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    layerShown(){return true},
    branches:["p"],
	
    upgrades: {
        11: {
            title: "SUPER MJ?",
            description: "×10 MJ & MJ Point Gain.",
            cost: new Decimal(1),
	},
        12: {
            title: "You need more MJs? Then here you go!",
            description: "Multiply MJ Point gain based on MJs.",
            cost: new Decimal(3),
            effect(){
                return player.points.add(1).pow(0.08)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
        13: { 
	    title: "Super MJ Boost",
            description: "Multiply MJ Point gain based on Super MJ points.",
            cost: new Decimal(10),
            effect(){
                return player[this.layer].points.add(2).pow(1.33)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: { 
	    title: "YEEEEEES!!!",
            description: "^1.05 MJ Gain.",
            cost: new Decimal(250),
	},
        15: { 
	    title: "Passive Generation",
            description: "Gain 7.5% of Super MJ Points per second.",
            cost: new Decimal(2000),
	},
        21: { 
	    title: "BIG BOOST",
            description: "×10 Super MJ Point Gain.",
            cost: new Decimal(250000),
	},
        22: {
            title: "BIG LAYER 2 BOOST!",
            description: "Multiply Super MJ Point gain based on MJs.",
            cost: new Decimal(2.5e7),
            effect(){
                return player.points.add(1).pow(0.035)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
        23: {
            title: "Almost as strong as the challenge",
            description: "^1.08 MJ Point gain.",
            cost: new Decimal(1e12),
	},
    },
    milestones: {
        0: {
            requirementDescription: "100 Super MJ Points",
            effectDescription: "Passively gain 100% of MJ Points per second!",
            done() { return player.S.points >= (100) }
        },
        1: {
            requirementDescription: "10000 Super MJ Points",
            effectDescription: "×10 Super MJ Point gain",
            done() { return player.S.points >= (10000) }
        },
        2: {
            requirementDescription: "2e14 Super MJ Points",
            effectDescription: "×20 Super MJ Point gain",
            done() { return player.S.points >= (2e14) }
        },
    },
    challenges: {
        11: {
            name: "Super MJ Challenge",
            challengeDescription: "^0.3 MJ Points",
            canComplete: function() {return player.points.gte("1e29")},
            goalDescription: "Get e29 MJs.",
            rewardDescription: "^1.1 MJ Points"
        },
    },
})

addLayer("C", {
    name: "Scaler MJs",
    symbol: "SC",
    position: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#9c5005",
    requires: new Decimal(1e130), // Can be a function that takes requirement increases into account
    resource: "Scaler MJs", // Name of prestige currency
    baseResource: "Super MJ Points", // Name of resource prestige is based on
    baseAmount() {return player.S.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2.15, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row
    displayRow: 1,
    hotkeys: [
        {key: "A", description: "A: Reset for Scaler MJs", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    layerShown(){return true},
    branches:["S"],

    upgrades: {
        11: {
            title: "Scaler Boost",
            description: "Multiply Giga MJ Point gain based on Scaler MJs.",
            cost: new Decimal(1),
	    effect(){
                return player.C.points.add(2).pow(1.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
        12: {
            title: "MJ Click Boost",
            description: "Multiply MJ Click gain based on Scaler MJs.",
            cost: new Decimal(42),
	    effect(){
                return player.C.points.add(2).pow(0.9)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
    },
    milestones: {
        0: {
            requirementDescription: "3 Scaler MJs",
            effectDescription: "Passively gain 100% of MJ Points per second regardless of the first Super MJ Milestone!",
            done() { return player.C.points >= (3) }
	},
        1: {
            requirementDescription: "35 Scaler MJs",
            effectDescription: "×10 Hyper MJ Points!",
            done() { return player.C.points >= (35) }
	},
    },
})

addLayer("G", {
    name: "Giga MJ Points",
    symbol: "GMJ",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#fcd303",
    requires: new Decimal(1e21), // Can be a function that takes requirement increases into account
    resource: "Giga MJ Points", // Name of prestige currency
    baseResource: "Super MJ Points", // Name of resource prestige is based on
    baseAmount() {return player.S.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.115, // Prestige currency exponent
    passiveGeneration() {
        if (hasUpgrade('L', 15)) return 0.25
        return 0
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('G', 13)) mult = mult.times(5)
	if (hasUpgrade('C', 11)) mult = mult.times(upgradeEffect('C', 11))
	if (hasUpgrade('H', 11)) mult = mult.times(1000)
	if (inChallenge('H', 11)) mult = mult.pow(0.5)
	if (hasChallenge('H', 11)) mult = mult.pow(1.1)
	if (hasUpgrade('L', 44)) mult = mult.pow(1.013)
	if (hasUpgrade('L', 32)) mult = mult.times(1e6)
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "G", description: "G: Reset for Giga MJ Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    layerShown(){return true},
    branches: ["S", "C"],

    upgrades: {
        11: {
            title: "This is OP!?",
            description: "×1M MJs, ×1000 MJ Points and ×10 Super MJ Points.",
            cost: new Decimal(1),
	},
        12: {
            title: "MJs boost MJs but nerfed",
            description: "MJ gain is boosted by MJs but nerfed.",
            cost: new Decimal(50),
            effect(){
                return player.points.add(1).pow(0.08)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
        13: {
	title: "Double Layer Boost",
            description: "×5 Giga MJ Points and ×25 Super MJ Points.",
            cost: new Decimal(350),
	},
        14: {
            title: "Super MJs boost Super MJs",
            description: "Multiply Super MJ Point gain based on Super MJ Points.",
            cost: new Decimal(2e16),
	    effect(){
                return player.S.points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
    },
    challenges: {
        11: {
            name: "Exponential Downgrade",
            challengeDescription: "^0.8 all layers except Scaler MJs and this layer.",
            canComplete: function() {return player.points.gte("1e100")},
            goalDescription: "Get e100 MJs.",
            rewardDescription: "^1.05 Super MJ Points"
	},
    },
})

addLayer("H", {
    name: "Hyper MJ Points",
    symbol: "HMJ",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#151b24",
    requires: new Decimal(4e17), // Can be a function that takes requirement increases into account
    resource: "Hyper MJ Points", // Name of prestige currency
    baseResource: "Giga MJ Points", // Name of resource prestige is based on
    baseAmount() {return player.G.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.045, // Prestige currency exponent
    passiveGeneration() {
        if (hasUpgrade('L', 15)) return 0.1
        return 0
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasMilestone('C', 1)) mult = mult.times(10)
	if (hasUpgrade('L', 13)) mult = mult.times(3)
	if (hasUpgrade('L', 22)) mult = mult.times(upgradeEffect('L', 22))
	if (hasUpgrade('L', 32)) mult = mult.times(20)
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "H", description: "H: Reset for Hyper MJ Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    layerShown(){return true},
    branches: ["G", "C"],
 
    upgrades: {
        11: {
            title: "Hyper MJs are SUPER OP!!!!!!!!",
            description: "×1e50 MJs, ×1e20 MJ Points, ×1e6 Super MJ Points and ×1000 Giga MJ Points.",
            cost: new Decimal(1),
	},
        12: {
            title: "Important for the challenge",
            description: "×1e10 MJs.",
            cost: new Decimal(1000),
	}
    },
    challenges: {
        11: {
            name: "The hardest challenge in this game",
            challengeDescription: "^0.5 all layers except this layer.",
            canComplete: function() {return player.points.gte("1e500")},
            goalDescription: "Get e500 MJs.",
            rewardDescription: "^1.1 Giga MJ Points"
	},
    },
})

addLayer("L", {
    name: "MJ Clicks",
    symbol: "CLI",
    position: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#911f82",
    requires: new Decimal(10000), // Can be a function that takes requirement increases into account
    resource: "MJ Clicks", // Name of prestige currency
    baseResource: "Hyper MJ Points", // Name of resource prestige is based on
    baseAmount() {return player.H.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.08, // Prestige currency exponent
    passiveGeneration() {
        if (hasUpgrade('L', 54)) return 100
	if (hasUpgrade('L', 23)) return 3
	return 0
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('L', 11)) mult = mult.times(3)
	if (hasUpgrade('L', 12)) mult = mult.times(4)
	if (hasUpgrade('L', 13)) mult = mult.times(5)
	if (hasUpgrade('L', 14)) mult = mult.times(upgradeEffect('L', 14))
	if (hasMilestone('L', 0)) mult = mult.times(10)
	if (hasUpgrade('L', 21)) mult = mult.times(4)
        if (hasUpgrade('L', 24)) mult = mult.times(5)
	if (hasMilestone('L', 1)) mult = mult.times(10)
	if (hasMilestone('L', 2)) mult = mult.times(7.5)
	if (hasUpgrade('L', 31)) mult = mult.times(1.5)
	if (hasUpgrade('C', 12)) mult = mult.times(upgradeEffect('C', 12))
	if (hasUpgrade('L', 45)) mult = mult.pow(1.5)
	if (hasUpgrade('L', 51)) mult = mult.times(100)
	if (hasUpgrade('L', 52)) mult = mult.times(1000)
	if (hasUpgrade('L', 53)) mult = mult.times(1e5)
	if (hasUpgrade('L', 55)) mult = mult.times(1e6)
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "C", description: "C: Reset for MJ Clicks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    layerShown(){return true},
    branches: ["H", "G"],

    upgrades: {
        11: {
            title: "Clicker in The Modding Tree?",
            description: "×3 MJ Clicks.",
            cost: new Decimal(20),
	},
        12: {
            title: " Clicking Boost",
            description: "×4 MJ Clicks.",
            cost: new Decimal(100),
	},
        13: {
            title: "boost boost boost",
            description: "×5 MJ Clicks, ×3 Hyper MJ Points and ×1000 MJ Points.",
            cost: new Decimal(500),
	},
        14: {
            title: "MOAR CLICKS!",
            description: "Multiply MJ Click gain based on MJ Clicks.",
            cost: new Decimal(10000),
            effect(){
                return player.L.points.add(1).pow(0.225)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
        15: {
            title: "SUPER OP UPGRADE!!",
            description: "Passivley gain 10% of Hyper MJ Point gain per second, 25% of Giga MJ Points per second and 100% of Super MJ Points per second!.",
            cost: new Decimal(5e6),
	},
        21: {
            title: "Click boost!",
            description: "×4 MJ Clicks.",
            cost: new Decimal(6e6),
	},
        22: {
            title: "Even MORE CLICKS!",
            description: "Multiply Hyper MJ Point gain based on MJ Clicks.",
            cost: new Decimal(2e7),
            effect(){
                return player.L.points.add(1).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
        23: {
            title: "PASSIVE CLICKS",
            description: "Passively gain 300% of MJ Clicks per second!.",
            cost: new Decimal(3e8),
	},
        24: {
            title: "More click boosts!",
            description: "×5 MJ Clicks.",
            cost: new Decimal(4e8),
	},
        25: {
            title: "Milestone!!",
            description: "Get a milestone.",
            cost: new Decimal(3e9),
	},
	31: {
            title: "Little click boost",
            description: "×1.5 MJ Clicks.",
            cost: new Decimal(1e11),
	},
        32: {
            title: "Hyper Boost",
            description: "×20 Hyper MJ Points.",
            cost: new Decimal(2e11),
	},
        33: {
            title: "Giga Boost",
            description: "×1e6 Giga MJ Points.",
            cost: new Decimal(3e11),
	},
        34: {
            title: "Super Boost",
            description: "×1e10 Super MJ Points.",
            cost: new Decimal(5e11),
	},
        35: {
            title: "Normal Boost",
            description: "×1e25 MJ Points.",
            cost: new Decimal(7e11),
	},
        41: {
            title: "The POWER row!!!",
            description: "^1.01 MJs.",
            cost: new Decimal(1e14),
	},
        42: {
            title: "Power 2",
            description: "^1.011 MJ Points.",
            cost: new Decimal(1.5e14),
	},
        43: {
            title: "Power 3",
            description: "^1.012 Super MJ Points.",
            cost: new Decimal(2e14),
	},
        44: {
            title: "Power 4",
            description: "^1.013 Giga MJ Points.",
            cost: new Decimal(2.5e14),
	}, 
        45: {
            title: "SUPER OP!!!",
            description: "^1.5 MJ Clicks.",
            cost: new Decimal(3e14),
	},
        51: {
            title: "Big click boost! Click row",
            description: "×100 MJ Clicks.",
            cost: new Decimal(2e22),
	},
        52: {
            title: "The click row is op!",
            description: "×1000 MJ Clicks.",
            cost: new Decimal(4e25),
	},
        53: {
            title: "Huge click boost",
            description: "×1e5 MJ Clicks.",
            cost: new Decimal(8e29),
	},
        54: {
            title: "More passive gain",
            description: "Now gain 10000% of MJ Click gain per second.",
            cost: new Decimal(5e35),
	},
        55: {
            title: "The last upgrade is this layer",
            description: "×1e6 MJ Clicks and boost Super MJ Point gain based on MJ Clicks.",
            cost: new Decimal(3e37),
	    effect(){
                return player.L.points.add(1).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
    },
    milestones: {
        0: {
            requirementDescription: "2e5 MJ Clicks",
            effectDescription: "×10 MJ Clicks",
            done() { return player.L.points >= (200000) }
        },
        1: {
            requirementDescription: "3e6 MJ Clicks",
            effectDescription: "×6 MJ Clicks",
            done() { return player.L.points >= (3e6) }
        },
        2: {
            requirementDescription: "Upgrade 25",
            effectDescription: "×7.5 MJ Clicks",
            done() { return (hasUpgrade('L', 25)) }
        },
    },
})

addLayer("a", {
    startData() { return {
        unlocked: true,
    }},
    color: "yellow",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    
    achievements: {
        rows: 25,
        cols: 6,
        11: {
            name: "Double!",
            done() { return (hasUpgrade('p', 11)) },
            tooltip: "Get MJ Upgrade 11.",	   
        },
        12: {
            name: "MJ Boost!",
            done() { return (hasUpgrade('p', 12)) },
            tooltip: "Get MJ Upgrade 12.",	   
        },
        13: {
            name: "MJ boosts MJs!!",
            done() { return (hasUpgrade('p', 13)) },
            tooltip: "Get MJ Upgrade 13.",	   
        },
        14: {
            name: "Swarm of MJs",
            done() { return (hasUpgrade('p', 21)) },
            tooltip: "Get MJ Upgrade 21.",	   
        },
        15: {
            name: "The same as MJ upgrade 12 but nerfed",
            done() { return (hasUpgrade('p', 22)) },
            tooltip: "Get MJ Upgrade 22.",	   
        },
        16: {
            name: "About to reset",
            done() { return (hasUpgrade('p', 23)) },
            tooltip: "Get MJ Upgrade 23.",	   
        },
        21: {
            name: "SUPER MJ!",
            done() { return (hasUpgrade('S', 11)) },
            tooltip: "Get Super MJ Upgrade 11.",
        },
        22: {
            name: "MJs boost MJ Points",
            done() { return (hasUpgrade('S', 12)) },
            tooltip: "Get Super MJ Upgrade 12.",	   
        },
},
})
