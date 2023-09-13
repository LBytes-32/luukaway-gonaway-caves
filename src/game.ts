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
        
        let update = () => {
            this.map.update(this.state)
            
            setTimeout(() => requestAnimationFrame(update), 1000 / fps)
        }
        requestAnimationFrame(update)
    }
    
    
    
    private updateKeyCapture(key: string, flag: boolean): void {
        
        
        switch (key) {
            case 'ArrowUp':
                this.state.keys.up = flag
                break
                
            case 'ArrowDown':
                this.state.keys.down = flag
                break
                
            case 'ArrowLeft':
                this.state.keys.left = flag
                break
                
            case 'ArrowRight':
                this.state.keys.right = flag
                break
        }
        
    }
    
}

