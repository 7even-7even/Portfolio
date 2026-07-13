interface TextSplitterOptions {
  type?: string;
  linesClass?: string;
}

export class TextSplitter {
  chars: Element[] = [];
  words: Element[] = [];
  lines: Element[] = [];
  elements: Element[] = [];

  private originalHTML = new Map<Element, string>();
  private animationFrames: number[] = [];

  constructor(
    target: string | Element | NodeListOf<Element> | Element[],
    options?: TextSplitterOptions,
  ) {
    const type = options?.type ?? "chars,words,lines";
    const linesClass = options?.linesClass ?? "split-line";

    if (typeof target === "string") {
      this.elements = Array.from(document.querySelectorAll(target));
    } else if (target instanceof NodeList) {
      this.elements = Array.from(target);
    } else if (Array.isArray(target)) {
      this.elements = target;
    } else {
      this.elements = [target];
    }

    this.elements.forEach((element) => {
      this.originalHTML.set(element, element.innerHTML);

      if (type.includes("chars") && type.includes("words")) {
        this.splitWords(element);
        this.splitCharsFromWords(element);
      } else if (type.includes("chars")) {
        this.splitChars(element);
      } else if (type.includes("words")) {
        this.splitWords(element);
      }

      if (type.includes("lines")) {
        this.splitLines(element, linesClass);
      }
    });
  }

  private splitChars(element: Element) {
    const fragment = document.createDocumentFragment();

    Array.from(element.textContent ?? "").forEach((character) => {
      if (character === "\n") {
        fragment.appendChild(document.createElement("br"));
        return;
      }

      const span = document.createElement("span");
      span.className = "split-char";
      span.textContent = character;
      fragment.appendChild(span);
      this.chars.push(span);
    });

    element.replaceChildren(fragment);
  }

  private splitWords(element: Element) {
    const fragment = document.createDocumentFragment();
    const parts = (element.textContent ?? "").split(/(\s+)/);

    parts.forEach((part) => {
      if (!part.trim()) {
        fragment.appendChild(document.createTextNode(part));
        return;
      }

      const span = document.createElement("span");
      span.className = "split-word";
      span.textContent = part;
      fragment.appendChild(span);
      this.words.push(span);
    });

    element.replaceChildren(fragment);
  }

  private splitCharsFromWords(element: Element) {
    element.querySelectorAll(".split-word").forEach((word) => {
      const fragment = document.createDocumentFragment();

      Array.from(word.textContent ?? "").forEach((character) => {
        const span = document.createElement("span");
        span.className = "split-char";
        span.textContent = character;
        fragment.appendChild(span);
        this.chars.push(span);
      });

      word.replaceChildren(fragment);
    });
  }

  private splitLines(element: Element, linesClass: string) {
    const animationFrame = window.requestAnimationFrame(() => {
      const items = element.querySelectorAll(".split-word, .split-char");
      if (!items.length || !element.isConnected) return;

      const groupedLines: Element[][] = [];
      let currentLine: Element[] = [];
      let currentTop: number | null = null;

      items.forEach((item) => {
        const top = item.getBoundingClientRect().top;
        if (currentTop === null) currentTop = top;

        if (Math.abs(top - currentTop) > 5) {
          if (currentLine.length) groupedLines.push(currentLine);
          currentLine = [item];
          currentTop = top;
        } else {
          currentLine.push(item);
        }
      });

      if (currentLine.length) groupedLines.push(currentLine);

      groupedLines.forEach((line) => {
        const firstItem = line[0];
        const parent = firstItem.parentNode;
        if (!parent) return;

        const lineWrapper = document.createElement("span");
        lineWrapper.className = linesClass;
        lineWrapper.style.display = "block";
        parent.insertBefore(lineWrapper, firstItem);

        line.forEach((item) => {
          if (item.parentNode === parent) lineWrapper.appendChild(item);
        });
      });

      this.lines.push(
        ...Array.from(element.querySelectorAll(`.${linesClass}`)),
      );
    });

    this.animationFrames.push(animationFrame);
  }

  revert() {
    this.animationFrames.forEach((frame) => window.cancelAnimationFrame(frame));

    this.elements.forEach((element) => {
      const original = this.originalHTML.get(element);
      if (original !== undefined) element.innerHTML = original;
    });

    this.chars = [];
    this.words = [];
    this.lines = [];
    this.animationFrames = [];
    this.originalHTML.clear();
  }
}
