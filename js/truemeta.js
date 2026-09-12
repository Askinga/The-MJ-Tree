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
    }},
	onPrestige(){
	    player.tm.tmpoints = player.tm.tmpoints.add(1)
	},
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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	tmPow() {
		return player.tm.tmPow.add(1).log10().add(1).pow(0.6)
	},
	tmPowBoost(){
		return new Decimal(1.1).pow(player.tm.total)
	},
    row: 7, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "T", description: "Shift+T: Reset for True Meta Runes (Uni. 1)", onPress(){if (canReset(this.layer) && !(inChallenge('universes', 11))) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('dr', 25) || player.tm.unlocked)},
   	branches: ["limit"],
    effect(){
      return new Decimal(10).pow(player.tm.points)
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
				["display-text", function(){ return "You have " + format(player.tm.tmpoints) + " True Meta Points to spend"}],
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
				["display-text", function(){ return "You have " + format(player.tm.tmPow) + " True Meta Power (" + format(player.tm.tmPowGain) + "/sec), which is boosting True Meta Runes by x" + format(tmp.tm.tmPow) }],
				"blank",
				"resource-display",
				"blank",
				["display-text", function(){ return "Every True Meta Rune you get boosts True Meta Power by x1.10! Currently: x" + format(tmp.tm.tmPowBoost) }],
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
	},
	update(diff) {
		let gain = new Decimal(0)
		if (hasUpgrade('tm', 32)) gain = gain.add(1)
		gain = gain.times(tmp.tm.tmPowBoost)

		player.tm.tmPowGain = gain
		gain = gain.times(diff)
		player.tm.tmPow = player.tm.tmPow.add(gain)
	},
})
