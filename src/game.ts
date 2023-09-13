import { Map } from "./map"
import { Utility } from "./utility"



export interface GameState {
    keys: {
        up    : boolean,
        down  : boolean,
        left  : boolean,
        right : boolean
    }
}



export class Game {
    map   : Map
    state : GameState
    
    constructor(fps: number) {
        this.map = new Map()
        
        this.state = {
            keys: {
                up    : false,
                down  : false,
                left  : false,
                right : false
            }
        }
        
        for (let i = 0; i < 9; i++) {
            let r = Utility.randint(0, 255)
            let g = Utility.randint(0, 255)
            let b = Utility.randint(0, 255)
            this.map.setTileTexture(i, `rgb(${r}, ${g}, ${b})`)
        }
        
        document.addEventListener('keydown', event => this.updateKeyCapture(event.key, true))
        document.addEventListener('keyup', event => this.updateKeyCapture(event.key, false))
        
        let frame = {
            now      : Date.now(),
            before   : Date.now(),
            interval : 1000 / fps,
            delta    : 0
        }
        
        // Credit to elundmark for requestAnimationFrame optimization.
        // https://gist.github.com/elundmark/38d3596a883521cb24f5
        let update = () => {
            requestAnimationFrame(update)
            
            frame.now = Date.now()
            frame.delta = frame.now - frame.before
            
            if (frame.delta > frame.interval) {
                
                this.map.update(this.state)
                frame.before = frame.now - (frame.delta % frame.interval)
            }
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

