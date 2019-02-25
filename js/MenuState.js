class MenuState {
  constructor (phaser) {
    this.phaser = phaser;
  };

  preload () {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
  };

  create () {
    this.phaser.add.tileSprite(0, 0, 1920, 800, 'back');
    this.phaser.input.enabled = true;

    let style = { font: "65px Arial", fill: "black", align: "center" };
    let textFell = this.phaser.add.text(this.phaser.world.centerX, 100, "Press \"S\" to start", style);
    textFell.anchor.set(0.5);

    let startButton = this.phaser.input.keyboard.addKey(Phaser.Keyboard.S);
    startButton.onDown.add(this.actionOnClick, this);
  };

  actionOnClick () {
    this.phaser.state.start("GameState", true, false);
  };
}
