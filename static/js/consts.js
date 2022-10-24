"use strict"

const CONSTS = {
    HAX_CODE: 'UUDDLRLR',
    MAX_MAP_SIZE: 128,
    NUM_OF_LEVELS: 5,
    TILE_SIZE: 40,
    TIMER_DELAY: 3000,
}

for (const key in CONSTS) {
    window[key] = CONSTS[key]
}

export default CONSTS
