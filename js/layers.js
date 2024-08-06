// Tip: 11 means Column 1, Row 1 for upgrades, milestones, etc
addLayer("p", {
    name: "MJ", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🧍", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    doReset(p) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[p].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
        for(i=1;i<6;i++){ //rows
            for(v=1;v<2;v++){ //columns
              if ((hasUpgrade('b', 15)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
	    for(v=2;v<3;v++){ //columns
                if ((hasUpgrade('w', 14)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
	    }
	    for(v=3;v<4;v++){ //columns
                if ((hasMilestone('m', 10)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
	    }
	}
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
	if (hasUpgrade('u', 11)) keep.push("buyables");
    
        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ffffff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "MJs", // Name of prestige currency
    passiveGeneration() {
        if (hasUpgrade('b', 22)) return 10
	if (hasUpgrade('p', 21)) return 2
	if (hasUpgrade('b', 13)) return 0.1
        return 0
    },
    effect(){
    let rpow = 0.5
       if (hasMilestone('m', 5)) rpow = 0.6
	let eff = player.p.points.pow(rpow)
       return eff
        },
        effectDescription() {
            let desc = "adding " + format(tmp[this.layer].effect) + " to base point gain.";
            return desc;
        },
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {
        let exp = 0.5
        if (hasUpgrade('b', 21)) exp = 0.525
        return exp
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        
        // mult
	
	mult = mult.times(buyableEffect('p', 11))
	if (hasUpgrade('p', 14)) mult = mult.times(2)
	mult = mult.times(layers.b.effect())
	if (hasUpgrade('b', 11)) mult = mult.times(3.5)
	if (hasUpgrade('b', 14)) mult = mult.times(upgradeEffect('b', 14))
	if (hasUpgrade('b', 15)) mult = mult.times(2.25)
	if (hasUpgrade('p', 22)) mult = mult.times(2.5)
	if (hasUpgrade('p', 24)) mult = mult.times(5)
	if (hasUpgrade('p', 25)) mult = mult.times(3)
	if (hasUpgrade('w', 12)) mult = mult.times(10)
	if (hasUpgrade('w', 21)) mult = mult.times(2.1)
	if (hasUpgrade('w', 24)) mult = mult.times(upgradeEffect('w', 24))
	if (hasUpgrade('b', 24)) mult = mult.times(4)
	if (hasUpgrade('p', 31)) mult = mult.times(5)
	if (hasUpgrade('p', 33)) mult = mult.times(2)
	if (hasMilestone('m', 1)) mult = mult.times(50)
	if (hasMilestone('m', 7)) mult = mult.times(1e8)
	if (hasMilestone('m', 9)) mult = mult.times(1e8)
	if (hasMilestone('m', 10)) mult = mult.times(1e6)
	if (hasMilestone('m', 11)) mult = mult.times(1e3)
	if (hasMilestone('m', 12)) mult = mult.times(1e6)
	if (hasMilestone('m', 13)) mult = mult.times(1e12)
	if (hasUpgrade('u', 12)) mult = mult.times(upgradeEffect('u', 12))
	if (hasUpgrade('u', 23)) mult = mult.times(1e15)
	
	// pow
	
	if (hasUpgrade('w', 33)) mult = mult.pow(1.05)
	if (hasUpgrade('p', 34)) mult = mult.pow(1.04)
	if (hasMilestone('m', 4)) mult = mult.pow(1.005)
	if (hasMilestone('m', 5)) mult = mult.pow(1.035)
	return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for MJs", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
})
