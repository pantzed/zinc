'use strict';

/* eslint-env browser */

const Zinc = {};
Zinc.components = {};
Zinc.registerComponent = function(elementName, templateFile, dataObject, controller){
    Zinc.components[elementName] = {
        elementName,
        templateFile,
        dataObject,
        controller
    };
};

(() => {
    function renderComponents(components){
        for (let component in components) {
            renderComponent(
                components[component].elementName,
                components[component].templateFile,
                components[component].dataObject,
                components[component].controller
            )
        }
    }

    function renderComponent(element, content, data, controller) {
        const elements = Array.from(document.getElementsByTagName(element));
        fetch(`${content}.html`)
        .then(html => html.text())
        .then(template => {
            let regex = /{{\s*([\w.]+)\s*}}/g;
            let arr = [data];
            arr.forEach(user => 
                elements.forEach((element) => {
                    element.addEventListener('click', controller);
                    return element.insertAdjacentHTML('beforeend', template.replace(regex, (match, capture) => 
                        capture.split('.').reduce((acc, curr) =>
                            acc[curr], user)))
                }));
        });
    }

    function toggleHilight() {
        this.firstElementChild.classList.toggle('hilight');
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
        .then(res => res.json())
        .then(data => {
            for(let i=0; i<data.results.length; i++){
                Zinc.registerComponent(`user${i}`, 'user', data.results[i], toggleHilight);
            }
        })
        .then(() => {
            return renderComponents(Zinc.components)
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();
