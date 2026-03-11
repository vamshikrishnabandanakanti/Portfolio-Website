const { Jimp } = require('jimp');

async function analyze() {
    try {
        const hero = await Jimp.read('src/assets/images/hero_bg.png');
        const wH = hero.bitmap.width;
        const hH = hero.bitmap.height;

        console.log("Hero bottom Row:");
        for (let x of [0, Math.floor(wH * 0.25), Math.floor(wH * 0.5), Math.floor(wH * 0.75), wH - 1]) {
            console.log(`x=${x}:`, hero.getPixelColor(x, hH - 1).toString(16).padStart(8, '0'));
        }

        const frame = await Jimp.read('public/sequence/ezgif-frame-001.jpg');
        const wF = frame.bitmap.width;
        const hF = frame.bitmap.height;

        console.log("Frame Top Row:");
        for (let x of [0, Math.floor(wF * 0.25), Math.floor(wF * 0.5), Math.floor(wF * 0.75), wF - 1]) {
            console.log(`x=${x}:`, frame.getPixelColor(x, 0).toString(16).padStart(8, '0'));
        }
    } catch (e) {
        console.log(e);
    }
}
analyze();
