import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActivejobsPage } from './activejobs.page';

describe('ActivejobsPage', () => {
  let component: ActivejobsPage;
  let fixture: ComponentFixture<ActivejobsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivejobsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivejobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
