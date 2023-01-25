import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EveningcheckPage } from './eveningcheck.page';

describe('EveningcheckPage', () => {
  let component: EveningcheckPage;
  let fixture: ComponentFixture<EveningcheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EveningcheckPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EveningcheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
