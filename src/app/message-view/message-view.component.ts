import { Component, Input } from '@angular/core';

@Component({
  selector: 'MessageView',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css']
})
export class MessageViewComponent {
  @Input() message:string;

  constructor() {
  }
}
