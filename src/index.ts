// 测试项目是否能运行
import { test } from './phaser-test/first';
// 引入phsaer
import Phaser from 'phaser';
import MyScene from './game-cycle/scene';
// 周期函数
const test1 = test();
console.log(test1);

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: MyScene,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  }
}
const game = new Phaser.Game(gameConfig);