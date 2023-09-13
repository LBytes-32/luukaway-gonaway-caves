import { Dom } from "./utility"
import { GameState } from "./game"
import "./styles.css"

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
        this.scroll = {x: 0, y: 0}
        
        // Initialize the array of tiles
        for (let i=0; i<25; i++) {
            this.tiles.push({
                element: Dom.div(this.element, 'tile')
            })
            this.tiles[i].element.textContent = `${i}`
        }
    }
    
    setTileTexture(index: number, color: string): void {
        this.tiles[index].element.style.backgroundColor = color
    }
    
    update(state: GameState) {
        let speed = 4
        let resetRadius = 120
        
        if (state.keys.left)  this.scroll.x += speed
        if (state.keys.right) this.scroll.x -= speed
        if (state.keys.up)    this.scroll.y += speed
        if (state.keys.down)  this.scroll.y -= speed
        
        if (this.scroll.x < -resetRadius) {
            this.scroll.x = resetRadius
            this.shiftTiles('Left')
        }
        
        if (this.scroll.x > resetRadius) {
            this.scroll.x = -resetRadius
            this.shiftTiles('Right')
        }
        
        if (this.scroll.y < -resetRadius) {
            this.scroll.y = resetRadius
            this.shiftTiles('Left')
        }
        
        if (this.scroll.y > resetRadius) {
            this.scroll.y = -resetRadius
            this.shiftTiles('Top')
        }
        
        this.element.style.left = `calc(${this.scroll.x}px + 50% - var(--map-size) / 2)`
        this.element.style.top  = `calc(${this.scroll.y}px + 50% - var(--map-size) / 2)`
    }
    
    private shiftTiles(side: 'Top' | 'Bottom' | 'Left' | 'Right'): void {
        Dom.swap(this.tiles[0].element, this.tiles[24].element)
    }
}


