import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCommandePageComponent } from './modifier-commande-page.component';

describe('ModifierCommandePageComponent', () => {
  let component: ModifierCommandePageComponent;
  let fixture: ComponentFixture<ModifierCommandePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierCommandePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierCommandePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
