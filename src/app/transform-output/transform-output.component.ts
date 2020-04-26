import { Template } from './../lib/template';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transform-output',
  templateUrl: './transform-output.component.html',
  styleUrls: ['./transform-output.component.scss'],
})
export class TransformOutputComponent implements OnInit {
  templates: Array<Template>;

  constructor() {}

  ngOnInit() {}

  printOutput(templates: Array<Template>) {
    this.templates = templates;
  }
}
