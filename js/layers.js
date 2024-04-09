addLayer("p", {
    name: "MJ points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MJ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#a0a0a0",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "MJ points", // Name of prestige currency
    baseResource: "MJs", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for MJ points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	
    upgrades: {
        11: {
            title: "MJ Doubler",
            description: "Double your MJ gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "MJ points have a effect!",
            description: "Increases MJ gain based on MJ points.",
            cost: new Decimal(3),
            effect(){
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Super MJs",
            description: "Increase MJ gain based on MJs.",
            cost: new Decimal(15),
            effect(){
                return player.points.add(1).pow(0.075)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    milestones: {
        0: {
            requirementDescription: "35 MJ Points",
            effectDescription: "Quadruple MJ Gain.",
            done() { return player.p.points >= (35) }
        },
    },
}),

	addLayer("R", {
    name: "rebirth",
    softcap: new Decimal("1e17"),
    softcapPower: new Decimal(0.25),
    symbol: "R",
    row: "1",
    type: "normal",
    baseResource: "$",
    resource: "Rebirth Points",
    baseAmount() { return player.points },
    onPrestige() {

    },
    requires() {
        let requirement = new Decimal(0)
        if(!inChallenge('SR', 11)) requirement = requirement.add(100000)
        if(inChallenge('SR', 11)) requirement = requirement.add("eeeeeeeee10")
        if(hasChallenge('SR', 12)) requirement = requirement.div(10)
        if(inChallenge('SR', 12)) requirement = requirement.times(10)
        return requirement
    },
    gainMult() {
        let remult = new Decimal(1)
        if (getClickableState('U', 11)) remult = remult.times(2)
        if (getClickableState('U', 12)) remult = remult.times(3)
        if (getClickableState('U', 13)) remult = remult.times(4)
        if (hasUpgrade('U', 43) && !hasMilestone('P', 8)) remult = remult.times(player.points.add(10).log(10).add(10).log(10))
        if (hasUpgrade('U', 43) && hasMilestone('P', 8)) remult = remult.times(player.points.add(9).log(9).add(8).log(8))
        remult = remult.times(layers.R.buyables[11].effect())
        if (hasUpgrade('R', 32)) remult = remult.times(1.3)
        remult = remult.times(layers.SR.effect()[0])
        remult = remult.times(layers.U.buyables[11].effect())
        remult = remult.times(layers.P.effect())
        if (hasUpgrade('U', 52)) remult = remult.times(player.P.points.add(3).log(3))
        return remult
    },
    exponent() {
        let power = new Decimal(0.5)
        if (hasUpgrade('U', 32)) power = power.add(0.2)
        if (hasMilestone('P', 8) && hasUpgrade('U', 32)) power = power.add(0.1)
        return power
    },
    gainExp() {
        let expo = new Decimal(1)
        if(hasUpgrade('SR', 11)) expo = expo.times(1.1)
        return expo
    },
    color: "#ba0022",
    branches: ['U'],
    effect() {
        let power = new Decimal(0.6)
        if (hasUpgrade('U', 33)) power = power.add(0.1)
        if (hasUpgrade('U', 42)) power = power.add(0.1)
        if (hasUpgrade('R', 33)) power = power.add(0.2)
        if (hasMilestone('P', 8) && hasUpgrade('U', 33)) power = power.add(0.1)
        if (hasMilestone('P', 8) && hasUpgrade('U', 42)) power = power.add(0.1)
        return player.R.points.pow(power).add(1)
    },
    layerShown() { return hasAchievement('A', 12) },
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
