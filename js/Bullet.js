class Bullet {
  constructor (phaser) {
    this.phaser = phaser;

    this.bullet;
  };

  create () {
    this.bullet = this.phaser.add.sprite(0, 0, "arrow");
    this.bullet.outOfBoundsKill = true;
    this.bullet.checkWorldBounds = true;
    this.phaser.physics.enable(this.bullet, Phaser.Physics.ARCADE);
  };

  Start (x, y, dir) {
    this.bullet.reset(x, y);
    this.bullet.body.velocity.x = (dir === "left") ? -800 : 800;
  };
}
