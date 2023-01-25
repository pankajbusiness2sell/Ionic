import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImagebeforePage } from './imagebefore.page';

describe('ImagebeforePage', () => {
  let component: ImagebeforePage;
  let fixture: ComponentFixture<ImagebeforePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagebeforePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImagebeforePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
