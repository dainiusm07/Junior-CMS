import mediaQuery from 'css-mediaquery';

export const mockMatchMedia = (width: number) => {
  window.matchMedia = (query: string) =>
    ({
      matches: mediaQuery.match(query, { width }),
      addListener: () => jest.fn(),
      removeListener: () => jest.fn(),
    } as never);
};

export const resetMatchMedia = () => {
  window.matchMedia = undefined as never;
};
