class Player {
  constructor (game, xCoord, yCoord, name) {
    this.game = game;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.name = name;

    this.moveSpeed = 150;
  };

  create () {
    this.player = this.game.add.sprite(this.xCoord, this.yCoord, this.name);
    this.player.health = 10;
    this.player.scale.setTo(2);
    this.player.anchor.set(0.5);
    this.player.visilbe = true;
    this.game.phaser.physics.enable(this.player);

    this.player.body.collideWorldBounds = true;
    this.player.body.gravity.y = 1200;
    this.player.body.maxVelocity.y = 500;
    this.player.body.setSize(14, 29, 18, 8);

    this.player.animations.add("run", [23, 22, 21, 20, 19, 18], 10, true);
    let jump = this.player.animations.add("jump", [39, 38, 37, 36, 35, 34, 33, 32], 10, false);
    this.player.animations.add("stay", [7, 6, 5, 4], 5, true);
    let punch = this.player.animations.add("punch", [87, 86, 85, 84, 83, 87], 10, false);
    let shoot = this.player.animations.add("shoot", [195, 194, 193, 192, 211, 210, 209, 208], 5, false);

    jump.onComplete.add(function () {
      this.player.animations.play("stay");
    }, this);

    punch.onComplete.add(() => {
      for (let i = 0; i < this.game.players.length; i++) {
        for (let k = 0; k < this.game.players.length; k++) {
          if (i != k) {
            this.game.DamageCollision(this.player, this.game.players[k].player);
          };
        };
      };
      this.player.animations.play("stay");
    }, this);

    shoot.onComplete.add(function() {
      this.BulletFly();
      this.player.animations.play("stay");
    }, this);
  };

  update () {
    this.CheckWalking();
  }

  BindKeys ({ left, right, jump, punch, shoot }) {
    this.keys = this.game.phaser.input.keyboard.addKeys({ left, right, jump, punch, shoot });

    ["left", "right"].forEach(key => {
      this.keys[key].onUp.add(() => {
        this.player.body.velocity.x = 0;
        this.player.animations.play("stay");
      });
    });

    this.keys.jump.onDown.add(() => this.Jump());
    this.keys.punch.onDown.add(() => this.Punch());
    this.keys.shoot.onDown.add(() => this.Shoot());
  };

  CheckWalking () {
    this.player.body.velocity.x = 0
    if (!this.keys) return;
    if (this.keys.left.isDown) {
      this.Walk("left");
    } else if (this.keys.right.isDown) {
      this.Walk("right");
    };
  };


  Walk (facing) {
    this.facing = facing;
    switch (facing) {
      case "left":
        this.player.facing = "left";
        this.player.scale.setTo(2);
        this.player.animations.play("run");
        this.player.body.velocity.x = -this.moveSpeed;
        break;
      case "right":
        this.player.facing = "right";
        this.player.scale.setTo(-2, 2);
        this.player.animations.play("run");
        this.player.body.velocity.x = this.moveSpeed;
        break;
    };
  };

  Jump () {
    if (!this.player.body.touching.down) return;
    this.player.animations.stop();
    this.player.animations.play("jump");
    this.player.body.velocity.y = -500;
  };

  Punch () {
    this.player.animations.play("punch");
  };

  Shoot () {
    this.player.animations.play("shoot");
  };

  BulletFly () {
    let bullet = new Bullet(this.game.phaser);
    bullet.create();
    bullet.Start(
      this.player.body.x + (50 * ((this.facing === 'right') ? 1 : -1)),
      this.player.body.y + this.player.body.height / 2 - 10,
      this.facing);
    this.game.bullets.push(bullet);
  };

  IsDead () {
    let style = { font: "65px Arial", fill: "black", align: "center" };
    if ((this.player.position.x <= 325 || this.player.position.x >= 1380) && this.player.position.y >= 722){
      let textFell = this.game.phaser.add.text(this.game.phaser.world.centerX, 100, this.myName + " fell", style);
      textFell.anchor.set(0.5);
      this.player.kill();
      this.game.phaser.input.enabled = false;
      return true;
    };
    if(this.player.health <= 0) {
      this.player.kill();
      let textDead = this.game.phaser.add.text(this.game.phaser.world.centerX, 100, this.myName + " is dead", style);
      textDead.anchor.set(0.5);
      this.game.phaser.input.enabled = false;
      return true;
    };
  };
}
