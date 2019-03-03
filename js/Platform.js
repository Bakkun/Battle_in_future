class Platform {
  constructor (phaser, xCoord, yCoord, xScale, yScale) {
    this.phaser = phaser;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.xScale = xScale;
    this.yScale = yScale;

    this.platform;
  };

  create () {
    this.platform = this.phaser.add.sprite(this.xCoord, this.yCoord, "platform");
    this.phaser.physics.enable(this.platform);
    this.platform.scale.setTo(this.xScale, this.yScale);
    this.platform.mass = 2;
    this.platform.body.collideWorldBounds = true;
    this.platform.body.immovable = true;
  };
}
