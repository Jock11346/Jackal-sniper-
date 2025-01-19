// Game configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: [TitleScene, MainScene],
};

// Initialize Phaser game
const game = new Phaser.Game(config);

// Title Scene
class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  preload() {
    this.load.image('title_screen', 'assets/title_screen.png'); // Load the title screen
  }

  create() {
    this.add.image(400, 300, 'title_screen'); // Display title screen

    // Start the game on click
    this.input.once('pointerdown', () => {
      this.scene.start('MainScene');
    });
  }
}

// Main Game Scene
class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    // Load assets
    this.load.image('background', 'assets/background.png');
    this.load.image('sniper', 'assets/sniper.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.image('drone', 'assets/drone.png');
    this.load.image('barrel', 'assets/barrel.png');
    this.load.image('crosshair', 'assets/crosshair.png');
    this.load.image('bullet', 'assets/bullet.png');
  }

  create() {
    // Background
    this.add.image(400, 300, 'background');

    // Add Sniper
    this.sniper = this.physics.add.sprite(100, 300, 'sniper').setScale(0.7);

    // Add Enemy
    this.enemy = this.physics.add.sprite(700, 300, 'enemy').setScale(0.8);

    // Add Crosshair
    this.crosshair = this.physics.add.sprite(400, 300, 'crosshair');
    this.input.on('pointermove', (pointer) => {
      this.crosshair.setPosition(pointer.x, pointer.y);
    });

    // Add Drones and Barrels (example)
    this.drone = this.physics.add.sprite(500, 200, 'drone').setScale(0.5);
    this.barrel = this.physics.add.sprite(600, 500, 'barrel').setScale(0.7);

    // Bullet shooting
    this.bullets = this.physics.add.group();
    this.input.on('pointerdown', (pointer) => {
      const bullet = this.physics.add.sprite(
        this.sniper.x + 50,
        this.sniper.y,
        'bullet'
      );
      this.physics.moveTo(bullet, pointer.x, pointer.y, 500);
      this.bullets.add(bullet);
    });

    // Collision example (bullet vs enemy)
    this.physics.add.collider(this.bullets, this.enemy, (bullet, enemy) => {
      bullet.destroy();
      enemy.destroy();
    });
  }
}
