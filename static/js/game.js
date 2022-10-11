let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
}

let player
let gameOver = false
let cursors
let map
let hasBlock = false
let facing = 'left'

let game = new Phaser.Game(config)

function preload() {
    this.load.image('bg', '/static/assets/city_PNG48.png')
    this.load.image('tiles', '/static/assets/drawtiles-spaced.png')
    this.load.tilemapCSV('map', '/static/assets/grid.csv')
    this.load.image('door', '/static/assets/door.png')
    this.load.spritesheet('dude', '/static/assets/dude.png', { frameWidth: 32, frameHeight: 40 })
}

function create() {
    this.add.image(600, 500, 'bg').setScale(3)
    this.add.image(convertTilesToXPixels(2), convertTilesToYPixels(6), 'door').setScale(40/256)
    map = this.make.tilemap({ key: 'map', tileWidth: 40, tileHeight: 40 })
    let tileset = map.addTilesetImage('tiles', null, 32, 32, 1, 2)
    let layer = map.createLayer(0, tileset, 40, 40*10)
    player = this.physics.add.sprite(convertTilesToXPixels(14), convertTilesToYPixels(5)-4, 'dude')
    player.setCollideWorldBounds(true)
    this.physics.add.existing(player)
    this.physics.add.collider(player, layer)
    map.setCollisionByExclusion([0])


    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    })

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
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

    if (cursors.left.isDown)
    {
        facing = 'left'
        player.setVelocityX(-150)

        player.anims.play('left', true)
    }
    else if (cursors.right.isDown)
    {
        facing = 'right'
        player.setVelocityX(150)

        player.anims.play('right', true) 

    } else {player.setVelocityX(0)}

    if (Phaser.Input.Keyboard.JustDown(cursors.space) && player.body.blocked.down)
    {
        player.y -= 50
    }

    if (Phaser.Input.Keyboard.JustDown(cursors.down))
    {
        if (!hasBlock){
            let point
            if (facing == 'left'){
                point = map.worldToTileXY(player.x -42, player.y, true)
            }
            else if (facing == 'right'){
                point = map.worldToTileXY(player.x +42, player.y, true)
            }
            if (map.getTileAt(point.x, point.y).index == 2
                && map.getTileAt(point.x, point.y -1).index == 0){
                map.putTileAt(0, point.x, point.y)
                player.setTint(0x00ff00)
                hasBlock = true
            }
        }
        else {
            let point
            if (facing == 'left'){
                point = map.worldToTileXY(player.x -42, player.y, true)
            }
            else if (facing == 'right'){
                point = map.worldToTileXY(player.x +42, player.y, true)
            }
            if (map.getTileAt(point.x, point.y).index == 0){
                map.putTileAt(2, point.x, point.y)
                player.setTint(0xff0000)
                hasBlock = false
            }
        }
    }
}

function convertTilesToXPixels(tiles){
    return tiles*40+20
}
function convertTilesToYPixels(tiles){
    return 780-tiles*40
}





