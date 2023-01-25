import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EveningcheckpopupPage } from './eveningcheckpopup.page';

describe('EveningcheckpopupPage', () => {
  let component: EveningcheckpopupPage;
  let fixture: ComponentFixture<EveningcheckpopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EveningcheckpopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EveningcheckpopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
