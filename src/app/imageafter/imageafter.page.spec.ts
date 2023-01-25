import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImageafterPage } from './imageafter.page';

describe('ImageafterPage', () => {
  let component: ImageafterPage;
  let fixture: ComponentFixture<ImageafterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageafterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageafterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
