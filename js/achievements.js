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
          },
          })
