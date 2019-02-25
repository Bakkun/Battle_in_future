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
    let startText = this.phaser.add.text(this.phaser.world.centerX, 100, "Press \"S\" to start", style);
    startText.anchor.set(0.5);

    let controlTextStyle = { font: "65px Arial", fill: "white", align: "center" };
    let lightAndventurerText = this.phaser.add.text(150, 590, "Jump: W\nLeft: A\nRight: D\nPunch: H\nShoot: J", controlTextStyle);
    lightAndventurerText.anchor.set(0.5);

    let darkAndventurerText = this.phaser.add.text(1600, 590, "Jump: Arrow UP\nLeft: Arrow LEFT\nRight: Arrow RIGHT\nPunch: Numpad 1\nShoot: Numpad 2", controlTextStyle);
    darkAndventurerText.anchor.set(0.5);

    let info = this.phaser.add.text(this.phaser.world.centerX - 130, 720, "At the start of the game every character has 10 hp.\nEvery hit deals 2 damage.\nGame ends when one of the characters falls from the platform\nor when the health of one of the characters becomes 0.", { font: "30px Arial", fill: "white", align: "center" });
    info.anchor.set(0.5);

    let startButton = this.phaser.input.keyboard.addKey(Phaser.Keyboard.S);
    startButton.onDown.add(this.actionOnClick, this);
  };

  actionOnClick () {
    this.phaser.state.start("GameState", true, false);
  };
}
