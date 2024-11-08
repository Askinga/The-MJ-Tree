addLayer("🏆", {
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
            name: "Addition!",
            done() { return (player.c.points.gte(3)) },
            tooltip: "Add the Addition layer",	   
        },
        13: {
            name: "Longer than expected",
            done() { return (player.c.points.gte(4)) },
            tooltip: "Compute for the 4th time",	   
        },
        14: {
            name: "Multiplication!",
            done() { return (player.c.points.gte(6)) },
            tooltip: "Add the Multiplication layer",	   
        },
        15: {
            name: "Timewall?",
            done() { return (player.c.points.gte(8)) },
            tooltip: "Compute for the 8th time",	   
        },
        16: {
            name: "Division!",
            done() { return (player.c.points.gte(10)) },
            tooltip: "Add the Division layer",	   
         },
    },
})
