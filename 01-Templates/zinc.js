'use strict';

/* eslint-env browser */


(() => {

    function renderTemplate(template, users) {
        console.log(users);
        let bracketStuff = /\{\{\s+([\w.]+)\s+\}\}/gm;
        
        users.forEach((user) => {
            renderTemplate = template.replace(bracketStuff, (match, matches) => {
                let arr = matches.split('.');
                return arr.reduce((acc, curr) => acc[curr], user);
                console.log(thing);
            });
            document.getElementById('z-user-list').insertAdjacentHTML('beforeend', renderTemplate);
        });
    }

    const userLiTemplate = `
    <li class="user">
        <img class="user-photo" src="{{ picture.thumbnail }}" alt="Photo of {{ name.first }} {{ name.last }}">
        <div class="user-name">{{ name.first }} {{ name.last }}</div>
        <div class="user-location">{{ location.city }}, {{ location.state }}</div>
        <div class="user-email">{{ email }}</div>
    </li>
    `;

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(data => renderTemplate(userLiTemplate, data.results));
    }

    document.addEventListener('DOMContentLoaded', init);
})();
