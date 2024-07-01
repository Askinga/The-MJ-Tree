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
	    for(v=2;v<3;v++){ //columns
                if ((hasUpgrade('w', 14)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
	    }
	    for(v=3;v<4;v++){ //columns
                if ((hasMilestone('m', 10)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
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
        if (hasUpgrade('b', 22)) return 10
	if (hasUpgrade('p', 21)) return 2
	if (hasUpgrade('b', 13)) return 0.1
        return 0
    },
    effect(){
    let rpow = 0.5
       if (hasMilestone('m', 5)) rpow = 0.6
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
    exponent() {
        let exp = 0.5
        if (hasUpgrade('b', 21)) exp = 0.525
        return exp
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        
        // mult
	
	mult = mult.times(buyableEffect('p', 11))
	if (hasUpgrade('p', 14)) mult = mult.times(2)
	mult = mult.times(layers.b.effect())
	if (hasUpgrade('b', 11)) mult = mult.times(3.5)
	if (hasUpgrade('b', 14)) mult = mult.times(upgradeEffect('b', 14))
	if (hasUpgrade('b', 15)) mult = mult.times(2.25)
	if (hasUpgrade('p', 22)) mult = mult.times(2.5)
	if (hasUpgrade('p', 24)) mult = mult.times(5)
	if (hasUpgrade('p', 25)) mult = mult.times(3)
	if (hasUpgrade('w', 12)) mult = mult.times(10)
	if (hasUpgrade('w', 21)) mult = mult.times(2.1)
	if (hasUpgrade('w', 24)) mult = mult.times(upgradeEffect('w', 24))
	if (hasUpgrade('b', 24)) mult = mult.times(4)
	if (hasUpgrade('p', 31)) mult = mult.times(5)
	if (hasUpgrade('p', 33)) mult = mult.times(2)
	if (hasMilestone('m', 1)) mult = mult.times(50)
	if (hasMilestone('m', 7)) mult = mult.times(1e8)
	if (hasMilestone('m', 9)) mult = mult.times(1e8)
	if (hasMilestone('m', 10)) mult = mult.times(1e6)
	if (hasMilestone('m', 11)) mult = mult.times(1e3)
	if (hasMilestone('m', 12)) mult = mult.times(1e6)
	if (hasMilestone('m', 13)) mult = mult.times(1e12)
	
	// pow
	
	if (hasUpgrade('w', 33)) mult = mult.pow(1.05)
	if (hasUpgrade('p', 34)) mult = mult.pow(1.04)
	if (hasMilestone('m', 4)) mult = mult.pow(1.005)
	if (hasMilestone('m', 5)) mult = mult.pow(1.035)
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
        22: {
            title: "MJ multi 3",
            description: "×2.5 MJs.",
            cost: new Decimal(5000000),
            unlocked() { return (hasUpgrade('p', 21)) },
	},
        23: {
            title: "Point multi 4",
            description: "×2.5 points.",
            cost: new Decimal(30000000),
            unlocked() { return (hasUpgrade('p', 22)) },
	},
        24: {
            title: "More Buses",
            description: "÷5 MJ Buses cost and ×5 MJs.",
            cost: new Decimal(100000000),
            unlocked() { return (hasUpgrade('p', 23)) },
	},
        25: {
            title: "New Layer",
            description: "Unlock a new layer and ×3 MJs.",
            cost: new Decimal(1e9),
            unlocked() { return (hasUpgrade('p', 24)) },
	},
        31: {
            title: "Boost",
            description: "×5 MJs.",
            cost: new Decimal(2.5e25),
            unlocked() { return (hasUpgrade('w', 35)) },
	},
        32: {
            title: "^",
            description: "^1.025 points.",
            cost: new Decimal(6e26),
            unlocked() { return (hasUpgrade('p', 31)) },
	},
        33: {
            title: "🧍 > 🧍🧍",
            description: "Clone your MJs, granting you ×2 more MJs.",
            cost: new Decimal(1e28),
            unlocked() { return (hasUpgrade('p', 32)) },
	},  
        34: {
            title: "Raise",
            description: "^1.04 MJs.",
            cost: new Decimal(1e29),
            unlocked() { return (hasUpgrade('p', 33)) },
	},  
        35: {
            title: "More layers",
            description: "Unlock a new layer.",
            cost: new Decimal(3e31),
            unlocked() { return (hasUpgrade('p', 34)) },
	},  
    },
    buyables: {
        11: {
        title: "MJ Compounder",
        unlocked() { return (hasMilestone('m', 2)) },
        cost(x) {
            let exp2 = 1.05
            return new Decimal(5e35).mul(Decimal.pow(1.2, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
        },
        display() {
            return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " MJs." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost MJ gain by x" + format(buyableEffect(this.layer, this.id))
        },
        canAfford() {
            return player[this.layer].points.gte(this.cost())
        },
        buy() {
            let cost = new Decimal (1)
            player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
            let base1 = new Decimal(1.15)
            let base2 = x
	    let expo = new Decimal(1.001)
            let eff = base1.pow(Decimal.pow(base2, expo))
            return eff
        },
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
	if (hasUpgrade('p', 24)) req = req.div(5)
	if (hasUpgrade('w', 21)) req = req.div(2500)
	if (hasUpgrade('b', 23)) req = req.div(3.14159)
	if (hasMilestone('m', 3)) req = req.div(1e10)
	return req
    }, // Can be a function that takes requirement increases into account
    resource: "MJ Buses", // Name of prestige currency
    baseResource: "MJs", // Name of resource prestige is based on
    doReset(b) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[b].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
        for(i=1;i<6;i++){ //rows
            for(v=1;v<2;v++){ //columns
              if ((hasUpgrade('w', 13)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
	    for(v=2;v<3;v++){ //columns
                if ((hasUpgrade('b', 25)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
	    }
	}
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
    
        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {
        let exp = 1.6
        if (hasUpgrade('w', 25)) exp = 1.45
        return exp
    }, // Prestige currency exponent
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
    canBuyMax() { return true },
    autoPrestige() { return hasUpgrade('w', 15) },
    resetsNothing() { return hasUpgrade('w', 15) },
    layerShown(){
        let visible = false
        if (hasUpgrade('p', 15) || player.b.unlocked) visible = true
       return visible
    },
    branches:["p"],
    effect(){
    let apow = 0.45
    if (hasUpgrade('w', 22)) apow = 1
    if (hasMilestone('m', 3)) apow = 2
	let eff = player.b.points.add(1).pow(apow)
       return eff
        },
        effectDescription() {
            let desc = "multiplying MJ and point gain by " + format(tmp[this.layer].effect);
            return desc;
        },
    upgrades: {
        11: {
            title: "MJ multi 2",
            description: "×3.5 MJs.",
            cost: new Decimal(1),
        },
        12: {
            title: "Point multi 3",
            description: "×π points.",
            cost: new Decimal(3),
            unlocked() { return (hasUpgrade('b', 11)) },
	},
        13: {
            title: "QoL 1",
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
        21: {
            title: "Less Cost Scaling 2",
            description: "Reduce the cost scaling of MJs meaning you can get more",
            cost: new Decimal(18),
            unlocked() { return (hasUpgrade('w', 25)) || (hasUpgrade('b', 25)) },
	},
        22: {
            title: "Passive Buff 1",
            description: "×5 MJ generation",
            cost: new Decimal(19),
            unlocked() { return (hasUpgrade('b', 21)) },
	},
        23: {
            title: "World multi 2",
            description: "×π MJ Worlds and ÷π MJ Buses cost",
            cost: new Decimal(20),
            unlocked() { return (hasUpgrade('b', 22)) },
	},
        24: {
            title: "Point Raiser 1",
            description: "^1.03 points and ×4 MJs.",
            cost: new Decimal(21),
            unlocked() { return (hasUpgrade('b', 23)) },
	},
        25: {
            title: "Keeping 4",
            description: "Keep this row of MJ Buses upgrades and unlock a new row of MJ Worlds upgrades!.",
            cost: new Decimal(22),
            unlocked() { return (hasUpgrade('b', 24)) },
	}, 
    },
})

addLayer("w", {
    name: "MJ Worlds",
    symbol: "🌍",
    position: 0,
    doReset(w) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[w].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
        for(i=1;i<6;i++){ //rows
            for(v=1;v<4;v++){ //columns
              if ((hasMilestone('m', 10)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
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
    color: "#5a6ffa",
    requires() {
        let req = new Decimal(8116034000)
	return req
    }, // Can be a function that takes requirement increases into account
    resource: "MJ Worlds", // Name of prestige currency
    baseResource: "MJs", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	
	// mult    

	mult = mult.times(buyableEffect('w', 11))
	if (hasUpgrade('w', 23)) mult = mult.times(3)
	if (hasUpgrade('b', 23)) mult = mult.times(3.14159)
	if (hasUpgrade('w', 31)) mult = mult.times(2)
	if (hasUpgrade('w', 31)) mult = mult.times(upgradeEffect('w', 31))
	if (hasMilestone('m', 9)) mult = mult.times(1000000)
	if (hasMilestone('m', 12)) mult = mult.times(10)
	
	// power
	
	 if (hasMilestone('m', 9)) mult = mult.pow(1.2)   
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Reset for MJ Worlds", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    resetDescription: 'Reset previous progress for ',
    layerShown(){
        let visible = false
        if (hasUpgrade('p', 25) || player.w.unlocked) visible = true
       return visible
    },
    branches:["b"],
    upgrades: {
        11: {
            title: "Point multi 5",
            description: "×10 points.",
            cost: new Decimal(1),
        },
        12: {
            title: "MJ multi 4",
            description: "×10 MJs.",
            cost: new Decimal(2),
            unlocked() { return (hasUpgrade('w', 11)) }, 
	},
        13: {
            title: "Keeping 2",
            description: "Keep Row 1 MJ Buses Upgrades.",
            cost: new Decimal(4),
            unlocked() { return (hasUpgrade('w', 12)) }, 
	},
        14: {
            title: "Keeping 3",
            description: "Keep Row 2 MJ Upgrades.",
            cost: new Decimal(6),
            unlocked() { return (hasUpgrade('w', 13)) }, 
	},
        15: {
            title: "QoL 2",
            description: "You automatically get MJ Buses and they reset nothing.",
            cost: new Decimal(10),
            unlocked() { return (hasUpgrade('w', 14)) }, 
	},
        21: {
            title: "More Roads",
            description: "÷2500 MJ Buses cost and ×2.1 MJs.",
            cost: new Decimal(15),
            unlocked() { return (hasUpgrade('w', 15)) }, 
	}, 
        22: {
            title: "Bigger Buses",
            description: "MJ Buses effect is better.",
            cost: new Decimal(20),
            unlocked() { return (hasUpgrade('w', 21)) }, 
	},
        23: {
            title: "World multi 1",
            description: "×3 MJ Worlds.",
            cost: new Decimal(25),
            unlocked() { return (hasUpgrade('w', 22)) }, 
	},
        24: {
            title: "MJ Booster 2",
            description: "Multiply MJ gain based on MJ Worlds.",
            cost: new Decimal(75),
            effect(){
                return player.w.points.add(1).pow(0.6)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            unlocked() { return (hasUpgrade('w', 23)) },
	},
        25: {
            title: "Less Cost Scaling 1",
            description: "Reduce the MJ Buses cost scaling and unlock a new row of MJ Buses upgrades.",
            cost: new Decimal(250),
            unlocked() { return (hasUpgrade('w', 24)) }, 
	},
        31: {
            title: "World multi 3",
            description: "×2 MJ Worlds and multiply MJ World gain based on points.",
            cost: new Decimal(10000),
            unlocked() { return (hasUpgrade('b', 25)) && (hasUpgrade('w', 25)) }, 
	    effect(){
                return player.points.add(1).pow(0.00625)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
	},
        32: {
            title: "Point ^",
            description: "^1.02 points.",
            cost: new Decimal(30000),
            unlocked() { return (hasUpgrade('w', 31)) }, 
	},
        33: {
            title: "MJ ^",
            description: "^1.05 MJs.",
            cost: new Decimal(50000),
            unlocked() { return (hasUpgrade('w', 32)) }, 
	},
        34: {
            title: "Big point boost",
            description: "×50 points.",
            cost: new Decimal(100000),
            unlocked() { return (hasUpgrade('w', 33)) }, 
	},
        35: {
            title: "Layer 1 needs more upgrades!",
            description: "Unlock a new row of MJ upgrades!",
            cost: new Decimal(200000),
            unlocked() { return (hasUpgrade('w', 34)) }, 
	},
    },
    buyables: {
        11: {
        title: "MJ World Compounder",
        unlocked() { return (hasMilestone('m', 12)) },
        cost(x) {
            let exp2 = 1.085
            return new Decimal(1e85).mul(Decimal.pow(1.2, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
        },
        display() {
            return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " MJ Worlds." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost MJ World gain by x" + format(buyableEffect(this.layer, this.id))
        },
        canAfford() {
            return player[this.layer].points.gte(this.cost())
        },
        buy() {
            let cost = new Decimal (1)
            player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
            let base1 = new Decimal(1.3)
            let base2 = x
	    let expo = new Decimal(1.001)
            let eff = base1.pow(Decimal.pow(base2, expo))
            return eff
        },
    },
},
})

addLayer("🏆", {
    startData() { return {
        unlocked: true,
    }},
    color: "yellow",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    tabFormat: {
        "Achievements": {
            content: [
                "achievements",
                "blank",
                ],
        },
    },
    achievements: {
        rows: 25,
        cols: 6,
        11: {
            name: "Starting",
            done() { return player.p.points.gte(1) },
            tooltip: "Get 1 MJ.",	   
        },
        12: {
            name: "Buses",
            done() { return player.b.points.gte(1) },
            tooltip: "Get a MJ Bus.",	   
        },
        13: {
            name: "Keeping + New Row",
            done() { return (hasUpgrade('b', 15)) },
            tooltip: "Get MJ Bus upgrade 5.",	   
        },
        14: {
            name: "Overpopulated",
            done() { return player.p.points.gte(8116034000) },
            tooltip: "Get the amount of MJs to the current world population.",	   
        },
        15: {
            name: "Grinding for upgrades",
            done() { return (hasUpgrade('w', 15)) },
            tooltip: "Get MJ World upgrade 5.",	   
        },
        16: {
            name: "Waiting for upgrades",
            done() { return (hasUpgrade('w', 25)) },
            tooltip: "Get MJ World upgrade 10.",	   
        },
        21: {
            name: "Grinding for upgrades again",
            done() { return (hasUpgrade('b', 25)) },
            tooltip: "Get MJ Bus upgrade 10.",	   
	},
        22: {
            name: "More MJ Upgrades",
            done() { return (hasUpgrade('w', 35)) },
            tooltip: "Get MJ World upgrade 15.",	   
	},
        23: {
            name: "Skill Mastery!",
            done() { return player.m.points.gte(1) },
            tooltip: "Get a Skill Mastered.",	   
	},
        24: {
            name: "Googol",
            done() { return player.points.gte(1e100) },
            tooltip: "Get 1e100 Points.",	   
	},
        25: {
            name: "e500",
            done() { return player.points.gte("e500") },
            tooltip: "Get e500 Points. Reward: ×1e15 Points.",	   
	},
    },
})

addLayer("m", {
    name: "Skill Mastery",
    symbol: "🌟",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#e8a71c",
    requires() {
        let req = new Decimal(1e33)
	return req
    }, // Can be a function that takes requirement increases into account
    resource: "mastered skills", // Name of prestige currency
    baseResource: "MJs", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2.825, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for mastered skills", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    resetDescription: 'Reset previous progress for ',
    layerShown(){
        let visible = false
        if (hasUpgrade('p', 35) || player.m.unlocked) visible = true
       return visible
    },
    branches:["w"],
    milestones: {
        0: {
            requirementDescription: "1 mastered skill",
            effectDescription: "Master points, giving you ×100 and ^1.02 more points.",
            done() { return player.m.points >= (1) }
        },
        1: {
            requirementDescription: "2 mastered skills",
            effectDescription: "Master MJs, giving you ×50 more MJs.",
            done() { return player.m.points >= (2) },
            unlocked() { return (hasMilestone('m', 0)) }
	},
        2: {
            requirementDescription: "3 mastered skills",
            effectDescription: "You unlock a buyable in MJ layer.",
            done() { return player.m.points >= (3) },
            unlocked() { return (hasMilestone('m', 1)) }
	},
        3: {
            requirementDescription: "4 mastered skills",
            effectDescription: "Master MJ Buses, giving you ÷1e10 MJ Buses cost and the MJ Buses effect is better.",
            done() { return player.m.points >= (4) },
            unlocked() { return (hasMilestone('m', 2)) }
	},
        4: {
            requirementDescription: "5 mastered skills",
            effectDescription: "^1.1 points and ^1.005 MJs.",
            done() { return player.m.points >= (5) },
            unlocked() { return (hasMilestone('m', 3)) }
	},
        5: {
            requirementDescription: "6 mastered skills",
            effectDescription: "Boost the MJ effect and ^1.035 MJs.",
            done() { return player.m.points >= (6) },
            unlocked() { return (hasMilestone('m', 4)) }
	},
        6: {
            requirementDescription: "7 mastered skills",
            effectDescription: "×1e10 points!",
            done() { return player.m.points >= (7) },
            unlocked() { return (hasMilestone('m', 5)) }
	},
        7: {
            requirementDescription: "8 mastered skills",
            effectDescription: "×1e8 MJs.",
            done() { return player.m.points >= (8) },
            unlocked() { return (hasMilestone('m', 6)) }
	},
        8: {
            requirementDescription: "9 mastered skills",
            effectDescription: "^1.15 points.",
            done() { return player.m.points >= (9) },
            unlocked() { return (hasMilestone('m', 7)) }
	},
        9: {
            requirementDescription: "10 mastered skills",
            effectDescription: "Master MJ Worlds, giving you ^1.2 MJ Worlds, ×1M MJ Worlds and ×1e8 MJs again.",
            done() { return player.m.points >= (10) },
            unlocked() { return (hasMilestone('m', 8)) }
	},
        10: {
            requirementDescription: "11 mastered skills",
            effectDescription: "Keep Row 3 MJ upgrades, the first 15 MJ World upgrades and ×1e6 MJs.",
            done() { return player.m.points >= (11) },
            unlocked() { return (hasMilestone('m', 9)) }
	},
        11: {
            requirementDescription: "12 mastered skills",
            effectDescription: "×1e20 points and ×1e3 MJs.",
            done() { return player.m.points >= (12) },
            unlocked() { return (hasMilestone('m', 10)) }
	},
        12: {
            requirementDescription: "13 mastered skills",
            effectDescription: "Unlock a buyable in MJ World layer, ×10 MJ Worlds and ×1e6 MJs.",
            done() { return player.m.points >= (13) },
            unlocked() { return (hasMilestone('m', 11)) }
	},
        13: {
            requirementDescription: "14 mastered skills",
            effectDescription: "×1T MJs and ^1.02 points.",
            done() { return player.m.points >= (14) },
            unlocked() { return (hasMilestone('m', 12)) }
	},
        14: {
            requirementDescription: "15 mastered skills",
            effectDescription: "Unlock a new layer.",
            done() { return player.m.points >= (15) },
            unlocked() { return (hasMilestone('m', 13)) }
	},
    },
})

addLayer("u", {
    name: "MJ Universes",
    symbol: "U",
    position: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#96ffff",
    requires() {
        let req = new Decimal("e572")
	return req
    }, // Can be a function that takes requirement increases into account
    resource: "MJ Universes", // Name of prestige currency
    baseResource: "MJs", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.05, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset for MJ Universes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    resetDescription: 'Reset previous progress for ',
    layerShown(){
        let visible = false
        if (hasMilestone('m', 14) || player.u.unlocked) visible = true
       return visible
    },
    branches:["w"]
})
