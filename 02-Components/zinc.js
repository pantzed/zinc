'use strict';

/* eslint-env browser */

const Zinc = {};

(() => {
    function renderComponent(element, content, data) {
        const parent =  document.getElementsByTagName('user-item')[0];
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
        renderComponent('user-item', 'user', Zinc.userData);
    }

    document.addEventListener('DOMContentLoaded', init);
})();
