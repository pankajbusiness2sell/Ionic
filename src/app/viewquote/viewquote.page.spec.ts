import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewquotePage } from './viewquote.page';

describe('ViewquotePage', () => {
  let component: ViewquotePage;
  let fixture: ComponentFixture<ViewquotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewquotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewquotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
