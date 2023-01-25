import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecleancheckpopupPage } from './recleancheckpopup.page';

describe('RecleancheckpopupPage', () => {
  let component: RecleancheckpopupPage;
  let fixture: ComponentFixture<RecleancheckpopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecleancheckpopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecleancheckpopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
