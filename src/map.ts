import { Dom } from "./utility"
import { GameState } from "./game"
import "./styles.css"
import { TileStrip } from "./tiles"



export class Map {
    container : HTMLDivElement
    padding   : number
    strips    : TileStrip[]
    
    tiles : {
        length : number
        count  : number
    }
    
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
        this.container = Dom.createDivChild(document.body, {classname: 'map'})
        this.tiles = {length: 80, count: 5}
        this.strips = []
        this.padding = 10
        
        this.scroll = {
            x       : 0,
            y       : 0,
            xv      : 0,
            yv      : 0,
            bounds  : (this.tiles.length / 2),
            capture : {x: 0, y: 0},
            fun     : 0
        }
        
        for (let i=0; i < this.tiles.count; i++) {
            let strip = new TileStrip(this.tiles.length, this.tiles.count)
            this.strips.push(strip)
            this.container.appendChild(strip.element)
        }
    }
    
    scrolledInDir(direction: 'Up' | 'Down' | 'Left' | 'Right'): boolean {
        
        switch (direction) {
            case 'Up'    : return this.scroll.y < 0
            case 'Down'  : return this.scroll.y > 0
            case 'Left'  : return this.scroll.x < 0
            case 'Right' : return this.scroll.x > 0
        }
        
    }
    
    indexTile(row: number, column: number): HTMLDivElement {
        return this.strips[column].element.children[row] as HTMLDivElement
    }
    
    update(state: GameState) {
        let speed = 1 * state.delta
        
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
        
        //this.scroll.fun += 10
        //this.scroll.xv = Math.sin(this.scroll.fun / 100) * 2
        //this.scroll.yv = Math.cos(this.scroll.fun / 100) * 2
        
        this.scroll.xv = 0
        this.scroll.yv = 0
    }
    
    
    
    private shiftTiles(side: 'Up' | 'Down' | 'Left' | 'Right'): void {
        
        switch (side) {
            case 'Up':
                for (let i = 0; i < 5; i++)
                    this.strips[i].shiftTiles('backward')
                break
            
            case 'Down':
                for (let i = 0; i < 5; i++)
                    this.strips[i].shiftTiles('forward')
                break
            
            case 'Left':
                Dom.shiftChildrenOf(this.container, 'backward')
                break
                
            case 'Right':
                Dom.shiftChildrenOf(this.container, 'forward')
                break
        }
        
    }
}


