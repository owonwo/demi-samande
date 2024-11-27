import { type AnimationSequence, animate } from "framer-motion";

export class CustomSlider {
  private last_position = 0;

  constructor(public elements: HTMLElement[]) {}

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
    this.move(0);
  }

  setIndex(element: HTMLElement, idx: number) {
    element.setAttribute("data-index", String(idx));
  }

  getIndex(index: number): HTMLElement {
    return this.elements.find(
      (e) => e.getAttribute("data-index") === String(index),
    );
  }

  move(position: number) {
    const element = this.getIndex(position);

    if (!element) return;

    let nextSibling: Element | undefined | null =
      element.nextElementSibling || null;
    let prevSibling: Element | undefined | null =
      element.previousElementSibling || null;
    let count = 0;
    const BASE_SCALE = 1;
    const STAGGER_SCALE = 0.1;

    const shared = {
      ease: "easeIn",
      duration: 0.4,
    } as const;

    while (prevSibling) {
      count++;

      if (prevSibling)
        animate(
          prevSibling,
          {
            y: count * -20,
            scale: BASE_SCALE + -(count * STAGGER_SCALE),
            // opacity: 0.1,
            transformOrigin: "top center",
          },
          shared,
        );

      prevSibling = prevSibling?.previousElementSibling;
    }

    animate(
      element,
      {
        y: 0,
        opacity: 1,
        transformOrigin: "top center",
        scale: BASE_SCALE,
      },
      {
        ...shared,
      },
    );

    setTimeout(() => {
      while (nextSibling) {
        if (nextSibling)
          animate(
            nextSibling,
            {
              y: count * 20,
              scale: BASE_SCALE + count * STAGGER_SCALE,
              opacity: 0,
              transformOrigin: "top center",
            },
            shared,
          );

        nextSibling = nextSibling?.nextElementSibling;
      }
    }, 100);

    this.last_position = position;
  }

  setActive(element: HTMLElement, state: boolean) {
    element.setAttribute("data-active", state ? "true" : "false");
  }

  computeMotion(n: number, cursorPosition: number) {
    return Array.from({ length: n }, (_, i) => (i - cursorPosition) * 15);
  }
}
