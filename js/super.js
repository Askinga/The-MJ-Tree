addLayer("s", {
    name: "super runes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
	doReset(s) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[s].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
        
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
	    if (hasMilestone('l', 1)) keep.push("milestones");
    
        // Stage 4, do the actual data resetautomate() {
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },
	passiveGeneration(){
		let p = new Decimal(0)
		if (hasUpgrade('b', 13) || hasMilestone('m', 1)) p = p.add(0.01)
		return p
	},
	autoUpgrade(){ return hasMilestone('m', 2) },
    color: "#dea8ff",
    requires: new Decimal(10000), // Can be a function that takes requirement increases into account
    resource: "Super Runes", // Name of prestige currency
    baseResource: "Prestige Points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.075, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (player.d.difficulty.eq(0)) mult = mult.times(2)
        if (player.d.difficulty.eq(2)) mult = mult.times(0.5)
		if (hasUpgrade('s', 11)) mult = mult.times(4)
		if (hasUpgrade('s', 12)) mult = mult.times(2)
        mult = mult.times(tmp.b.mid)
		mult = mult.times(tmp.b.amazing)
		mult = mult.times(tmp.m.bonusEff1)
		if (hasMilestone('l', 1)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	softcap(){
		let softStart = new Decimal(1e25)
		return softStart
	},
	softcapPower(){
		let pow = new Decimal(0.5)
		return pow
	},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for super runes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	tabFormat: {
		"Upgrades": {
			content: [
				"main-display",
				"prestige-button",
				"resource-display",
				["display-text", "Softcap starts at 1e25 Super Runes"],
				"blank",
				"upgrades",
			],
		},
		"Milestones": {
			content: [
				"main-display",
				"prestige-button",
				"resource-display",
				"blank",
				"milestones",
			],
		},
	},
    layerShown(){return (hasUpgrade('p', 321) || player.s.unlocked)},
    branches: ["p"],
    effect(){ return player.s.points.add(1).pow(2) },
    effectDescription(){ return "which is boosting Points and Rune gain by x" + format(layers.s.effect()) },
	milestones: {
    0: {
        requirementDescription: "2 Super Runes",
        effectDescription: "Unlock Auto-Runes in Prestige Layer! Base cooldown: 2.5s",
        done() { return player.s.points.gte(2) }
	},
	1: {
        requirementDescription: "4 Super Runes",
        effectDescription: "You can buy both RST-12 and RST-13 and Auto Rune Cooldown -0.5s.",
        done() { return player.s.points.gte(4) }
	},
	2: {
        requirementDescription: "5 Super Runes",
        effectDescription: "RST-15s effect is kept on Super Rune resets.",
        done() { return player.s.points.gte(5) }
	},
	3: {
        requirementDescription: "7 Super Runes",
        effectDescription: "-0.5s Auto Rune Cooldown and unlock 1st Super Rune Upgrade.",
        done() { return player.s.points.gte(7) }
	},
	},
	upgrades: {
		11: {
			title: "A super rune always comes in handy",
			description: "x4 Super Runes, x6 Points, x3 Prestige Points and x4 Rune Gain.",
			cost: new Decimal(8),
			unlocked(){ return hasMilestone('s', 3) },
		},
		12: {
			title: "The runes will help you",
			description: "x2 Super Runes, x5 Rune Gain",
			cost: new Decimal(10),
			unlocked(){ return hasUpgrade('s', 11) },
		},
		13: {
			title: "Runic Prestige 2",
			description: "Boost prestige points based on super runes",
			cost: new Decimal(50),
			unlocked(){ return hasUpgrade('s', 12) },
			effect(){ 
				let eff = player.s.points.add(1).pow(1.25);
        		eff = softcap(eff, new Decimal("1e10"), 0.325)
       		 	return eff 
			},
			effectDisplay(){
				let s = ""
        		let upgEffect = upgradeEffect(this.layer, this.id)
        		if (upgEffect.gte(new Decimal("1e10")) ) {
          		  s = " (Softcapped)"
        		}
        		return "x" + format(upgradeEffect("s", 13)) + s;
			},
		},
		14: {
			title: "Hey, I think you need this",
			description: "25% Prestige Points per second, automate Prestige Upgrades and you can buy every upgrade in the Rune Skill Tree.<br>Hint: Use hotkeys P and S to get quickly. Don't be scared!",
			cost: new Decimal(500),
			unlocked(){ return hasUpgrade('s', 13) },
		},
		15: {
			title: "Rune Automation Automation",
			description: "Auto Runes always chooses Basic Rune and -0.5s Auto Rune Cooldown. Unlock a new layer.",
			cost: new Decimal(1000),
			unlocked(){ return hasUpgrade('s', 14) },
		},
	},
})
