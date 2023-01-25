import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewnotesPage } from './viewnotes.page';

describe('ViewnotesPage', () => {
  let component: ViewnotesPage;
  let fixture: ComponentFixture<ViewnotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewnotesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewnotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
