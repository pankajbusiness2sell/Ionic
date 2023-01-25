import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignRecleanPopupPage } from './assign-reclean-popup.page';

describe('AssignRecleanPopupPage', () => {
  let component: AssignRecleanPopupPage;
  let fixture: ComponentFixture<AssignRecleanPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignRecleanPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignRecleanPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
