import { Map } from "./map"
import { Dom } from "./utility"



/** GameState captures user input and change in time between frames. */
export type GameState = {
    keys: {
        up    : boolean,
        down  : boolean,
        left  : boolean,
        right : boolean
    }
    delta     : number,
    framerate : number
}



/** Class that maintains user input and framerate. */
export class Game {
    map     : Map
    state   : GameState
    toolbar : HTMLDivElement
    
    constructor(fps: number) {
        this.map = new Map()
        
        // Create the toolbar element.
        this.toolbar = Dom.createChildDiv(document.body, {
            classname : 'toolbar'
        })
        
        // Create the title element.
        Dom.createChildDiv(this.toolbar, {
            classname : 'title',
            text      : 'Scrolly Shifty Demo'
        })
        
        // Setup the game state.
        this.state = {
            keys: {
                up    : false,
                down  : false,
                left  : false,
                right : false
            },
            delta     : 0,
            framerate : 0
        }
        
        // Create event listeners to capture input.
        document.addEventListener('keydown', event => this.keyCapture(event.key, true))
        document.addEventListener('keyup', event => this.keyCapture(event.key, false))
        
        // Create the game loop. The callback is used as the update function.
        this.createGameLoop(fps, () => {
            this.map.update(this.state)
        })
        
        // Create interactive buttons in the toolbar.
        this.createBorderToggle()
        this.createColorsButton()
    }
    
    
    
    /** Creates a toolbar button to toggle the map's borders. */
    private createBorderToggle() {
        let toggled = false
        
        let button = Dom.createChildDiv(this.toolbar, {
            classname : 'button',
            text      : 'Toggle Border'
        })
        
        button.addEventListener('click', () => {
            toggled = !toggled
            
            if (toggled)
                this.map.border.classList.add('border-revealing')
            else
                this.map.border.classList.remove('border-revealing')
        })
    }
    
    
    
    /** Creates a toolbar button to generate colors on the map. */
    private createColorsButton() {
        let button = Dom.createChildDiv(this.toolbar, {
            classname : 'button',
            text      : 'Generate Colors'
        })
        
        button.addEventListener('click', () => {
            let count = this.map.tiles.count ** 2
            let row: number
            let col: number
            let color = [0,0,0]
            
            for (let i = 0; i < count; i++) {
                col = Math.floor(i % this.map.tiles.count)
                row = Math.floor(i / this.map.tiles.count)
                
                color[0] = (Math.cos(col * row / 30) + 1) / 3
                color[1] = (Math.cos(col * row / 12) + 1) / 7
                color[2] = (Math.cos(col * row / 40) + 1) / 1
                
                console.log(color.map((v) => v))
                
                this.map.indexTile(row, col).style.backgroundColor = `rgb(${Math.floor(255*color[0])}, ${Math.floor(255*color[1])}, ${Math.floor(255*color[2])})`
            }
        })
        
        // Simulate a button click to trigger the color generation.
        button.click()
    }
    
    
    
    /** Create the game loop using requestAnimationFrame. FPS must be provided. */
    private createGameLoop(fps: number, callback: () => void) {
        // Credit to elundmark for requestAnimationFrame optimization.
        // https://gist.github.com/elundmark/38d3596a883521cb24f5
        
        const INTERVAL = 1000 / fps
        
        let now    = Date.now()
        let before = Date.now()
        
        let update = () => {
            requestAnimationFrame(update)
            
            // Capture the change in time
            now = Date.now()
            this.state.delta = now - before
            this.state.framerate = Math.floor(1000 / this.state.delta)
            
            // Execute game updates if (change in time) > (interval).
            if (this.state.delta >= INTERVAL) {
                callback()
                before = now - (this.state.delta % INTERVAL)
            }
        }
        
        // Initialize the loop.
        requestAnimationFrame(update)
    }
    
    
    
    /** Flag the specified key as pressed (true) or not pressed (false). */
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

