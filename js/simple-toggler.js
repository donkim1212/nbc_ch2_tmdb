let $elementA = null;
let $elementB = null;

const CssClassToggler = {
    setElements: (a, b) => {
        try {
            $elementA = (a?.nodeType == Node.ELEMENT_NODE) ? a : null;
            $elementB = (b?.nodeType == Node.ELEMENT_NODE) ? b : null;
        } catch (err) {
            console.log(err);
            $elementA = null;
            $elementB = null;
        }
    },

    toggleElements: (classToToggle, ...elements) => {
        try {
            if (elements.length == 0) {
                elements = [ $elementA, $elementB ];
            }
            elements.forEach((element) => {
                element.classList.toggle(classToToggle);
            });
        } catch (err) {
            console.log(err);
        }
    },

    /**
     * 
     * @param {string} cssClass css class name to be added/removed
     * @param {HTMLElement} addTo element to add the css class to
     * @param {HTMLElement} removeFrom element to remove the css class from
     * @param {boolean} reverse used to swap add/remove. This can be ignored.
     * @returns 
     */
    forceEnable: (cssClass, addTo, removeFrom) => {
        try {
            if (addTo == null || removeFrom == null) return;
            if (!(addTo.nodeType == Node.ELEMENT_NODE)) return;
            if (!(removeFrom.nodeType == Node.ELEMENT_NODE)) return;
            addTo.classList.add(cssClass);
            removeFrom.classList.remove(cssClass);
        } catch (err) {
            console.log(err);
        }
    },

    forceEnableDefault: (cssClass, reverse) => {
        CssClassToggler.forceEnable(
            cssClass,
            reverse ? $elementB : $elementA,
            reverse ? $elementA : $elementB
        );
    }
}

export {
    CssClassToggler
};