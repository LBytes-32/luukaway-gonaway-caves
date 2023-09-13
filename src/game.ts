import { Map } from "./map"
import { Dom } from "./utility"



export interface GameState {
    keys: {
        up    : boolean,
        down  : boolean,
        left  : boolean,
        right : boolean
    }
}



export class Game {
    map    : Map
    state  : GameState
    border : HTMLDivElement
    
    framestate : {
        now      : number
        before   : number
        interval : number
        delta    : number
    }
    
    constructor(fps: number) {
        this.map = new Map()
        //this.border = Dom.div(document.body, 'border')
        
        this.state = {
            keys: {
                up    : false,
                down  : false,
                left  : false,
                right : false
            }
        }
        
        this.framestate = {
            now      : Date.now(),
            before   : Date.now(),
            interval : 1000 / fps,
            delta    : 0
        }
        
        for (let i = 0; i < 25; i++) {
            let r = Math.floor((i / 30 * 255))
            let g = Math.floor((i / 30 * 255))
            let b = Math.floor((i / 30 * 255))
            this.map.setTileTexture(i, `rgb(${r}, ${g}, ${b})`)
        }
        
        document.addEventListener('keydown', event => this.updateKeyCapture(event.key, true))
        document.addEventListener('keyup', event => this.updateKeyCapture(event.key, false))
        
        // Credit to elundmark for requestAnimationFrame optimization.
        // https://gist.github.com/elundmark/38d3596a883521cb24f5
        let update = () => {
            requestAnimationFrame(update)
            let {now, before, interval, delta} = this.framestate
            
            // Capture the change in time
            now = Date.now()
            delta = now - before
            
            // Execute game updates if (change in time) > (interval).
            if (delta > interval) {
                this.map.update(this.state)
                
                // Capture the old time
                before = now - (delta % interval)
            }
            
            this.framestate = {now, before, interval, delta}
        }
        requestAnimationFrame(update)
    }
    
    
    
    private updateKeyCapture(key: string, flag: boolean): void {
        
        switch (key) {
            case 'ArrowUp':
            case 'w':
                this.state.keys.up = flag
                break
                
            case 'ArrowDown':
            case 's':
                this.state.keys.down = flag
                break
            
            case 'ArrowLeft':
            case 'a':
                this.state.keys.left = flag
                break
            
            case 'ArrowRight':
            case 'd':
                this.state.keys.right = flag
                break
        }
        
    }
    
}

