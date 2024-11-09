addLayer("d", {
    name: "Division",
    symbol: "➗",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    baseeffect: new Decimal(1),
    }},
    color: "#a8a8a8",
    requires() {
        let req = new Decimal(5e11)
	return req
    }, // Can be a function that takes requirement increases into account
    resource: "Division", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.7, // Prestige currency exponent
    effect(){
    let rpow = 1
	let eff = player.d.baseeffect.div(player.d.points.add(1))
       return eff
        },
        effectDescription() {
            let desc = "dividing point gain by " + format(tmp[this.layer].effect);
            return desc;
        },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for Division", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    resetDescription: 'Reset points and Addition for ',
    layerShown(){
        let visible = false
        if (hasMilestone('c', 9) || player.d.unlocked) visible = true
       return visible
    },
    branches:["c"],
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Division")
    },
    upgrades: {
        11: {
            title: "d.i.v.i.d.e",
            description: "Divide point gain by /0.1",
            cost: new Decimal(4),
	    unlocked() { return (hasChallenge('c', 11)) }
        },
    },
})
