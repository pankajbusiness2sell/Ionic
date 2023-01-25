import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecleanPage } from './reclean.page';

describe('RecleanPage', () => {
  let component: RecleanPage;
  let fixture: ComponentFixture<RecleanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecleanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecleanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
