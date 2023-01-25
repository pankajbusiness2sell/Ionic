import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompletejobsPage } from './completejobs.page';

describe('CompletejobsPage', () => {
  let component: CompletejobsPage;
  let fixture: ComponentFixture<CompletejobsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletejobsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompletejobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
