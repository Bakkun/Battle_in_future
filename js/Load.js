class Load {
  constructor (phaser) {
    this.phaser = phaser;
  };

  preload () {
    this.phaser.load.image('back', 'assets/backgroundGame.jpg');
    this.phaser.load.spritesheet('Light', 'assets/lightAdventurer.png', 50, 37);
    this.phaser.load.spritesheet('Dark', 'assets/darkAdventurer.png', 50, 37);
    this.phaser.load.image('bullet', 'assets/bomb.png');
    this.phaser.load.image('platf', 'assets/platform.png');
  };

  create () {
    this.phaser.state.start("MenuState");
  };
}
