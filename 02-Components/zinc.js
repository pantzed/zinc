'use strict';

/* eslint-env browser */

const Zinc = {};
Zinc.components = {};
Zinc.registerComponent = function(componentObject){
    Zinc.components[componentObject.elementName] = componentObject;
};

(() => {
    function renderComponents(components){
        for (let component in components) {
            console.log();
            renderComponent(components[component]);
        }
    }

    function renderComponent(component) {
        const elements = Array.from(document.getElementsByTagName(component.elementName));
        fetch(`${component.templateFile}.html`)
        .then(html => html.text())
        .then(template => {
            let regex = /{{\s*([\w.]+)\s*}}/g;
            let arr = [component.data];
            arr.forEach(user => 
                elements.forEach((element) => {
                    element.addEventListener('click', component.controller);
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
                Zinc.registerComponent({
                    elementName: `user${i}`,
                    templateFile: 'user',
                    data: data.results[i],
                    controller: toggleHilight
                });
            }
        })
        .then(() => {
            return renderComponents(Zinc.components)
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();
