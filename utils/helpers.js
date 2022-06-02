const { keyboard, Key, sleep, getActiveWindow } = require("@nut-tree/nut-js");

exports.switchDesktop = ({ left = false, right = false }) => {
    if (left === false && right === false) throw new Error('Please choose a direction to switch desktop to');
    if (left === true && right === true) throw new Error('Cannot switch desktop in both directions');

    if (left) keyboard.type(Key.LeftSuper, Key.LeftControl, Key.Left);
    if (right) keyboard.type(Key.LeftSuper, Key.LeftControl, Key.Right);
}

exports.checkIfAppIsOpen = async (appNames = []) => {
    let isOpen = false;
    const time_start = Date.now();
    const timeout = 15000; // Stop operation after 15 seconds

    while (true) {
        const windowRef = await getActiveWindow();
        const [title, region] = await Promise.all([windowRef.title, windowRef.region]);
        // console.log(title);
        for (const name of appNames) {
            if (title.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                isOpen = true;
                return true;
            }
            if ((appNames.indexOf(name) === appNames.length - 1) && !isOpen) return false;
        }
        await sleep(1000);
        const time_stop = Date.now();
        if ((time_stop - time_start) * 1000 > timeout) break;
    }
}