import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewjobsPage } from './newjobs.page';

describe('NewjobsPage', () => {
  let component: NewjobsPage;
  let fixture: ComponentFixture<NewjobsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewjobsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewjobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
