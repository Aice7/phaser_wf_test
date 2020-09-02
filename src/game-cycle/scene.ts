import Phaser from 'phaser';
export default class MyScene extends Phaser.Scene {
  // 这个是静止的拱型？？？？ 
  // Arcade 是物理引擎
  arcadeplatforms: Phaser.Physics.Arcade.StaticGroup = null;
  // 案件事件
  cursors: Phaser.Types.Input.Keyboard.CursorKeys = null;
  // 小人
  dude: Phaser.Physics.Arcade.Sprite = null;
  // 可收集的星星
  stars: Phaser.Physics.Arcade.Group = null;
  bombs: Phaser.Physics.Arcade.Group = null;
  // 得分
  score: number = 0;
  scoreText: Phaser.GameObjects.Text = null;
  constructor() {
    // TODO:不知道这个需要什么
    super('demo')
  }
  // 加载资源图片
  preload() {
    const baseImgs: string[] = ['sky', 'platform', 'star', 'bomb'];
    const baseImgUrl = 'assets/teach_game/';
    for (const baseImg of baseImgs) {
      this.load.image(baseImg, baseImgUrl + baseImg + '.png');
    }
    // 精灵图 内部切割？ 宽高
    this.load.spritesheet('dude', baseImgUrl + 'dude.png', {
      frameWidth: 32, frameHeight: 48
    })
  }
  // 加载之后
  create() {
    console.log('create');
    // 将图片显示出来
    this.add.image(400, 300, 'sky');
    // 台子 某种材质？？？
    this.arcadeplatforms = this.physics.add.staticGroup();
    let platforms = this.arcadeplatforms;
    // =====创建台子======
    platforms.create(400, 568, 'platform').setScale(2).refreshBody();
    platforms.create(600, 400, 'platform');
    platforms.create(50, 250, 'platform');
    platforms.create(750, 220, 'platform');

    // =====创建人物=====
    this.dude = this.physics.add.sprite(100, 450, 'dude');
    let player = this.dude;
    // 设置弹跳力
    player.setBounce(0.2);
    // 设置碰撞属性
    player.setCollideWorldBounds(true);

    // ====创建星星 =====
    this.stars = this.physics.add.group({
      key: 'star', // 配置图片
      repeat: 11, // 在创建多少个
      setXY: { x: 12, y: 0, stepX: 70 }
    });
    this.stars.children.iterate(this.starsIterate)
    // ======创建运动动画=======
    // 左边跑
    this.anims.create({
      key: 'dude_left_move',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })
    // 右边跑
    this.anims.create({
      key: 'dude_right_move',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    })
    // 转身
    this.anims.create({
      key: 'dude_turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    // 创建显示文本
    this.scoreText = this.add.text(16, 16, '得分：0', {
      // 配置颜色大小
      fontSize: '32px',
      fill:'#000'
    })

    // 创建炸弹
    this.bombs = this.physics.add.group();

    // 监听 物体之间的碰撞
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(this.stars, platforms);
    this.physics.add.collider(this.bombs, platforms);
    // 这里必须传入的this，上下文环境环境 
    this.physics.add.overlap(player,this.stars,this.collectStar,null,this)
    // 创建键盘鼠标事件
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  // 动画帧
  update() {
    let cursors = this.cursors, player = this.dude;
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play('dude_left_move', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play('dude_right_move', true);
    } else {
      player.setVelocityX(0);
      player.anims.play('dude_turn');
    }
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-350);
    }
  }
  // 让星星消失
  collectStar(player: Phaser.GameObjects.GameObject, star: Phaser.GameObjects.GameObject) {
    // tTODO:回调函数的声明有问题
    const p = <Phaser.Physics.Arcade.Sprite>player, s = <Phaser.Physics.Arcade.Sprite>star;
    s.disableBody(true, true);
    this.score += 1;
    this.scoreText.setText('得分：' + this.score);
  }
  // 迭代小星星
  starsIterate(child:Phaser.GameObjects.GameObject) {
    const s = <Phaser.Physics.Arcade.Sprite>child;
    s .setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  }
  // 遇到星星
  hitBomb(player: Phaser.GameObjects.GameObject, bomb: Phaser.GameObjects.GameObject) {
    const p = <Phaser.Physics.Arcade.Sprite>player, b = <Phaser.Physics.Arcade.Sprite>bomb;
  }
}