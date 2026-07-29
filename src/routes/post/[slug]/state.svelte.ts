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
import python from 'highlight.js/lib/languages/python'
// NOTE: Use HTML, XML for svelte while 'highlight.svelte' is troublesome.
// import svelte from 'highlight.svelte'

export class PostPageState {
  registerLanguages = () => {
    hljs.registerLanguage('html', html)
    hljs.registerLanguage('plaintext', plaintext)
    hljs.registerLanguage('powershell', powershell)
    hljs.registerLanguage('python', python)
    hljs.registerLanguage('yaml', yaml)
    hljs.registerLanguage('json', json)
    hljs.registerLanguage('bash', bash)
    hljs.registerLanguage('dart', dart)
    hljs.registerLanguage('css', css)
    hljs.registerLanguage('sass', scss)
    hljs.registerLanguage('javascript', javascript)
    hljs.registerLanguage('typescript', typescript)
  }

  highlightElement = (htmlElement: HTMLElement) => {
    htmlElement.querySelectorAll('pre code:not(.hljs)').forEach((block) => hljs.highlightElement(block as HTMLElement))
  }

  setCodeStyle = (htmlElement: HTMLElement) => {
    const codeStyle = ['badge', 'badge-soft', 'badge-secondary', 'badge-sm', 'whitespace-nowrap']

    htmlElement.querySelectorAll('p > code').forEach((codeEl) => {
      codeEl.classList.add(...codeStyle)
    })

    htmlElement.querySelectorAll('li > code').forEach((codeEl) => {
      codeEl.classList.add(...codeStyle)
    })
  }

  setLinkStyle = (htmlElement: HTMLElement) => {
    const linkStyle = ['link', 'link-primary', 'link-hover']

    htmlElement.querySelectorAll('p > a').forEach((linkEl) => {
      linkEl.classList.add(...linkStyle)
    })
  }

  setBlockquoteStyle = (htmlElement: HTMLElement) => {
    const linkStyle = ['blockquote']

    htmlElement.querySelectorAll('blockquote').forEach((blockquoteEl) => {
      blockquoteEl.classList.add(...linkStyle)
    })
  }

  setTableStyle = (htmlElement: HTMLElement) => {
    const tableStyle = ['table', 'table-zebra', 'bg-base-100']

    htmlElement.querySelectorAll('table').forEach((tableEl) => {
      tableEl.classList.add(...tableStyle)
    })
  }

  setTableHeaderStyle = (htmlElement: HTMLElement) => {
    const tableHeadStyle = ['bg-base-300']

    htmlElement.querySelectorAll('thead').forEach((tableHeadEl) => {
      tableHeadEl.classList.add(...tableHeadStyle)
    })
  }

  setUnorderedListStyle = (htmlElement: HTMLElement) => {
    const ulStyle = ['list', 'list-disc', 'pl-6']

    htmlElement.querySelectorAll('ul').forEach((ulEl) => {
      ulEl.classList.add(...ulStyle)
    })
  }

  setOrderedListStyle = (htmlElement: HTMLElement) => {
    const olStyle = ['list', 'list-decimal', 'pl-6']

    htmlElement.querySelectorAll('ol').forEach((ulEl) => {
      ulEl.classList.add(...olStyle)
    })
  }

  onTocItem = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if (typeof element.focus === "function") {
        element.focus();
      }

      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.warn(`Element with id "${id}" not found.`)
    }
  }

  buildToc = (htmlElement: HTMLElement): App.TocItem[] => {
    let toc = <App.TocItem[]>[]

    const headings = [
      ...htmlElement.querySelectorAll('h1, h2, h3, h4, h5, h6')
    ] as HTMLHeadingElement[]

    const root: App.TocItem[] = []
    const stack: { level: number; node: App.TocItem }[] = []

    for (const heading of headings) {
      const level = Number(heading.tagName[1])
      const node: App.TocItem = {
        id: heading.id,
        text: heading.textContent?.trim() ?? '',
        children: []
      };

      // pop stack until top has a smaller level than current heading
      while (stack.length && stack[stack.length - 1].level >= level) {
        stack.pop()
      }

      if (stack.length === 0) {
        root.push(node);
      } else {
        stack[stack.length - 1].node.children.push(node)
      }

      stack.push({ level, node });
    }

    toc = root
    console.log(toc)
    return toc
  }
}
