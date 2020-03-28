import { Component, OnInit } from '@angular/core';

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
  script = 'id,int\nname,varchar(255)\nprice,numeric\n';

  constructor() {}

  ngOnInit() {
    this.dialect = this.dialectOptions[0].value;
    this.language = this.languageOptions[0].value;
  }
}
