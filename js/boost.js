addLayer("b", {
    name: "boost runes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		terrible: new Decimal(0),
		super_bad: new Decimal(0),
		bad: new Decimal(0),
		mid: new Decimal(0),
		kinda_good: new Decimal(0),
		good: new Decimal(0),
		amazing: new Decimal(0),
		bestR: new Decimal(0),
		randomValue: new Decimal(0),
		RG: new Decimal(0),
    }},
    color: "#6f36eb",
    requires: new Decimal("e20"), // Can be a function that takes requirement increases into account
    resource: "Boost Runes", // Name of prestige currency
    baseResource: "Prestige Points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.02, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade('b', 12)) mult = mult.times(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for boost runes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	tabFormat: {
	"Runes & Upgrades": {
		content: [
			"main-display",
			"prestige-button",
			"resource-display",
			"blank",
			["clickables", ["1"]],
			"blank",
			"upgrades",
			["display-text", function(){ 
    return "<h3>" 
        + format(player.b.terrible) + " Terrible Runes<br>"
        + format(player.b.super_bad) + " Super Bad Runes<br>"
        + format(player.b.bad) + " Bad Runes<br>"
        + format(player.b.mid) + " Mid Runes<br>"
        + format(player.b.kinda_good) + " Kinda Good Runes<br>"
        + format(player.b.good) + " Good Runes<br>"
        + format(player.b.amazing) + " Amazing Runes<br>"
        + format(player.b.bestR) + " Best Runes</h3>";
            }],
			"blank",
    ],
	},
	"Boosts": {
		content: [
			"main-display",
			"prestige-button",
			"resource-display",
			"blank",
			["display-text", function(){ 
    return "<h3>" 
        + "Terrible Rune: x" + format(tmp.b.terrible) + " points<br>"
        + "Super Bad Rune: x" + format(tmp.b.super_bad) + " prestige points<br>"
        + "Bad Rune: x" + format(tmp.b.bad) + " rune gain<br>"
        + "Mid Runes: x" + format(tmp.b.mid) + " super runes<br>"
        + "Kinda Good Runes: x" + format(tmp.b.kinda_good) + " points and prestige points<br>"
        + "Good Runes: x" + format(tmp.b.good) + " rune gain and prestige points<br>"
        + "Amazing Runes: x" + format(tmp.b.amazing) + " super runes<br>"
        + "Best Runes: x" + format(tmp.b.bestR) + " boost rune gain (Except Best Runes)</h3>";
            }],
			"blank",
    ],
	},
},
	terrible(){ // Boosts points
		return player.b.terrible.add(1).pow(2)
	},
	super_bad(){ // Boosts prestige points
		return player.b.super_bad.add(1).pow(1.5)
	},
	bad(){ // Boosts rune gain
		return player.b.bad.add(1).pow(1.25)
	},
	mid(){ // Boosts super runes
		return player.b.mid.add(1).pow(1)
	},
	kinda_good(){ // Boosts points and prestige
		return player.b.kinda_good.add(1).pow(3)
	},
	good(){ // Boosts runes and prestige
		return player.b.good.add(1).pow(3.5)
	},
	amazing(){ // Boosts super runes... quite literally
		return player.b.amazing.add(1).pow(2)
	},
	bestR(){ // Boosts boost rune gain
		return player.b.bestR.add(1).pow(0.5)
	},
    layerShown(){return (hasUpgrade('s', 15) || player.b.unlocked)},
	branches: ["p"],
	clickables: {
		11: {
		title: "Roll Basic Boost Rune",
        display() {return "Roll!<br>Cost: 1 Boost Rune"},
        canClick(){ return player.b.points.gte(1) },
		onClick(){ 
			player.b.points = player.b.points.sub(1)
			player.b.randomValue = new Decimal(Math.random())
			if (player.b.randomValue.gt(0.5) && player.b.randomValue.lte(1)) {
				player.b.terrible = player.b.terrible.add(player.b.RG)
			}
		    if (player.b.randomValue.lte(0.5) && player.b.randomValue.gt(0.225)) {
				player.b.super_bad = player.b.super_bad.add(player.b.RG)
			}
		    if (player.b.randomValue.lte(0.225) && player.b.randomValue.gt(0.145)) {
				player.b.bad = player.b.bad.add(player.b.RG)
			}
		    if (player.b.randomValue.lte(0.145) && player.b.randomValue.gt(0.085)) {
				player.b.mid = player.b.mid.add(player.b.RG)
			}
		    if (player.b.randomValue.lte(0.085) && player.b.randomValue.gt(0.045)) {
				player.b.kinda_good = player.b.kinda_good.add(player.b.RG)
			}
		    if (player.b.randomValue.lte(0.045) && player.b.randomValue.gt(0.015)) {
				player.b.good = player.b.good.add(player.b.RG)
			}
		    if (player.b.randomValue.lte(0.015) && player.b.randomValue.gt(0.0025)) {
				player.b.amazing = player.b.amazing.add(player.b.RG)
			}
		    if (player.b.randomValue.lte(0.0025)) {
				player.b.bestR = player.b.bestR.add(1)
			}
		},
		tooltip(){
		   return "Terrible Rune: 50%<br>Super Bad Rune: 27.5%<br>Bad Rune: 8%<br>Mid Rune: 6%<br>Kinda Good Rune: 4%<br>Good Rune: 3%<br>Amazing Rune: 1.25%<br>Best Rune: 0.25%<br>"
		},
    },
	},
	update(diff) {
		let gain = new Decimal(1)

		gain = gain.times(tmp.b.bestR)

		player.b.RG = gain
	},
	upgrades: {
		11: {
			title: "I HATE RNG!",
			description: "-1s Auto Rune Cooldown, making it 0s!",
			cost: new Decimal(2),
		},
		12: {
			title: "Runic boosts",
			description: "x3 Boost Runes",
			cost: new Decimal(10),
			unlocked(){ return hasUpgrade('b', 11) },
		},
	},
})
