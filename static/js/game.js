let config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
        },
    },
    scene: {
        preload: preload
    },
}

function preload() {
    this.load.image('bg', 'static/assets/background.png')
}
