import { useEffect } from 'react'

export const useScriptUrl = (
  url: string,
  isAsync = true,
  htmlEl?: HTMLElement
) => {
  useEffect(() => {
    const $scriptEl = document.createElement('script')

    $scriptEl.src = url
    if (isAsync) $scriptEl.async = true

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    htmlEl
      ? htmlEl.appendChild($scriptEl)
      : document.body.appendChild($scriptEl)
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      htmlEl
        ? htmlEl.removeChild($scriptEl)
        : document.body.removeChild($scriptEl)
    }
  }, [htmlEl, url, isAsync])
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useScript = (content: any, htmlEl?: HTMLElement) => {
  useEffect(() => {
    const $scriptEl = document.createElement('script')
    $scriptEl.innerHTML = content

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    htmlEl
      ? htmlEl.appendChild($scriptEl)
      : document.body.appendChild($scriptEl)
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      htmlEl
        ? htmlEl.removeChild($scriptEl)
        : document.body.removeChild($scriptEl)
    }
  }, [htmlEl, content])
}
