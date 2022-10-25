"use strict"

const CONSTS = {
    HAX_CODE: 'UUDDLRLR',
    MAX_MAP_SIZE: 128,
    NUM_OF_LEVELS: 6,
    TILE_SIZE: 40,
    TIMER_DELAY: 5000,
}

for (const key in CONSTS) {
    window[key] = CONSTS[key]
}

export default CONSTS
