'use strict';

/* eslint-env browser */


(() => {
    function renderTemplate(template, users) {
        console.log(users);
        users.forEach((data) => {
            let renderTemplate = template.replace(/{{ photo }}/gm, `${data.photo}`);
            renderTemplate = renderTemplate.replace(/{{ firstName }}/gm, `${data.firstName}`);
            renderTemplate = renderTemplate.replace(/{{ lastName }}/gm, `${data.lastName}`);
            renderTemplate = renderTemplate.replace(/{{ city }}/gm, `${data.city}`);
            renderTemplate = renderTemplate.replace(/{{ state }}/gm, `${data.state}`);
            renderTemplate = renderTemplate.replace(/{{ email }}/gm, `${data.email}`);
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
            .then((json) => {
                const allData = json.results.map((user) => {
                    const data = {
                        photo: user.picture.thumbnail,
                        firstName: user.name.first,
                        lastName: user.name.last,
                        city: user.location.city,
                        state: user.location.state,
                        email: user.email
                        };
                    return data;
                })
                return allData;
            })
            .then(allData => renderTemplate(userLiTemplate, allData));
    }

    document.addEventListener('DOMContentLoaded', init);
})();
