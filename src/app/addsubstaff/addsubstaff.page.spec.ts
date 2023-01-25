import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddsubstaffPage } from './addsubstaff.page';

describe('AddsubstaffPage', () => {
  let component: AddsubstaffPage;
  let fixture: ComponentFixture<AddsubstaffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsubstaffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddsubstaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
