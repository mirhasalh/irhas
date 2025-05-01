import hljs from 'highlight.js/lib/core'
import html from 'highlight.js/lib/languages/xml'
import plaintext from 'highlight.js/lib/languages/plaintext'
import powershell from 'highlight.js/lib/languages/powershell'
import yaml from 'highlight.js/lib/languages/yaml'
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'
import dart from 'highlight.js/lib/languages/dart'
import css from 'highlight.js/lib/languages/css'
import scss from 'highlight.js/lib/languages/scss'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
// NOTE: Use HTML, XML for svelte while 'highlight.svelte' is troublesome.
// import svelte from 'highlight.svelte'

export class PostPageState {
  registerLanguages = () => {
    hljs.registerLanguage('html', html)
    hljs.registerLanguage('plaintext', plaintext)
    hljs.registerLanguage('powershell', powershell)
    hljs.registerLanguage('yaml', yaml)
    hljs.registerLanguage('json', json)
    hljs.registerLanguage('bash', bash)
    hljs.registerLanguage('dart', dart)
    hljs.registerLanguage('css', css)
    hljs.registerLanguage('sass', scss)
    hljs.registerLanguage('javascript', javascript)
    hljs.registerLanguage('typescript', typescript)
    // hljs.registerLanguage('svelte', svelte)
  }

  highlightElement = (htmlElement: HTMLElement) => {
    htmlElement.querySelectorAll('pre code').forEach((codeEl) => {
      hljs.highlightElement(codeEl as HTMLElement)
    })
  }

  setHeadingStyles = (htmlElement: HTMLElement) => {
    htmlElement.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
      switch (heading.tagName.toLowerCase()) {
        case 'h1':
          heading.classList.add('merriweather', 'text-4xl', 'font-bold')
          break
        case 'h2':
          heading.classList.add('merriweather', 'text-3xl', 'font-semibold')
          break
        case 'h3':
          heading.classList.add('merriweather', 'text-2xl', 'font-semibold')
          break
        case 'h4':
          heading.classList.add('merriweather', 'text-xl', 'font-medium')
          break
        case 'h5':
          heading.classList.add('merriweather', 'text-lg', 'font-medium')
          break
        case 'h6':
          heading.classList.add('merriweather', 'text-base')
          break
      }
    })
  }

  setCodeStyle = (htmlElement: HTMLElement) => {
    const codeStyle = ['badge', 'badge-soft', 'badge-secondary', 'badge-sm', 'whitespace-nowrap']

    htmlElement.querySelectorAll('p > code').forEach((codeEl) => {
      codeEl.classList.add(...codeStyle)
    })
  }
}
