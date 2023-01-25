import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignComplaintPopupPage } from './assign-complaint-popup.page';

describe('AssignComplaintPopupPage', () => {
  let component: AssignComplaintPopupPage;
  let fixture: ComponentFixture<AssignComplaintPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignComplaintPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignComplaintPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
