import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the default message', () => {
    expect(fixture.nativeElement.textContent).toContain('Loading…');
  });

  it('should display the given message', () => {
    fixture.componentRef.setInput('message', 'Loading data…');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Loading data…');
  });

  it('should be announced to screen readers', () => {
    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeTruthy();
  });
});
