import { Template } from './../lib/template';
import { TransformOutputComponent } from './../transform-output/transform-output.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-transform',
  templateUrl: './transform.component.html',
  styleUrls: ['./transform.component.scss']
})
export class TransformComponent implements OnInit {
  @ViewChild(TransformOutputComponent, { static: false }) output: TransformOutputComponent;

  constructor() {}

  ngOnInit() {}

  templatesReady(templates: Array<Template>) {
    this.output.printOutput(templates);
  }
}
