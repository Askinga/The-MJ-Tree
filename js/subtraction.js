addLayer("s", {
    name: "Subtraction",
    symbol: "➖",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    baseeffect: new Decimal(10.1),
    }},
    color: "#a8a8a8",
    requires() {
        let req = new Decimal(1e23)
	return req
    }, // Can be a function that takes requirement increases into account
    resource: "Subtraction", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    effect(){
    let rpow = 1
	let eff = player.s.baseeffect.sub(player.s.points.add(1).div(10))
       return eff
        },
        effectDescription() {
            let desc = "subtracting base computing requirement to " + format(tmp[this.layer].effect);
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
        {key: "s", description: "S: Reset for Subtraction", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    resetDescription: 'Reset points and Addition for ',
    layerShown(){
        let visible = false
        if (hasMilestone('c', 15) || player.s.unlocked) visible = true
       return visible
    },
    branches:["c"],
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Subtraction")
    },
    clickables: {
        1: {
            title() { return "<h2>Go back" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "c"
            },
            style: { width: '100px', "min-height": '75px' },
        },
    },
})
