import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CleaningpopupPage } from './cleaningpopup.page';

describe('CleaningpopupPage', () => {
  let component: CleaningpopupPage;
  let fixture: ComponentFixture<CleaningpopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleaningpopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CleaningpopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
