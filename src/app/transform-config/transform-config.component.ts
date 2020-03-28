import { Component, OnInit } from '@angular/core';
import { PostgresToJavaParser } from '../parsers/postgres-to-java-parser';

@Component({
  selector: 'app-transform-config',
  templateUrl: './transform-config.component.html',
  styleUrls: ['./transform-config.component.scss']
})
export class TransformConfigComponent implements OnInit {
  dialectOptions = [{ label: 'PostgreSQL', value: 'PostgreSQL' }];
  languageOptions = [{ label: 'Java', value: 'Java' }];

  dialect: string;
  language: string;
  entityName = 'Product';
  script = 'id,integer\nname,varchar(255)\nprice,numeric';

  constructor() {}

  ngOnInit() {
    this.dialect = this.dialectOptions[0].value;
    this.language = this.languageOptions[0].value;
  }

  transformButton() {
    const parser = new PostgresToJavaParser();

    try {
      const map = parser.parse(this.script);
      console.log(map);
    } catch (error) {
      console.log(error);
    }
  }
}
