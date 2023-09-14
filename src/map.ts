import { Dom } from "./utility"
import { GameState } from "./game"
import "./styles.css"



export class Map {
    container : HTMLDivElement
    scroll    : {x: number, y: number}
    
    constructor() {
        this.container = Dom.div(document.body, 'map')
        this.scroll = {x: 0, y: 0}
        
        for (let i=0; i < 5; i++) {
            var strip = Dom.div(this.container, 'tile-strip')
            
            for (let t=0; t < 5; t++) {
                let tile = Dom.div(strip, 'tile')
                
                // Temporary tile graphics
                let id = i+t*5
                let r = Math.floor((id / 30 * 255))
                let g = Math.floor((id / 30 * 255))
                let b = Math.floor((id / 30 * 255))
                tile.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
                tile.textContent = `${id}`
            }
        }
    }
    
    indexTile(index: number): HTMLDivElement {
        return this.container.children[index % 5].children[Math.floor(index / 5)] as HTMLDivElement
    }
    
    indexStrip(index: number): HTMLDivElement {
        return this.container.children[index] as HTMLDivElement
    }
    
    setTileTexture(index: number, color: string): void {
        this.indexTile(index).style.backgroundColor = color
    }
    
    scrolledInDir(direction: 'Up' | 'Down' | 'Left' | 'Right'): boolean {
        
        switch (direction) {
            case 'Up'    : return this.scroll.y < 0
            case 'Down'  : return this.scroll.y > 0
            case 'Left'  : return this.scroll.x < 0
            case 'Right' : return this.scroll.x > 0
        }
        
    }
    
    scrolledBeyondRadius(dir: 'Up' | 'Down' | 'Left' | 'Right', radius: number): boolean {
        
        let distance = {
            horizontal : Math.abs(this.scroll.x),
            vertical   : Math.abs(this.scroll.y)
        }
        
        if (this.scrolledInDir(dir)) {
            if (dir == 'Left' || dir == 'Right') 
                return distance.horizontal > radius
            
            if (dir == 'Up' || dir == 'Down') 
                return distance.vertical > radius
        }
        
        return false
    }
    
    
    
    update(state: GameState) {
        let speed = 2
        
        // Radius = Size of 1 tile = (map_size / tile_count / 2)
        let resetRadius = (400 / 5 / 2)
        
        if (state.keys.left)  this.scroll.x += speed
        if (state.keys.right) this.scroll.x -= speed
        if (state.keys.up)    this.scroll.y += speed
        if (state.keys.down)  this.scroll.y -= speed
        
        if (this.scrolledBeyondRadius('Left', resetRadius)) {
            // TODO: fix choppy movements.
            //   - Do not use conditional logic to reset scroll position.
            //   - Use a mathematical expression instead. (Possibly in a function called updatePosition)
            this.scroll.x = resetRadius
            this.shiftTiles('Left')
        }
        
        if (this.scrolledBeyondRadius('Right', resetRadius)) {
            this.scroll.x = -resetRadius
            this.shiftTiles('Right')
        }
        
        if (this.scrolledBeyondRadius('Down', resetRadius)) {
            this.scroll.y = -resetRadius
            this.shiftTiles('Down')
        }
        
        if (this.scrolledBeyondRadius('Up', resetRadius)) {
            this.scroll.y = resetRadius
            this.shiftTiles('Up')
        }
        
        this.container.style.left = `calc(${this.scroll.x}px + 50% - var(--map-size) / 2)`
        this.container.style.top  = `calc(${this.scroll.y}px + 50% - var(--map-size) / 2)`
    }
    
    private shiftTiles(side: 'Up' | 'Down' | 'Left' | 'Right'): void {
        
        switch (side) {
            case 'Up':
                for (let i = 0; i < 5; i++) Dom.shiftChildren(this.indexStrip(i), 'Backward')
                break
            
            case 'Down':
                for (let i = 0; i < 5; i++) Dom.shiftChildren(this.indexStrip(i), 'Forward')
                break
            
            case 'Left':
                Dom.shiftChildren(this.container, 'Backward')
                break
                
            case 'Right':
                Dom.shiftChildren(this.container, 'Forward')
                break
        }
        
    }
}


