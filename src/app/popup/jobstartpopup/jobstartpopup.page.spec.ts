import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobstartpopupPage } from './jobstartpopup.page';

describe('JobstartpopupPage', () => {
  let component: JobstartpopupPage;
  let fixture: ComponentFixture<JobstartpopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobstartpopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobstartpopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
