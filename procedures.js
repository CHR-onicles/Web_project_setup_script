const { mouse, straightTo, screen, imageResource, sleep, keyboard, Key, centerOf, right, left } = require('@nut-tree/nut-js');
const { checkIfAppIsOpen, switchDesktop, moveMouseToCenterOfRegionAndLeftClick, project_chosen } = require('./helpers');
require('@nut-tree/template-matcher'); // for image search functionality


//todo: Return status of all operations

exports.switchToNextDesktop = async () => {
    await sleep(1000);
    switchDesktop({ right: true });
}


exports.openGithubDesktop = async () => {
    await sleep(1000);
    await keyboard.type(Key.LeftSuper);
    await sleep(1000);
    await keyboard.type('github',);
    await sleep(500);
    await keyboard.type(Key.Enter);

    // Check to make sure github desktop is open
    await sleep(2000);
    if (await checkIfAppIsOpen(['github', 'desktop']) === true) console.log("Github desktop opened successfully")
    else console.error("There was a problem opening github desktop")
}


exports.openProjectFolder = async () => {
    await sleep(1000);
    await keyboard.type(Key.LeftSuper, Key.R);
    await sleep(1000)

    // Check to make sure Windows Search is open
    if (await checkIfAppIsOpen(['run'])) console.log("Run dialog opened successfully")
    await sleep(1000);
    await keyboard.type(project_chosen);
    await sleep(500);
    await keyboard.type(Key.Enter);

    // Check to make sure file explorer opened

    // Helper function to prevent repetition
    const logHelper = async (path) => {
        await sleep(1000);
        if (await checkIfAppIsOpen([path.toLocaleLowerCase()]) === true) console.log(`${project_chosen} folder opened successfully`)
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
}


exports.openVSCodeInProjectFolder = async () => {
    await sleep(2000);
    await keyboard.type(Key.LeftShift, Key.F10);
    await sleep(1000);
    await keyboard.type(Key.I);

    // Check if VSCode is open
    await sleep(2000);
    if (await checkIfAppIsOpen(['visual', 'studio', 'code']) === true) console.log("VSCode opened successfully");
    else console.error("There was a problem opening VSCode");
}


exports.openChromeAndMaximize = async () => {
    await sleep(2000);
    await keyboard.type(Key.LeftSuper);
    await sleep(1000);
    await keyboard.type('chrome');
    await sleep(500);
    await keyboard.type(Key.Enter);

    // Check if Chrome is open
    await sleep(1000);
    if (await checkIfAppIsOpen(['google', 'chrome']) === true) console.log("Google Chrome opened successfully");
    else console.error("There was a problem opening Google Chrome");

    // Maximize chrome
    await sleep(3000);
    await keyboard.type(Key.LeftSuper, Key.Up);
    await sleep(1000);
    await keyboard.type(Key.LeftSuper, Key.Up); // twice to ensure it's maximized no matter what size it already is
}


exports.snapCurrentWindowToLeft = async () => {
    await sleep(3000);
    await keyboard.type(Key.LeftSuper, Key.Left);
    await sleep(1000);
    await keyboard.type(Key.LeftSuper, Key.Left);
}


exports.locateIntersectionOfChromeAndVSCode = async () => {
    try {
        const location = await screen.waitFor(imageResource('chrome-vscode-intersection.png'), 120_000, 2000);
        await mouse.move(straightTo(centerOf(location)));
        await mouse.move(right(3));
        await mouse.drag(left(550));
    } catch (error) {
        console.error(error);
    }
}


exports.openVSCodeTerminal = async () => {
    await sleep(1000);
    await keyboard.type(Key.LeftControl, Key.LeftShift, Key.Grave); // adding Shift to make sure its a new cmd prompt and not powershell
    await sleep(1000);
    await keyboard.type("yarn start");
    await sleep(500);
    await keyboard.type(Key.Enter);
}


exports.openDevToolsAndTurnOnResponsiveMode = async () => {
    await sleep(10000);
    try {
        const location = await screen.waitFor(imageResource('chrome-localhost.png'), 360_000, 3000);
        if (location) await mouse.move(straightTo(centerOf(location)));
        await mouse.leftClick(); // to make sure chrome is active before using shortcut to open dev tools
        // const windowRef = await getActiveWindow();
        // const title = await windowRef.title;
        // console.log("Current active window:", title)
    } catch (error) {
        console.error(error);
    }

    // Open Dev tools
    await sleep(1000);
    await keyboard.type(Key.LeftControl, Key.LeftShift, Key.I);

    // Check if in responsive mode helper function
    const checkForResponsiveModeHelper = async () => {
        await sleep(1000);
        try {
            let location = await screen.waitFor(imageResource('toggle-responsive-mode-off.png'), 10_000, 1000);
            if (location) {
                // Turn on responsive mode, if not in it already
                await sleep(1000);
                console.log('Responsive mode is off');
                await moveMouseToCenterOfRegionAndLeftClick(location);
                console.log('Responsive mode has been turned on');
            }
            console.log("Checking for dimensions dropdown...")
            // Click on dimensions drop dow, whatever the current value
            location = await screen.waitFor(imageResource('dimensions.png'), 10_000, 1000);
            await moveMouseToCenterOfRegionAndLeftClick(location);
            if (location) {
                console.log("Dimensions dropdown found")

                // Click on iphone 5SE
                location = await screen.waitFor(imageResource('iphone-5SE.png'), 10_000, 1000);
                await moveMouseToCenterOfRegionAndLeftClick(location);
                console.log("Iphone 5SE dimensions found")
            }

        } catch (error) {
            console.error('Responsive mode is probably on:', error);

            // Click on dimensions drop dow, whatever the current value
            let loc = await screen.waitFor(imageResource('dimensions.png'), 10_000, 1000);
            await moveMouseToCenterOfRegionAndLeftClick(loc);
            if (loc) {
                console.log("Dimensions dropdown found")

                // Click on iphone 5SE
                loc = await screen.waitFor(imageResource('iphone-5SE.png'), 10_000, 1000);
                await moveMouseToCenterOfRegionAndLeftClick(loc);
                console.log("Iphone 5SE dimensions found")
            }
        }
    }

    // Check if Dev tools is docked or a separate window
    await sleep(1000);
    if (await checkIfAppIsOpen(['dev', 'tools'], true, 5) === true) {
        console.log("Dev tools is undocked");
        await checkForResponsiveModeHelper();
    } else {
        console.log("Dev tools is docked");
        try {
            console.log("Finding dev controls...")
            let loc = await screen.waitFor(imageResource('dev-tools-controls.png'), 10_000, 1000);
            if (loc) {
                console.log("Found dev controls...")
                await moveMouseToCenterOfRegionAndLeftClick(loc);
                console.log("Finding undock icon...")
                loc = await screen.waitFor(imageResource('undock-icon.png'), 10_000, 1000);
                if (loc) {
                    console.log("Found undock icon...")
                    await moveMouseToCenterOfRegionAndLeftClick(loc);
                    console.log("Dev tools undocked");
                    await checkForResponsiveModeHelper();
                }
            }

        } catch (error) {
            console.error(error);
        }
    }
}


exports.typeLocalHostInAddressBar = async () => {
    await sleep(1000);
    await keyboard.type(Key.LeftControl, Key.L); // to put focus on address bar
    await sleep(1000);
    await keyboard.type('localhost:3000');
    await sleep(500);
    await keyboard.type(Key.Enter);
    await sleep(3000);
}