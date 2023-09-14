import { Dom } from "./utility"
import { GameState } from "./game"
import "./styles.css"



export class Map {
    container : HTMLDivElement
    
    scroll: {
        x       : number,
        y       : number,
        xv      : number,
        yv      : number,
        bounds  : number
        capture : {x: number, y: number}
        fun     : number
    }
    
    constructor() {
        this.container = Dom.div(document.body, 'map')
        
        this.scroll = {
            x       : 0,
            y       : 0,
            xv      : 0,
            yv      : 0,
            bounds  : (400 / 5 / 2),  // bounds = Size of 1 tile = (map_size / tile_count / 2)
            capture : {x: 0, y: 0},
            fun     : 0
        }
        
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
    
    scrolledBeyondRadius(dir: 'Up' | 'Down' | 'Left' | 'Right'): boolean {
        
        let distance = {
            horizontal : Math.abs(this.scroll.x),
            vertical   : Math.abs(this.scroll.y)
        }
        
        if (this.scrolledInDir(dir)) {
            if (dir == 'Left' || dir == 'Right') 
                return distance.horizontal > this.scroll.bounds
            
            if (dir == 'Up' || dir == 'Down') 
                return distance.vertical > this.scroll.bounds
        }
        
        return false
    }
    
    
    
    update(state: GameState) {
        let speed = 2
        
        // Radius = Size of 1 tile = (map_size / tile_count / 2)
        let resetRadius = (400 / 5 / 2)
        
        if (state.keys.left)  this.scroll.xv =  speed
        if (state.keys.right) this.scroll.xv = -speed
        if (state.keys.up)    this.scroll.yv =  speed
        if (state.keys.down)  this.scroll.yv = -speed
        
        this.scrollUpdate()
        
        this.container.style.left = `calc(${this.scroll.x}px + 50% - var(--map-size))`
        this.container.style.top  = `calc(${this.scroll.y}px + 50% - var(--map-size))`
    }
    
    
    
    private scrollUpdate() {
        
        this.scroll.capture.x = this.scroll.x
        this.scroll.capture.y = this.scroll.y
        
        this.scroll.x = (this.scroll.x + Math.round(this.scroll.xv) + this.scroll.bounds + 400/2) % (this.scroll.bounds*2) - (this.scroll.bounds - 400/2)
        this.scroll.y = (this.scroll.y + Math.round(this.scroll.yv) + this.scroll.bounds + 400/2) % (this.scroll.bounds*2) - (this.scroll.bounds - 400/2)
        
        if (this.scroll.x - this.scroll.capture.x != Math.round(this.scroll.xv)) {
            if (this.scroll.x < this.scroll.capture.x)
                this.shiftTiles('Right')
            else
                this.shiftTiles('Left')
        }
        
        if (this.scroll.y - this.scroll.capture.y != Math.round(this.scroll.yv)) {
            if (this.scroll.y < this.scroll.capture.y)
                this.shiftTiles('Down')
            else
                this.shiftTiles('Up')
        }
        
        this.scroll.fun += 10
        this.scroll.xv = Math.sin(this.scroll.fun / 100) * 2
        this.scroll.yv = Math.cos(this.scroll.fun / 100) * 2
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


