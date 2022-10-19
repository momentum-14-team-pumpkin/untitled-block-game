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
