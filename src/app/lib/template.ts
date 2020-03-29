import { TemplateMeta } from './template-meta';
export class Template {
  content: string;
  meta: TemplateMeta;

  constructor(content: string = '', meta: TemplateMeta = { version: '1.0', fileName: 'unknown', fileExtension: 'txt' }) {
    this.content = content;
    this.meta = meta;
  }
}
