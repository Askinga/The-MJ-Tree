addLayer("m", {
    name: "meta", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    doReset(m) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[m].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
        
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
	    if (hasMilestone('e', 1)) keep.push("milestones");
    
        // Stage 4, do the actual data resetautomate() {
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },
	autoPrestige(){ return (hasMilestone('e', 1)) },
	resetsNothing(){ return (hasMilestone('e', 1)) },
	canBuyMax(){ return (hasMilestone('XP', 2)) },
    color: "#b8b8b8",
    requires: new Decimal(1e17), // Can be a function that takes requirement increases into account
    resource: "Meta Runes", // Name of prestige currency
    baseResource: "Super Runes", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.2, // Prestige currency exponent
    base: 10,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for meta runes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    effect(){
      let b = new Decimal(1000)
      let eff = new Decimal(b).pow(player.m.points)
      return eff
    },
	bonusEff1(){
		return new Decimal(3).pow(player.m.points)
	},
	effectDescription(){
		return "which is boosting Points by x" + format(layers.m.effect()) + " and boosting SR and BR by x" + format(tmp.m.bonusEff1)
	},
    layerShown(){return ((hasUpgrade('b', 15) || player.m.unlocked) && !(inChallenge('universes', 11)))},
    branches: ["s"],
	milestones: {
    0: {
        requirementDescription: "2 Meta Runes",
        effectDescription: "Meta Runes second effect boost boost rune gain",
        done() { return player.m.points.gte(2) }
    },
	1: {
        requirementDescription: "3 Meta Runes",
        effectDescription: "Keep all passive generations before third row and x3 PP",
        done() { return player.m.points.gte(3) }
    },
	2: {
        requirementDescription: "6 Meta Runes",
        effectDescription: "Automate Row 2 Upgrades",
        done() { return player.m.points.gte(6) }
    },
	3: {
        requirementDescription: "12 Meta Runes",
        effectDescription: "Unlock a new layer. Automatically roll Boost Runes.",
        done() { return player.m.points.gte(12) }
    },
	},
})
