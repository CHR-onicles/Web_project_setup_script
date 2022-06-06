const { screen, sleep, keyboard, Key } = require('@nut-tree/nut-js');
require('@nut-tree/template-matcher'); // for image search functionality
const notifier = require('node-notifier');
require('dotenv').config();
const path = require('path');
const { openGithubDesktop, openProjectFolder, openVSCodeInProjectFolder, openChromeAndMaximize, snapCurrentWindowToLeft, locateIntersectionOfChromeAndVSCode, openVSCodeTerminal, openDevToolsAndTurnOnResponsiveMode, switchToNextDesktop, typeLocalHostInAddressBar } = require('./procedures');
const { project_chosen } = require('./helpers');



// Settings configs
screen.config.resourceDirectory = path.join(__dirname, "./assets")
screen.config.autoHighlight = true;
// screen.config.highlightDurationMs = 3000;
keyboard.config.autoDelayMs = 50;

(async () => {

    // Step 1: Script starts in desktop 1, so switch to desktop 2
    // It seems it can't highlight stuff on the desktops screen when it presses win + tab
    // assume we are on first desktop and just move to second desktop
    await switchToNextDesktop();

    // Step 2: Open Github Desktop
    await openGithubDesktop();

    // Step 3: Open project folder using its shortcut with win + r
    await openProjectFolder();

    // Step 4: Right-click to open vscode
    await openVSCodeInProjectFolder();

    // Step 5: Open Chrome
    await openChromeAndMaximize();


    // Step 6: Snap Chrome to left side of screen
    await snapCurrentWindowToLeft();

    // Step 7: Press Enter to keep VSCode on right side of screen
    await sleep(1500);
    await keyboard.type(Key.Enter);

    // Step 8: Locate intersection of Chrome and VSCode and drag to reduce Chrome to smallest width
    await locateIntersectionOfChromeAndVSCode();

    // Step 9: Open VSCode terminal and type yarn start
    //todo: Add check later to keep trying shortcut if terminal doesn't open
    await openVSCodeTerminal();

    // Step 10: Wait for project to start, open Dev Tools and turn on responsive mode
    await openDevToolsAndTurnOnResponsiveMode();

    // Step 11: Switch to desktop 3
    await switchToNextDesktop();

    // Step 12: Open Chrome and maximize
    await openChromeAndMaximize();

    // Step 13: Type localhost:3000 in address bar and press Enter
    await typeLocalHostInAddressBar();





    notifier.notify({
        title: "Web Projects Setup script",
        message: `Setup complete, you're good to go with project: ${project_chosen}`,
        icon: './assets/icon.jpg'
    });
})()

