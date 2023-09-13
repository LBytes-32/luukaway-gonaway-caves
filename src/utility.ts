import './styles.css'

export namespace Common {
    export function randint(lower: number, upper: number): number {
        return Math.floor(Math.random()*(upper-lower) + lower)
    }
}

export namespace Dom {
    
    export function div(parent: HTMLElement, classname?: string): HTMLDivElement {
        let div = document.createElement('div')
        div.classList.add(classname!)
        parent.appendChild(div)
        return div
    }
    
}



