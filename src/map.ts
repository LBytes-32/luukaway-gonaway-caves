import { Dom } from "./utility"
import { GameState } from "./game"
import "./styles.css"
import { TileStrip } from "./tiles"



export class Map {
    container : HTMLDivElement
    border    : HTMLDivElement
    padding   : number
    strips    : TileStrip[]
    
    tiles : {
        length : number
        count  : number
    }
    
    scroll: {
        x       : number
        y       : number
        xv      : number
        yv      : number
        xScreen : number
        yScreen : number
        bounds  : number
        capture : {x: number, y: number}
        fun     : number
    }
    
    constructor() {
        this.tiles = {length: 80, count: 5}
        this.strips = []
        this.padding = 10
        
        let mapLen      = this.tiles.length * this.tiles.count
        let borderThick = this.tiles.length + this.padding
        let borderLen   = (mapLen - borderThick) + (borderThick * 2)
        
        this.container = Dom.createDivChild(document.body, {
            classname : 'map',
            width     : `${mapLen}px`,
            height    : `${mapLen}px`
        })
        
        this.border = Dom.createDivChild(document.body, {
            classname   : 'border',
            borderWidth : `${borderThick}px`,
            width       : `${borderLen}px`,
            height      : `${borderLen}px`,
            left        : `calc(50% - ${borderLen}px / 2)`,
            top         : `calc(50% - ${borderLen}px / 2)`
        })
        
        this.scroll = {
            x       : 0,
            y       : 0,
            xv      : 0,
            yv      : 0,
            xScreen : 0,
            yScreen : 0,
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
    
    getMapLength(): number {
        return this.tiles.count * this.tiles.length
    }
    
    indexTile(row: number, column: number): HTMLDivElement {
        return this.strips[column].element.children[row] as HTMLDivElement
    }
    
    update(state: GameState) {
        let speed = 0.2 * state.delta
        
        if (state.keys.left)  this.scroll.xv =  speed
        if (state.keys.right) this.scroll.xv = -speed
        if (state.keys.up)    this.scroll.yv =  speed
        if (state.keys.down)  this.scroll.yv = -speed
        
        this.scrollUpdate()
        
        this.container.style.left = `calc(${this.scroll.xScreen}px + 50% - ${this.tiles.length * this.tiles.count}px)`
        this.container.style.top  = `calc(${this.scroll.yScreen}px + 50% - ${this.tiles.length * this.tiles.count}px)`
    }
    
    private hasPassedBound(side: 'top' | 'bottom' | 'left' | 'right', value: number): boolean {
        switch (side) {
            case 'top'    : return (value < -this.scroll.bounds)
            case 'bottom' : return (value > this.scroll.bounds)
            case 'left'   : return (value < -this.scroll.bounds)
            case 'right'  : return (value > this.scroll.bounds)
        }
    }
    
    private scrollUpdate() {
        
        this.scroll.x += this.scroll.xv
        this.scroll.y += this.scroll.yv
        
        if (this.hasPassedBound('top', this.scroll.y)) {
            this.scroll.y += this.tiles.length
            this.shiftTiles('up')
        }
        
        if (this.hasPassedBound('bottom', this.scroll.y)) {
            this.scroll.y -= this.tiles.length
            this.shiftTiles('down')
        }
        
        if (this.hasPassedBound('left', this.scroll.x)) {
            this.scroll.x += this.tiles.length
            this.shiftTiles('left')
        }
        
        if (this.hasPassedBound('right', this.scroll.x)) {
            this.scroll.x -= this.tiles.length
            this.shiftTiles('right')
        }
        
        this.scroll.xv /= 1.2
        this.scroll.yv /= 1.2
        
        this.scroll.xScreen = Math.floor(this.scroll.x) + this.getMapLength()/2
        this.scroll.yScreen = Math.floor(this.scroll.y) + this.getMapLength()/2
    }
    
    
    
    private shiftTiles(side: 'up' | 'down' | 'left' | 'right'): void {
        
        switch (side) {
            case 'up':
                for (let i = 0; i < 5; i++)
                    this.strips[i].shiftTiles('backward')
                break
            
            case 'down':
                for (let i = 0; i < 5; i++)
                    this.strips[i].shiftTiles('forward')
                break
            
            case 'left':
                Dom.shiftChildrenOf(this.container, 'backward')
                break
                
            case 'right':
                Dom.shiftChildrenOf(this.container, 'forward')
                break
        }
        
    }
}


