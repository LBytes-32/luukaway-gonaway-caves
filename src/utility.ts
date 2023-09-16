import './styles.css'



export namespace Common {
    export function randint(lower: number, upper: number): number {
        return Math.floor(Math.random()*(upper-lower) + lower)
    }
}



export namespace Dom {
    export type Styles = {
        classname? : string
        left?      : string | number
        top?       : string | number
        width?     : string | number
        height?    : string | number
        color?     : string
        text?      : string
        texture?   : string
    }
    
    export function setStyles(element: HTMLElement, styles: Styles) {
        
        // If value is a number, make it a string as "pixels".
        // If value is a string, just return that string.
        function ifNumMakePixels(value: number | string): string {
            if (Number.isNaN(value))
                return `${value}px`
            else
                return value as string
        }
        
        if (styles.classname)
            element.classList.add(styles.classname)
        
        if (styles.left)
            element.style.left = ifNumMakePixels(styles.left)
        
        if (styles.top)
            element.style.top = ifNumMakePixels(styles.top)
            
        if (styles.width)
            element.style.width  = ifNumMakePixels(styles.width)
        
        if (styles.height)
            element.style.height = ifNumMakePixels(styles.height)
        
        if (styles.text)
            element.textContent  = `${styles.text}`
        
        if (styles.color)
            element.style.backgroundColor = `${styles.color}`
    }
    
    export function createDiv(styles?: Styles) {
        let div = document.createElement('div')
        
        if (styles)
            Dom.setStyles(div, styles)
        
        return div
    }
    
    export function createDivChild(parent: HTMLElement, styles?: Styles): HTMLDivElement {
        let div = createDiv(styles)
        parent.appendChild(div)
        return div
    }
    
    export function shiftChildrenOf(parent: HTMLDivElement, direction: 'forward' | 'backward' = 'forward'): void {
        switch (direction) {
            case 'forward':
                parent.insertBefore(parent.lastChild!, parent.firstChild!)
                break
                
            case 'backward':
                parent.appendChild(parent.firstChild!)
        }
    }
}

