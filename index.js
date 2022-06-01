const { mouse, up, down, left, right, Point, straightTo, screen, imageResource, sleep, getActiveWindow, keyboard, Key, centerOf } = require('@nut-tree/nut-js');
const { switchDesktop, checkIfAppIsOpen } = require('./utils/helpers');
require('@nut-tree/template-matcher'); // for image search functionality
const notifier = require('node-notifier');

// String
// notifier.notify('Message');

// Object
const project_chosen = process.argv.slice(2)[0];
// console.log('Project chosen:', project_chosen);


// Settings configs
screen.config.resourceDirectory = "./assets";
screen.config.autoHighlight = true;
// screen.config.highlightDurationMs = 3000;
keyboard.config.autoDelayMs = 100;

(async () => {

    // Step 1: Script starts in desktop 1, so switch to desktop 2
    // It seems it can't highlight stuff on the desktops screen when it presses win + tab
    // assume we are on first desktop and just move to second desktop
    await sleep(1000);
    await keyboard.type(Key.LeftControl, Key.LeftSuper, Key.Right);

    // Step 2: Open Github Desktop
    await sleep(1000);
    await keyboard.type(Key.LeftSuper);
    await sleep(1000);
    await keyboard.type('github',);
    await sleep(1000);
    await keyboard.type(Key.Enter);

    // Check to make sure github desktop is open
    await sleep(2000);
    if (await checkIfAppIsOpen(['github', 'desktop']) === true) console.log("Github desktop opened successfully")
    else console.log("There was a problem opening github desktop")


    // Step 3: Open project folder using its shortcut with win + r
    await sleep(1000);
    await keyboard.type(Key.LeftSuper, Key.R);
    await sleep(1000)

    // Check to make sure Windows Search is open
    if (await checkIfAppIsOpen(['run'])) console.log("Run dialog opened successfully")
    await sleep(1000);
    await keyboard.type(project_chosen || 'cause');
    await keyboard.type(Key.Enter);

    // Check to make sure file explorer opened
    await sleep(1000);
    if (await checkIfAppIsOpen(['file explorer'])) console.log('file explorer opened successfully')

    // Step 4: Right-click to open vscode

    keyboard.type(Key.LeftShift, Key.F10);




    notifier.notify({
        title: "Web Project Setup script",
        message: `Setup complete, you're good to go with ${project_chosen}`,
        icon: './assets/icon.jpg'
    });
})()


