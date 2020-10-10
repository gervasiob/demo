import Phaser from 'phaser';
import io from 'socket.io-client';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        });
       
    }
    
    preload(){
        this.load.spritesheet('diamonds', 'assets/sprites/diamonds32x24x5.png', { frameWidth: 32, frameHeight: 24 });

    }
    create(){
        
        this.socket = io('http://localhost:3000');

        this.socket.on('struct create', (width, height)=> {
            console.log('struct create recibido');
            let token = this.add.rectangle(300,300,width,height,0x00ffff).setInteractive();
            this.input.setDraggable(token);
        });

        this.input.on('drag',(pointer,gameObject,dragX,dragY)=>{
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

       

        var group = this.add.group({
        key: 'diamonds',
        frame: [ 0, 1, 2, 3 ],
        frameQuantity: 10
    });

    Phaser.Actions.GridAlign(group.getChildren(), {
        width: 10,
        height: 10,
        cellWidth: 32,
        cellHeight: 32,
        x: 100,
        y: 100
    });
        
    }

    update(){

    }
}