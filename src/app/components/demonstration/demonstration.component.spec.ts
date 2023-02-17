import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonstrationComponent } from './demonstration.component';

describe('DemonstrationComponent', () => {
  let component: DemonstrationComponent;
  let fixture: ComponentFixture<DemonstrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemonstrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemonstrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
