import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {provideHttpClient} from "@angular/common/http";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
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

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(HomeComponent);
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
