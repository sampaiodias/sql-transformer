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
  entityName = 'Shopping Cart';
  sqlScript =
    'CREATE TABLE tb_shopping_cart (\n      id int PRIMARY KEY,\n      user_name varchar(255) NOT NULL,\n      item_count int\n);';

  constructor() {}

  ngOnInit() {
    this.dialect = this.dialectOptions[0].value;
    this.language = this.languageOptions[0].value;
  }
}
