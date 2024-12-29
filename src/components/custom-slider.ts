import { animate } from "framer-motion";

export class CustomSlider {
  constructor(public elements: HTMLElement[]) { }

  lastPosition = 0;

  setElements(elements: HTMLElement[]) {
    this.elements = elements;
  }

  initialize() {
    const elements = this.elements;
    const elements_rev = elements.toReversed();
    for (let i = 0; i < elements.length + 1; i++) {
      const idx = i;
      const element = elements_rev[idx];
      if (!element) continue;
      this.setIndex(element, idx);
    }

    this.animateTo(0, { initial: true });
  }

  setIndex(element: HTMLElement, idx: number) {
    element.setAttribute("data-index", String(idx));
  }

  getIndex(index: number): HTMLElement {
    // @ts-expect-error
    return this.elements.find(
      (e) => e.getAttribute("data-index") === String(index),
    );
  }

  move(position: number) {
    const lastPosition = this.lastPosition;
    const meta = { last: lastPosition, cur: position };

    const difference = Math.max(meta.last, meta.cur) - Math.min(meta.last, meta.cur);

    if (Math.abs(difference) > 1)  {
      console.log('later', { difference });

      for (let i = 1; i <= difference; i++) {
        console.log("later - counting", i);
      }
      // this.animat()
    } else {
      this.animateTo(position);
    }

    this.lastPosition = position;
  }

  animateTo(position: number, { initial = false }: { initial?: boolean } = {}) {
    const STYLE_BLUR_KEY = '--filter-blur';

    const element = this.getIndex(position);

    if (element) {
      element.setAttribute('data-active', 'true');
    }

    if (!element) return;

    type Sibling = HTMLElement | undefined | null;

    let prevSibling: Sibling =
      element.previousElementSibling || null;

    let count = 0;
    const BASE_SCALE = 1;
    const STAGGER_SCALE = 0.1;

    const shared = {
      ease: "easeOut",
      duration: 0.4,
      delay: initial ? 2 : 0,
    } as const;

    while (prevSibling) {
      if (prevSibling) {
        prevSibling.removeAttribute('data-active');
        prevSibling.style.setProperty(STYLE_BLUR_KEY, '10px');
        count++;

        animate(
          prevSibling,
          {
            y: count * -20,
            scale: BASE_SCALE + -(count * STAGGER_SCALE),
            opacity: 1,
            [STYLE_BLUR_KEY]: '10px',
            transformOrigin: "top center",
          },
          shared
        );

        prevSibling = prevSibling?.previousElementSibling;
      }
    }

    animate(
      element,
      {
        y: 0,
        opacity: 1,
        transformOrigin: "top center",
        scale: BASE_SCALE,
        [STYLE_BLUR_KEY]: '0px'
      },
      shared,
    );

    let nextSibling: Sibling = element.nextElementSibling || null;
    while (nextSibling) {
      if (nextSibling)
        animate(
          nextSibling,
          {
            y: count * 20,
            scale: BASE_SCALE + count * STAGGER_SCALE,
            opacity: 0,
            [STYLE_BLUR_KEY]: '10px',
            transformOrigin: "top center",
          },
          shared,
        );

      nextSibling = nextSibling?.nextElementSibling;
    }
  }
}
