import {Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet
} from "@angular/router";
import {distinctUntilChanged, filter, map} from "rxjs";
import {HeaderComponent} from "../shared/component/layout/header/header.component";
import {LoaderComponent} from "../shared/component/loader/loader.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    LoaderComponent,
    AsyncPipe,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  public isNavigating$ = inject(Router).events.pipe(
    filter(event =>
      event instanceof NavigationStart ||
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError),
    map(event => event instanceof NavigationStart),
    distinctUntilChanged(),
  );
}
