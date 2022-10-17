const TILE_SIZE = 40

let config = {
    scale: {
        parent: 'gameDiv',
        mode: Phaser.Scale.FIT,
    },
    type: Phaser.AUTO,
    width: TILE_SIZE * 22,
    height: TILE_SIZE * 11.5,
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


let player
let gameOver = false
let cursors
let map
let holdingBlock = null
let facing = 'left'
let victory = false
let zomgHax = false
let haxProgress = 0
let timeText
let levelStart = null
let musicOn = true
const haxCode = "UUDDLRLR"
let level = 0

let game = new Phaser.Game(config)

function preload() {
    this.load.image('bg', '/static/assets/city_PNG48.png')
    this.load.image('tiles', '/static/assets/drawtiles-spaced.png')
    this.load.tilemapCSV('map', '/static/assets/grid.csv')
    this.load.tilemapCSV('newlevel', '/static/assets/newlevel.csv')
    this.load.image('door', '/static/assets/door.png')
    this.load.spritesheet('player', '/static/assets/player.png', { frameWidth: 32, frameHeight: 40 })
    this.load.audio('pick', '/static/assets/audio/pickup.wav')
    this.load.audio('put', '/static/assets/audio/putdown.wav')
    this.load.audio('jump', '/static/assets/audio/jump.wav')
    this.load.audio('song', '/static/assets/audio/Level1.mp3')
    this.load.audio('exit', '/static/assets/audio/door-open.wav')
    this.load.audio('song2', '/static/assets/audio/backgroundMusic.mp3')

}

function create() {
    this.add.image(config.width/2, config.height/2, 'bg').setScale(config.width/512)
    let doors = this.physics.add.staticGroup()
    player = this.physics.add.sprite(convertTilesToXPixels(17), convertTilesToYPixels(5)-4, 'player')
    if (level == 0){
        map = this.make.tilemap({ key: 'map', tileWidth: TILE_SIZE, tileHeight: TILE_SIZE })
        doors.create(convertTilesToXPixels(2), convertTilesToYPixels(6), 'door')
        this.song = this.sound.add('song')
        this.song.loop = true
        this.song.play()
    }
    if (level == 1){
        map = this.make.tilemap({ key: 'newlevel', tileWidth: TILE_SIZE, tileHeight: TILE_SIZE })
        doors.create(convertTilesToXPixels(22), convertTilesToYPixels(7), 'door')
        this.song2 = this.sound.add('song2')
        this.song2.loop = true
        this.song2.play()
    }
    let tileset = map.addTilesetImage('tiles', null, 32, 32, 1, 2)
    let layer = map.createLayer(0, tileset, 0, 60)
    player.setCollideWorldBounds(true)
    this.physics.add.existing(player)
    this.physics.add.collider(player, layer)
    this.physics.add.overlap(player, doors, onLevelComplete, null, this)
    map.setCollisionByExclusion([0])
    this.pickUpSound = this.sound.add('pick')
    this.putDownSound = this.sound.add('put')
    this.jumpSound = this.sound.add('jump')
    this.exitSound = this.sound.add('exit')
    
    keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
    timeText = this.add.text(50, 20)


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
        frames: this.anims.generateFrameNumbers('player', { start: 2, end: 5 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'walk-right',
        frames: this.anims.generateFrameNumbers('player', { start: 6, end: 9 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'carry-stand-left',
        frames: [ { key: 'player', frame: 11 } ],
        frameRate: 20
    })

    this.anims.create({
        key: 'carry-stand-right',
        frames: [ { key: 'player', frame: 15 } ],
        frameRate: 20
    })

    this.anims.create({
        key: 'carry-walk-left',
        frames: this.anims.generateFrameNumbers('player', { start: 10, end: 13 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'carry-walk-right',
        frames: this.anims.generateFrameNumbers('player', { start: 14, end: 17 }),
        frameRate: 10,
        repeat: -1
    })

    cursors = this.input.keyboard.createCursorKeys()
}

function update (time)
{
    if (gameOver)
    {
        return
    }
    else
    {
        if (!levelStart) {
            levelStart = time
        }
        timeText.setText(`Time: ${
            convertSecondsToTimestring((time - levelStart) / 1000)
        }`)
    }

    if (Phaser.Input.Keyboard.JustDown(keyM)){
        if (musicOn){
            this.song.stop()
            musicOn = false
            return
        }
        if (!musicOn){
            this.song.play()
            musicOn = true
            return
        }
    }

    function advanceHax(char) {
        if (zomgHax) {
            return
        }
        if (haxCode[haxProgress] == char) {
            haxProgress++
            if (haxProgress == haxCode.length) {
                zomgHax = true
            }
        } else {
            haxProgress = 0
        }
    }

    if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
        advanceHax('L')
    }
    else if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
        advanceHax('R')
    }
    else if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
        advanceHax('U')
    }

    let state
    if (cursors.left.isDown
        || cursors.right.isDown)
    {
        facing = cursors.left.isDown ? 'left' : 'right'
        player.setVelocityX(facing == 'left' ? -150 : 150)
        state = 'walk'
    }
    else
    {
        player.setVelocityX(0)
        state = 'stand'
    }
    player.anims.play(`${holdingBlock ? 'carry-' : ''}${state}-${facing}`, true)

    if (Phaser.Input.Keyboard.JustDown(cursors.space) && player.body.blocked.down)
    {
        player.setVelocityY(-350)
        this.jumpSound.play()

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
                holdingBlock = this.add.image(0, 0, 'tiles')
                holdingBlock.setCrop(68, 0, 34, 34)
                holdingBlock.setSize(TILE_SIZE, TILE_SIZE)
                holdingBlock.setScale(1.25)
                this.pickUpSound.play()
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
            if (map.getTileAt(point.x, point.y - 1).index == 0){
                point.y--
                while (map.getTileAt(point.x, point.y + 1).index == 0) {
                    point.y++
                }
                map.putTileAt(2, point.x, point.y)
                holdingBlock.destroy()
                holdingBlock = null
                this.putDownSound.play()
            }
        }
        advanceHax('D')
    }

    if (zomgHax) {
        if (cursors.up.isDown) {
            player.setVelocityY(-400)
        }
        if (Phaser.Input.Keyboard.JustUp(cursors.up)) {
            player.setVelocityY(0)
        }
    }

    if (holdingBlock)
    {
        holdingBlock.x = player.x - TILE_SIZE - 2
        holdingBlock.y = player.y - TILE_SIZE
    }

}

function onLevelComplete(){
    // if (victory) {
    //     return
    // }
    this.song.destroy()
    this.exitSound.play()
    level += 1
    if (level > 1){
        alert ("YOU'RE WINNER OF GAME")
        level = 0
    } else {
        alert ("YOU'RE WINNER")
        let restartLevel = prompt("Do you want to restart the level?").toLowerCase()
        if (restartLevel == "y" || restartLevel == "yes"){
            level -= 1
        }
    }
    // victory = true
    this.scene.restart()
}

function convertSecondsToTimestring(seconds) {
    let hours = String(Math.floor(seconds / 3600))
    seconds -= hours * 3600
    let minutes = String(Math.floor(seconds / 60)).padStart(2, '0')
    seconds -= minutes * 60
    let fracSecs = seconds % 1
    seconds = String(Math.floor(seconds)).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}${fracSecs.toFixed(3).slice(-4)}`
}

function convertTilesToXPixels(tiles){
    return (tiles - 0.5) * TILE_SIZE
}
function convertTilesToYPixels(tiles){
    return config.height - (tiles + 0.5) * TILE_SIZE
}

const axios = require('axios')

async function doPostRequest() {
    
    let params = {
        'id' : id,
        'username' : username,
        'time': timeForLevel,
    }

    let res = await axios.post('https://young-plateau-94674.herokuapp.com/times/')
    let data =res.data
}
if (victory) {
    doPostRequest()
}