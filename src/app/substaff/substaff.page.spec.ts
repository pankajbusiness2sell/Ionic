import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubstaffPage } from './substaff.page';

describe('SubstaffPage', () => {
  let component: SubstaffPage;
  let fixture: ComponentFixture<SubstaffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubstaffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubstaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
