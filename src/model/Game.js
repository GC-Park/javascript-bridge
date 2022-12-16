const BridgeGame = require("./BridgeGame.js");
const BridgeRandomNumberGenerator = require("../BridgeRandomNumberGenerator.js")
const BridgeMaker = require("../BridgeMaker.js");

class Game {
  #bridgeGame;
  #bridge;
  #playerMoveList;
  #gameResult;
  #bridgeSize;

  constructor(){
    this.#playerMoveList = []
  }

  get result(){
    return this.#gameResult;
  }

  get playerList(){
    return this.#playerMoveList;
  }

  get size(){
    return this.#bridgeSize;
  }

  get gameBridge(){
    return this.#bridgeGame
  }

  setPlayerList(){
    this.#playerMoveList = []
  }

  createBridge(bridgeSize) {
    this.#bridgeSize=bridgeSize
    this.#bridge=BridgeMaker.makeBridge(this.#bridgeSize, BridgeRandomNumberGenerator.generate);
    this.#bridgeGame= new BridgeGame(this.#bridge);
  }

  playerMoving(playerMove){
    this.#playerMoveList=this.moveListPush(this.#playerMoveList, playerMove)
    this.#gameResult=this.#bridgeGame.move(this.#playerMoveList);
  }

  moveListPush(list, move){
    list.push(move)
    return list;
  }
}

module.exports = Game