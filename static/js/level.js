"use strict"

class LevelScene extends Phaser.Scene {
    constructor() {
        super('LevelScene')

        this.gameOver = false
        this.holdingBlock = null
        this.facing = 'left'
        this.victory = false
        this.zomgHax = false
        this.haxProgress = 0
        this.levelStart = null
        this.musicOn = true
        this.soundEffectsOn = true
        this.level = 1
        this.accelXL = -150
        this.accelXR = 150
        this.speedRun = 0
        this.fullRunTime = 0
    }

    preload() {
        this.preloadReady = false
        this.cache.json.remove('map-data')
        this.load.json('map-data', `/static/assets/levels/level-${this.level}.json`)
        this.load.spritesheet('door', '/static/assets/images/portal.png', { frameWidth: 40, frameHeight: 40 })
        this.load.spritesheet('player', '/static/assets/images/player.png', { frameWidth: 32, frameHeight: 40 })
        this.load.audio('pick', '/static/assets/audio/pickup.wav')
        this.load.audio('put', '/static/assets/audio/putdown.wav')
        this.load.audio('jump', '/static/assets/audio/jump.wav')
        this.load.audio('exit', '/static/assets/audio/portal.wav')
        this.load.once('complete', () => {
            this.mapData = this.cache.json.get('map-data')
            this.cache.tilemap.remove('map')
            this.cache.audio.remove('song')
            this.textures.remove('tiles')
            this.textures.remove('bg')
            this.load.image('tiles', `/static/assets/images/${this.mapData.tiles}`)
            this.load.tilemapCSV('map', `/static/assets/maps/${this.mapData.tile_data}`)
            this.load.audio('song', `/static/assets/audio/${this.mapData.song}`)
            this.load.image('bg', `/static/assets/images/${this.mapData.bg}`)
            this.load.start()
            this.load.once('complete', () => {
                this.preloadReady = true
                this.create()
            })
        })
    }

    create() {
        if (!this.preloadReady) {
            return
        }

        this.add.image(this.game.config.width/2, this.game.config.height/2, 'bg').setScale(this.game.config.width/512)
        let doors = this.physics.add.staticSprite(convertTilesToXPixels(this.mapData.level_exit.x),
        convertTilesToYPixels(this.mapData.level_exit.y), 'door')
        this.map = this.make.tilemap({ key: 'map', tileWidth: TILE_SIZE, tileHeight: TILE_SIZE })
        this.player = this.physics.add.sprite(convertTilesToXPixels(this.mapData.player_start.x),
            convertTilesToYPixels(this.mapData.player_start.y) - 4, 'player')
        this.song = this.sound.add('song')
        this.song.loop = true
        if (this.musicOn) {
            this.song.play()
        }
        let tileset = this.map.addTilesetImage('tiles', null, 32, 32, 1, 2)
        let layer = this.map.createLayer(0, tileset, 0, 60)
        this.player.setCollideWorldBounds(true)
        this.physics.add.existing(this.player)
        this.physics.add.collider(this.player, layer)
        this.physics.add.overlap(this.player, doors, this.onLevelComplete, null, this)
        this.map.setCollisionByExclusion([0])
        this.pickUpSound = this.sound.add('pick')
        this.putDownSound = this.sound.add('put')
        this.jumpSound = this.sound.add('jump')
        this.exitSound = this.sound.add('exit').setVolume(0.2)
        
        this.keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B)
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        this.keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N)
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.modCtrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL)
    
        this.levelStart = null
        this.levelText = this.add.text(50, 15, "", {fill: "#ffffff", backgroundColor: "rgba(0, 0, 0, 1)"})
        this.timeText = this.add.text(50, 30, "", {fill: "#ffffff", backgroundColor: "rgba(0, 0, 0, 1)"})
        this.startTimerText = this.add.text(this.game.config.width/2, 20, "", {font: "32px Futura", fill: '#fc7303'})
    
        if (this.holdingBlock) {
            this.acquireBlock(this)
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
    
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update(time, delta)
    {
        if (!this.preloadReady || this.gameOver) {
            return
        }

        if (this.modCtrl.isDown && this.keyE.isDown) {
            this.song.stop()
            this.scene.start('EditorScene')
        }

        if (!this.levelStart) {
            this.levelStart = time
        }
        if((time - this.levelStart) < TIMER_DELAY){
            this.accelXL = 0
            this.accelXR = 0
            this.player.body.setVelocityX(0)
            this.startTimerText.setText(`${
                convertSecondsToTimeStringForDelay((this.levelStart - time + TIMER_DELAY) / 1000)
            }`)
        }
        if((time - this.levelStart) > TIMER_DELAY){
            this.levelText.setText(`Level: ${this.level}`)
            this.accelXL = -150
            this.accelXR = 150
            this.startTimerText.destroy()
            this.timeText.setText(`Time: ${
                convertSecondsToTimestring((time - this.levelStart - TIMER_DELAY) / 1000)
            }`)
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyM)){
            if (this.musicOn){
                this.song.stop()
                this.musicOn = false
                return
            }
            if (!this.musicOn){
                this.song.play()
                this.musicOn = true
                return
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyE)){
            if (this.soundEffectsOn){
                this.soundEffectsOn = false
                return
            }
            if (!this.soundEffectsOn){
                this.soundEffectsOn = true
                return
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyR)){
            this.song.destroy()
            this.speedRun += (time - this.levelStart - TIMER_DELAY) / 1000
            this.scene.restart()
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            this.advanceHax('L')
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            this.advanceHax('R')
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.advanceHax('U')
        }

        let state
        const accelForce = this.mapData.accel[this.player.body.blocked.down ? 'ground' : 'air']
        const velX = this.player.body.velocity.x
        if (this.cursors.left.isDown
            || this.cursors.right.isDown)
        {
            this.facing = this.cursors.left.isDown ? 'left' : 'right'
            this.player.setVelocityX(clamp(velX + delta / 1000 * (this.facing == 'left' ? -accelForce : accelForce), this.accelXL, this.accelXR))
            state = 'walk'
        }
        else
        {
            if (this.player.body.blocked.down)
            {
                const absVelX = Math.abs(velX)
                this.player.setVelocityX(velX - clamp(delta / 1000 * Math.sign(velX) * Math.abs(accelForce), -absVelX, absVelX))
            }
            state = 'stand'
        }
        this.player.anims.play(`${this.holdingBlock ? 'carry-' : ''}${state}-${this.facing}`, true)

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space) && this.player.body.blocked.down)
        {
            this.player.setVelocityY(-350)
            if (this.soundEffectsOn){
                this.jumpSound.play()
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.down))
        {
            if (!this.holdingBlock){
                let point
                if (this.facing == 'left'){
                    point = this.map.worldToTileXY(this.player.x - (TILE_SIZE + 2), this.player.y, true)
                }
                else if (this.facing == 'right'){
                    point = this.map.worldToTileXY(this.player.x + (TILE_SIZE + 2), this.player.y, true)
                }
                if (this.map.getTileAt(point.x, point.y).index == 2
                    && this.map.getTileAt(point.x, point.y -1).index == 0){
                    this.map.putTileAt(0, point.x, point.y)
                    this.acquireBlock(this)
                    if (this.soundEffectsOn){
                        this.pickUpSound.play()
                    }
                }
            }
            else {
                let point
                if (this.facing == 'left'){
                    point = this.map.worldToTileXY(this.player.x - (TILE_SIZE + 2), this.player.y, true)
                }
                else if (this.facing == 'right'){
                    point = this.map.worldToTileXY(this.player.x + (TILE_SIZE + 2), this.player.y, true)
                }
                if (this.map.getTileAt(point.x, point.y - 1).index == 0){
                    point.y--
                    while (this.map.getTileAt(point.x, point.y + 1).index == 0) {
                        point.y++
                    }
                    this.map.putTileAt(2, point.x, point.y)
                    this.player.body.setSize(32, 40)
                    this.holdingBlock.destroy()
                    this.holdingBlock = null
                    if (this.soundEffectsOn){
                        this.putDownSound.play()
                    }
                }
            }
            this.advanceHax('D')
        }

        if (this.zomgHax) {
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-400)
            }
            if (Phaser.Input.Keyboard.JustUp(this.cursors.up)) {
                this.player.setVelocityY(0)
            }
            if (!this.holdingBlock && Phaser.Input.Keyboard.JustDown(this.keyB)) {
                this.acquireBlock(this)
            }
            if (Phaser.Input.Keyboard.JustDown(this.keyN) && this.level < NUM_OF_LEVELS){
                this.song.destroy()
                this.level += 1
                this.scene.restart()
            }
            if (Phaser.Input.Keyboard.JustDown(this.keyP) && this.level > 1){
                this.song.destroy()
                this.level -= 1
                this.scene.restart()
            }
        }

        if (this.holdingBlock)
        {
            this.holdingBlock.x = this.player.x - TILE_SIZE - 2
            this.holdingBlock.y = this.player.y - TILE_SIZE
            this.player.body.setSize(32, 80).setOffset(0, -40)
        }
    }

    onLevelComplete(){
        this.completionTime = (this.time.now - this.levelStart - TIMER_DELAY) / 1000 - 1 / 60
        this.speedRun = this.speedRun + this.completionTime
        this.song.destroy()
        if (this.soundEffectsOn){
            this.exitSound.play()
        }
        this.level += 1
        if (this.level > NUM_OF_LEVELS){
            this.fullRunTime = this.speedRun
            this.speedRun = 0
            alert ("YOU'RE WINNER OF GAME")
            let restartLevel = prompt("Do you want to restart the level?").toLowerCase()
            if (restartLevel == "y" || restartLevel == "yes"){
                this.level -= 1
            } else{
            alert ("Returning to first level")
            this.level = 1
        }
        } else {
            alert ("YOU'RE WINNER")
            let restartLevel = prompt("Do you want to restart the level?").toLowerCase()
            if (restartLevel == "y" || restartLevel == "yes"){
                this.level -= 1
            }
        }
        this.scene.restart()
    }

    advanceHax(char) {
        if (this.zomgHax) {
            return
        }
        if (HAX_CODE[this.haxProgress] == char) {
            this.haxProgress++
            if (this.haxProgress == HAX_CODE.length) {
                this.zomgHax = true
            }
        } else {
            this.haxProgress = 0
        }
    }

    acquireBlock() {
        this.holdingBlock = this.add.image(0, 0, 'tiles')
        this.holdingBlock.setCrop(68, 0, 34, 34)
        this.holdingBlock.setSize(TILE_SIZE, TILE_SIZE)
        this.holdingBlock.setScale(1.25)
    }
}
