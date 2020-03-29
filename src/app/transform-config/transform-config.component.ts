import { TemplateMeta } from './../lib/template-meta';
import { Template } from './../lib/template';
import { TypeTranslator } from '../lib/type-translator';
import { ParseableLanguage } from '../lib/enums/parseable-languages';
import { ParseableDialect } from '../lib/enums/parseable-dialect';
import { Component, OnInit, Output } from '@angular/core';
import { PostgreToJavaTranslator } from '../lib/translators/postgre-to-java-translator';
import { CsvToLanguageParser } from '../lib/csv-to-language-parser';
import { EventEmitter } from '@angular/core';
import { ReadFile } from 'ngx-file-helpers';

@Component({
  selector: 'app-transform-config',
  templateUrl: './transform-config.component.html',
  styleUrls: ['./transform-config.component.scss']
})
export class TransformConfigComponent implements OnInit {
  dialectOptions = [{ label: 'PostgreSQL', value: ParseableDialect.PostgreSQL }];
  languageOptions = [{ label: 'Java', value: ParseableLanguage.Java }];
  templatesPicked: Array<Template>;
  templatesCount = 0;

  parser: CsvToLanguageParser;
  dialect: ParseableDialect;
  language: ParseableLanguage;
  entityName = 'Favorite Product';
  script = 'id,integer\nname,varchar(255)\nprice,numeric';

  @Output()
  templatesReady: EventEmitter<Array<Template>> = new EventEmitter<Array<Template>>();

  constructor() {}

  ngOnInit() {
    this.dialect = this.dialectOptions[0].value;
    this.language = this.languageOptions[0].value;
  }

  transformButton() {
    try {
      this.parser = this.getParser();
      for (let i = 0; i < this.templatesPicked.length; i++) {
        this.templatesPicked[i].content = this.parser.transform(this.templatesPicked[i].content);
      }
      this.templatesReady.emit(this.templatesPicked);
    } catch (error) {
      console.log(error);
    }
  }

  private getParser(): CsvToLanguageParser {
    switch (this.dialect) {
      case ParseableDialect.PostgreSQL:
        return new CsvToLanguageParser(this.script, this.entityName, this.getTranslator());
      default:
        console.error('No parser found for dialect ' + this.dialect);
        return null;
    }
  }

  private getTranslator(): TypeTranslator {
    switch (this.language) {
      case ParseableLanguage.Java:
        return new PostgreToJavaTranslator();
      default:
        console.error('No parser found for language ' + this.language + ' using dialect ' + this.dialect);
        return null;
    }
  }

  fileReadStart(fileCount: number) {
    this.templatesPicked = new Array<Template>();
    this.templatesCount = fileCount;
  }

  filePick(fileData: ReadFile) {
    let content: string = fileData.content;
    content = atob(content.slice(content.indexOf(',') + 1));

    if (!this.isTemplateFile(content)) {
      console.error('Selected file is not a valid SQL Transformer Template.');
      return;
    }

    const meta: TemplateMeta = JSON.parse(content.slice(6, content.indexOf('\n') + 1));
    content = content.substring(content.indexOf('\n') + 1);

    const template = new Template(content, meta);

    this.templatesPicked.push(template);
  }

  private isTemplateFile(fileContent: string) {
    return fileContent.startsWith('SQLTT=');
  }
}
