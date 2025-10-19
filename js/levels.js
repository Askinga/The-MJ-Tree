addLayer("l", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		level: new Decimal(0),
		req: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal("e12"), // Can be a function that takes requirement increases into account
    resource: "XP", // Name of prestige currency
    baseResource: "boost runes", // Name of resource prestige is based on
    baseAmount() {return player.b.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.15, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "x", description: "X: Reset for XP", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	tabFormat: [
		"main-display",
		"prestige-button",
		"resource-display",
		"blank",
		["display-text", function(){ return "<h3>" + format(player.l.req) + " XP required for next level.<br>You have " + format(player.l.level) + " Levels</h3>" }],
		["bar", "bigBar"],
		["display-text", function(){ return "<h3>Levels boost Boost Runes by x" + format(tmp.l.levelsEff) + " and Points by x" + format(tmp.l.lvlE2) + "</h3>" }],
		"blank",
		"milestones",
		"upgrades",
    ],
	levelsEff(){
		return new Decimal(1.75).pow(player.l.level)
	},
	lvlE2(){
		return new Decimal(250).pow(player.l.level)
	},
    layerShown(){return (hasMilestone('m', 3) || player.l.unlocked)},
	branches: ["b"],
	update(diff){
		let req = new Decimal(2)

	    req = new Decimal(2).pow(player.l.level)

		player.l.req = req
		if (player.l.points.gte(player.l.req)) {
			player.l.points = player.l.points.sub(req)
			player.l.level = player.l.level.add(1)
			levelUp()
		}
	},
	bars: {
    bigBar: {
        direction: RIGHT,
        width: 250,
        height: 50,
        progress() { return player.l.points.div(player.l.req) },
		display(){ return "" + format(player.l.points.div(player.l.req).times(100)) + "%" },
		fillStyle: { 'background-color': "#25aa25" },
	    baseStyle: { 'background-color': "#ff5555" },
    },
	},
	milestones: {
    0: {
        requirementDescription: "2 levels",
        effectDescription: "Keep Row 1 Upgrades and x3 BR",
        done() { return player.l.level.gte(2) }
    },
	1: {
        requirementDescription: "4 levels",
        effectDescription: "Keep Row 2 Milestones and x2 SR",
        done() { return player.l.level.gte(4) }
    },
	},
})
