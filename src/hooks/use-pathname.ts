import React from "react";

export function usePathname() {
  const [pathname, setPathname] = React.useState(() => "unknown");

  React.useLayoutEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return pathname;
}
