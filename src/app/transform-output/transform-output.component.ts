import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transform-output',
  templateUrl: './transform-output.component.html',
  styleUrls: ['./transform-output.component.scss']
})
export class TransformOutputComponent implements OnInit {
  templates: Array<string>;

  constructor() {}

  ngOnInit() {}

  printOutput(templates: Array<string>) {
    this.templates = templates;
  }
}
