import { Dom } from "./utility"



export class TileStrip {
    element    : HTMLDivElement
    
    constructor(tileCount: number) {
        
        // Create the strip element.
        this.element = Dom.createDiv({
            classname : 'tile-strip',
            width     : `calc(100% / ${tileCount})`
        })
        
        // Append N tiles to the strip element.
        for (let i = 0; i < tileCount; i++) {
            
            Dom.createChildDiv(this.element, {
                classname : 'tile',
                width     : '100%',
                height    : `calc(100% / ${tileCount})`
            })
        }
    }
    
    // Shift the order of tiles forward or backward
    shiftTiles(direction: 'forward' | 'backward'): void {
        Dom.shiftChildrenOf(this.element, direction)
    }
}

