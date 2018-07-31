'use strict';

/* eslint-env browser */


(() => {

    function renderTemplate(template, users) {
        console.log(users);
        let bracketStuff = /\{\{\s+([\w.]+)\s+\}\}/gm; //Full matches brackets and contents, captures full match and string.
        let renderTemplate = template;
        
        users.forEach((user) => {
            renderTemplate = renderTemplate.replace(bracketStuff, (match, matches) => {
                let arr = matches.split('.');
                let parent = user;
                let value;
                while(arr.length > 0) {
                    value = parent[`${arr[0]}`];
                    parent = value;
                    arr.shift();
                }
                return value;
            });
            document.getElementById('z-user-list').insertAdjacentHTML('beforeend', renderTemplate);
            renderTemplate = template;
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
