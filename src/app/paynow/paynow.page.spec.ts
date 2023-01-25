import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaynowPage } from './paynow.page';

describe('PaynowPage', () => {
  let component: PaynowPage;
  let fixture: ComponentFixture<PaynowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaynowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaynowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
