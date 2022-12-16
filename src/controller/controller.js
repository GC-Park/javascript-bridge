const OutputView = require("../views/OutputView.js")
const InputView = require("../views/InputView")
const Game = require("../model/Game")
const { SUCCESS, FAIL, RESTART, QUIT, WRONG } = require("../utils/constant")

class Controller{

  constructor(){
    this.model = new Game()
  }

  gameStart(){
    OutputView.printGameStart()
    this.getBridge();
  }

  getBridge(){
    InputView.readBridgeSize((bridgeSize)=>{
     this.model.createBridge(bridgeSize)
      this.playerStart();
    })
  }

  playerStart(){
    InputView.readMoving((playerMove)=>{
      this.model.playerMoving(playerMove)
      OutputView.printMap(this.model.result);
      if(this.model.result.includes(WRONG)) return this.gameRetry();
      if(this.model.playerList.length===Number(this.model.size)) return OutputView.printResult(this.model.result, SUCCESS, this.model.gameBridge.getTotalTry())
      this.playerStart();
    })
  }

  gameRetry(){
    InputView.readGameCommand((answer)=>{
      if(answer===QUIT) OutputView.printResult(this.model.result, FAIL, this.model.gameBridge.getTotalTry())
      if(answer===RESTART) {
        this.model.gameBridge.retry();
        this.model.setPlayerList();
        this.playerStart();
      }
    })
  }

}

module.exports = Controller