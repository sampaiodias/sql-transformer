import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformOutputComponent } from './transform-output.component';

describe('TransformOutputComponent', () => {
  let component: TransformOutputComponent;
  let fixture: ComponentFixture<TransformOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
