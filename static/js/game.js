let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
}

const TILE_SIZE = 40

let player
let gameOver = false
let cursors
let map
let holdingBlock = null
let facing = 'left'

let game = new Phaser.Game(config)

function preload() {
    this.load.image('bg', '/static/assets/city_PNG48.png')
    this.load.image('tiles', '/static/assets/drawtiles-spaced.png')
    this.load.tilemapCSV('map', '/static/assets/grid.csv')
    this.load.image('door', '/static/assets/door.png')
    this.load.spritesheet('player', '/static/assets/player.png', { frameWidth: 32, frameHeight: 40 })
}

function create() {
    this.add.image(600, 500, 'bg').setScale(3)
    let doors = this.physics.add.staticGroup()
    doors.create(convertTilesToXPixels(2), convertTilesToYPixels(6), 'door')
    map = this.make.tilemap({ key: 'map', tileWidth: TILE_SIZE, tileHeight: TILE_SIZE })
    let tileset = map.addTilesetImage('tiles', null, 32, 32, 1, 2)
    let layer = map.createLayer(0, tileset, TILE_SIZE, TILE_SIZE * 10)
    player = this.physics.add.sprite(convertTilesToXPixels(17), convertTilesToYPixels(5)-4, 'player')
    player.setCollideWorldBounds(true)
    this.physics.add.existing(player)
    this.physics.add.collider(player, layer)
    this.physics.add.overlap(player, doors, onLevelComplete, null, this)
    map.setCollisionByExclusion([0])


    this.anims.create({
        key: 'stand-left',
        frames: [ { key: 'player', frame: 0 } ],
        frameRate: 20
    })

    this.anims.create({
        key: 'stand-right',
        frames: [ { key: 'player', frame: 1 } ],
        frameRate: 20
    })

    this.anims.create({
        key: 'walk-left',
        frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'walk-right',
        frames: this.anims.generateFrameNumbers('player', { start: 4, end: 5 }),
        frameRate: 10,
        repeat: -1
    })

    cursors = this.input.keyboard.createCursorKeys()

}

function update ()
{
    if (gameOver)
    {
        return
    }

    if (cursors.left.isDown
        || cursors.right.isDown)
    {
        facing = cursors.left.isDown ? 'left' : 'right'
        player.setVelocityX(facing == 'left' ? -150 : 150)
        player.anims.play(`walk-${facing}`, true)
    }
    else
    {
        player.setVelocityX(0)
        player.anims.play(`stand-${facing}`, true)
    }

    if (Phaser.Input.Keyboard.JustDown(cursors.space) && player.body.blocked.down)
    {
        player.y -= 50
    }

    if (Phaser.Input.Keyboard.JustDown(cursors.down))
    {
        if (!holdingBlock){
            let point
            if (facing == 'left'){
                point = map.worldToTileXY(player.x - (TILE_SIZE + 2), player.y, true)
            }
            else if (facing == 'right'){
                point = map.worldToTileXY(player.x + (TILE_SIZE + 2), player.y, true)
            }
            if (map.getTileAt(point.x, point.y).index == 2
                && map.getTileAt(point.x, point.y -1).index == 0){
                map.putTileAt(0, point.x, point.y)
                player.setTint(0x00ff00)
                holdingBlock = this.add.image(0, 0, 'tiles')
                holdingBlock.setCrop(68, 0, 34, 34)
                holdingBlock.setSize(40, 40)
                holdingBlock.setScale(1.25)
            }
        }
        else {
            let point
            if (facing == 'left'){
                point = map.worldToTileXY(player.x - (TILE_SIZE + 2), player.y, true)
            }
            else if (facing == 'right'){
                point = map.worldToTileXY(player.x + (TILE_SIZE + 2), player.y, true)
            }
            if (map.getTileAt(point.x, point.y).index == 0){
                map.putTileAt(2, point.x, point.y)
                player.setTint(0xff0000)
                holdingBlock.destroy()
                holdingBlock = null
            }
            else if (map.getTileAt(point.x, point.y -1).index == 0){
                map.putTileAt(2, point.x, point.y -1)
                player.setTint(0xff0000)
                holdingBlock.destroy()
                holdingBlock = null
            }
        }
    }

    if (holdingBlock)
    {
        holdingBlock.x = player.x - TILE_SIZE
        holdingBlock.y = player.y - TILE_SIZE
    }
}

function onLevelComplete(){
    alert ("You're winner")
}

function convertTilesToXPixels(tiles){
    return (tiles + 0.5) * TILE_SIZE
}
function convertTilesToYPixels(tiles){
    return 800 - (tiles + 0.5) * TILE_SIZE
}
