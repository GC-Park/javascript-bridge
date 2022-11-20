const MissionUtils = require("@woowacourse/mission-utils");
const { BRIDGE_NUMBER_INPUT, PLAYER_MOVE_INPUT } = require("../utils/constant")
const BridgeRandomNumberGenerator = require("../BridgeRandomNumberGenerator.js")
const BridgeMaker = require("../BridgeMaker.js");
const BridgeGame = require("../BridgeGame.js");
const OutputView = require("./OutputView")
/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  readBridgeSize() {
    MissionUtils.Console.readLine(BRIDGE_NUMBER_INPUT, (bridgeSize) => {
      const bridge=BridgeMaker.makeBridge(bridgeSize, BridgeRandomNumberGenerator.generate());
      const playerMoveList=[];
      this.readMoving(playerMoveList,bridgeSize, bridge);
    })
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  readMoving(playerMoveList,bridgeSize, bridge) {
    const bridgeGame= new BridgeGame();
    let i = 0;
    MissionUtils.Console.readLine(PLAYER_MOVE_INPUT, (playerMove) => {
      playerMoveList.push(playerMove);
      const gameResult=bridgeGame.move(playerMoveList, bridge);
      OutputView.printMap(gameResult);
      return this.readMoving(playerMoveList, bridgeSize, bridge);
    })
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  readGameCommand() {},
};

module.exports = InputView;
