import { Component, Input } from '@angular/core';

@Component({
  selector: 'TitleView',
  templateUrl: './title-view.component.html',
  styleUrls: ['./title-view.component.css']
})
export class TitleViewComponent {
@Input() title:string;

  constructor() { }
}
