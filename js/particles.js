const myParticle {
    image:"options_wheel.png",
    spread: 20,
    gravity: 2,
    time: 3,
    speed() { // Randomize speed a bit
        return (Math.random() + 1.2) * 8 
    },
    makeParticles(myParticle, 1),
}
