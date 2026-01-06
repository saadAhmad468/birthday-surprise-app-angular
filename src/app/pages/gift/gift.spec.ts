import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gift } from './gift';

describe('Gift', () => {
  let component: Gift;
  let fixture: ComponentFixture<Gift>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gift]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gift);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
