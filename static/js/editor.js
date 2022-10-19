"use strict"

class EditorScene extends Phaser.Scene {
    constructor() {
        super('EditorScene')
    }

    preload() {
        this.load.image('tiles', '/static/assets/images/drawtiles-spaced.png')
    }

    create() {
        this.map = this.make.tilemap({
            width: MAX_MAP_SIZE,
            height: MAX_MAP_SIZE,
            tileWidth: TILE_SIZE,
            tileHeight: TILE_SIZE,
        })
        let tileset = this.map.addTilesetImage('tiles', null, 32, 32, 1, 2)
        this.map.createBlankLayer('level', tileset, 0, 60, MAX_MAP_SIZE, MAX_MAP_SIZE)
    }
}
