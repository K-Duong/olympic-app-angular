import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../shared/component/layout/header/header.component";
import {HeaderService} from "../shared/service/header.service";
import {Metadata} from "../models/olympic.model";
import {AsyncPipe} from "@angular/common";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    AsyncPipe
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  public headerService = inject(HeaderService);
}
