import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsNearByComponent } from './whats-near-by.component';

describe('WhatsNearByComponent', () => {
  let component: WhatsNearByComponent;
  let fixture: ComponentFixture<WhatsNearByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatsNearByComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsNearByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
