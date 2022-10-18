let config = {
    scale: {
        parent: 'gameDiv',
        mode: Phaser.Scale.FIT,
    },
    type: Phaser.AUTO,
    width: TILE_SIZE * 22,
    height: TILE_SIZE * 11.5,
    backgroundColor: "#87ceeb",
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
let startTimerText
let levelStart = null
let musicOn = true
let soundEffectsOn = true
const haxCode = "UUDDLRLR"
let level = 1
let timerDelay = 3000
let accelXL = -150
let accelXR = 150
let numOfLevels = 4
let speedRun = 0
let fullRunTime = 0

let groundAccel = 1000
let airAccel = 200

let keyB
let keyM

let game = new Phaser.Game(config)

let preloadReady
function preload() {
    preloadReady = false
    this.cache.json.remove('map-data')
    this.load.json('map-data', `/static/assets/levels/level-${level}.json`)
    this.load.spritesheet('door', '/static/assets/images/portal.png', { frameWidth: 40, frameHeight: 40 })
    this.load.spritesheet('player', '/static/assets/images/player.png', { frameWidth: 32, frameHeight: 40 })
    this.load.audio('pick', '/static/assets/audio/pickup.wav')
    this.load.audio('put', '/static/assets/audio/putdown.wav')
    this.load.audio('jump', '/static/assets/audio/jump.wav')
    this.load.audio('exit', '/static/assets/audio/door-open.wav')
    this.load.once('complete', () => {
        const mapData = this.cache.json.get('map-data')
        this.cache.tilemap.remove('map')
        this.cache.audio.remove('song')
        this.textures.remove('tiles')
        this.textures.remove('bg')
        this.load.image('tiles', `/static/assets/images/${mapData.tiles}`)
        this.load.tilemapCSV('map', `/static/assets/maps/${mapData.tile_data}`)
        this.load.audio('song', `/static/assets/audio/${mapData.song}`)
        this.load.image('bg', `/static/assets/images/${mapData.bg}`)
        this.load.start()
        this.load.once('complete', () => {
            preloadReady = true
            this.create()
        })
    })
}

function create() {
    if (!preloadReady) {
        return
    }

    const mapData = this.cache.json.get('map-data')
    this.add.image(config.width/2, config.height/2, 'bg').setScale(config.width/512)
    let doors = this.physics.add.staticSprite(convertTilesToXPixels(mapData.level_exit.x),
    convertTilesToYPixels(mapData.level_exit.y), 'door')
    map = this.make.tilemap({ key: 'map', tileWidth: TILE_SIZE, tileHeight: TILE_SIZE })
    player = this.physics.add.sprite(convertTilesToXPixels(mapData.player_start.x),
        convertTilesToYPixels(mapData.player_start.y) - 4, 'player')
    this.song = this.sound.add('song')
    this.song.loop = true
    groundAccel = mapData.accel.ground
    airAccel = mapData.accel.air
    if (musicOn) {
        this.song.play()
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
    
    keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
    keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
    keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B)
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N)
    keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)

    levelStart = null
    timeText = this.add.text(50, 30)
    startTimerText = this.add.text(config.width/2, 20, "", {font: "32px Futura", fill: '#fc7303'})

    if (holdingBlock) {
        acquireBlock(this)
    }

    this.anims.create({
        key: 'rotate',
        frames: this.anims.generateFrameNumbers('door', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    })

    doors.play('rotate')

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

function update (time, delta)
{
    if (!preloadReady || gameOver)
    {
        return
    }

    if (!levelStart) {
        levelStart = time
    }
    if((time - levelStart) < timerDelay){
        accelXL = 0
        accelXR = 0
        player.body.setVelocityX(0)
        startTimerText.setText(`${
            convertSecondsToTimeStringForDelay((levelStart - time + timerDelay) / 1000)
        }`)
    }
    if((time - levelStart) > timerDelay){
        accelXL = -150
        accelXR = 150
        startTimerText.destroy()
        timeText.setText(`Time: ${
            convertSecondsToTimestring((time - levelStart - timerDelay) / 1000)
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
    if (Phaser.Input.Keyboard.JustDown(keyE)){
        if (soundEffectsOn){
            soundEffectsOn = false
            return
        }
        if (!soundEffectsOn){
            soundEffectsOn = true
            return
        }
    }
    if (Phaser.Input.Keyboard.JustDown(keyR)){
        this.song.destroy()
        speedRun += (time - levelStart - timerDelay) / 1000
        this.scene.restart()
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
    const accelForce = player.body.blocked.down ? groundAccel : airAccel
    const velX = player.body.velocity.x
    if (cursors.left.isDown
        || cursors.right.isDown)
    {
        facing = cursors.left.isDown ? 'left' : 'right'
        player.setVelocityX(clamp(velX + delta / 1000 * (facing == 'left' ? -accelForce : accelForce), accelXL, accelXR))
        state = 'walk'
    }
    else
    {
        if (player.body.blocked.down)
        {
            const absVelX = Math.abs(velX)
            player.setVelocityX(velX - clamp(delta / 1000 * Math.sign(velX) * accelForce, -absVelX, absVelX))
        }
        state = 'stand'
    }
    player.anims.play(`${holdingBlock ? 'carry-' : ''}${state}-${facing}`, true)

    if (Phaser.Input.Keyboard.JustDown(cursors.space) && player.body.blocked.down)
    {
        player.setVelocityY(-350)
        if (soundEffectsOn){
            this.jumpSound.play()
        }
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
                acquireBlock(this)
                if (soundEffectsOn){
                    this.pickUpSound.play()
                }
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
                player.body.setSize(32, 40)
                holdingBlock.destroy()
                holdingBlock = null
                if (soundEffectsOn){
                    this.putDownSound.play()
                }
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
        if (!holdingBlock && Phaser.Input.Keyboard.JustDown(keyB)) {
            acquireBlock(this)
        }
        if (Phaser.Input.Keyboard.JustDown(keyN) && level < numOfLevels){
            this.song.destroy()
            level += 1
            this.scene.restart()
        }
        if (Phaser.Input.Keyboard.JustDown(keyP) && level > 1){
            this.song.destroy()
            level -= 1
            this.scene.restart()
        }
    }

    if (holdingBlock)
    {
        holdingBlock.x = player.x - TILE_SIZE - 2
        holdingBlock.y = player.y - TILE_SIZE
        player.body.setSize(32, 80).setOffset(0, -40)

    }

}

function onLevelComplete(){
    completionTime = (this.time.now - levelStart - timerDelay) / 1000 - 1 / 60
    speedRun = speedRun + completionTime
    this.song.destroy()
    if (soundEffectsOn){
        this.exitSound.play()
    }
    level += 1
    if (level > numOfLevels){
        fullRunTime = speedRun
        speedRun = 0
        alert ("YOU'RE WINNER OF GAME")
        let restartLevel = prompt("Do you want to restart the level?").toLowerCase()
        if (restartLevel == "y" || restartLevel == "yes"){
            level -= 1
        } else{
        alert ("Returning to first level")
        level = 1
    }
    } else {
        alert ("YOU'RE WINNER")
        let restartLevel = prompt("Do you want to restart the level?").toLowerCase()
        if (restartLevel == "y" || restartLevel == "yes"){
            level -= 1
        }
    }
    this.scene.restart()
}

function acquireBlock(game) {
    holdingBlock = game.add.image(0, 0, 'tiles')
    holdingBlock.setCrop(68, 0, 34, 34)
    holdingBlock.setSize(TILE_SIZE, TILE_SIZE)
    holdingBlock.setScale(1.25)
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
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

function convertSecondsToTimeStringForDelay(seconds) {
    seconds = String(Math.ceil(seconds)).padStart(1, '0')
    return `${seconds}`
}

function convertTilesToXPixels(tiles){
    return (tiles + 0.5) * TILE_SIZE
}
function convertTilesToYPixels(tiles){
    return config.height - (tiles + 0.5) * TILE_SIZE
}