import { Dom } from "./utility"
import "./styles.css"
import { GameState } from "./game"


type Tile = {
    element: HTMLDivElement
}


export class Map {
    element : HTMLDivElement
    tiles   : Tile[]
    scroll  : {x: number, y: number}
    
    constructor() {
        this.element = Dom.div(document.body, 'map')
        this.tiles = []
        this.scroll = {x: 20, y: 20}
        
        // Initialize the array of tiles
        for (let i=0; i<25; i++) {
            this.tiles.push({
                element: Dom.div(this.element, 'tile')
            })
        }
    }
    
    setTileTexture(index: number, color: string): void {
        this.tiles[index].element.style.backgroundColor = color
    }
    
    update(state: GameState) {
        let speed = 4
        
        if (state.keys.left)  this.scroll.x += speed
        if (state.keys.right) this.scroll.x -= speed
        if (state.keys.up)    this.scroll.y += speed
        if (state.keys.down)  this.scroll.y -= speed
        
        this.element.style.left = `calc(${this.scroll.x}px + 50% - var(--map-size) / 2)`
        this.element.style.top  = `calc(${this.scroll.y}px + 50% - var(--map-size) / 2)`
    }
}


