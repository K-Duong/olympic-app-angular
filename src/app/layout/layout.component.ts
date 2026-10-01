import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../shared/component/layout/header/header.component";
import {HeaderService} from "../shared/service/header.service";
import {Metadata} from "../models/olympic.model";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  public headerService = inject(HeaderService);
  public headerMetadata! : Metadata

  private _cdr =inject(ChangeDetectorRef);
  ngOnInit() {
    this.headerService.metadata$.subscribe(metadata => {
      this.headerMetadata = metadata;
      this._cdr.detectChanges();
    })
  }
}
