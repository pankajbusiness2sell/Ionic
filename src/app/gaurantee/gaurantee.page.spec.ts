import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GauranteePage } from './gaurantee.page';

describe('GauranteePage', () => {
  let component: GauranteePage;
  let fixture: ComponentFixture<GauranteePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GauranteePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GauranteePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
