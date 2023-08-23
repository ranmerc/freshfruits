import mediaQuery from "css-mediaquery";

function createMatchMedia(width: number) {
  return (query: string): MediaQueryList => ({
    matches: mediaQuery.match(query, {
      width,
    }),
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    dispatchEvent: (e) => false,
    media: "",
    onchange: () => {},
    removeEventListener: () => {},
  });
}

export default function resizeScreen(width: number) {
  window.matchMedia = createMatchMedia(width);
}
