addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ff7300",
        requires() {
        let req = new Decimal(10)
        if (hasUpgrade('p', 12)) req = req.div(upgradeEffect('p', 12))
        return req
    },

    
    resource: "mastered points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for mastery points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    upgrades: {
        11: {
            title: "Point gain starts now",
            description: "Get 1 point every second.",
            cost: new Decimal(0),
        },
        12: {
            title: "Dividing costs",
            description: "Divide mastered point cost based on points.",
            cost: new Decimal(2),
            effect() {return player.points.add(1).pow(0.3)},
            effectDisplay() {return "÷"+format(this.effect())},
            unlocked() { return (hasUpgrade('p', 11)) }
	},
    },
    effect(){
    let enpow = 1
	let eff = player.p.points.add(1).pow(enpow)
       return eff
       },
        effectDescription() {
            let desc = "boosting points by x" + format(tmp[this.layer].effect);
            return desc;
        },
})
