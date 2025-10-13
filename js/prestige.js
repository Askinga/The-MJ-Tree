addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		common: new Decimal(0),
		uncommon: new Decimal(0),
		rare: new Decimal(0),
		epic: new Decimal(0),
		legendary: new Decimal(0),
		mythic: new Decimal(0),
		godly: new Decimal(0),
		secret: new Decimal(0),
		randomValue: new Decimal(0),
		runeCooldown: new Decimal(0),
    }},
    color: "#00aadd",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (player.d.difficulty.eq(0)) mult = mult.times(2)
        if (player.d.difficulty.eq(2)) mult = mult.times(0.5)
		if (hasUpgrade('p', 12)) mult = mult.times(2)
		if (hasUpgrade('p', 14)) mult = mult.times(upgradeEffect('p', 14))
        return mult
    },
	tabFormat: {
	  "Main tab": {
		content: [
			"main-display",
			"prestige-button",
			"resource-display",
			"blank",
			"upgrades",
		],
	  },
	  "Runes": {
		unlocked(){ return hasUpgrade('p', 13) },  
		content: [
			"main-display",
			"prestige-button",
			"resource-display",
			"blank",
			"clickables",
			["display-text", function(){ 
    return "<h3>" 
        + format(player.p.common) + " Common Runes<br>"
        + format(player.p.uncommon) + " Uncommon Runes<br>"
        + format(player.p.rare) + " Rare Runes<br>"
        + format(player.p.epic) + " Epic Runes<br>"
        + format(player.p.legendary) + " Legendary Runes<br>"
        + format(player.p.mythic) + " Mythic Runes<br>"
        + format(player.p.godly) + " Godly Runes<br>"
        + format(player.p.secret) + " Secret Runes</h3>";
            }],
			"blank",
		],
	  },
	},
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.d.started.eq(1)},
	tooltip() {
		return "Runes & Prestige"
	},
	upgrades: {
    11: {
		title: "Generic first upgrade",
        description: "Boosts points by x2. As always.",
        cost: new Decimal(1),
    },
    12: {
		title: "It's prestige now",
        description: "Boosts prestige points by x2.",
        cost: new Decimal(3),
		unlocked(){ return hasUpgrade(this.layer, 11) },
    },
	13: {
		title: "New feature",
        description: "Unlock Runes.",
        cost: new Decimal(6),
		unlocked(){ return hasUpgrade(this.layer, 12) },
    },
	14: {
		title: "Runic prestige",
        description: "Common Runes boost prestige points.",
        cost: new Decimal(7),
		unlocked(){ return hasUpgrade(this.layer, 13) },
		effect(){ return player.p.common.add(1).pow(0.4) },
		effectDisplay(){ return "x"+format(upgradeEffect('p', 14)) },
    },
	15: {
		title: "New feature 2",
        description: "Unlock the Rune Skill Tree.",
        cost: new Decimal(12),
		unlocked(){ return hasUpgrade(this.layer, 12) },
    },
	},
	clickables: {
    11: {
		title: "Roll Basic Rune",
        display() {return "Roll!<br>Cooldown: " + format(player.p.runeCooldown) + "s"},
        canClick(){ return player.p.runeCooldown.lte(0) },
		onClick(){ 
			player.p.runeCooldown = new Decimal(5); // 5 seconds cooldown
			player.p.randomValue = new Decimal(Math.random())
			if (player.p.randomValue.gt(0.46) && player.p.randomValue.lte(1)) {
				player.p.common = player.p.common.add(1)
			}
		    if (player.p.randomValue.lte(0.46) && player.p.randomValue.gt(0.26)) {
				player.p.uncommon = player.p.uncommon.add(1)
			}
		    if (player.p.randomValue.lte(0.26) && player.p.randomValue.gt(0.16)) {
				player.p.rare = player.p.rare.add(1)
			}
		    if (player.p.randomValue.lte(0.16) && player.p.randomValue.gt(0.085)) {
				player.p.epic = player.p.epic.add(1)
			}
		    if (player.p.randomValue.lte(0.085) && player.p.randomValue.gt(0.035)) {
				player.p.legendary = player.p.legendary.add(1)
			}
		    if (player.p.randomValue.lte(0.035) && player.p.randomValue.gt(0.01)) {
				player.p.mythic = player.p.mythic.add(1)
			}
		    if (player.p.randomValue.lte(0.01) && player.p.randomValue.gt(0.0001)) {
				player.p.godly = player.p.godly.add(1)
			}
		    if (player.p.randomValue.lte(0.0001)) {
				player.p.secret = player.p.secret.add(1)
			}
		},
		tooltip(){
		   return "Common Rune: 54%<br>Uncommon Rune: 20%<br>Rare Rune: 10%<br>Epic Rune: 7.5%<br>Legendary Rune: 5%<br>Mythic Rune: 2.5%<br>Godly Rune: 0.99%<br>Secret Rune: ???%<br>"
		},
    },
	},
	update(diff) {
		// In your update loop
if (player.p.runeCooldown.gt(0)) {
    player.p.runeCooldown = player.p.runeCooldown.sub(diff); // diff = time since last tick
    if (player.p.runeCooldown.lt(0)) player.p.runeCooldown = new Decimal(0);
			}
	},
})
