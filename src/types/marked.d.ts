declare module 'marked' {
  export function marked(text: string, options?: MarkedOptions): string
  export namespace marked {
    function setOptions(options: MarkedOptions): void
  }
  
  interface MarkedOptions {
    breaks?: boolean
    gfm?: boolean
    headerIds?: boolean
    mangle?: boolean
  }
}

declare module 'markdown-it' {
  interface Token {
    type: string
    tag: string
    attrs: any[] | null
    map: [number, number] | null
    nesting: number
    level: number
    children: Token[] | null
    content: string
    markup: string
    info: string
    meta: any
    block: boolean
    hidden: boolean
  }
  
  interface RendererRules {
    [key: string]: (tokens: Token[], idx: number, options: any, env: any, self: any) => string
  }
  
  class MarkdownIt {
    constructor(options?: MarkdownItOptions)
    render(text: string): string
    renderer: {
      rules: RendererRules
    }
  }
  
  interface MarkdownItOptions {
    html?: boolean
    breaks?: boolean
    linkify?: boolean
    typographer?: boolean
  }
  
  export default MarkdownIt
}
