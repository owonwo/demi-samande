import { type AnimationPlaybackControls, animate } from "framer-motion";

export class CustomSlider {
  constructor(public elements: HTMLElement[]) {}

  duration = 400;
  MAX_BLUR = 5;

  lastPosition = 0;
  animating = false;
  queue: (() => Promise<void>)[] = [];

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

    // TODO: Only run this when then root element is in view;
    this.spreadOut();
  }

  spreadOut() {
    this.animateTo(0, { initial: true, duration: 800 });
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

  enque(callback: () => Promise<void>) {
    this.queue.push(callback);
  }

  async deque() {
    if (this.queue.length < 1) return;
    const next = this.queue.shift();
    if (typeof next === "function") {
      await next();
    }
  }

  async move(position: number) {
    await this.animateTo(position);
  }

  async animateTo(
    position: number,
    opts: { initial?: boolean; duration?: number } = {},
  ) {
    const STYLE_BLUR_KEY = "--filter-blur";

    const element = this.getIndex(position);

    if (!element) return;

    for (const element_ of this.elements) {
      if (element_ === element) {
        element.setAttribute("data-active", "true");
        continue;
      }
      element_.setAttribute("data-active", "false");
    }

    type Sibling = HTMLElement | undefined | null;
    const resolve = (v: unknown): HTMLElement => v as unknown as HTMLElement;

    let prevSibling: Sibling = resolve(element.previousElementSibling || null)

    let count = 0;
    const BASE_SCALE = 1;
    const STAGGER_SCALE = 0.1;
    const ANIMATION_DURATION = opts.duration ?? this.duration;

    const shared = {
      type: "tween",
      // ease: "easeOut",
      duration: ANIMATION_DURATION / 1000,
      delay: opts.initial ? 2 : 0,
    } as const;

    const elements_behind = this.elements.length - position;
    const blur_increase_factor = this.MAX_BLUR / elements_behind;
    let prev_count = 1;

    while (prevSibling) {
      if (prevSibling) {
        prevSibling.style.setProperty(STYLE_BLUR_KEY, "10px");
        count++;

        animate(
          prevSibling,
          {
            y: count * -20,
            scale: BASE_SCALE + -(count * STAGGER_SCALE),
            opacity: 1,
            [STYLE_BLUR_KEY]: `${prev_count * blur_increase_factor}px`,
            transformOrigin: "top center",
          },
          shared,
        );
        prev_count++;

        prevSibling = resolve(prevSibling?.previousElementSibling);
      }
    }

    animate(
      element,
      {
        y: 0,
        opacity: 1,
        transformOrigin: "top center",
        scale: BASE_SCALE,
        [STYLE_BLUR_KEY]: "0px",
      },
      shared,
    );

    let nextSibling: Sibling = resolve(element.nextElementSibling || null);
    while (nextSibling) {
      if (nextSibling)
        animate(
          nextSibling,
          {
            y: count * 20,
            scale: BASE_SCALE + count * STAGGER_SCALE,
            opacity: 0,
            [STYLE_BLUR_KEY]: "10px",
            transformOrigin: "top center",
          },
          shared,
        );

      nextSibling = resolve(nextSibling?.nextElementSibling);
    }

    await this.delay(ANIMATION_DURATION);
  }

  delay(n: number) {
    return new Promise((resolve) => setTimeout(resolve, n));
  }
}

function* countN(from: number, difference: number, direction: -1 | 1) {
  for (let i = 1; i <= difference; i++) {
    if (direction === 1) yield from + i;
    if (direction === -1) yield from - i;
  }
}
