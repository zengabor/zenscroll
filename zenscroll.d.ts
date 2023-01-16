
interface ZenScrollBase {

    to(element: HTMLElement);
    to(element: HTMLElement, duration: number);
    to(element: HTMLElement, duration: number, onDone: () => void);

    toY(y: number);
    toY(y: number, duration: number);
    toY(y: number, duration: number, onDone: () => void);


    center(element: HTMLElement);
    center(element: HTMLElement, duration: number);
    center(element: HTMLElement, duration: number, offset: number);
    center(element: HTMLElement, duration: number, offset: number, onDone: () => void);

    

    moving():boolean;

    stop();

    setup(duration: number);
    setup(duration: number, offset: number);
}

interface ZenScroll extends ZenScrollBase {
    createScroller(element: HTMLElement, duration: number, offset: number): ZenScrollBase;

    intoView(element: HTMLElement);
}

declare var zenscroll: ZenScroll;