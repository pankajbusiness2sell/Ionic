import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobdetailPage } from './jobdetail.page';

describe('JobdetailPage', () => {
  let component: JobdetailPage;
  let fixture: ComponentFixture<JobdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
