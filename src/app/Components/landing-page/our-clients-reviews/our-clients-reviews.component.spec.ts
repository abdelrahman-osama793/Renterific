import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurClientsReviewsComponent } from './our-clients-reviews.component';

describe('OurClientsReviewsComponent', () => {
  let component: OurClientsReviewsComponent;
  let fixture: ComponentFixture<OurClientsReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurClientsReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurClientsReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
