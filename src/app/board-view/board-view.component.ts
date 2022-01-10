import { Component, Input} from '@angular/core';
import { Size } from 'src/gamelogic/common';

@Component({
  selector: 'BoardView',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.css']
})
export class BoardViewComponent {
@Input() boardSize: Size;

  constructor() {
   }

   getBoardStyle(): string {
    return `display: grid; border: yellow 1px solid;
    gridTemplateColumns: repeat(${this.boardSize.Width}, 10px);
    gridTemplateRows: repeat(${this.boardSize.Height}, 10px);`
  }

  getId(x: number,y: number): string {
    return "spot"+x.toString().padStart(2,"0")+y.toString().padStart(2,"0");
  }

  getStyle(x: number,y: number): string {
    return `grid-column:${x+1}; grid-row:${y+1};`
  }

  range(start: number, end : number) {
    return Array(end - start + 1).fill(0).map((_, idx) => start + idx)
  }
}
