class Player {
  constructor (game, xCoord, yCoord, name) {
    this.game = game;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.name = name;
  };

  create () {
    this.player = this.game.add.sprite(this.xCoord, this.yCoord, this.name);
    this.player.health = 10;
    this.player.scale.setTo(2);
    this.player.visilbe = true;
    this.game.phaser.physics.enable(this.player);

    this.player.body.collideWorldBounds = true;
    this.player.body.gravity.y = 1200;
    this.player.body.maxVelocity.y = 500;
    this.player.body.setSize(14, 29, 18, 8);

    this.player.animations.add('runLeft', [23, 22, 21, 20, 19, 18], 10, true);
    this.player.animations.add('runRight', [24, 25, 26, 27, 28, 29], 10, true);
    let jumpLeft = this.player.animations.add('jumpLeft', [39, 38, 37, 36, 35, 34, 33, 32], 10, false);
    let jumpRight = this.player.animations.add('jumpRight', [41, 42, 43, 44, 45, 46, 47, 48], 10, false);
    this.player.animations.add('stayLeft', [7, 6, 5, 4], 5, true);
    this.player.animations.add('stayRight', [8, 9, 10, 11], 5, true);
    let punchLeft = this.player.animations.add('punchLeft', [87, 86, 85, 84, 83, 87], 10, false);
    let punchRight = this.player.animations.add('punchRight', [88, 89, 90, 91, 92, 88], 10, false);
    let shootLeft = this.player.animations.add('shootLeft', [195, 194, 193, 192, 211, 210, 209, 208], 5, false);
    let shootRight = this.player.animations.add('shootRight', [196, 197, 198, 199, 212, 213, 214, 215], 5, false);

    jumpLeft.onComplete.add(function () {
      this.player.animations.play('stayLeft');
    }, this);
    jumpRight.onComplete.add(function () {
      this.player.animations.play('stayRight');
    }, this);

    punchLeft.onComplete.add(() => {
      this.player.facing = 'left';
      for (let i = 0; i < this.game.players.length; i++) {
        for (let k = 0; k < this.game.players.length; k++) {
          if (i != k) {
            this.game.DamageCollision(this.player, this.game.players[k].player);
          };
        };
      };
      this.player.animations.play('stayLeft');
    }, this);

    punchRight.onComplete.add(() => {
      this.player.facing = 'right';
      for(let i = 0; i < this.game.players.length; i++) {
        for(let k = 0; k < this.game.players.length; k++) {
          if(i != k) this.game.DamageCollision(this.player, this.game.players[k].player);
        }
      }
      this.player.animations.play('stayRight');
    }, this);

    shootRight.onComplete.add(function() {
      this.BulletFly();
      this.player.animations.play('stayRight');
    }, this);

    shootLeft.onComplete.add(function() {
      this.BulletFly();
      this.player.animations.play('stayLeft');
    }, this);
  };

  update () {
    this.checkWalking();
  }

  bindKeys ({ left, right, jump, punch, shoot }) {
    this.keys = this.game.phaser.input.keyboard.addKeys({ left, right, jump, punch, shoot });

    ['left', 'right'].forEach(key => {
      this.keys[key].onUp.add(() => {
        this.player.body.velocity.x = 0;
        if (this.facing === 'left') {
          this.player.animations.play('stayLeft');
        } else {
          this.player.animations.play('stayRight');
        };
      });
    });

    this.keys.jump.onDown.add(() => this.Jump());
    this.keys.punch.onDown.add(() => this.Punch());
    this.keys.shoot.onDown.add(() => this.Shoot());
  };

  checkWalking () {
    this.player.body.velocity.x = 0
    if (!this.keys) return;
    if (this.keys.left.isDown) {
      this.Walk('left');
    } else if (this.keys.right.isDown) {
      this.Walk('right');
    };
  };


  Walk (facing) {
    this.facing = facing;
    switch (facing) {
      case 'left':
        this.player.animations.play('runLeft');
        this.player.body.velocity.x = -150;
        break;
      case 'right':
        this.player.animations.play('runRight');
        this.player.body.velocity.x = 150;
        break;
    };
  };

  Jump () {
    if (!this.player.body.touching.down) return;
    this.player.animations.stop();
    if (this.facing === 'left') this.player.animations.play('jumpLeft');
    else if (this.facing === 'right') this.player.animations.play('jumpRight');
    this.player.body.velocity.y = -500;
  };

  Punch () {
    if(this.facing === 'left') this.player.animations.play('punchLeft');
    if(this.facing === 'right') this.player.animations.play('punchRight');
  };

  Shoot () {
    if(this.facing === 'left') this.player.animations.play('shootLeft');
    if(this.facing === 'right') this.player.animations.play('shootRight');
  };

  BulletFly () {
    let bullet = new Bullet(this.game.phaser);
    bullet.create();
    bullet.start(
      this.player.body.x + ( 50 * ((this.facing === 'right')?1:-1) ),
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
