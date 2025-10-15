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
		baseRuneCooldown: new Decimal(5),
		runeGain: new Decimal(1),
		rowFiveSum: new Decimal(0),
		runeChoose: new Decimal(0),
		autoRC: new Decimal(0)
    }},
    color: "#00aadd",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount(){return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (player.d.difficulty.eq(0)) mult = mult.times(2)
        if (player.d.difficulty.eq(2)) mult = mult.times(0.5)
		if (hasUpgrade('p', 12)) mult = mult.times(2)
		if (hasUpgrade('p', 14)) mult = mult.times(upgradeEffect('p', 14))
		if (hasUpgrade('p', 211)) mult = mult.times(2)
		if (hasUpgrade('p', 302)) mult = mult.times(4)
        return mult
    },
	tabFormat: {
	  "Main tab": {
		content: [
			"main-display",
			"prestige-button",
			"resource-display",
			"blank",
			["upgrades", ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]]
		],
	  },
	  "Runes": {
		unlocked(){ return hasUpgrade('p', 13) },  
		content: [
			"main-display",
			"prestige-button",
			"resource-display",
			["display-text", function() { return "<h2>You gain " + format(player.p.runeGain) + " Runes on rune roll.</h2>" }],
			"blank",
			["clickables", ["1"]],
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
	  "Rune Skill Tree": {
		unlocked(){ return hasUpgrade('p', 15) },  
		content: [
			"main-display",
			"prestige-button",
			"resource-display",
			"blank",
			["clickables", ["2"]],
			"blank",
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
			["upgrades", ["20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32"]],
		],
		buttonStyle() {
                    return {
                        'background': 'linear-gradient(90deg, #00aadd, black)',
                        'border-color': '#00aadd',
                        'color': 'white',
					}
		    },
	  },
	  "Auto Runes": {
		unlocked(){ return hasMilestone('s', 0) },
		content: [
			"main-display",
			"prestige-button",
			"resource-display",
			"blank",
			["display-text", function(){ return "In here, you can enable automation for runes! (Based on unlocked runes)<br>Auto Runes must wait " + format(player.s.autoRuneCooldown) + "s before rolling again." }],
			"blank",
			["clickables", ["3"]]
		],
		buttonStyle() {
                    return {
                        'background': 'linear-gradient(45deg, red, orange, yellow, lime, cyan, blue, purple, magenta, pink)',
                        'border-color': '#ffffff',
                        'color': 'white',
					}
			},
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
		unlocked(){ return hasUpgrade(this.layer, 14) },
    },
	// Skill Tree
	201: {
		title: "RST-1",
        description: "x2 points.",
        cost: new Decimal(3),
		unlocked(){ return hasUpgrade(this.layer, 15) },
		currencyDisplayName: "Common Runes",
		currencyInternalName: "common",
		currencyLayer: "p",
    },
	211: {
		title: "RST-2",
        description: "x2 Prestige. Lock RST-3",
        cost: new Decimal(2),
		unlocked(){ return hasUpgrade(this.layer, 201) },
		currencyDisplayName: "Uncommon Runes",
		currencyInternalName: "uncommon",
		currencyLayer: "p",
		canAfford() {
			if (hasUpgrade('p', 261)) return true
			else if (hasUpgrade('p', 212)) return false
			else return true
		},
    },
	212: {
		title: "RST-3",
        description: "Decrease Rune Cooldown by -1. Lock RST-2",
        cost: new Decimal(1),
		unlocked(){ return hasUpgrade(this.layer, 201) },
		currencyDisplayName: "Rare Runes",
		currencyInternalName: "rare",
		currencyLayer: "p",
	    canAfford() {
			if (hasUpgrade('p', 261)) return true
			else if (hasUpgrade('p', 211)) return false
			else return true
		},
    },
	221: {
		title: "RST-4",
        description: "Double the Runes you gain.",
        cost: new Decimal(1),
		unlocked(){ return (hasUpgrade(this.layer, 211) || hasUpgrade(this.layer, 212)) },
		currencyDisplayName: "Epic Runes",
		currencyInternalName: "epic",
		currencyLayer: "p",
    },
	231: {
		title: "RST-5",
        description: "Points boost themselves. Lock RST-6",
        cost: new Decimal(25),
		unlocked(){ return hasUpgrade(this.layer, 221) },
		effect(){ return player.points.add(1).pow(0.075) },
		effectDisplay(){ return "x"+format(upgradeEffect('p', 231)) },
		currencyDisplayName: "Common Runes",
		currencyInternalName: "common",
		currencyLayer: "p",
		canAfford() {
			if (hasUpgrade('p', 261)) return true
			else if (hasUpgrade('p', 232)) return false
			else return true
		},
    },
	232: {
		title: "RST-6",
        description: "Decrease Rune Cooldown by -0.5. Lock RST-5",
        cost: new Decimal(3),
		unlocked(){ return hasUpgrade(this.layer, 221) },
		currencyDisplayName: "Legendary Runes",
		currencyInternalName: "legendary",
		currencyLayer: "p",
	    canAfford() {
			if (hasUpgrade('p', 261)) return true
			else if (hasUpgrade('p', 231)) return false
			else return true
		},
    },
	241: {
		title: "RST-7",
        description: "x3 points. Lock RST-8 and RST-9",
        cost: new Decimal(1),
		unlocked(){ return (hasUpgrade(this.layer, 231) || hasUpgrade(this.layer, 232)) },
		currencyDisplayName: "Mythic Runes",
		currencyInternalName: "mythic",
		currencyLayer: "p",
	    canAfford() {
			if (hasUpgrade('p', 291) && hasUpgrade('p', 271)) return player.p.rowFiveSum.lt(3)
			else if (hasUpgrade('p', 271)) return player.p.rowFiveSum.lt(2)
			else if (hasUpgrade('p', 242) || hasUpgrade('p', 243)) return false
			else return true
		},
    },
	242: {
		title: "RST-8",
        description: "Unlock a clickable. Lock RST-7 and RST-9",
        cost: new Decimal(5),
		unlocked(){ return (hasUpgrade(this.layer, 231) || hasUpgrade(this.layer, 232)) },
		currencyDisplayName: "Mythic Runes",
		currencyInternalName: "mythic",
		currencyLayer: "p",
	    canAfford() {
			if (hasUpgrade('p', 291) && hasUpgrade('p', 271)) return player.p.rowFiveSum.lt(3)
			else if (hasUpgrade('p', 271)) return player.p.rowFiveSum.lt(2)
			else if (hasUpgrade('p', 241) || hasUpgrade('p', 243)) return false
			else return true
		},
    },
	243: {
		title: "RST-9",
        description: "Double Rune gain again. Lock RST-7 and RST-8",
        cost: new Decimal(4),
		unlocked(){ return (hasUpgrade(this.layer, 231) || hasUpgrade(this.layer, 232)) },
		currencyDisplayName: "Mythic Runes",
		currencyInternalName: "mythic",
		currencyLayer: "p",
	    canAfford() {
			if (hasUpgrade('p', 291) && hasUpgrade('p', 271)) return player.p.rowFiveSum.lt(3)
			else if (hasUpgrade('p', 271)) return player.p.rowFiveSum.lt(2)
			else if (hasUpgrade('p', 241) || hasUpgrade('p', 242)) return false
			else return true
		},
    },
	251: {
		title: "RST-10",
        description: "Decrease Rune Cooldown by -0.5",
        cost: new Decimal(1),
		unlocked(){ return (hasUpgrade(this.layer, 241) || hasUpgrade(this.layer, 242) || hasUpgrade(this.layer, 243)) },
		currencyDisplayName: "Godly Runes",
		currencyInternalName: "godly",
		currencyLayer: "p",
    },
	261: {
		title: "RST-11",
        description: "You can buy both RST-2 and RST-3, and both RST-5 and RST-6",
        cost: new Decimal(3),
		unlocked(){ return (hasUpgrade(this.layer, 251)) },
		currencyDisplayName: "Godly Runes",
		currencyInternalName: "godly",
		currencyLayer: "p",
    },
	271: {
		title: "RST-12",
        description: "You can buy 2 upgrades from the 5th row. Lock RST-13",
        cost: new Decimal(200),
		unlocked(){ return (hasUpgrade(this.layer, 261)) },
		currencyDisplayName: "Common Runes",
		currencyInternalName: "common",
		currencyLayer: "p",
		canAfford() {
			if (hasUpgrade('p', 272)) return false
			else return true
		},
    },
	272: {
		title: "RST-13",
        description: "Boost points based on prestige points. Lock RST-12",
        cost: new Decimal(50),
		unlocked(){ return (hasUpgrade(this.layer, 261)) },
		effect(){ return player.p.points.add(1).pow(0.3) },
		effectDisplay(){ return "x"+format(upgradeEffect('p', 272)) },
		currencyDisplayName: "Legendary Runes",
		currencyInternalName: "legendary",
		currencyLayer: "p",
		canAfford() {
			if (hasUpgrade('p', 271)) return false
			else return true
		},
    },
	281: {
		title: "RST-14",
        description: "Triple your Rune Gain",
        cost: new Decimal(150),
		unlocked(){ return (hasUpgrade(this.layer, 271) || hasUpgrade(this.layer, 272)) },
		currencyDisplayName: "Uncommon Runes",
		currencyInternalName: "uncommon",
		currencyLayer: "p",
    },
	291: {
		title: "RST-15",
        description: "You can buy all the row 5 upgrades. (Needs RST-12 to function.)",
        cost: new Decimal(100),
		unlocked(){ return (hasUpgrade(this.layer, 281)) },
		currencyDisplayName: "Legendary Runes",
		currencyInternalName: "legendary",
		currencyLayer: "p",
    },
	301: {
		title: "RST-16",
        description: "x1.5 Rune Gain and -0.5 Rune Cooldown. Lock RST-17 and RST-18",
        cost: new Decimal(1250),
		unlocked(){ return (hasUpgrade(this.layer, 291)) },
		currencyDisplayName: "Common Runes",
		currencyInternalName: "common",
		currencyLayer: "p",
		canAfford() {
		    if (hasUpgrade('p', 302) || hasUpgrade('p', 303)) return false
			else return true
		},
    },
	302: {
		title: "RST-17",
        description: "Double Rune gain and x4 Prestige Points. Lock RST-16 and RST-18",
        cost: new Decimal(100),
		unlocked(){ return (hasUpgrade(this.layer, 291)) },
		currencyDisplayName: "Mythic Runes",
		currencyInternalName: "mythic",
		currencyLayer: "p",
		canAfford() {
			if (hasUpgrade('p', 301) || hasUpgrade('p', 303)) return false
			else return true
		},
    },
	303: {
		title: "RST-18",
        description: "Triple Rune Gain. Lock RST-16 and RST-17",
        cost: new Decimal(30),
		unlocked(){ return (hasUpgrade(this.layer, 291)) },
		currencyDisplayName: "Godly Runes",
		currencyInternalName: "godly",
		currencyLayer: "p",
		canAfford() {
			if (hasUpgrade('p', 301) || hasUpgrade('p', 302)) return false
			else return true
		},
    },
	311: {
		title: "RST-19",
        description: "Boost Rune Gain based on prestige points.",
        cost: new Decimal(1000),
		unlocked(){ return (hasUpgrade(this.layer, 301) || hasUpgrade(this.layer, 302) || hasUpgrade(this.layer, 303)) },
		effect(){ return player.p.points.add(1).pow(0.1) },
		effectDisplay(){ return "x"+format(upgradeEffect('p', 311)) },
		currencyDisplayName: "Common Runes",
		currencyInternalName: "common",
		currencyLayer: "p",
	},
	321: {
		title: "RST-20",
        description: "Unlock a new layer.",
        cost: new Decimal(150),
		unlocked(){ return (hasUpgrade(this.layer, 311)) },
		currencyDisplayName: "Godly Runes",
		currencyInternalName: "godly",
		currencyLayer: "p",
	},
	},
	clickables: {
    11: {
		title: "Roll Basic Rune",
        display() {return "Roll!<br>Cooldown: " + format(player.p.runeCooldown) + "s"},
        canClick(){ return player.p.runeCooldown.lte(0) },
		onClick(){ 
			player.p.runeCooldown = player.p.baseRuneCooldown;
			player.p.randomValue = new Decimal(Math.random())
			if (player.p.randomValue.gt(0.46) && player.p.randomValue.lte(1)) {
				player.p.common = player.p.common.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.46) && player.p.randomValue.gt(0.26)) {
				player.p.uncommon = player.p.uncommon.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.26) && player.p.randomValue.gt(0.16)) {
				player.p.rare = player.p.rare.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.16) && player.p.randomValue.gt(0.085)) {
				player.p.epic = player.p.epic.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.085) && player.p.randomValue.gt(0.035)) {
				player.p.legendary = player.p.legendary.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.035) && player.p.randomValue.gt(0.01)) {
				player.p.mythic = player.p.mythic.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.01) && player.p.randomValue.gt(0.0001)) {
				player.p.godly = player.p.godly.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.0001)) {
				player.p.secret = player.p.secret.add(player.p.runeGain)
			}
		},
		tooltip(){
		   return "Common Rune: 54%<br>Uncommon Rune: 20%<br>Rare Rune: 10%<br>Epic Rune: 7.5%<br>Legendary Rune: 5%<br>Mythic Rune: 2.5%<br>Godly Rune: 0.99%<br>Secret Rune: ???%<br>"
		},
    },
	12: {
		title: "Roll Upgraded Rune",
		unlocked(){ return hasUpgrade('p', 242) },
        display() {return "Roll!<br>Cooldown: " + format(player.p.runeCooldown) + "s"},
        canClick(){ return player.p.runeCooldown.lte(0) },
		onClick(){ 
			player.p.runeCooldown = player.p.baseRuneCooldown;
			player.p.randomValue = new Decimal(Math.random())
			if (player.p.randomValue.gt(0.9) && player.p.randomValue.lte(1)) {
				player.p.common = player.p.common.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.9) && player.p.randomValue.gt(0.5)) {
				player.p.uncommon = player.p.uncommon.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.5) && player.p.randomValue.gt(0.3)) {
				player.p.rare = player.p.rare.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.3) && player.p.randomValue.gt(0.2)) {
				player.p.epic = player.p.epic.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.2) && player.p.randomValue.gt(0.1)) {
				player.p.legendary = player.p.legendary.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.1) && player.p.randomValue.gt(0.04)) {
				player.p.mythic = player.p.mythic.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.04) && player.p.randomValue.gt(0.001)) {
				player.p.godly = player.p.godly.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.001)) {
				player.p.secret = player.p.secret.add(player.p.runeGain)
			}
		},
		tooltip(){
		   return "Common Rune: 10%<br>Uncommon Rune: 40%<br>Rare Rune: 20%<br>Epic Rune: 10%<br>Legendary Rune: 10%<br>Mythic Rune: 6%<br>Godly Rune: 3.9%<br>Secret Rune: ???%<br>"
		},
    },
	21: {
		display() {
		return "Force an Prestige reset to respec Rune skill tree."
            },
            tooltip: "You can't get Runes back, you can only respec when you can do a Prestige reset",
            unlocked() {
                return hasUpgrade("p", 15)
            },
            canClick() {
                return canReset(this.layer)
            },
            onClick() {
                player.p.upgrades.length
                for (let i = 0; i < player.p.upgrades.length; i++) {
                    if (+player.p.upgrades[i] > 196) {
                        player.p.upgrades.splice(i, 1);
                        i--;
                    }
                }
                if (canReset(this.layer)) doReset(this.layer)
            },
            style: {
                'min-height': '30px',
                'width': '480px',
                'border-radius': '5px',
                'font-size': '20px',
            },
        },	
		31: {
			title: "Basic Rune",
	    	display() {
		return "Enable Automation for Basic Rune. (Click again to disable)"
            },
			unlocked() {
                return hasUpgrade('p', 15)
            },
            canClick() {
                return true
            },
            onClick() {
                if (player.p.runeChoose.eq(1)) {
					player.p.runeChoose = new Decimal(0)
				} else {
					player.p.runeChoose = new Decimal(1)
				}
            },
        },
	    32: {
			title: "Upgraded Rune",
	    	display() {
		return "Enable Automation for Upgraded Rune. (Click again to disable)"
            },
			unlocked() {
                return hasUpgrade('p', 242)
            },
            canClick() {
                return true
            },
            onClick() {
                if (player.p.runeChoose.eq(2)) {
					player.p.runeChoose = new Decimal(0)
				} else {
					player.p.runeChoose = new Decimal(2)
				}
            },
        },
	},
	update(diff) {
	    let base = new Decimal(2.5)
		// In your update loop
if (player.p.runeCooldown.gt(0)) {
    player.p.runeCooldown = player.p.runeCooldown.sub(diff); // diff = time since last tick
    if (player.p.runeCooldown.lt(0)) player.p.runeCooldown = new Decimal(0);
			}
if (player.p.autoRC.gt(0) && hasMilestone('s', 0) && player.p.runeChoose.gt(0)) {
    player.p.autoRC = player.p.autoRC.sub(diff); // diff = time since last tick
    if (player.p.autoRC.lt(0)) player.p.autoRC = new Decimal(0);
}
        // Rune Cooldown
		
		let cool = new Decimal(5)
		if (hasUpgrade('p', 212)) cool = cool.sub(1)
        if (hasUpgrade('p', 232)) cool = cool.sub(0.5)
		if (hasUpgrade('p', 251)) cool = cool.sub(0.5)
		if (hasUpgrade('p', 301)) cool = cool.sub(0.5)
		
		player.p.baseRuneCooldown = cool

		// Rune Gain
		
		let gain = new Decimal(1)
		if (hasUpgrade('p', 221)) gain = gain.times(2)
		if (hasUpgrade('p', 243)) gain = gain.times(2)
        if (hasUpgrade('p', 281)) gain = gain.times(3)
		if (hasUpgrade('p', 301)) gain = gain.times(1.5)
		if (hasUpgrade('p', 302)) gain = gain.times(2)
		if (hasUpgrade('p', 303)) gain = gain.times(3)
		if (hasUpgrade('p', 311)) gain = gain.times(upgradeEffect('p', 311))
		gain = gain.times(layers.s.effect())
		if (player.d.difficulty.eq(0)) gain = gain.times(2)
        if (player.d.difficulty.eq(2)) gain = gain.times(0.5)
		
		player.p.runeGain = gain

		// Row 5
		
		let f = new Decimal(0)

		if (hasUpgrade('p', 241)) f = f.add(1)
		if (hasUpgrade('p', 242)) f = f.add(1)
		if (hasUpgrade('p', 243)) f = f.add(1)

		player.p.rowFiveSum = f

	    // Automation

	    if (player.p.runeChoose.gt(0) && player.p.autoRC.lte(0)) {
			if (player.p.runeChoose.eq(1)) {
			player.p.randomValue = new Decimal(Math.random())
			if (player.p.randomValue.gt(0.46) && player.p.randomValue.lte(1)) {
				player.p.common = player.p.common.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.46) && player.p.randomValue.gt(0.26)) {
				player.p.uncommon = player.p.uncommon.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.26) && player.p.randomValue.gt(0.16)) {
				player.p.rare = player.p.rare.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.16) && player.p.randomValue.gt(0.085)) {
				player.p.epic = player.p.epic.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.085) && player.p.randomValue.gt(0.035)) {
				player.p.legendary = player.p.legendary.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.035) && player.p.randomValue.gt(0.01)) {
				player.p.mythic = player.p.mythic.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.01) && player.p.randomValue.gt(0.0001)) {
				player.p.godly = player.p.godly.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.0001)) {
				player.p.secret = player.p.secret.add(player.p.runeGain)
			}
			}
			if (player.p.runeChoose.eq(2)) {
			player.p.randomValue = new Decimal(Math.random())
			if (player.p.randomValue.gt(0.9) && player.p.randomValue.lte(1)) {
				player.p.common = player.p.common.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.9) && player.p.randomValue.gt(0.5)) {
				player.p.uncommon = player.p.uncommon.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.5) && player.p.randomValue.gt(0.3)) {
				player.p.rare = player.p.rare.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.3) && player.p.randomValue.gt(0.2)) {
				player.p.epic = player.p.epic.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.2) && player.p.randomValue.gt(0.1)) {
				player.p.legendary = player.p.legendary.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.1) && player.p.randomValue.gt(0.04)) {
				player.p.mythic = player.p.mythic.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.04) && player.p.randomValue.gt(0.001)) {
				player.p.godly = player.p.godly.add(player.p.runeGain)
			}
		    if (player.p.randomValue.lte(0.001)) {
				player.p.secret = player.p.secret.add(player.p.runeGain)
			}
			}
		}
		if (player.p.autoRC.lte(0)) {
	player.p.autoRC = base
				}
	},
})
