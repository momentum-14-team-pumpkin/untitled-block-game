"use strict"

class EditorScene extends Phaser.Scene {
    constructor() {
        super('EditorScene')
    }

    create() {
        this.map = this.make.tilemap({
            width: MAX_MAP_SIZE,
            width: MAX_MAP_SIZE,
            tileWidth: TILE_SIZE,
            tileHeight: TILE_SIZE,
        })
    }
}
