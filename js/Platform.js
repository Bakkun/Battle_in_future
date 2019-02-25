class Platform {
  constructor (game, xCoord, yCoord, xScale, yScale) {
    this.game = game;
    this.phaser = game.phaser;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.xScale = xScale;
    this.yScale = yScale;

    this.platform;
  };

  create () {
    this.platform = this.game.phaser.add.sprite(this.xCoord, this.yCoord, 'platf');
    this.game.phaser.physics.enable(this.platform);
    this.platform.scale.setTo(this.xScale, this.yScale);
    this.platform.mass = 6;
    this.platform.body.collideWorldBounds = true;
    this.platform.body.immovable = true;
  };
}
