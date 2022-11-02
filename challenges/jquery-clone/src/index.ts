import fetch from "node-fetch";

class SelectorResult {
  #elements;

  constructor(elements: NodeListOf<Element>) {
    this.#elements = elements;
  }

  html(content: string) {
    this.#elements.forEach((element) => {
      element.innerHTML = content;
    })
  }

  on<K extends keyof ElementEventMap>(event: K, callback: (event: ElementEventMap[K]) => void) {
    this.#elements.forEach((element) => {
      element.addEventListener(event, callback);
    });
  }

  show() {
    this.#elements.forEach((element) => {
      const htmlEl = element as HTMLElement;

      htmlEl.style.visibility = 'visible';
    });
  }

  hide() {
    this.#elements.forEach((element) => {
      const htmlEl = element as HTMLElement;

      htmlEl.style.visibility = 'hidden';
    });
  }
}

function $(selector: string) {
  return new SelectorResult(document.querySelectorAll(selector))
}

namespace $ {
  export function ajax(
    { url, successCallback
    }: {
      url: string,
      successCallback: (data: any) => void
    }) {
    return fetch(url).then(response => response.json()).then(successCallback);
  }
}

export default $;
