import { Component, Input } from '@angular/core';
import { Size } from 'src/gamelogic/common';

@Component({
  selector: 'BoardWrapper',
  templateUrl: './board-wrapper.component.html',
  styleUrls: ['./board-wrapper.component.css']
})
export class BoardWrapperComponent {
  @Input() boardSize: Size;

  constructor() { }

}
