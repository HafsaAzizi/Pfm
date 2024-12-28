import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandePageComponent } from './commande-page.component';

describe('CommandePageComponent', () => {
  let component: CommandePageComponent;
  let fixture: ComponentFixture<CommandePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
