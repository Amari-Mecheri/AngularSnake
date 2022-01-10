import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Errors, Position, Size, Sprite } from 'src/gamelogic/common';
import { FreeSpace, CandyBody, SnakePart } from 'src/gamelogic/gameboard';
import { gameState } from 'src/gamelogic/gamestate';

const	defaultBoardSize = 40
const	sizeIncrement    = 10
const refreshInterval  = 100 // Defines the animations refresh rate
const boardBackGroundColor = getComputedStyle(document.documentElement).getPropertyValue('--boardViewBackGroundColor')
const candyColor = "cyan"

@Component({
  selector: 'SnakeGame',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css']
})
export class SnakeGameComponent implements AfterViewInit, OnDestroy {
  boardSize = new Size( defaultBoardSize, defaultBoardSize);
  aGameState = new gameState;
  score: number;
  highScore: number;
  snakeLength: number;
  snakePosition: Position = new Position(0,0);

  constructor() {
  }

  ngAfterViewInit(): void{
    this.initGame();
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  ngOnDestroy(){
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  initGame(): void{
    let err = this.aGameState.InitBoard(this.boardSize);
    if ( !err) {
      this.clearBoardView()
      const [listSprite, err] = this.aGameState.CreateObjects();

      if (err == null)
        this.displayObjects(listSprite);
    }
    this.updateValues();
  }

  updateValues(): void{
    let err:Errors;
    this.score = this.aGameState.Score();
    this.highScore= this.aGameState.HighScore();
    [this.snakeLength, err]= this.aGameState.SnakeSize();
    [this.snakePosition, err]= this.aGameState.SnakePosition();
  }

  clearBoardView(): void {
    for( let x=0; x<this.boardSize.Height; x++)
      for( let y=0; y<this.boardSize.Width; y++)
      this.clearPixel(x,y)
  }

  updateBoardSize() {
    let size = this.boardSize.Width
    size += sizeIncrement
    if(size>defaultBoardSize){
      size = sizeIncrement
    }

    this.boardSize = new Size(size,size)
}

launchGame(): void{
    const interval = setInterval(() => {
        if( this.aGameState.GameInProgress())
        {
          const [listSprite, err] = this.aGameState.Play();
          if(err == null){
            this.displayObjects(listSprite)
          }
          this.updateValues();
        } else clearInterval(interval);
    }, refreshInterval);
}

handleKeyDown(e:KeyboardEvent): void{
  const key = e.key;
  switch (key) {
    case "ArrowLeft":
      this.aGameState.MoveLeft()
      break;

    case "ArrowRight":
      this.aGameState.MoveRight()
      break;

    case "ArrowUp":
      this.aGameState.MoveUp()
      break;

    case "ArrowDown":
      this.aGameState.MoveDown()
      break;

    case "Enter":
      if(!this.aGameState.GameInProgress()){
          this.updateBoardSize()
          setTimeout(() => {
            this.initGame();
          }, 100);


      }
      break;

    case " " :
      if(!this.aGameState.GameInProgress()){
        if(this.aGameState.Dirty()){
          this.clearBoardView()
          this.aGameState.clearBoard()

          const [listSprite, err] = this.aGameState.CreateObjects()

          if(err == null) this.displayObjects(listSprite)
        }
        this.aGameState.Start()
        this.launchGame()
      }
      break;

    default:
      break;
  }
}

displayObjects(listSprite: Sprite[]): void {
  if(listSprite){
    for(let i=0; i<listSprite.length; i++){
      const sprite = listSprite[i]

      switch(sprite.Value){
        case FreeSpace:
          this.clearPixel(sprite.Position.X,sprite.Position.Y)
          break;
        case CandyBody:
          this.setPixel(sprite.Position.X,sprite.Position.Y, candyColor)
          break;
        case SnakePart:
          this.setPixel(sprite.Position.X,sprite.Position.Y)
          break;

        default:
          break;
      }

    }
  }
}

setPixel(x: number, y: number, color = `rgb(${[1].map(x=>Math.random()*256|0)},0,0)`): void {
  const id = "spot"+x.toString().padStart(2,"0")+y.toString().padStart(2,"0")
  const element = document.getElementById(id);
  if (element != null) element.style.backgroundColor = color;
}

clearPixel(x: number,y: number): void {
  this.setPixel(x,y,boardBackGroundColor)
}

}
