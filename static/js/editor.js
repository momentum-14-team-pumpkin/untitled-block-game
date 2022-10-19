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
        this.input.on('pointerdown', event => {
            this.placing = true
            this.placeTile(event)
        })
        this.input.on('pointermove', this.placeTile)
        this.input.on('pointerup', () => {
            this.placing = false
        })
    }

    placeTile(event) {
        if (!this.scene.placing) {
            return
        }
        this.scene.map.putTileAt(1,
            convertXPixelsToTiles(event.x),
            convertYPixelsToTiles(event.y))
    }
}
