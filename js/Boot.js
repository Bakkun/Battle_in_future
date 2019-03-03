class Boot{
    constructor (phaser) {
        this.phaser = phaser;
    };
    
    create () {
        this.phaser.state.start("LoadFiles");
    };
}