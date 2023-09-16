import './styles.css'



export namespace Common {
    export function randint(lower: number, upper: number): number {
        return Math.floor(Math.random()*(upper-lower) + lower)
    }
}



export namespace Dom {
    export type Styles = {
        classname?   : string
        left?        : string
        top?         : string
        width?       : string
        height?      : string
        borderWidth? : string
        color?       : string
        text?        : string
        texture?     : string
    }
    
    export function setStyles(element: HTMLElement, styles: Styles) {
        
        if (styles.classname)
            element.classList.add(styles.classname)
        
        if (styles.left)
            element.style.left = styles.left
        
        if (styles.top)
            element.style.top = styles.top
            
        if (styles.width)
            element.style.width  = styles.width
        
        if (styles.height)
            element.style.height = styles.height
        
        if (styles.borderWidth)
            element.style.borderWidth = styles.borderWidth
            
        if (styles.text)
            element.textContent = styles.text
        
        if (styles.color)
            element.style.backgroundColor = styles.color
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

