addLayer("SCH", {
    name: "Schools", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Sch", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    		students: new Decimal(0),
    		thoughts: new Decimal(0),
    }},
    color: "#ffbf00",
    requires: new Decimal("e26081500"), // Can be a function that takes requirement increases into account
    resource: "MJ Schools", // Name of prestige currency
    baseResource: "MJs", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.00000001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    displayRow: 7,
    hotkeys: [
        {key: "S", description: "Shift+S: Reset for MJ Schools", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){
        let visible = false
        if (hasChallenge('SAC', 21) || player.SCH.unlocked) visible = true
       return visible
},
    powerEff() {
    return player.SCH.students.add(1).pow(3e6);
    },
    automate(){
	if(hasUpgrade('SCH', 25)) {
		player.SCH.students = player.points.add(1).log("ee8")
	}
    },
    branches:["SAC", "GLA"],
    tabFormat: {
        "Upgrades": {
            content: [
                "main-display",
                "resource-display",
                "prestige-button",
                "blank",
                "upgrades"
            ],
        },
	"*Students*": {
          unlocked() { return (hasUpgrade('SCH', 25)) },
	    content: [
                "main-display",
		"blank",
		["display-text",
				function() {return 'You have ' + format(player.SCH.students) + ' MJ Students (based on MJs), which are boosting MJs by '+'×'+format(tmp.SCH.powerEff)+(hasUpgrade('p', 46)?" (Your super points are also boosting Upgrade Points by "+format(tmp.p.powerEff)+")":"")},
					{}],
		"resource-display",
                "prestige-button",
                "blank",
                "clickables"
            ],
        },
    },
    upgrades: {
        11: {
            title: "Everything Reset!!!!",
            description: "Here is a upgrade to help you recover: ×e1.000e6 MJ gain, keep Hyper MJ Upgrades again, ×100 Galactical MJs, ^1.01 MJs.",
            cost: new Decimal(1),
        },
        12: {
            title: "Boosts are needed",
            description: "Cube Super MJ gain",
            cost: new Decimal(2),
            unlocked() { return (hasUpgrade('SCH', 11)) },
	},
    	13: {
            title: "More Classes",
            description: "^1.15 MJ Point gain",
            cost: new Decimal(3),
            unlocked() { return (hasUpgrade('SCH', 12)) },
	},
    	14: {
            title: "Add Upstairs classes",
            description: "^1.1 MJ gain",
            cost: new Decimal(5),
            unlocked() { return (hasUpgrade('SCH', 13)) },
	},
        15: {
            title: "Fun time",
            description: "×e5.000e6 MJ gain",
            cost: new Decimal(15),
            unlocked() { return (hasUpgrade('SCH', 14)) },
	},
    	21: {
            title: "Add a backyard",
            description: "×e1.000e7 MJ Point gain",
            cost: new Decimal(55),
            unlocked() { return (hasUpgrade('SCH', 15)) },
	},
        22: {
            title: "Hyper Boost",
            description: "Multiply MJ gain based on Hyper MJs and keep MJ Click upgrade again.",
            cost: new Decimal(200),
	    effect(){
                return player.H.points.add(1).pow(25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	    unlocked() { return (hasUpgrade('SCH', 21)) },
	},
    	23: {
            title: ":)",
            description: "Square Hyper MJ gain",
            cost: new Decimal(1250),
            unlocked() { return (hasUpgrade('SCH', 22)) },
	},
        24: {
            title: "BIG",
            description: "^1.25 Super MJ Points",
            cost: new Decimal(10000),
            unlocked() { return (hasUpgrade('SCH', 23)) },
	},
    	25: {
            title: "Yay, unlock",
            description: "Unlock MJ Students",
            cost: new Decimal(35000000),
            unlocked() { return (hasUpgrade('SCH', 24)) },
	},
    },
})
