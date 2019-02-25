class Bullet {
  constructor (nachalo) {
    this.nachalo = nachalo;

    this.bullet;
  };

  create () {
    this.bullet = this.nachalo.add.sprite(0, 0, 'bullet');
    this.bullet.outOfBoundsKill = true;
    this.bullet.checkWorldBounds = true;
    this.nachalo.physics.enable(this.bullet, Phaser.Physics.ARCADE);
  };

  start (x, y, dir) {
    this.bullet.reset(x, y);
    this.bullet.body.velocity.x = (dir === 'left') ? -800 : 800;
  };
}
