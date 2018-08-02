'use strict';

/* eslint-env browser */

const Zinc = {};
Zinc.components = [];
Zinc.registerComponent = function(elementName, templateFile, dataObject){
    Zinc.components.push({
        elementName,
        templateFile,
        dataObject
    });
};

(() => {
    function renderComponents(components){
        components.forEach((component) => {
            renderComponent(component.elementName, component.templateFile, component.dataObject);
        })
    }

    function renderComponent(element, content, data) {
        const parent =  document.getElementsByTagName(element)[0];
        fetch(`${content}.html`)
        .then(html => html.text())
        .then(template => {
            let regex = /{{\s*([\w.]+)\s*}}/g;
            let arr = [data];
            arr.forEach(user => 
                parent.insertAdjacentHTML('beforeend', template.replace(regex, (match, capture) => 
                    capture.split('.').reduce((acc, curr) =>
                        acc[curr], user))));
        });
    }

    function init() {
        Zinc.registerComponent('user-item', 'user', Zinc.userData);
        Zinc.registerComponent('user-item', 'user', Zinc.userData);
        Zinc.registerComponent('user-item', 'user', Zinc.userData);
        renderComponents(Zinc.components);
    }

    document.addEventListener('DOMContentLoaded', init);
})();
