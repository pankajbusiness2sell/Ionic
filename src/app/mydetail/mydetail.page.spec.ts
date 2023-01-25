import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MydetailPage } from './mydetail.page';

describe('MydetailPage', () => {
  let component: MydetailPage;
  let fixture: ComponentFixture<MydetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MydetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
