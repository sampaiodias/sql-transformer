import { JsonDictionaryTranslator } from './../lib/translators/json-dictionary-translator';
import { PostgreToJavascriptPrimitivesTranslator } from './../lib/translators/postgre-to-javascript-primitives-translator';
import { TemplateMeta } from './../lib/template-meta';
import { Template } from './../lib/template';
import { TypeTranslator } from '../lib/type-translator';
import { Component, OnInit, Output } from '@angular/core';
import { PostgreToJavaTranslator } from '../lib/translators/postgre-to-java-translator';
import { CsvToLanguageParser } from '../lib/csv-to-language-parser';
import { EventEmitter } from '@angular/core';
import { ReadFile } from 'ngx-file-helpers';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transform-config',
  templateUrl: './transform-config.component.html',
  styleUrls: ['./transform-config.component.scss'],
})
export class TransformConfigComponent implements OnInit {
  typeDictionaryFileName: string;
  typeTranslator: TypeTranslator;
  templatesPicked: Array<Template>;
  templatesCount = 0;

  parser: CsvToLanguageParser;
  entityName = 'Favorite Product';
  script = 'id,integer\nname,varchar(255)\nprice,numeric';

  @Output()
  templatesReady: EventEmitter<Array<Template>> = new EventEmitter<Array<Template>>();

  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  transformButton() {
    if (this.templatesCount === 0) {
      this.toast('No templates selected!', 'Please, select one or more template files to proceed', 'warn');
      return;
    }
    if (this.typeTranslator == null) {
      this.toast('No Type Dictionary selected!', 'Please, select one Type Dictionary file to proceed', 'warn');
      return;
    }
    try {
      this.parser = this.getParser();
      const templates = new Array<Template>();
      for (let i = 0; i < this.templatesPicked.length; i++) {
        templates[i] = new Template();
        templates[i].content = this.parser.transform(this.templatesPicked[i].content);
        templates[i].meta.fileName = this.parser.replaceEntityNames(this.templatesPicked[i].meta.fileName);
        templates[i].meta.fileExtension = this.templatesPicked[i].meta.fileExtension;
        templates[i].meta.version = this.templatesPicked[i].meta.version;
      }
      this.templatesReady.emit(templates);
      this.toast('Transform successful!', '', 'success', 3000);
    } catch (error) {
      this.toast('Unknown Parse Error!', 'Check the console for more information');
      console.log(error);
    }
  }

  private getParser(): CsvToLanguageParser {
    return new CsvToLanguageParser(this.script, this.entityName, this.typeTranslator);
  }

  dictionaryFilePick(fileData: ReadFile) {
    try {
      let content: string = fileData.content;
      content = atob(content.slice(content.indexOf(',') + 1));
      this.typeTranslator = new JsonDictionaryTranslator(content);
      this.typeDictionaryFileName = fileData.name;
    } catch (error) {
      this.typeTranslator = null;
      this.typeDictionaryFileName = '';
      this.toast('Invalid Dictionary!', 'The Type Dictionary file could not be read (it is likely malformed)');
    }
  }

  templateFileReadStart(fileCount: number) {
    this.templatesPicked = new Array<Template>();
    this.templatesCount = fileCount;
  }

  templateFilePick(fileData: ReadFile) {
    let content: string = fileData.content;
    content = atob(content.slice(content.indexOf(',') + 1));

    if (!this.isTemplateFile(content)) {
      this.toast('Parse Error!', 'Selected file is not a valid SQL Transformer Template.');
      return;
    }

    const meta: TemplateMeta = JSON.parse(content.slice(6, content.indexOf('\n') + 1));
    content = content.substring(content.indexOf('\n') + 1);

    const template = new Template(content, meta);

    this.templatesPicked.push(template);
  }

  buttonTransformIsDisabled() {
    return !this.entityName || this.typeTranslator == null || !this.templatesCount;
  }

  private isTemplateFile(fileContent: string) {
    return fileContent.startsWith('SQLTT=');
  }

  private toast(title: string, subtitle: string, type: string = 'error', duration: number = 10000) {
    this.messageService.add({ severity: type, summary: title, detail: subtitle, life: duration });
  }
}
