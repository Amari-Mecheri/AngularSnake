import { Component, Input } from '@angular/core';
import { Position, Size } from 'src/gamelogic/common';

@Component({
  selector: 'StateView',
  templateUrl: './state-view.component.html',
  styleUrls: ['./state-view.component.css']
})
export class StateViewComponent {

  alert = alert;
  @Input() score: number;
  @Input() highScore: number;
  @Input() snakeLength: number;
  @Input() snakePosition: Position;
  @Input() boardSize: Size;

  constructor() {
   }

  stateViewStyle():string {
    return `paddingTop: 6px; paddingLeft: 4px;
    display: grid; gridTemplateColumns: 67% 33%; textAlign: left;`
  }

  rightColStyle():string{
    return `textAlign: right;
    paddingLeft: 0px;
    paddingRight: 4px;`
  }

}

