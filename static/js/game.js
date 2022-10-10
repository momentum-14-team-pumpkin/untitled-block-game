let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
        },
    },
    scene: {
        preload: preload,
        create: create,
    },
}

let game = new Phaser.Game(config)

function preload() {
    this.load.image('bg', '/static/assets/background.png')
    this.load.image('tiles', '/static/assets/drawtiles-spaced.png')
    this.load.tilemapCSV('map', '/static/assets/grid.csv')
}

let platforms

function create() {
    this.add.image(600, 400, 'bg').setScale(1200/1920)
    var map = this.make.tilemap({ key: 'map', tileWidth: 40, tileHeight: 40 })
    var tileset = map.addTilesetImage('tiles', null, 32, 32, 1, 2)
    var layer = map.createLayer(0, tileset, 40, 40*10)
    // this.cameras.main.setScroll(-960,-540)
    // this.cameras.main.setZoom(32)


}

