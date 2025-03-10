addLayer("A", {
    startData() { return {
        unlocked: true,
    }},
    color: "yellow",
    position: 1,
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    tabFormat: {
        "Achievements": {
            content: [
		"clickables",
                "achievements",
                "blank",
                ],
        },
    },
    achievements: {
        rows: 25,
        cols: 6,
        11: {
            name: "Start off",
            done() { return (player.points.gte(1)) },
            tooltip: "Get your first point.",	   
        },
        12: {
            name: "Exponents",
            done() { return (getBuyableAmount('p', 11).gte(1)) },
            tooltip: "Buy your first Exponent.",	   
        },
        13: {
            name: "Row 2 prestige upgrades done!",
            done() { return (hasUpgrade('p', 25)) },
            tooltip: "Buy the second row of prestige upgrades.",	   
        },
        14: {
            name: "Exponents 2",
            done() { return (getBuyableAmount('p', 11).gte(10)) },
            tooltip: "Buy 10 of the first Exponent.",	   
        },
        15: {
            name: "Super",
            done() { return (player.s.points.gte(1)) },
            tooltip: "Get 1 Super. Reward: x2 Points",	   
        },
        21: {
            name: "Exponents 3",
            done() { return (getBuyableAmount('p', 11).gte(25)) },
            tooltip: "Buy 25 of the first Exponent.",	   
        },
        22: {
            name: "Super is going kinda fast",
            done() { return (hasUpgrade('s', 15)) },
            tooltip: "Buy the first row of Super upgrades.",	   
        },
        23: {
            name: "Second row aleady done.",
            done() { return (hasUpgrade('s', 25)) },
            tooltip: "Buy the second row of Super upgrades.",	   
        },
        24: {
            name: "First upgrade that has a nerf",
            done() { return (hasUpgrade('s', 32)) },
            tooltip: "Buy Super Upgrade 12.",	   
        },
        25: {
            name: "Exponents 4",
            done() { return (getBuyableAmount('p', 11).gte(50)) },
            tooltip: "Buy 50 of the first Exponent.",	   
        },
        26: {
            name: "Mega!",
            done() { return (player.m.points.gte(1)) },
            tooltip: "Get 1 Mega. Reward: PERMANENTLY keep all prestige upgrade automation.",	   
        },
	31: {
            name: "More Mega!",
            done() { return (player.m.points.gte(5)) },
            tooltip: "Get 5 Mega. Reward: PERMANENTLY keep ALL prestige automation.",	   
        },
	32: {
            name: "Even More Mega!",
            done() { return (player.m.points.gte(25)) },
            tooltip: "Get 25 Mega.",	   
        },
	33: {
            name: "Row 1 mega upgrades done.",
            done() { return (hasUpgrade('m',15)) },
            tooltip: "Finish Row 1 Mega Upgrades.",	   
        },
	34: {
            name: "Exponents 5",
            done() { return (getBuyableAmount('p', 11).gte(70)) },
            tooltip: "Buy 70 of the first Exponent.",	   
        },
	35: {
            name: "Row 2 mega upgrades done.",
            done() { return (hasUpgrade('m',25)) },
            tooltip: "Finish Row 2 Mega Upgrades.",	   
        },
	36: {
            name: "Row 3 mega upgrades done.",
            done() { return (hasUpgrade('m',35)) },
            tooltip: "Finish Row 3 Mega Upgrades.",	   
        },
	41: {
            name: "Even More Mega 2!",
            done() { return (player.m.points.gte(2500)) },
            tooltip: "Get 2,500 Mega.",	   
        },
	42: {
            name: "Exponents 6",
            done() { return (getBuyableAmount('p', 11).gte(80)) },
            tooltip: "Buy 80 of the first Exponent.",	   
        },
	43: {
            name: "Even More Mega 3!",
            done() { return (player.m.points.gte(10000)) },
            tooltip: "Get 10,000 Mega.",	   
        },
	44: {
            name: "Row 4 mega upgrades done.",
            done() { return (hasUpgrade('m',45)) },
            tooltip: "Finish Row 4 Mega Upgrades.",	   
        },
	45: {
            name: "Ultra!",
            done() { return (player.u.points.gte(1)) },
            tooltip: "Get 1 Ultra. Reward: PERMANENTLY keep ALL super automation.",	   
        },
          },
          })
