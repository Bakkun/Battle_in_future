class LoadFiles {
  constructor (phaser) {
    this.phaser = phaser;
  };

  preload () {
    this.phaser.load.image("back", "assets/Background.jpg");
    this.phaser.load.spritesheet("Light", "assets/LightAdventurer.png", 50, 37);
    this.phaser.load.spritesheet("Dark", "assets/DarkAdventurer.png", 50, 37);
    this.phaser.load.image("arrow", "assets/Arrow.png");
    this.phaser.load.image("platform", "assets/Platform.png");
  };

  create () {
    this.phaser.state.start("MenuState");
  };
}
