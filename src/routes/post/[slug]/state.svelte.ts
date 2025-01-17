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
// NOTE: Use HTML, XML for svelte while 'highlight.svelte'
// is troublesome
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

  highlightElement = (codeEl: HTMLElement) => hljs.highlightElement(codeEl)
}