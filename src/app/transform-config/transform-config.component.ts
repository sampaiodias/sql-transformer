import { TypeTranslator } from '../lib/type-translator';
import { ParseableLanguage } from '../lib/enums/parseable-languages';
import { ParseableDialect } from '../lib/enums/parseable-dialect';
import { Component, OnInit } from '@angular/core';
import { PostgreToJavaTranslator } from '../lib/translators/postgre-to-java-translator';
import { CsvToLanguageParser } from '../lib/csv-to-language-parser';

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
  entityName = 'Favorite Product';
  script = 'id,integer\nname,varchar(255)\nprice,numeric';

  constructor() {}

  ngOnInit() {
    this.dialect = this.dialectOptions[0].value;
    this.language = this.languageOptions[0].value;
  }

  transformButton() {
    try {
      this.parser = this.getParser();
      console.log(
        this.parser.transform(
          'package org.test;\n\n@Entity\n@Table(name="tb_%ENTITY_NAME_SNAKE%", schema="my_schema")\npublic class %CLASS_NAME% {\n%VARIABLES_BEGIN%   @Column(name="%VARIABLE_NAME%")\n   private %VARIABLE_TYPE% %VARIABLE_NAME%;%VARIABLES_END%\n}\n'
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  private getParser(): CsvToLanguageParser {
    switch (this.dialect) {
      case ParseableDialect.PostgreSQL:
        return new CsvToLanguageParser(
          this.script,
          this.entityName,
          this.getTranslator()
        );
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
        console.error(
          'No parser found for language ' +
            this.language +
            ' using dialect ' +
            this.dialect
        );
        return null;
    }
  }
}
