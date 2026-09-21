addLayer("tm", {
    name: "True Meta", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "TM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		tmpoints: new Decimal(0),
		lpow: new Decimal(0),
		tmPow: new Decimal(0),
		tmPowGain: new Decimal(0),
		total: new Decimal(0),
		tExpo: new Decimal(0),
		tExpoGain: new Decimal(0),
		autoTM: new Decimal(0),
		Ts: new Decimal(0),
		TsGain: new Decimal(0),
		STMP: new Decimal(0),
		tmpointGain: new Decimal(0),
		MTMP: new Decimal(0),
		STMPGain: new Decimal(1),
    }},
	onPrestige(){
	    player.tm.tmpoints = player.tm.tmpoints.add(player.tm.tmpointGain)
		if (hasUpgrade('tm', 91)) {
			if (new Decimal(Math.random()).lte(tmp.tm.STMPch)) {
				player.tm.STMP = player.tm.STMP.add(player.tm.STMPGain)
				if ((new Decimal(Math.random()).lte(tmp.tm.MTMPch)) && hasUpgrade('tm', 141)) {
					player.tm.MTMP = player.tm.MTMP.add(1)
				}
			}
		}
	},
	passiveGeneration(){
		let p = new Decimal(0)
		if (hasUpgrade('tm', 111)) p = new Decimal(0.001)
		if (hasUpgrade('tm', 113)) p = new Decimal(0.0025)
		if (hasUpgrade('tm', 123)) p = new Decimal(0.004)
		return p
	},
	autoPrestige(){ return player.tm.autoTM.eq(1) },
    color: "#ffffff",
    requires: new Decimal("eee100"), // Can be a function that takes requirement increases into account
    resource: "True Meta Runes", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		mult = mult.times(tmp.tm.tmPow)
		mult = mult.times(tmp.tm.STMP)
		mult = mult.times(buyableEffect('tm', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	tmPow() {
		return player.tm.tmPow.add(1).log10().add(1).pow(0.6)
	},
	tmPowBoost(){
		return new Decimal(tmp.tm.tmPowBase).pow(player.tm.total)
	},
	tmPowBase(){
		let add = new Decimal(0)
		if (hasUpgrade('tm', 52)) add = add.add(0.01)
		add = add.add(tmp.tm.Ts)
		return new Decimal(1.1).add(add)
	},
	tExpo() {
		return player.tm.tExpo.add(1).log10().pow(0.5).div(50).add(1)
	},
	tExpoBase(){
		let expo = new Decimal(1)
		if (hasUpgrade('tm', 62)) expo = expo.add(0.25)
		if (hasUpgrade('tm', 82)) expo = expo.add(upgradeEffect('tm', 82))
		return player.tm.tmPow.add(1).log10().add(1).pow(expo)
	},
	Ts(){
		return player.tm.Ts.add(1).log10().pow(0.2).div(100)
	},
	TsBase(){
		let pow = new Decimal(1)
		pow = pow.add(buyableEffect('tm', 12))
		return player.tm.tmPow.add(1).log10().pow(0.6).pow(pow).div(1000000)
	},
	Tsb1Base(){
		return player.tm.Ts.add(1).log10().pow(0.65).add(1)
	},
	Tsb2Base(){
		return player.tm.Ts.div("e8").add(1).log10().pow(0.087).div(3)
	},
	Tsb3Base(){
		return player.tm.Ts.div("e20").add(1).log10().pow(0.012).div(10).add(1)
	},
	STMP() {
		return player.tm.STMP.div(100).add(1)
	},
	STMPch(){
		let chance = new Decimal(0.04)
		if (hasUpgrade('tm', 101)) chance = chance.add(0.01)
		if (hasUpgrade('tm', 102)) chance = chance.add(upgradeEffect('tm', 102).div(100))
		if (hasUpgrade('tm', 122)) chance = chance.add(0.015)
		if (hasUpgrade('tm', 123)) chance = chance.add(0.02)
		return chance
	},
	MTMP() {
		return player.tm.MTMP.div(100).add(1)
	},
	MTMPch(){
		let chance = new Decimal(0.08)
		return chance
	},
    row: 7, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "T", description: "Shift+T: Reset for True Meta Runes (Uni. 1)", onPress(){if (canReset(this.layer) && !(inChallenge('universes', 11))) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('dr', 25) || player.tm.unlocked)},
   	branches: ["limit"],
    effect(){
	  let expo = tmp.tm.tExpo
      return (new Decimal(10).pow(player.tm.points)).pow(expo)
    },
    effectDescription(){
      return "which is boosting ALL Universe 1 currencies by x"+format(layers.tm.effect())
    },
	tabFormat: {
		"THE BIG RESET": {
			content: [
				"main-display",
				"prestige-button",
				"resource-display",
				"blank",
				["infobox", "true meta reset"],
			],
		},
		"QoL Tree": {
			content: [
				"main-display",
				"prestige-button",
				["display-text", function(){ return "You have " + format(player.tm.tmpoints) + " True Meta Points to spend (+" + format(player.tm.tmpointGain) + ")" }],
				"blank",
				["display-text", function(){ if (hasUpgrade('tm', 91)) return "You have " + format(player.tm.STMP) + " Super True Meta Points, boosting True Meta Runes and Points by x" + format(tmp.tm.STMP) + " (+" + format(tmp.tm.MTMP) + ")<br>You have a " + format(tmp.tm.STMPch.times(100)) + "% chance of getting a Super True Meta Point on reset."}],
				"blank",
				["display-text", function(){ if (hasUpgrade('tm', 141)) return "You have " + format(player.tm.MTMP) + " Mega True Meta Points, boosting Super True Meta Points by x" + format(tmp.tm.MTMP) + "<br>You have a " + format(tmp.tm.MTMPch.times(100)) + "% chance of getting a Mega True Meta Point every time you get a Super True Meta Point."}],
				"blank",
				"resource-display",
				"clickables",
				"blank",
				"upgrades",
			],
		},
		"True Meta Power": {
			unlocked() { return hasUpgrade('tm', 32) },
			content: [
				"main-display",
				"prestige-button",
				["display-text", function(){ return "You have " + format(player.tm.tmPow) + " True Meta Power (" + format(player.tm.tmPowGain) + "/sec), which is boosting True Meta Runes by x" + format(tmp.tm.tmPow) }],
				"blank",
				"resource-display",
				"blank",
				["display-text", function(){ return "Every True Meta Rune you get boosts True Meta Power by x" + format(tmp.tm.tmPowBase) + "! Currently: x" + format(tmp.tm.tmPowBoost) }],
			],
		},
		"True Exponential": {
			unlocked() { return hasUpgrade('tm', 51) },
			content: [
				"main-display",
				"prestige-button",
				["display-text", function(){ return "You have " + format(player.tm.tExpo) + " True Exponential (" + format(player.tm.tExpoGain) + "/sec), which is boosting True Meta Rune effect by ^" + format(tmp.tm.tExpo) }],
				"blank",
				"resource-display",
				"blank",
				["display-text", function(){ return "True Exponential gain is based on your True Meta Power!" }],
			],
		},
		"Ts": {
			unlocked() { return hasUpgrade('tm', 71) },
			content: [
				"main-display",
				"prestige-button",
				["display-text", function(){ return "You have " + format(player.tm.Ts) + " Ts (" + format(player.tm.TsGain) + "/sec), which is boosting True Meta Power base by +" + format(tmp.tm.Ts) }],
				"blank",
				"resource-display",
				"buyables",
				"blank",
				["display-text", function(){ return "Ts gain is also based on your True Meta Power." }],
			],
		},
	},
	infoboxes: {
        "true meta reset": {
            title: "Welcome to True Meta!",
            body() { return "Congratulations, you officially beat Rune Tree! This layers resets EVERYTHING just like a hard reset, but you will gain a x10 multiplier to EVERY resource! You will also gain a True Meta Point, which you can spend to get QoL upgrades! It's worth it! (You will also keep the Auto Runes because well, the first layer is SO GRINDY!!!!!)" },
        },
    }, 
	upgrades: {
		11: {
			title: "TM QoL 1",
			description: "Keep Extreme Rune milestones, keep Universal Rune Milestone 2s effect and automate the entire Limit layer. (some can be toggled)",
			cost: new Decimal(1),
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		21: {
			title: "TM QoL 2",
			description: "Keep Supreme Rune milestones",
			cost: new Decimal(1),
			unlocked(){ return hasUpgrade('tm', 11) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		22: {
			title: "TM QoL 3",
			description: "Automate the entire Ice layer.",
			cost: new Decimal(1),
			unlocked(){ return hasUpgrade('tm', 11) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		31: {
			title: "TM QoL 4",
			description: "Automate the entire Water layer and keep Log milestone 1.",
			cost: new Decimal(2),
			unlocked(){ return (hasUpgrade('tm', 21) && hasUpgrade('tm', 22)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		32: {
			title: "TM MixUp 1",
			description: "Start with 10 Limit Resets and unlock True Meta Power.",
			cost: new Decimal(2),
			unlocked(){ return (hasUpgrade('tm', 21) && hasUpgrade('tm', 22)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		41: {
			title: "TM QoL 5",
			description: "Start with 150 Limit Resets.",
			cost: new Decimal(5),
			unlocked(){ return (hasUpgrade('tm', 31) && hasUpgrade('tm', 32)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		42: {
			title: "TM QoL 7",
			description: "Power Rune automation is kept, buy max Strength Runes.",
			cost: new Decimal(5),
			unlocked(){ return (hasUpgrade('tm', 41) && hasUpgrade('tm', 43)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		43: {
			title: "TM QoL 6",
			description: "Automate the rest of the Limit layer.",
			cost: new Decimal(5),
			unlocked(){ return (hasUpgrade('tm', 41)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		51: {
			title: "TM Features 1",
			description: "Unlock True Exponential.",
			cost: new Decimal(30),
			unlocked(){ return (hasUpgrade('tm', 42)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		52: {
			title: "TM Upg 1",
			description: "True Meta Power base +0.01.",
			cost: new Decimal(50),
			unlocked(){ return (hasUpgrade('tm', 51)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		61: {
			title: "TM QoL 8",
			description: "Unlock Auto True Meta Runes.",
			cost: new Decimal(100),
			unlocked(){ return (hasUpgrade('tm', 52)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		62: {
			title: "TM Upg 2",
			description: "True Exponential base +^0.25.",
			cost: new Decimal(200),
			unlocked(){ return (hasUpgrade('tm', 52)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		71: {
			title: "TM Features 2",
			description: "Unlock Ts.",
			cost: new Decimal(300),
			unlocked(){ return (hasUpgrade('tm', 62)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		72: {
			title: "TM Upg 3",
			description: "Ts gain x5.",
			cost: new Decimal(200),
			unlocked(){ return (hasUpgrade('tm', 71)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		73: {
			title: "TM Upg 4",
			description: "Ts gain x3.",
			cost: new Decimal(250),
			unlocked(){ return (hasUpgrade('tm', 72)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		81: {
			title: "TM Unlocks 1",
			description: "Unlock a buyable.",
			cost: new Decimal("e9"),
			unlocked(){ return (hasUpgrade('tm', 73)) },
			currencyDisplayName: "Ts",
			currencyInternalName: "Ts",
			currencyLayer: "tm",
		},
		82: {
			title: "TM Upg 5",
			description: "Ts boosts True Exponential base.",
			cost: new Decimal(500),
			unlocked(){ return (hasUpgrade('tm', 81)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
			effect(){ return player.tm.Ts.add(1).log10().pow(0.33).div(15) },
			effectDisplay(){ return "+^"+format(upgradeEffect('tm', 82)) },
		},
		91: {
			title: "TM Features 3",
			description: "Unlock Super True Meta Points.",
			cost: new Decimal(1000),
			unlocked(){ return (hasUpgrade('tm', 82)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		101: {
			title: "TM Upg 6",
			description: "Increase chance of getting a Super True Meta Point by +1%.",
			cost: new Decimal(10),
			unlocked(){ return (hasUpgrade('tm', 81)) },
			currencyDisplayName: "Super True Meta Points",
			currencyInternalName: "STMP",
			currencyLayer: "tm",
		},
		102: {
			title: "TM Upg 7",
			description: "Increase chance of getting a Super True Meta Point based on True Meta Points.",
			cost: new Decimal(20),
			unlocked(){ return (hasUpgrade('tm', 81)) },
			currencyDisplayName: "Super True Meta Points",
			currencyInternalName: "STMP",
			currencyLayer: "tm",
			effect(){ return player.tm.tmpoints.add(1).log10().div(3) },
			effectDisplay(){ return "+"+format(upgradeEffect('tm', 102))+"%" },
		},
		111: {
			title: "TM Upg 8",
			description: "Unlock Passive True Meta Runes (0.1%).",
			cost: new Decimal(30),
			unlocked(){ return (hasUpgrade('tm', 102)) },
			currencyDisplayName: "Super True Meta Points",
			currencyInternalName: "STMP",
			currencyLayer: "tm",
		},
		112: {
			title: "TM Unlocks 2",
			description: "Unlock a buyable.",
			cost: new Decimal("e20"),
			unlocked(){ return (hasUpgrade('tm', 111)) },
			currencyDisplayName: "Ts",
			currencyInternalName: "Ts",
			currencyLayer: "tm",
		},
		113: {
			title: "TM Super Upg 1",
			description: "Passive True Meta Runes is now 0.25% and True Exponential boosts Ts.",
			cost: new Decimal(1000),
			unlocked(){ return (hasUpgrade('tm', 112)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
			effect(){ return player.tm.tExpo.add(1).pow(0.08) },
			effectDisplay(){ return "x"+format(upgradeEffect('tm', 113)) },
		},
		121: {
			title: "TM Upg 9",
			description: "Ts gain x10.",
			cost: new Decimal(750),
			unlocked(){ return (hasUpgrade('tm', 113)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		122: {
			title: "TM Upg 10",
			description: "Super True Meta Point chance +1.5%.",
			cost: new Decimal(700),
			unlocked(){ return (hasUpgrade('tm', 121)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		123: {
			title: "TM Super Upg 2",
			description: "Passive True Meta Runes is now 0.4% and Super True Meta Point chance +2%.",
			cost: new Decimal(1000),
			unlocked(){ return (hasUpgrade('tm', 122)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		131: {
			title: "TM Upg 11",
			description: "Ts boosts itself.",
			cost: new Decimal(800),
			unlocked(){ return (hasUpgrade('tm', 123)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
			effect(){ return player.tm.Ts.add(1).log10().add(1) },
			effectDisplay(){ return "x"+format(upgradeEffect('tm', 131)) },
		},
		132: {
			title: "TM Upg 12",
			description: "Super True Meta Points boost Ts.",
			cost: new Decimal(850),
			unlocked(){ return (hasUpgrade('tm', 131)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
			effect(){ return player.tm.STMP.add(1) },
			effectDisplay(){ return "x"+format(upgradeEffect('tm', 132)) },
		},
		133: {
			title: "TM Super Upg 3",
			description: "Ts gain ^1.2.",
			cost: new Decimal("2e28"),
			unlocked(){ return (hasUpgrade('tm', 132)) },
			currencyDisplayName: "Ts",
			currencyInternalName: "Ts",
			currencyLayer: "tm",
		},
		134: {
			title: "TM Upg 13",
			description: "Ts gain x1000.",
			cost: new Decimal(1250),
			unlocked(){ return (hasUpgrade('tm', 133)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
		141: {
			title: "TM Features 4",
			description: "Unlock Mega True Meta Points.",
			cost: new Decimal(2000),
			unlocked(){ return (hasUpgrade('tm', 134)) },
			currencyDisplayName: "True Meta Points",
			currencyInternalName: "tmpoints",
			currencyLayer: "tm",
		},
	},
	clickables: {
    11: {
		title: "Turn Auto Limit Power On",
        canClick(){ return player.tm.lpow.eq(0) },
		onClick(){ return player.tm.lpow = new Decimal(1) },
		unlocked(){ return hasUpgrade('tm', 11) },
    },
	12: {
		title: "Turn Auto Limit Power Off",
        canClick(){ return player.tm.lpow.eq(1) },
		onClick(){ return player.tm.lpow = new Decimal(0) },
		unlocked(){ return hasUpgrade('tm', 11) },
    },
	21: {
		title: "Turn Auto True Meta On",
        canClick(){ return player.tm.autoTM.eq(0) },
		onClick(){ return player.tm.autoTM = new Decimal(1) },
		unlocked(){ return hasUpgrade('tm', 61) },
    },
	22: {
		title: "Turn Auto True Meta Off",
        canClick(){ return player.tm.autoTM.eq(1) },
		onClick(){ return player.tm.autoTM = new Decimal(0) },
		unlocked(){ return hasUpgrade('tm', 61) },
    },
	},
	update(diff) {
		let gain = new Decimal(0)
		let expoGain = new Decimal(0)
		let Ts = new Decimal(0)
		let tmP = new Decimal(1)
		let StmP = new Decimal(1)
		if (hasUpgrade('tm', 32)) gain = gain.add(1)
		gain = gain.times(tmp.tm.tmPowBoost)
		if (hasUpgrade('tm', 51)) expoGain = expoGain.add(1)
		expoGain = expoGain.times(tmp.tm.tExpoBase)
		if (hasUpgrade('tm', 71)) Ts = Ts.add(1)
		Ts = Ts.times(tmp.tm.TsBase)
		Ts = Ts.times(buyableEffect('tm', 11))
		if (hasUpgrade('tm', 72)) Ts = Ts.times(5)
	    if (hasUpgrade('tm', 73)) Ts = Ts.times(3)
		tmP = tmP.times(tmp.tm.STMP)
		StmP = StmP.times(tmp.tm.MTMP)
		if (hasUpgrade('tm', 113)) Ts = Ts.times(upgradeEffect('tm', 113))
		if (hasUpgrade('tm', 121)) Ts = Ts.times(10)
		if (hasUpgrade('tm', 131)) Ts = Ts.times(upgradeEffect('tm', 131))
		if (hasUpgrade('tm', 132)) Ts = Ts.times(upgradeEffect('tm', 132))
		if (hasUpgrade('tm', 134)) Ts = Ts.times(1000)
		if (hasUpgrade('tm', 133)) Ts = Ts.pow(1.2)
		
		player.tm.tmpointGain = tmP
		player.tm.STMPGain = StmP
		player.tm.tmPowGain = gain
		player.tm.tExpoGain = expoGain
		player.tm.TsGain = Ts
		gain = gain.times(diff)
		expoGain = expoGain.times(diff)
		Ts = Ts.times(diff)
		player.tm.tmPow = player.tm.tmPow.add(gain)
		player.tm.tExpo = player.tm.tExpo.add(expoGain)
		player.tm.Ts = player.tm.Ts.add(Ts)
	},
	buyables: {
	11: {
		unlocked(){ return hasUpgrade('tm', 71) },
		title: "Tsb1",
        cost(x) { return new Decimal(1.5).add(x.pow(1.4).div(4)).pow(x.pow(1.2)).times(0.01) },
        display() { return "Ts gain x" + format(tmp.tm.Tsb1Base) + ".<br>Cost: " + format(this.cost()) + " Ts<br>Bought: " + format(getBuyableAmount('tm', 11)) + "<br>Effect: x" + format(buyableEffect('tm', 11)) + "" },
        canAfford() { return player.tm.Ts.gte(this.cost()) },
        buy() {
            player.tm.Ts = player.tm.Ts.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(tmp.tm.Tsb1Base)
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
	},
	12: {
		unlocked(){ return hasUpgrade('tm', 81) },
		title: "Tsb2",
        cost(x) { return new Decimal(10).add(x.pow(2)).pow(x.pow(2)).times("e9") },
        display() { return "Ts gain base +^" + format(tmp.tm.Tsb2Base) + ".<br>Cost: " + format(this.cost()) + " Ts<br>Bought: " + format(getBuyableAmount('tm', 12)) + "<br>Effect: +^" + format(buyableEffect('tm', 12)) + "" },
        canAfford() { return player.tm.Ts.gte(this.cost()) },
        buy() {
            player.tm.Ts = player.tm.Ts.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(tmp.tm.Tsb2Base)
			let base2 = x
			let expo = new Decimal(1)
			return base1.times(Decimal.times(base2, expo))
		},
	},
	13: {
		unlocked(){ return hasUpgrade('tm', 112) },
		title: "Tsb3",
        cost(x) { return new Decimal(10).add(x.times(2).pow(1.1)).pow(x.pow(1.35)).times(1e20) },
        display() { return "True Meta Rune gain x" + format(tmp.tm.Tsb3Base) + ".<br>Cost: " + format(this.cost()) + " Ts<br>Bought: " + format(getBuyableAmount('tm', 13)) + "<br>Effect: x" + format(buyableEffect('tm', 13)) + "" },
        canAfford() { return player.tm.Ts.gte(this.cost()) },
        buy() {
            player.tm.Ts = player.tm.Ts.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(tmp.tm.Tsb3Base)
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
	},
	},
})
