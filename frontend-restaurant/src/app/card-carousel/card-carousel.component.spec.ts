import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CardCarouselComponent } from './card-carousel.component';

describe('CardCarouselComponent', () => {
  let component: CardCarouselComponent;
  let fixture: ComponentFixture<CardCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselModule.forRoot()],
      declarations: [CardCarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 4 cards', () => {
    component.cards = [
      {
        img: '../../assets/dishes/special-dishes-1.png',
        title: 'Card 1',
        description: 'Description for Card 1',
        price: '$10',
      },
      {
        img: 'path/to/image2.jpg',
        title: 'Card 2',
        description: 'Description for Card 2',
        price: '$20',
      },
      {
        img: 'path/to/image3.jpg',
        title: 'Card 3',
        description: 'Description for Card 3',
        price: '$15',
      },
      {
        img: 'path/to/image4.jpg',
        title: 'Card 4',
        description: 'Description for Card 4',
        price: '$25',
      },
    ];
    fixture.detectChanges();

    const cardElements = fixture.nativeElement.querySelectorAll('.card');
    expect(cardElements.length).toBe(4);
  });

  // Add more tests to verify carousel behavior, e.g., sliding, navigation, etc.
});
