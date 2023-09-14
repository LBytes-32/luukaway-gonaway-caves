import './styles.css'

export namespace Common {
    export function randint(lower: number, upper: number): number {
        return Math.floor(Math.random()*(upper-lower) + lower)
    }
}

export namespace Dom {
    
    export function div(parent: HTMLElement | null, classname?: string): HTMLDivElement {
        let div = document.createElement('div')
        div.classList.add(classname!)
        
        if (parent != null)
            parent!.appendChild(div)
        
        return div
    }
    
    export function swap(element1: HTMLElement, element2: HTMLElement): void {
        let parent = element1.parentElement!
        let element2Neighbor = element2.nextSibling
        
        parent.insertBefore(element2, element1)
        
        if (element2Neighbor == null)
            parent.append(element1)
        else
            parent.insertBefore(element1, element2Neighbor)
    }
    
    export function shiftChildren(parent: HTMLDivElement, direction: 'Forward' | 'Backward' = 'Forward'): void {
        switch (direction) {
            case 'Forward':
                parent.insertBefore(parent.lastChild!, parent.firstChild!)
                break
                
            case 'Backward':
                parent.appendChild(parent.firstChild!)
        }
    }
}



