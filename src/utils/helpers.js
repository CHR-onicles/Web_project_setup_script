const { keyboard, Key, sleep, getActiveWindow, mouse, Button, straightTo, centerOf } = require("@nut-tree/nut-js");

// Variables
const default_project = 'cause';
const project_chosen = process.argv.slice(2)[0] || default_project;


const switchDesktop = ({ left = false, right = false }) => {
    if (left === false && right === false) throw new Error('Please choose a direction to switch desktop to');
    if (left === true && right === true) throw new Error('Cannot switch desktop in both directions');

    if (left) keyboard.type(Key.LeftSuper, Key.LeftControl, Key.Left);
    if (right) keyboard.type(Key.LeftSuper, Key.LeftControl, Key.Right);
}


const checkIfAppIsOpen = async (appNames = [], partialCheck = false, partialTimeout = 0) => {
    let isOpen = false;
    const time_start = Date.now();
    const timeout = 300; // Stop in "timeout" seconds

    while (true) {
        const time_stop = Date.now();

        if (partialCheck) {
            if (Math.floor((time_stop - time_start) / 1000) > partialTimeout) break;
        }

        // console.log(Math.floor((time_stop - time_start) / 1000));
        if (Math.floor((time_stop - time_start) / 1000) > timeout) break;

        const windowRef = await getActiveWindow();
        const [title, region] = await Promise.all([windowRef.title, windowRef.region]);
        // console.log(title);
        for (const name of appNames) {
            if (title.toLocaleLowerCase().includes(name)) {
                isOpen = true;
                return true;
            }
        }
    }
    if (!partialCheck) throw new Error(`Could not open ${appNames[0]} ${appNames[1]}`);
}


const moveMouseToCenterOfRegionAndLeftClick = async (region) => {
    await mouse.move(straightTo(centerOf(region)));
    await mouse.click(Button.LEFT);
}


module.exports = {
    project_chosen,
    switchDesktop,
    checkIfAppIsOpen,
    moveMouseToCenterOfRegionAndLeftClick,
}