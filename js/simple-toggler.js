let $elementA = null;
let $elementB = null;

const setElementA = (element) => $elementA = element;
const setElementB = (element) => $elementB = element;

const setElements = (elementA, elementB) => {
    try {
        if (elementA?.nodeType == Node.ELEMENT_NODE) $elementA = elementA;
        if (elementB?.nodeType == Node.ELEMENT_NODE) $elementB = elementB;
    } catch (err) {
        console.log(err);
        $elementA = null;
        $elementB = null;
    }
}

const toggleElements = (classToToggle) => {
    if (!$elementA || !$elementB) return;
    $elementA.classList.toggle(classToToggle);
    $elementB.classList.toggle(classToToggle);
}

const toggleEnabler = (classToEnable, targetToEnable) => {
    if (!$elementA || !$elementB) return;
    switch (targetToEnable) {
        case ('A' || 'a' || $elementA): {
            toggleEnable(classToEnable, false)
            break;
        }
        case ('B' || 'b' || $elementB): {
            toggleEnable(classToEnable, true);
            break;
        }
    }
}

const toggleEnable = (classToEnable, reversed) => {
    (reversed ? elementB : elementA).classList.add(classToEnable);
    // if (!elementB.classList.contains(classToToggle))
    (reversed ? elementA : elementB).classList.remove(classToEnable); //
}

export {
    // setElementA,
    // setElementB,
    setElements,
    toggleElements,
    toggleEnabler
};