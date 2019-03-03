class GameState {
  constructor(phaser) {
    this.phaser = phaser;
    this.players = [];
    this.players.push(new Player(this, 400, 385, 'Light'));
    this.players.push(new Player(this, 1500, 475, 'Dark'));
    this.platforms = [];
    this.platforms.push(new Platform(this, 350, 768, 3, 0.08));
    this.platforms.push(new Platform(this, 350, 688, 0.5, 0.2));
    this.platforms.push(new Platform(this, 1330, 512, 0.55, 0.64));
    this.platforms.push(new Platform(this, 590, 600, 0.8, 0.08));
    this.platforms.push(new Platform(this, 940, 512, 0.8, 0.08));
    this.platforms.push(new Platform(this, 350, 420, 1.3, 0.08));

    this.bullets = [];
  };

  preload() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
  }

  create() {
    this.phaser.add.tileSprite(0, 0, 1920, 800, 'back');
    this.phaser.physics.startSystem(Phaser.Physics.ARCADE);
    this.players.forEach(player => player.create());
    this.platforms.forEach(platform => platform.create());

    this.players[0].myName = "Light Adventurer";
    this.players[1].myName = "Dark Adventurer";

    this.players[0].BindKeys({
      left: Phaser.KeyCode.A,
      right: Phaser.KeyCode.D,
      jump: Phaser.KeyCode.W,
      punch: Phaser.KeyCode.H,
      shoot: Phaser.KeyCode.J
    });

    this.players[1].BindKeys({
      left: Phaser.KeyCode.LEFT,
      right: Phaser.KeyCode.RIGHT,
      jump: Phaser.KeyCode.UP,
      punch: Phaser.KeyCode.NUMPAD_1,
      shoot: Phaser.KeyCode.NUMPAD_2
    });
  };

  update() {
    this.players.forEach(player => player.update());

    for (let i = 0; i < this.players.length; i++) {
      for (let k = i + 1; k < this.players.length; k++) {
        this.phaser.physics.arcade.collide(this.players[i].player, this.players[k].player);
      };

      for (let k = 0; k < this.platforms.length; k++) {
        this.phaser.physics.arcade.collide(this.players[i].player, this.platforms[k].platform);
      };

      for (let k = 0; k < this.bullets.length; k++) {
        this.phaser.physics.arcade.overlap(this.bullets[k].bullet, this.players[i].player, this.CheckBulletCollisionPlayer, null,
          { bulletId: k, bullets: this.bullets });
      };
    };

    for (let i = 0; i < this.platforms.length; i++) {
      for (let k = 0; k < this.bullets.length; k++) {
        this.phaser.physics.arcade.overlap(this.bullets[k].bullet, this.platforms[i].platform, this.CheckBulletCollisionPlatform, null,
          { bulletId: k, bullets: this.bullets });
      };
    };

    if (this.players[0].IsDead() === true ||
      this.players[1].IsDead() === true) {
      this.game.time.events.add(Phaser.Timer.SECOND * 2, this.OpenMenu, this);
    };
  };

  OpenMenu() {
    this.game.camera.fade('#000000', 2000);
    this.game.camera.onFadeComplete.add(function () {
      this.game.state.start("MenuState", true, false);
    }, this);
  };

  CheckBulletCollisionPlayer(bullet, player) {
    bullet.kill();
    this.bullets.splice(this.bulletId, 1);
    player.health -= 2;
  };

  CheckBulletCollisionPlatform(bullet) {
    bullet.kill();
    this.bullets.splice(this.bulletId, 1);
  };

  CalculateDistance(player1, player2) {
    return Phaser.Math.distance(player1.x, player1.y, player2.x, player2.y);
  };

  DamageCollision(hittingPlayer, damagingPlayer) {
    if (hittingPlayer.facing === "left" &&
      hittingPlayer.position.x > damagingPlayer.position.x &&
      this.CalculateDistance(hittingPlayer, damagingPlayer) < 50) {
      damagingPlayer.health -= 1;
    };
    if (hittingPlayer.facing === "right" &&
      hittingPlayer.position.x < damagingPlayer.position.x &&
      this.CalculateDistance(hittingPlayer, damagingPlayer) < 50) {
      damagingPlayer.health -= 1;
    };
  };
}
