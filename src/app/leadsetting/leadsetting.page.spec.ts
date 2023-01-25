import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeadsettingPage } from './leadsetting.page';

describe('LeadsettingPage', () => {
  let component: LeadsettingPage;
  let fixture: ComponentFixture<LeadsettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadsettingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeadsettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
