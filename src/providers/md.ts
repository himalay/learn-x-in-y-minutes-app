import { Injectable } from '@angular/core';
import * as marked from 'marked';
import * as jsyaml from 'js-yaml';
import * as hljs from 'highlight.js';

interface Separate {
  markdown: string,
  yaml: string
};

@Injectable()
export class MdProvider {

  constructor() { }

  private separate(jekyllMarkdown: string) {
    const parsed = jekyllMarkdown.split(/^---\s*$/m);
    return { markdown: parsed[2], yaml: parsed[1] };
  }

  private parseYaml(yaml: string) {
    return jsyaml.safeLoad(Array.from(new Set(yaml.split('\n'))).join('\n'));
  }

  public compileMarkdown(markdown: string) {
    return marked(markdown).replace(/<a href=/g, '<a target="_blank" href=');
  }

  public parse(jekyllMarkdown: string) {
    const separate: Separate = this.separate(jekyllMarkdown);
    const parsedYaml: any = this.parseYaml(separate.yaml);
    let html: any = Object.assign(document.createElement('div'), {
      innerHTML: this.compileMarkdown(separate.markdown)
    });
    for (let el of html.querySelectorAll('pre code')) {
      hljs.highlightBlock(el);
    }
    html = html.outerHTML;

    return {
      contributors: parsedYaml.contributors,
      language: parsedYaml.language,
      filename: parsedYaml.filename,
      category: parsedYaml.category,
      html
    };
  }
}
