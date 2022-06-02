const { mouse, up, down, left, right, Point, straightTo, screen, imageResource, sleep, getActiveWindow, keyboard, Key, centerOf } = require('@nut-tree/nut-js');
const { switchDesktop, checkIfAppIsOpen } = require('./utils/helpers');
require('@nut-tree/template-matcher'); // for image search functionality
const notifier = require('node-notifier');
require('dotenv').config();

// String
// notifier.notify('Message');

// Object
const default_project = 'cause';
const project_chosen = process.argv.slice(2)[0] || default_project;
// console.log('Project chosen:', project_chosen);


// Settings configs
screen.config.resourceDirectory = "./assets";
screen.config.autoHighlight = true;
// screen.config.highlightDurationMs = 3000;
keyboard.config.autoDelayMs = 50;

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
    else console.error("There was a problem opening github desktop")


    // Step 3: Open project folder using its shortcut with win + r
    await sleep(1000);
    await keyboard.type(Key.LeftSuper, Key.R);
    await sleep(1000)

    // Check to make sure Windows Search is open
    if (await checkIfAppIsOpen(['run'])) console.log("Run dialog opened successfully")
    await sleep(1000);
    await keyboard.type(project_chosen);
    await keyboard.type(Key.Enter);

    // Check to make sure file explorer opened

    // Helper function to prevent repetition
    const logHelper = async (path) => {
        await sleep(1000);
        if (await checkIfAppIsOpen([path]) === true) console.log(`${project_chosen} folder opened successfully`)
        else console.error(`There was a problem opening ${project_chosen} folder`);
    }

    switch (project_chosen) {
        case 'cause':
            logHelper(process.env.CAUSE_PATH);
            break;

        case 'adkasa':
            logHelper(process.env.ADKASA_PATH);
            break;

        case 'polymorph':
            logHelper(process.env.POLYMORPH_PATH);
            break;

        case 'mzpem':
            logHelper(process.env.MZPEM_PATH);
            break;

        default:
            throw new Error("Project chosen is not valid!");
    }

    // Step 4: Right-click to open vscode
    await sleep(1000);
    await keyboard.type(Key.LeftShift, Key.F10);
    await sleep(1000);
    await keyboard.type(Key.I);

    // Check if VSCode is open
    await sleep(1000);
    if (await checkIfAppIsOpen(['visual', 'studio', 'code']) === true) console.log("VSCode opened successfully");
    else console.error("There was a problem opening VSCode");

    // Step 5: Open Chrome
    await sleep(1000);
    await keyboard.type(Key.LeftSuper);
    await sleep(1000);
    await keyboard.type('chrome');
    await keyboard.type(Key.Enter);

    // Check if Chrome is open
    await sleep(1000);
    if (await checkIfAppIsOpen(['google', 'chrome']) === true) console.log("Google Chrome opened successfully");
    else console.error("There was a problem opening Google Chrome");

    // Step 6: Snap Chrome to left side of screen
    await sleep(1000);
    await keyboard.type(Key.LeftSuper, Key.Left);
    await sleep(500);
    await keyboard.type(Key.LeftSuper, Key.Left);

    // Step 7: Press Enter to keep VSCode on right side of screen
    await sleep(1000);
    await keyboard.type(Key.Enter);

    // Step 8: Locate intersection of Chrome and VSCode and drag to reduce Chrome to smallest width
    try {
        const location = await screen.waitFor(imageResource('chrome-vscode-intersection.png'), 7000, 1000);
        await mouse.move(straightTo(centerOf(location)));
        await mouse.move(right(3));
        await mouse.drag(left(550));
    } catch (error) {
        console.error(error);
    }

    // Step 9: Open VSCode terminal and type yarn start
    await sleep(1000);
    await keyboard.type(Key.LeftControl, Key.Grave);
    await sleep(1000);
    await keyboard.type("yarn start");
    await keyboard.type(Key.Enter);




    notifier.notify({
        title: "Web Project Setup script",
        message: `Setup complete, you're good to go with ${project_chosen}`,
        icon: './assets/icon.jpg'
    });
})()


