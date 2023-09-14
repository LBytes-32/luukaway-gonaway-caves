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
    
    constructor(fps: number) {
        this.map = new Map()
        this.border = Dom.div(document.body, 'border')
        
        this.state = {
            keys: {
                up    : false,
                down  : false,
                left  : false,
                right : false
            }
        }
        
        
        this.toggleBorder()
        
        document.addEventListener('keydown', event => this.updateKeyCapture(event.key, true))
        document.addEventListener('keyup', event => this.updateKeyCapture(event.key, false))
        this.createGameLoop(fps)
    }
    
    
    
    
    private toggleBorder() {
        let toggled = false
        let button = Dom.div(this.border, 'button')
        button.textContent = 'Toggle Border'
        
        button.addEventListener('click', () => {
            toggled = !toggled
            
            if (toggled)
                this.border.style.borderColor = 'rgba(0, 0, 0, 0.3)'
            else
                this.border.style.borderColor = 'rgba(0, 0, 0, 1)'
        })
        

    }
    
    
    private update() {
        this.map.update(this.state)
    }
    
    
    private createGameLoop(fps: number) {
        // Credit to elundmark for requestAnimationFrame optimization.
        // https://gist.github.com/elundmark/38d3596a883521cb24f5

        let now      = Date.now()
        let before   = Date.now()
        let interval = 1000 / fps
        let delta    = 0
        
        let update = () => {
            requestAnimationFrame(update)
            
            // Capture the change in time
            now = Date.now()
            delta = now - before
            
            // Execute game updates if (change in time) > (interval).
            if (delta > interval) {
                this.update()
                
                // Capture the old time
                before = now - (delta % interval)
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

