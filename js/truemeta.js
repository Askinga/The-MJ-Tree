addLayer("tm", {
    name: "True Meta", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "TM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		tmpoints: new Decimal(0),
		lpow: new Decimal(0),
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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
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
			cost: new Decimal(2),
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
})
