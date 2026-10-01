import {Component, inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../shared/component/layout/header/header.component";
import {HeaderService} from "../shared/service/header.service";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  public headerService = inject(HeaderService);
  public headerMetadata$ = this.headerService.metadata$;
}
