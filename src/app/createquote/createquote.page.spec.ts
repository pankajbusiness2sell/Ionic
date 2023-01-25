import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatequotePage } from './createquote.page';

describe('CreatequotePage', () => {
  let component: CreatequotePage;
  let fixture: ComponentFixture<CreatequotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatequotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatequotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
