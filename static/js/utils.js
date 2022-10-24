function checkedGetTileAt(x, y) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
        return 0
    }
    return this.getTileAt(x, y)
}

function checkedPutTileAt(tile, x, y) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
        return false
    }
    this.putTileAt(tile, x, y)
    return true
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
}

function convertSecondsToTimestring(seconds) {
    let hours = Math.floor(seconds / 3600)
    seconds -= hours * 3600
    let minutes = Math.floor(seconds / 60)
    if (hours) {
        minutes = String(minutes).padStart(2, '0')
    }
    seconds -= minutes * 60
    let fracSecs = seconds % 1
    seconds = String(Math.floor(seconds)).padStart(2, '0')
    fracSecs = fracSecs.toFixed(3).slice(-4)
    if (hours) {
        return `${hours}:${minutes}:${seconds}${fracSecs}`
    } else {
        return `${minutes}:${seconds}${fracSecs}`
    }
}

function convertSecondsToTimeStringForDelay(seconds) {
    seconds = String(Math.ceil(seconds)).padStart(1, '0')
    return `${seconds}`
}

function convertTilesToXPixels(tiles){
    return (tiles + 0.5) * TILE_SIZE
}
function convertTilesToYPixels(tiles){
    // NOTE: config isn't defined yet when this function is declared!
    // config is defined in game.js, but utils.js gets run first.
    // This is ok because none of these functions will be called
    // until game.js is invoked to start Phaser running.
    return config.height - (tiles + 0.5) * TILE_SIZE
}

function convertXPixelsToTiles(pixels) {
    return Math.round(pixels / TILE_SIZE - 0.5)
}

function convertYPixelsToTiles(pixels) {
    // TODO: figure out correct tile offset
    return Math.floor(pixels / TILE_SIZE - 2.5)
}
