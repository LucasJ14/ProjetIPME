import Compositor from './Compositor.js';
import Entity from './Entity.js';
import Camera from './Camera.js'
import timer from './timer.js';
import { loadLevel } from './loaders.js';
import { createMario } from './entities.js';
import { createCollisionLayer } from './layers.js';
import { setupKeyboard } from './input.js';
import { setupMouseControl } from './debug.js';



const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


Promise.all([
    createMario(),
    loadLevel('1-1'),
])
    .then(([mario, level]) => {
        const camera = new Camera();
        window.camera = camera;
        const gravity = 2000;
        mario.pos.set(64, 64);
        //mario.vel.set(200, -600);

        createCollisionLayer(level);

        level.comp.layers.push(createCollisionLayer(level));
        level.entities.add(mario);




        const input = setupKeyboard(mario);
        input.listenTo(window);


        setupMouseControl(canvas, mario, camera);
    
    const timer1 = new timer(1 / 60);

    timer1.update = function update(deltaTime) {

        level.update(deltaTime);
        level.comp.draw(context, camera);
      
        mario.vel.y += gravity * deltaTime;
           
    }
    timer1.start();
 });