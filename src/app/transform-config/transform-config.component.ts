import { SqlRelationship } from './../lib/enums/sql-relationship';
import { JsonDictionaryTranslator } from './../lib/translators/json-dictionary-translator';
import { TemplateMeta } from './../lib/template-meta';
import { Template } from './../lib/template';
import { TypeTranslator } from '../lib/type-translator';
import { Component, OnInit, Output } from '@angular/core';
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
  script = 'id,id_favorite_product,integer,primary key\nname,ds_name,varchar,column\nprice,nr_price,numeric,column';

  showAddLine = false;
  variableName = '';
  columnName = '';
  sqlTypeSelected = '';
  sqlTypeOptions: Array<string> = [];
  sqlTypeFilteredOptions: Array<string> = [];
  relationshipSelected = '';
  possibleRelationships = [
    { label: 'Column', value: 'column' },
    { label: 'Primary Key', value: 'primary key' },
    { label: 'One to One', value: 'one to one' },
    { label: 'One to Many', value: 'one to many' },
    { label: 'Many to One', value: 'many to one' },
    { label: 'Many to Many', value: 'many to many' },
  ];

  private readonly supportedTemplateVersions = ['2.0'];

  @Output()
  templatesReady: EventEmitter<Array<Template>> = new EventEmitter<Array<Template>>();

  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  transformButton() {
    if (this.templatesCount === 0) {
      this.toast('No templates selected!', 'Please, select one or more template files to proceed', 'warn');
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
    let typeMap: Map<string, string>;
    if (!this.typeTranslator) {
      typeMap = new Map<string, string>();
    } else {
      typeMap = this.typeTranslator.typeMap();
    }
    return new CsvToLanguageParser(this.script, this.entityName, typeMap);
  }

  dictionaryFilePick(fileData: ReadFile) {
    try {
      let content: string = fileData.content;
      content = atob(content.slice(content.indexOf(',') + 1));
      this.typeTranslator = new JsonDictionaryTranslator(content);
      this.typeDictionaryFileName = fileData.name;
      this.sqlTypeOptions = [...this.typeTranslator.typeMap().keys()];
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
    try {
      let content: string = fileData.content;
      content = atob(content.slice(content.indexOf(',') + 1));

      if (!this.isTemplateFile(content)) {
        this.toast('Invalid Template Header!', fileData.name + ' is not a valid SQL Transformer Template (missing "SQLTT=").');
        return;
      }

      let meta: TemplateMeta;
      try {
        meta = JSON.parse(content.slice(6, content.indexOf('\n') + 1));
      } catch (error) {
        this.toast('Invalid Template Header!', fileData.name + ' is not a valid SQL Transformer Template (invalid JSON).');
        return;
      }

      if (!this.isSupportedTemplateFile(meta)) {
        this.toast('Deprecated Template!', fileData.name + ' was made with a deprecated Template version. Please, update your Template.');
      }

      content = content.substring(content.indexOf('\n') + 1);

      const template = new Template(content, meta);

      this.templatesPicked.push(template);
    } catch (error) {
      this.toast('Invalid Template!', fileData.name + ' is not a valid SQL Transformer Template (unknown error).');
      console.log(error);
    }
  }

  buttonTransformIsDisabled() {
    return !this.entityName || !this.templatesCount;
  }

  buttonAddLine() {
    this.showAddLine = true;
  }

  buttonAddLineConfirm() {
    this.showAddLine = false;
    this.script += '\n' + this.variableName + ',' + this.columnName + ',' + this.sqlTypeSelected + ',' + this.relationshipSelected;
    this.variableName = '';
    this.columnName = '';
    this.sqlTypeSelected = '';
  }

  buttonAddLineCancel() {
    this.showAddLine = false;
  }

  searchSqlTypes(event: any) {
    this.sqlTypeFilteredOptions = [];
    for (const t of this.sqlTypeOptions) {
      if (t.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.sqlTypeFilteredOptions.push(t.toLowerCase());
      }
    }
  }

  private isTemplateFile(fileContent: string) {
    return fileContent.startsWith('SQLTT=');
  }

  private isSupportedTemplateFile(templateMeta: TemplateMeta) {
    return this.supportedTemplateVersions.includes(templateMeta.version);
  }

  private toast(title: string, subtitle: string, type: string = 'error', duration: number = 10000) {
    this.messageService.add({ severity: type, summary: title, detail: subtitle, life: duration });
  }
}
