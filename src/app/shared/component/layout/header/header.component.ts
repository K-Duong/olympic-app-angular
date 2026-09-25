import {Component, Input} from '@angular/core';
import {Indicator} from "../../../../models/olympic.model";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title!: string;
  @Input() label!: string;
  @Input() indicators!: Indicator[];

}
