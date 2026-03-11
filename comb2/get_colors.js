const { Jimp } = require('jimp');

async function getColors() {
    try {
        const hero = await Jimp.read('src/assets/images/hero_bg.png');
        const heroColor = hero.getPixelColor(Math.floor(hero.bitmap.width / 2), hero.bitmap.height - 1);
        console.log('Hero bottom center Color:', heroColor.toString(16));

        const frame = await Jimp.read('public/sequence/ezgif-frame-001.jpg');
        const frameColor = frame.getPixelColor(Math.floor(frame.bitmap.width / 2), 0);
        console.log('Frame top center Color:', frameColor.toString(16));
    } catch (e) {
        console.error("FAIL", e);
    }
}
getColors();
