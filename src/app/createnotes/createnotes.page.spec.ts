import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatenotesPage } from './createnotes.page';

describe('CreatenotesPage', () => {
  let component: CreatenotesPage;
  let fixture: ComponentFixture<CreatenotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatenotesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatenotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
