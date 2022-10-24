"use strict"

const HAX_CODE = 'UUDDLRLR'
const MAX_MAP_SIZE = 128
const NUM_OF_LEVELS = 6
const TILE_SIZE = 40
const TIMER_DELAY = 5000
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
