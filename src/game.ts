import { Map } from "./map"
import { Common, Dom } from "./utility"



export interface GameState {
    keys: {
        up    : boolean,
        down  : boolean,
        left  : boolean,
        right : boolean
    }
    delta : number
}



export class Game {
    map     : Map
    state   : GameState
    toolbar : HTMLDivElement
    
    constructor(fps: number) {
        this.map = new Map()
        
        this.toolbar = Dom.createDivChild(document.body, {
            classname : 'toolbar'
        })
        
        Dom.createDivChild(this.toolbar, {
            classname : 'title',
            text      : 'Scroll! Shifti! Demo!'
        })
        
        this.state = {
            keys: {
                up    : false,
                down  : false,
                left  : false,
                right : false
            },
            delta: 0
        }
        
        document.addEventListener('keydown', event => this.keyCapture(event.key, true))
        document.addEventListener('keyup', event => this.keyCapture(event.key, false))
        
        this.createGameLoop(fps)
        this.createBorderToggle()
        this.createColorsButton()
    }
    
    
    
    private update() {
        this.map.update(this.state)
    }
    
    
    
    private createBorderToggle() {
        let toggled = false
        let button = Dom.createDivChild(this.toolbar, {classname: 'button'})
        button.textContent = 'Toggle Border'
        
        button.addEventListener('click', () => {
            toggled = !toggled
            
            if (toggled) {
                this.map.border.style.borderColor = 'rgba(0, 0, 0, 0)'
                this.map.border.style.backgroundColor = `rgba(0, 0, 0, 0.3)`
                this.map.border.style.zIndex = '0'
            }
            else {
                this.map.border.style.borderColor = 'rgba(0, 0, 0, 1)'
                this.map.border.style.backgroundColor = `rgba(0, 0, 0, 0)`
                this.map.border.style.zIndex = '999'
            }
        })
    }
    
    
    
    private createColorsButton() {
        let button = Dom.createDivChild(this.toolbar, {classname: 'button'})
        button.textContent = 'Generate Colors'
        
        button.addEventListener('click', () => {
            let count = this.map.tiles.count ** 2
            let row: number, col: number
            
            for (let i = 0; i < count; i++) {
                col = Math.floor(i % this.map.tiles.count)
                row = Math.floor(i / this.map.tiles.count)
                
                let r = i * 10 + Common.randint(1, 5) * 3
                let g = i * 10 + Common.randint(1, 5) * 3
                let b = i * 10 + Common.randint(1, 5) * 3
                
                this.map.indexTile(row, col).style.backgroundColor = `rgb(${r}, ${g}, ${b})`
            }
            
        })
        
        button.click()
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
            this.state.delta = delta
            
            // Execute game updates if (change in time) > (interval).
            if (delta > interval) {
                this.update()
                
                // Capture the old time
                before = now - (delta % interval)
            }
        }
        
        requestAnimationFrame(update)
    }
    
    
    
    private keyCapture(key: string, flag: boolean): void {
        
        switch (key) {
            case 'ArrowUp': case 'w':
                this.state.keys.up = flag
                break
                
            case 'ArrowDown': case 's':
                this.state.keys.down = flag
                break
            
            case 'ArrowLeft': case 'a':
                this.state.keys.left = flag
                break
            
            case 'ArrowRight': case 'd':
                this.state.keys.right = flag
                break
        }   
    }
}

