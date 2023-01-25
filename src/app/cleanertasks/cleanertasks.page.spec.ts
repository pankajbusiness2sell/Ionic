import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CleanertasksPage } from './cleanertasks.page';

describe('CleanertasksPage', () => {
  let component: CleanertasksPage;
  let fixture: ComponentFixture<CleanertasksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanertasksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CleanertasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
