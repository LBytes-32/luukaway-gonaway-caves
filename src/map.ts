import "./styles.css"
import { Dom } from "./utility"



type Tile = {
    element: HTMLDivElement
}


export class Map {
    element : HTMLDivElement
    tiles   : Tile[]
    
    constructor() {
        this.element = Dom.div(document.body, 'map')
        this.tiles = []
        
        for (let i=0; i<9; i++) {
            this.tiles.push({
                element: Dom.div(this.element, 'tile')
            })
        }
    }
    
    
    
    setTileTexture(index: number, color: string): void {
        this.tiles[index].element.style.backgroundColor = color
    }
}


