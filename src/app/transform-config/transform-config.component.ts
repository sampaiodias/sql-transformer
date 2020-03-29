import { ParseableLanguage } from './../parsers/parseable-languages';
import { ParseableDialect } from './../parsers/parseable-dialect';
import { Component, OnInit } from '@angular/core';
import { PostgresToJavaParser } from '../parsers/postgres-to-java-parser';
import { CsvToLanguageParser } from '../parsers/csv-to-language-parser';

@Component({
  selector: 'app-transform-config',
  templateUrl: './transform-config.component.html',
  styleUrls: ['./transform-config.component.scss']
})
export class TransformConfigComponent implements OnInit {
  dialectOptions = [
    { label: 'PostgreSQL', value: ParseableDialect.PostgreSQL }
  ];
  languageOptions = [{ label: 'Java', value: ParseableLanguage.Java }];

  parser: CsvToLanguageParser;
  dialect: ParseableDialect;
  language: ParseableLanguage;
  entityName = 'Product';
  script = 'id,integer\nname,varchar(255)\nprice,numeric';

  constructor() {}

  ngOnInit() {
    this.dialect = this.dialectOptions[0].value;
    this.language = this.languageOptions[0].value;
  }

  transformButton() {
    this.initializeParser();

    try {
      const map = this.parser.variables;
      console.log(map);
    } catch (error) {
      console.log(error);
    }
  }

  private initializeParser() {
    switch (this.dialect) {
      case ParseableDialect.PostgreSQL:
        this.initializePostgresParser();
        break;
      default:
        console.error('No parser found for dialect ' + this.dialect);
        this.parser = null;
    }
  }

  private initializePostgresParser() {
    switch (this.language) {
      case ParseableLanguage.Java:
        this.parser = new PostgresToJavaParser(this.script, this.entityName);
        break;
      default:
        console.error(
          'No parser found for language ' +
            this.dialect +
            ' using dialect ' +
            this.dialect
        );
        this.parser = null;
    }
  }
}
