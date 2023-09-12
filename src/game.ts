import { Map } from "./map"
import { Utility } from "./utility"



export class Game {
    map : Map
    
    constructor() {
        this.map = new Map()
        
        for (let i = 0; i < 9; i++) {
            let r = Utility.randint(0, 255)
            let g = Utility.randint(0, 255)
            let b = Utility.randint(0, 255)
            this.map.setTileTexture(i, `rgb(${r}, ${g}, ${b})`)
        }
    }
}
