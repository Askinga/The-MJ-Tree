let easy = {
  width: "100px",
  height: "100px",
  "min-height": "100px",
  "font-size": "10px",
  "border-radius": "33%",
  "background-color": "#00aaff"
};
let normal = {
  width: "100px",
  height: "100px",
  "min-height": "100px",
  "font-size": "10px",
  "border-radius": "33%",
  "background-color": "#00aa00"
};
let hard = {
  width: "100px",
  height: "100px",
  "min-height": "100px",
  "font-size": "10px",
  "border-radius": "33%",
  "background-color": "#aa0000"
};

addLayer("d", {
    name: "Difficulty", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		difficulty: new Decimal(1),
		started: new Decimal(0),
    }},
    color: "#660000",
    requires: new Decimal("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee10"), // Can be a function that takes requirement increases into account
    resource: "Difficulty", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
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
	tabFormat: [
		["display-text", "<h2>Select difficulty...</h2>"],
		"blank",
		"clickables"
	],
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
	clickables: {
    11: {
		title: "EASY",
        display() {return "Easy mode: x2 all resources and points and ^1.01 points"},
        canClick(){ return true },
		onClick(){ 
			player.d.difficulty = new Decimal(0)
		},
		style(){
		   return { ...easy }
		},
    },
	12: {
		title: "NORMAL",
        display() {return "Normal mode: Normal TMT game"},
        canClick(){ return true },
		onClick(){ 
			player.d.difficulty = new Decimal(1)
		},
		style(){
		   return { ...normal }
		},
    },
	13: {
		title: "HARD",
        display() {return "Hard mode: /3 all resources and /3.33 points"},
        canClick(){ return true },
		onClick(){ 
			player.d.difficulty = new Decimal(2)
		},
		style(){
		   return { ...hard }
		},
    },
	},
})
