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
        this.resLevel = false
        this.levelComplete = false
    }

    preload() {
        this.preloadReady = false
        this.cache.json.remove('map-data')
        this.load.json('map-data', `/static/assets/levels/level-${this.level}.json`)
        this.load.spritesheet('door', '/static/assets/images/portal.png', { frameWidth: 40, frameHeight: 40 })
        this.load.audio('pick', '/static/assets/audio/pickup.wav')
        this.load.audio('put', '/static/assets/audio/putdown.wav')
        this.load.audio('jump', '/static/assets/audio/jump.mp3')
        this.load.audio('exit', '/static/assets/audio/portal.wav')
        this.load.image('restartBtn', '/static/assets/images/restart.png')
        this.load.image('nextBtn', '/static/assets/images/next.png')
        this.load.image('exitBtn', '/static/assets/images/exit.png')
        this.load.image('congrats', '/static/assets/images/congrats.png')
        this.load.image('rewind', '/static/assets/images/rewind.png')
        this.load.image('credits', '/static/assets/images/credits.png')
        this.load.image('alexis', '/static/assets/images/alexis.png')
        this.load.image('corey', '/static/assets/images/corey.png')
        this.load.image('stephen', '/static/assets/images/stephen.png')
        this.load.image('tom', '/static/assets/images/tom.png')
        this.load.image('thanks', '/static/assets/images/thanks.png')
        this.load.once('complete', () => {
            this.mapData = this.cache.json.get('map-data')
            this.cache.tilemap.remove('map')
            this.cache.audio.remove('song')
            this.textures.remove('tiles')
            this.textures.remove('bg')
            this.textures.remove('avatar')
            this.load.image('tiles', `/static/assets/images/${this.mapData.tiles}`)
            this.load.tilemapCSV('map', `/static/assets/maps/${this.mapData.tile_data}`)
            this.load.audio('song', `/static/assets/audio/${this.mapData.song}`)
            this.load.image('bg', `/static/assets/images/${this.mapData.bg}`)
            this.load.image('avatar', `/static/assets/images/${this.mapData.char.avatar}`)
            this.load.spritesheet(this.mapData.char.texture, `/static/assets/images/${this.mapData.char.texture}`, { frameWidth: 32, frameHeight: 40 })
            this.load.spritesheet(this.mapData.char.portal, `/static/assets/images/${this.mapData.char.portal}`, { frameWidth: 40, frameHeight: 40 })
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
        this.levelComplete = false
        this.avatar = this.add.image(790, 32, 'avatar').setScale(1).setOrigin(0.5, 0.5)
        this.avatar.visible = true
        this.add.image(0, 60, 'bg').setScale(0.5).setOrigin(0, 0)
        this.credits = this.add.image(this.game.config.width/2, this.game.config.height/2, 'credits').setScale(0.5).setOrigin(0.5, 0.5)
        this.credits.alpha = 0
        this.alexis = this.add.image(this.game.config.width/2, this.game.config.height/2, 'alexis').setScale(0.5).setOrigin(0.5, 0.5)
        this.alexis.alpha = 0
        this.corey = this.add.image(this.game.config.width/2, this.game.config.height/2, 'corey').setScale(0.5).setOrigin(0.5, 0.5)
        this.corey.alpha = 0
        this.stephen = this.add.image(this.game.config.width/2, this.game.config.height/2, 'stephen').setScale(0.5).setOrigin(0.5, 0.5)
        this.stephen.alpha = 0
        this.tom = this.add.image(this.game.config.width/2, this.game.config.height/2, 'tom').setScale(0.5).setOrigin(0.5, 0.5)
        this.tom.alpha = 0
        this.thanks = this.add.image(this.game.config.width/2, this.game.config.height/2, 'thanks').setScale(0.5).setOrigin(0.5, 0.5)
        this.thanks.alpha = 0
        let doors = this.physics.add.staticSprite(convertTilesToXPixels(this.mapData.level_exit.x),
        convertTilesToYPixels(this.mapData.level_exit.y), 'door')
        let portal = this.mapData.char.portal
        this.enter = this.physics.add.staticSprite(convertTilesToXPixels(this.mapData.player_start.x),
        convertTilesToYPixels(this.mapData.player_start.y), portal)
        this.map = this.make.tilemap({ key: 'map', tileWidth: TILE_SIZE, tileHeight: TILE_SIZE })
        this.map.checkedGetTileAt = checkedGetTileAt
        this.map.checkedPutTileAt = checkedPutTileAt
        this.cameras.main.setBounds(0, 0, this.map.width * TILE_SIZE, this.game.config.height)
        let player = this.mapData.char.texture
        this.player = this.physics.add.sprite(convertTilesToXPixels(this.mapData.player_start.x),
            convertTilesToYPixels(this.mapData.player_start.y) - 4, player)
        this.cameras.main.startFollow(this.player)
        this.song = this.sound.add('song')
        this.song.loop = true
        if (this.musicOn) {
            this.song.play()
        }
        let tileset = this.map.addTilesetImage('tiles', null, 32, 32, 1, 2)
        let layer = this.map.createLayer(0, tileset, 0, 60)
        this.player.setCollideWorldBounds(false)
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
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
        this.modCtrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL)
    
        this.levelStart = null
        this.levelText = this.add.text(40, 15, "", {fill: "#ffffff", backgroundColor: "rgba(0, 0, 0, 1)"})
        this.levelText.setScrollFactor(0)
        this.timeText = this.add.text(40, 30, "", {fill: "#ffffff", backgroundColor: "rgba(0, 0, 0, 1)"})
        this.timeText.setScrollFactor(0)
        this.startTimerText = this.add.text(this.game.config.width * 0.7, 15, "", {font: "32px Futura", fill: '#fc7303'})
        this.startTimerText.setScrollFactor(0)
        this.winText = this.add.text(config.width/2 - 80, 30, "", {font: "40px Futura", fill: "#ffffff", backgroundColor: "rgba(0, 0, 0, 1)"})
        this.winText.setScrollFactor(0)
        this.winGameText = this.add.image(config.width/2, 30, 'congrats').setScale(0.5)
        this.winGameText.visible = false
        this.winGameText.setScrollFactor(0)
        this.compLevelText = this.add.text(40, 15, "", {fill: "#ffff00", backgroundColor: "rgba(0, 0, 0, 1)"})
        this.compLevelText.setScrollFactor(0)
        this.compTimeText = this.add.text(40, 30, "", {fill: "#ffff00", backgroundColor: "rgba(0, 0, 0, 1)"})
        this.compTimeText.setScrollFactor(0)
        this.btnRestart = this.add.image(630, 30, 'restartBtn')
        this.btnRestart.setScale(0.25).setOrigin(0.5, 0.5)
        this.btnRestart.visible = false
        this.btnRestart.setScrollFactor(0)
        this.btnNext = this.add.image(790, 30, 'nextBtn')
        this.btnNext.setScale(0.25).setOrigin(0.5, 0.5)
        this.btnNext.visible = false
        this.btnNext.setScrollFactor(0)
        this.btnExit = this.add.image(790, 30, 'exitBtn')
        this.btnExit.setScale(0.25).setOrigin(0.5, 0.5)
        this.btnExit.visible = false
        this.btnExit.setScrollFactor(0)
        this.pauseText = this.add.text(
            config.width/2, config.height/2, "PAUSED", {fill: "#ffffff", backgroundColor: "rgba(255, 0, 0, 1)"}
        )
        this.pauseText.setOrigin(0.5, 0.5)
        this.pauseText.setScrollFactor(0)
        this.pauseText.visible = false
        this.pauseWarnText = this.add.text(
            config.width/2, config.height/2 + 15, "WARNING: TIME DOES NOT STOP", {fill: "#ffffff", backgroundColor: "rgba(255, 0, 0, 1)"}
        )
        this.pauseWarnText.setOrigin(0.5, 0.5)
        this.pauseWarnText.setScrollFactor(0)
        this.pauseWarnText.visible = false
        this.rewind = this.add.image(this.game.config.width/2, 30, 'rewind').setScale(1/4.5).setOrigin(0.5, 0.5)
        this.rewind.setScrollFactor(0)
        this.rewind.visible = false
        this.dialogue = this.add.text(20, 15, "", {fill: "#ffffff", backgroundColor: "rgba(0, 0, 0, 1)"})
        this.dialogue.visible = true
        this.avatar.setScrollFactor(0)
        this.undoStack = []
        
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

        this.anims.remove('playerEnter')

        this.anims.create({
            key: 'playerEnter',
            frames: this.anims.generateFrameNumbers(portal, { start: 0, end: 5 }),
            frameRate: 10,
        })

        this.anims.remove('stand-left')
    
        this.anims.create({
            key: 'stand-left',
            frames: [ { key: player, frame: 0 } ],
            frameRate: 20
        })

        this.anims.remove('stand-right')
    
        this.anims.create({
            key: 'stand-right',
            frames: [ { key: player, frame: 1 } ],
            frameRate: 20
        })

        this.anims.remove('walk-left')
    
        this.anims.create({
            key: 'walk-left',
            frames: this.anims.generateFrameNumbers(player, { start: 2, end: 5 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.remove('walk-right')
    
        this.anims.create({
            key: 'walk-right',
            frames: this.anims.generateFrameNumbers(player, { start: 6, end: 9 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.remove('carry-stand-left')
    
        this.anims.create({
            key: 'carry-stand-left',
            frames: [ { key: player, frame: 11 } ],
            frameRate: 20
        })

        this.anims.remove('carry-stand-right')
    
        this.anims.create({
            key: 'carry-stand-right',
            frames: [ { key: player, frame: 15 } ],
            frameRate: 20
        })

        this.anims.remove('carry-walk-left')
    
        this.anims.create({
            key: 'carry-walk-left',
            frames: this.anims.generateFrameNumbers(player, { start: 10, end: 13 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.remove('carry-walk-right')
    
        this.anims.create({
            key: 'carry-walk-right',
            frames: this.anims.generateFrameNumbers(player, { start: 14, end: 17 }),
            frameRate: 10,
            repeat: -1
        })

        this.enter.play('playerEnter')
    
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update(time, delta)
    {
        if (!this.preloadReady || this.gameOver) {
            return
        }

        let justDown = {}
        justDown[this.keyP] = Phaser.Input.Keyboard.JustDown(this.keyP)

        if (this.modCtrl.isDown && this.keyE.isDown) {
            this.song.stop()
            this.scene.start('EditorScene')
        }

        if (!this.levelStart) {
            this.levelStart = time
        }
        if((time - this.levelStart) < TIMER_DELAY && !this.levelComplete){
            this.accelXL = 0
            this.accelXR = 0
            this.player.visible = false
            this.player.body.setVelocityX(0)
            this.jumpSound.setMute(true)
            this.startTimerText.setText(`${
                convertSecondsToTimeStringForDelay((this.levelStart - time + TIMER_DELAY) / 1000)
            }`)
            if (this.level === NUM_OF_LEVELS){
                this.dialogue.setText(
                    `Prof Pretzel:   "I'm back home! What a relief!"
                "I need to watch where I'm walking!"`,
                    {font: "6px Futura", fill: "#ffffff", backgroundColor: "rgba(0, 0, 0, 1)"}
                    )
                this.startTimerText.setText("")
            }else if (this.level === 2){
                this.dialogue.setText(
                    `Prof Pretzel:   "Where am I? WHO am I?"
                "I need to get back!"`,
                    {font: "6px Futura", fill: "#ffffff", backgroundColor: "rgba(0, 0, 0, 1)"}
                    )
            } else if (this.level === 3){
                this.dialogue.setText(
                    `Prof Pretzel:   "Now I'm a viking and my puzzle is an axe?!"
                "Matter is changing based on time period!"`,
                    {font: "6px Futura", fill: "#ffffff", backgroundColor: "rgba(0, 0, 0, 1)"}
                    )
            } else if (this.level === 4){
                this.dialogue.setText(
                    `Prof Pretzel:   "My puzzlebook is altering the environment 
                 when it goes through the portal!"`,
                    {font: "6px Futura", fill: "#ffffff", backgroundColor: "rgba(0, 0, 0, 1)"}
                    )
            } else if (this.level === 5){
                this.dialogue.setText(
                    `Prof Pretzel:   "It's based on speed! Of course!"
                "I need to solve the puzzles quickly!"`,
                    {font: "6px Futura", fill: "#ffffff", backgroundColor: "rgba(0, 0, 0, 1)"}
                    )
            } else {
                this.dialogue.setText(
                    `Prof Pretzel:   "I fell into the portal!"
                "Maybe that portal will take me back!"`,
                    {font: "60px Futura", fill: "#ffffff", backgroundColor: "rgba(0, 0, 0, 1)"}
                    )
            }
            
        }
        if((time - this.levelStart) > TIMER_DELAY && !this.levelComplete){
            this.dialogue.visible = false
            this.avatar.destroy()
            this.levelText.setText(`Level: ${this.level}`)
            this.accelXL = -150
            this.accelXR = 150
            this.enter.visible = false
            this.jumpSound.setMute(false)
            if(!this.levelComplete){
                this.player.visible = true
            }
            this.startTimerText.destroy()
            this.timeText.setText(`Time: ${
                convertSecondsToTimestring((time - this.levelStart - TIMER_DELAY) / 1000)
            }`)
            if(this.level == NUM_OF_LEVELS){
                this.levelText.setText("")
                this.timeText.setText("")
                this.winGameText.visible = true
                if((time - this.levelStart) > TIMER_DELAY * 1.3){
                    this.credits.alpha = 1
                }
                if((time - this.levelStart) > TIMER_DELAY * 2){
                    this.credits.alpha = 0.5
                }
                if((time - this.levelStart) > TIMER_DELAY * 2.1){
                    this.credits.alpha = 0
                }
                if((time - this.levelStart) > TIMER_DELAY * 2.3){
                    this.alexis.alpha = 1
                }
                if((time - this.levelStart) > TIMER_DELAY * 3){
                    this.alexis.alpha = 0.5
                }
                if((time - this.levelStart) > TIMER_DELAY * 3.1){
                    this.alexis.alpha = 0
                }
                if((time - this.levelStart) > TIMER_DELAY * 3.3){
                    this.corey.alpha = 1
                }
                if((time - this.levelStart) > TIMER_DELAY * 4){
                    this.corey.alpha = 0.5
                }
                if((time - this.levelStart) > TIMER_DELAY * 4.1){
                    this.corey.alpha = 0
                }
                if((time - this.levelStart) > TIMER_DELAY * 4.3){
                    this.stephen.alpha = 1
                }
                if((time - this.levelStart) > TIMER_DELAY * 5){
                    this.stephen.alpha = 0.5
                }
                if((time - this.levelStart) > TIMER_DELAY * 5.1){
                    this.stephen.alpha = 0
                }
                if((time - this.levelStart) > TIMER_DELAY * 5.3){
                    this.tom.alpha = 1
                }
                if((time - this.levelStart) > TIMER_DELAY * 6){
                    this.tom.alpha = 0.5
                }
                if((time - this.levelStart) > TIMER_DELAY * 6.1){
                    this.tom.alpha = 0
                }
                if((time - this.levelStart) > TIMER_DELAY * 6.3){
                    this.thanks.alpha = 1
                }
            }
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
        if (justDown[this.keyP] && !this.modCtrl.isDown) {
            this.physics.world.isPaused ^= true
            if (this.physics.world.isPaused) {
                this.pauseText.visible = true
                this.pauseWarnText.visible = true
                this.anims.pauseAll()
            } else {
                this.pauseText.visible = false
                this.pauseWarnText.visible = false
                this.anims.resumeAll()
            }
        }
        if (this.physics.world.isPaused) {
            return
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyR)){
            this.holdingBlock = null
            if (!this.levelComplete) {
                this.song.destroy()
                this.speedRun += (time - this.levelStart - TIMER_DELAY) / 1000
            }
            else {
                this.level--
            }
            this.scene.restart()
        }

        if (this.keyZ.isDown && !this.levelComplete && (time - this.levelStart) > TIMER_DELAY) {
            // continuous undo
            let undoFrame = this.undoStack.pop()
            if (undoFrame) {
                if (this.level != NUM_OF_LEVELS){
                    this.rewind.visible = true
                }
                this.player.setX(undoFrame.position.x)
                this.player.setY(undoFrame.position.y)
                this.player.setVelocityX(undoFrame.velocity.x)
                this.player.setVelocityY(undoFrame.velocity.y)
                this.player.setTexture(this.mapData.char.texture, undoFrame.currFrame)
                this.facing = undoFrame.facing
                let point
                if (point = undoFrame.tookBlock) {
                    if (this.holdingBlock) {
                        this.holdingBlock.destroy()
                    }
                    this.holdingBlock = null
                    this.map.checkedPutTileAt(2, point.x, point.y)
                }
                if (point = undoFrame.placedBlock) {
                    this.acquireBlock()
                    this.map.checkedPutTileAt(0, point.x, point.y)
                }
                if (this.holdingBlock)
                {
                    this.holdingBlock.x = this.player.x - TILE_SIZE - 2
                    this.holdingBlock.y = this.player.y - TILE_SIZE
                }
                return
            }
        }
        this.rewind.visible = false

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
            this.bumpPlayer()
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

        let undoFrame = {
            position: {
                x: this.player.x,
                y: this.player.y,
            },
            velocity: {
                x: this.player.body.velocity.x,
                y: this.player.body.velocity.y,
            },
            facing: this.facing,
            currFrame: this.player.anims.currentFrame.textureFrame,
        }
        this.undoStack.push(undoFrame)

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
                if (this.map.checkedGetTileAt(point.x, point.y).index == 2
                    && this.map.checkedGetTileAt(point.x, point.y -1).index == 0){
                    this.map.checkedPutTileAt(0, point.x, point.y)
                    this.acquireBlock(this)
                    undoFrame.tookBlock = {
                        x: point.x,
                        y: point.y,
                    }
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
                if (this.map.checkedGetTileAt(point.x, point.y - 1).index == 0){
                    point.y--
                    while (this.map.checkedGetTileAt(point.x, point.y + 1).index == 0) {
                        point.y++
                    }
                    this.map.checkedPutTileAt(2, point.x, point.y)
                    this.player.body.setSize(32, 40)
                    this.holdingBlock.destroy()
                    this.holdingBlock = null
                    undoFrame.placedBlock = {
                        x: point.x,
                        y: point.y,
                    }
                    if (this.soundEffectsOn){
                        this.putDownSound.play()
                    }
                }
            }
            this.advanceHax('D')
        }

        if (this.cleanup && Phaser.Input.Keyboard.JustDown(this.keyN)){
            this.cleanup()
        } else if (this.zomgHax) {
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
            if (this.modCtrl.isDown && justDown[this.keyP] && this.level > 1){
                this.song.destroy()
                this.level -= 1
                this.scene.restart()
            }
        }

        if (this.holdingBlock)
        {
            this.holdingBlock.x = this.player.x - TILE_SIZE - 2
            this.holdingBlock.y = this.player.y - TILE_SIZE
        }
    }

    onLevelComplete(){
        if (this.levelComplete){
            return
        }
        this.levelComplete = true
        this.avatar.visible = false
        this.player.visible = false
        this.player.body.destroy()
        if (this.level == NUM_OF_LEVELS){
            this.completionTime = 0
        } else {
            this.completionTime = (this.time.now - this.levelStart - TIMER_DELAY) / 1000 - 1 / 60
        }
        this.speedRun = this.speedRun + this.completionTime
        let iframe = document.createElement('iframe')
        iframe.src = `/leaderboard${this.level}?inline=true/`
        iframe.style = 'width: 100%; height: 100%; pointer-events: none; position: absolute; left: 0; right: 0;'
        document.querySelector('#gameDiv').append(iframe)
        if (this.soundEffectsOn){
            this.exitSound.play()
        }
        iframe.remove()
        if (!this.zomgHax) {
            submitTime(this.completionTime, this.level)
        }
        this.level += 1
        if (this.level > NUM_OF_LEVELS){
            this.fullRunTime = this.speedRun
            this.speedRun = 0
            if (!this.zomgHax) {
                submitTime(this.fullRunTime)
            }
            this.winGameText.visible = true
            this.btnExit.visible = true
            this.btnExit.setInteractive()
            this.btnExit.on('pointerup', () => {
                window.parent.postMessage({
                    kind: 'wonGame',
                })
            })
            
            this.credits.alpha = 0
            this.alexis.alpha = 0
            this.corey.alpha = 0
            this.stephen.alpha = 0
            this.tom.alpha = 0
            this.thanks.alpha = 1
            
        } else {
            this.winText.setText("LEVEL COMPLETE!")
            this.winText.setOrigin(0.5, 0.5)
            let cleanup = () => {
                iframe.remove()
                this.scene.restart()
                this.cleanup = undefined
            }
            this.cleanup = cleanup
            this.compLevelText.setText(`Level: ${this.level - 1}`)
            this.compTimeText.setText(`Time: ${convertSecondsToTimestring(this.completionTime)}`)
            this.btnRestart.visible = true
            this.btnRestart.setInteractive()
            this.btnRestart.on('pointerup', () => {
                this.level -= 1
                cleanup()
            })
            this.btnNext.visible = true
            this.btnNext.setInteractive()
            this.btnNext.on('pointerup', () =>  {
                cleanup()
            })
        }
        this.song.destroy()
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
        this.player.body.setSize(32, 80).setOffset(0, -40)
        this.holdingBlock = this.add.image(0, 0, 'tiles')
        this.holdingBlock.setCrop(68, 0, 34, 34)
        this.holdingBlock.setSize(TILE_SIZE, TILE_SIZE)
        this.holdingBlock.setScale(1.25)
    }

    bumpPlayer() {
        // player bump - if the player is moving against a 1- or 2-tile high gap,
        // bump them over so they're aligned with the gap vertically
        // and slightly into it horizontally
        const bumpDir = this.facing == 'left' ? -1 : 1

        // don't cause a player bump if the player is grounded
        // or has no block
        if (this.player.body.blocked.down
            || !this.holdingBlock) {
            return
        }

        // only allow player bump if the player is (nearly) flush with a tile horizontally
        const playerModPosX = this.player.x % TILE_SIZE
        if (this.facing == 'left') {
            if (playerModPosX < 15.75 || playerModPosX > 16.25) {
                return
            }
        } else {
            if (playerModPosX < 23.75 || playerModPosX > 24.25) {
                return
            }
        }

        // only allow player bump if the player is (more or less) flush with a tile vertically
        const playerModPosY = this.player.y % TILE_SIZE
        if (playerModPosY > 6) {
            return
        }

        // check for exact-height gap (1 block without a held block, 2 blocks with)
        const gapX = convertXPixelsToTiles(this.player.x) + bumpDir
        const exactGapHeight = this.holdingBlock ? 2 : 1
        for (let i = -1; i <= exactGapHeight; i++) {
            const gapY = convertYPixelsToTiles(this.player.y) + i
            const expectBlock = i < 0 || i == exactGapHeight
            if ((this.map.checkedGetTileAt(gapX, gapY).index != 0) != expectBlock) {
                return
            }
        }

        // exact-height gap get! bump player over slightly
        this.player.y = Math.floor(this.player.y / TILE_SIZE) * TILE_SIZE
        this.player.x += bumpDir * 8
        this.player.setVelocityX(this.player.body.velocity.x + bumpDir * 100)
        this.player.setVelocityY(0)
    }
}
