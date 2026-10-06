import { ComponentFixture, TestBed } from '@angular/core/testing';


import { CountryComponent } from "./country.component";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {ActivatedRoute, provideRouter} from "@angular/router";
import {provideHttpClient} from "@angular/common/http";
import {Olympic} from "../../models/olympic.model";

const MOCK_OLYMPICS: Olympic[] = [
  {
    id: 1,
    country: 'Italy',
    participations: [
      { id: '1', year: 2012, city: 'Londres', medalsCount: 28, athleteCount: 372 },
    ]
  },
];

describe('CountryComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        // simule l'URL /country/1
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '1' } } } },
      ]
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the loader until the data arrives', () => {
    expect(component.isLoading).toBeTrue();
    expect(fixture.nativeElement.querySelector('app-loader')).toBeTruthy();

    httpTesting.expectOne('./assets/mock/olympic.json').flush(MOCK_OLYMPICS);
    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    expect(fixture.nativeElement.querySelector('app-loader')).toBeNull();
  });
});
