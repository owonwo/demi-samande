import React from "react";

export function useArrowKeys(params: {
  setter: React.Dispatch<React.SetStateAction<number>>;
  enabled: boolean;
  maxValue: number;
}) {
  const { enabled = false, setter, maxValue } = params;

  React.useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();

    window.addEventListener(
      "keyup",
      (evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        if (evt.key === "ArrowRight")
          setter((e) => (e >= maxValue ? 0 : e + 1));
        if (evt.key === "ArrowLeft") setter((e) => (e <= 0 ? maxValue : e - 1));
      },
      { signal: controller.signal },
    );

    return () => controller.abort();
  }, [enabled, setter, maxValue]);
}
