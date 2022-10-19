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
    // NOTE: config isn't defined yet when this function is declared!
    // config is defined in game.js, but utils.js gets run first.
    // This is ok because none of these functions will be called
    // until game.js is invoked to start Phaser running.
    return config.height - (tiles + 0.5) * TILE_SIZE
}
