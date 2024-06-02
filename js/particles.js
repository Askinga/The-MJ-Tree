const myParticle {
    image:"https://galaxy.click/pfp/medium/6431-1717368048961.webp",
    spread: 20,
    gravity: 2,
    time: 3,
    speed() { // Randomize speed a bit
        return (Math.random() + 1.2) * 8 
    },
}
