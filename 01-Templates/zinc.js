'use strict';

/* eslint-env browser */

(() => {
    function renderTemplate(template, users) {
        users.forEach((user) => {
            let renderTemplate = template.replace(/{{ photo }}/gm, `${user.picture.thumbnail}`);
            renderTemplate = renderTemplate.replace(/{{ firstName }}/gm, `${user.name.first}`);
            renderTemplate = renderTemplate.replace(/{{ lastName }}/gm, `${user.name.last}`);
            renderTemplate = renderTemplate.replace(/{{ city }}/gm, `${user.location.city}`);
            renderTemplate = renderTemplate.replace(/{{ state }}/gm, `${user.location.state}`);
            renderTemplate = renderTemplate.replace(/{{ email }}/gm, `${user.email}`);
            document.getElementById('z-user-list').insertAdjacentHTML('beforeend', renderTemplate);
        });
    }

    const userLiTemplate = `
    <li class="user">
        <img class="user-photo" src="{{ photo }}" alt="Photo of {{ firstName }} {{ lastName }}">
        <div class="user-name">{{ firstName }} {{ lastName }}</div>
        <div class="user-location">{{ city }}, {{ state }}</div>
        <div class="user-email">{{ email }}</div>
    </li>
    `;

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => renderTemplate(userLiTemplate, json.results));
    }

    document.addEventListener('DOMContentLoaded', init);
})();
