import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlljobsPage } from './alljobs.page';

describe('AlljobsPage', () => {
  let component: AlljobsPage;
  let fixture: ComponentFixture<AlljobsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlljobsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlljobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
