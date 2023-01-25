import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TermandconditionPage } from './termandcondition.page';

describe('TermandconditionPage', () => {
  let component: TermandconditionPage;
  let fixture: ComponentFixture<TermandconditionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermandconditionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TermandconditionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
