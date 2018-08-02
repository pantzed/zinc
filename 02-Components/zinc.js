'use strict';

/* eslint-env browser */

const Zinc = {};
Zinc.components = {};
Zinc.registerComponent = function(elementName, templateFile, dataObject){
    Zinc.components[elementName] = {
        elementName,
        templateFile,
        dataObject
    };
};

(() => {
    function renderComponents(components){
        for (let component in components) {
            renderComponent(
                components[component].elementName,
                components[component].templateFile,
                components[component].dataObject)
        }
    }

    function renderComponent(element, content, data) {
        const elements = Array.from(document.getElementsByTagName(element));
        fetch(`${content}.html`)
        .then(html => html.text())
        .then(template => {
            let regex = /{{\s*([\w.]+)\s*}}/g;
            let arr = [data];
            arr.forEach(user => 
                elements.forEach((element) => 
                    element.insertAdjacentHTML('beforeend', template.replace(regex, (match, capture) => 
                        capture.split('.').reduce((acc, curr) =>
                            acc[curr], user)))));
        });
    }

    function init() {
        Zinc.registerComponent('user-item', 'user', Zinc.userData);
        renderComponents(Zinc.components);
    }

    document.addEventListener('DOMContentLoaded', init);
})();
