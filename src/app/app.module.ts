import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardViewComponent } from './board-view/board-view.component';
import { StateViewComponent } from './state-view/state-view.component';
import { HelpViewComponent } from './help-view/help-view.component';
import { MessageViewComponent } from './message-view/message-view.component';
import { SnakeGameComponent } from './snake-game/snake-game.component';
import { TitleViewComponent } from './title-view/title-view.component';
import { BoardWrapperComponent } from './board-wrapper/board-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardViewComponent,
    StateViewComponent,
    HelpViewComponent,
    MessageViewComponent,
    SnakeGameComponent,
    TitleViewComponent,
    BoardWrapperComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
