import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCountersComponent } from './event-counters.component';

describe('EventCountersComponent', () => {
  let component: EventCountersComponent;
  let fixture: ComponentFixture<EventCountersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCountersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCountersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
