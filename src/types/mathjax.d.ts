declare global {
  interface Window {
    MathJax: {
      typesetPromise: (elements?: HTMLElement[]) => Promise<void>;
      tex: {
        inlineMath: string[][];
        displayMath: string[][];
        processEscapes: boolean;
        processEnvironments: boolean;
      };
      svg: {
        fontCache: string;
      };
      startup: {
        typeset: boolean;
      };
    };
  }
}

export {};
