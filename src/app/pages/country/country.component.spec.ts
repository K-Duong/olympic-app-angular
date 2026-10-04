import { ComponentFixture, TestBed } from '@angular/core/testing';


import { CountryComponent } from "./country.component";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideHttpClient} from "@angular/common/http";

describe('DetailComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
