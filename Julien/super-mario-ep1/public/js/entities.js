import Entity from './Entity.js';
import Go from './traits/go.js';
import Velocity from './traits/velocity.js';
import Jump from './traits/ Jump.js';
import { loadMarioSprite } from './sprites.js';


export function createMario() {
    return loadMarioSprite()
        .then(sprite => {
            const mario = new Entity();
            mario.size.set(16,16);
            mario.addTrait(new Go());
            mario.addTrait(new Jump());
            //mario.addTrait(new Velocity());
           

     mario.draw = function drawMario(context) {
         sprite.draw('idle', context, 0, 0);
    }

    return mario;
});
}