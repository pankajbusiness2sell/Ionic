import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpsellPage } from './upsell.page';

describe('UpsellPage', () => {
  let component: UpsellPage;
  let fixture: ComponentFixture<UpsellPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpsellPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpsellPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
