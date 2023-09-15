import { Dom } from "./utility"


export class TileStrip {
    element : HTMLDivElement
    
    constructor(tileLength: number, tileCount: number) {
        
        // Create the strip element.
        this.element = Dom.createDiv({
            classname: 'tile-strip'
        })
        
        // Append N tiles to the strip element.
        for (let i = 0; i < tileCount; i++) {
            
            Dom.createDivChild(this.element, {
                classname : 'tile',
                width     : tileLength,
                height    : tileLength,
                color     : 'red',
                text      : 'Hi'
            })
        }
    }
    
    // Shift the order of tiles forward or backward
    shiftTiles(direction: 'forward' | 'backward'): void {
        Dom.shiftChildrenOf(this.element, direction)
    }
}

