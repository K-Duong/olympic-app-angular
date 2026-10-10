import {Component, inject, Input} from '@angular/core';
import {Indicator} from "../../../../models/olympic.model";
import {HeaderService} from "../../../service/header.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title!: string;
  @Input() label!: string;
  @Input() indicators!: Indicator[];

  protected readonly Array = Array;

  private _headerService = inject(HeaderService);

  public headerMetadata$ = this._headerService.metadata$;
}
