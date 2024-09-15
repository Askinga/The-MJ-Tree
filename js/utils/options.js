// ************ Options ************

let options = {}

function getStartOptions() {
	return {
		autosave: true,
		msDisplay: "always",
		theme: "default",
		hqTree: false,
		offlineProd: true,
		hideChallenges: false,
		showStory: true,
		forceOneTab: false,
		oldStyle: false,
		tooltipForcing: true,
		addictionMode: false,
		disabledTextFlickering: false,
		maxTickLen: "1h",
		disabledTextColorChange: false,
		resetOptions: false
	}
}

function makeid(length) {
	let result = '';
	const characters = options.disabledTextFlickering ? '?' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz?';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
	  result += characters.charAt(Math.floor(Math.random() * charactersLength));
	  counter += 1;
	}
	return result;
}

function toggleOpt(name) {
	if (name == "oldStyle" && styleCooldown > 0)
		return;
	if (name == "formatting") {
		changeFormat()
		return;
	}
	if (name == "resetOptions") {
		getStartOptions()
		return;
	}
	if (name == "maxTickLen") {
		changeMTL()
		return;
	}
	options[name] = !options[name];
	if (name == "hqTree")
		changeTreeQuality();
	if (name == "oldStyle")
		updateStyle();
}
var styleCooldown = 0;
function updateStyle() {
	styleCooldown = 1;
	let css = document.getElementById("styleStuff");
	css.href = options.oldStyle ? "oldStyle.css" : "style.css";
	needCanvasUpdate = true;
}
function changeTreeQuality() {
	var on = options.hqTree;
	document.body.style.setProperty('--hqProperty1', on ? "2px solid" : "4px solid");
	document.body.style.setProperty('--hqProperty2a', on ? "-4px -4px 4px rgba(0, 0, 0, 0.25) inset" : "-4px -4px 4px rgba(0, 0, 0, 0) inset");
	document.body.style.setProperty('--hqProperty2b', on ? "0px 0px 20px var(--background)" : "");
	document.body.style.setProperty('--hqProperty3', on ? "2px 2px 4px rgba(0, 0, 0, 0.25)" : "none");
}
function changeFormat() {
	switch (options.formatting) {
		case "default":
			options.formatting = "infinity";
			break;
		case "infinity":
			options.formatting = "exponent";
			break;
		case "exponent":
			options.formatting = "default";
			break;
		case "blind":
			options.formatting = "standard";
			break;
		case "standard":
			options.formatting = "default";
			break;
	}
}
function toggleAuto(toggle) {
	Vue.set(player[toggle[0]], [toggle[1]], !player[toggle[0]][toggle[1]]);
	needCanvasUpdate=true
}

const MS_DISPLAYS = ["ALL", "LAST, AUTO, INCOMPLETE", "AUTOMATION, INCOMPLETE", "INCOMPLETE", "NONE"];

const MS_SETTINGS = ["always", "last", "automation", "incomplete", "never"];

function adjustMSDisp() {
	options.msDisplay = MS_SETTINGS[(MS_SETTINGS.indexOf(options.msDisplay) + 1) % 5];
}
function milestoneShown(layer, id) {
	complete = player[layer].milestones.includes(id);
	auto = layers[layer].milestones[id].toggles;

	switch (options.msDisplay) {
		case "always":
			return true;
			break;
		case "last":
			return (auto) || !complete || player[layer].lastMilestone === id;
			break;
		case "automation":
			return (auto) || !complete;
			break;
		case "incomplete":
			return !complete;
			break;
		case "never":
			return false;
			break;
	}
	return false;
}
function format(decimal, precision = 2) {
	switch (options.formatting) {
		case "default":
			return defaultFormat(decimal, precision);
		case "infinity":
			return infFormat(decimal);
		case "exponent":
			return eFormat(decimal);
		case "blind":
			return "";
		case "standard":
			return standardFormat(decimal);
	}
}
function changeMTL() {
	switch (options.maxTickLen) {
		case "1h":
			options.maxTickLen = "3h"
			break;
		case "3h":
			options.maxTickLen = "10h"
			break;
		case "10h":
			options.maxTickLen = "10s"
			break;
		case "10s":
			options.maxTickLen = "1m"
			break;
		case "1m":
			options.maxTickLen = "5m"
			break;
		case "5m":
			options.maxTickLen = "30m"
			break;
		case "30m":
			options.maxTickLen = "1h"
			break;
	}
		}
