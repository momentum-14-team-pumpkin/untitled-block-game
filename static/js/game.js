"use strict"

let config = {
    scale: {
        parent: 'gameDiv',
        mode: Phaser.Scale.FIT,
    },
    type: Phaser.AUTO,
    width: TILE_SIZE * 22,
    height: TILE_SIZE * 11.5,
    backgroundColor: "#000000",
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
        },
    },
    scene: [
        LevelScene,
        EditorScene,
    ],
}

window.addEventListener('message', event => {
    console.log(event)
}, false)

let game = new Phaser.Game(config)
