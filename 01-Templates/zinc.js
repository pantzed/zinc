'use strict';

/* eslint-env browser */

(() => {
    function populateList(results) {
        results.forEach((user) => {
            let newListItem = document.createElement('li');
            newListItem.classList.add('user');
            let newListItemContents = `
                <img class="user-photo" src="${user.picture.thumbnail}" alt="Photo of ${user.name.first} ${user.name.last}">
                <div class="user-name">${user.name.first} ${user.name.last}</div>
                <div class="user-location">${user.location.city}, ${user.location.state}</div>
                <div class="user-email">${user.email}</div>
            `;
            newListItem.innerHTML = newListItemContents;
            document.getElementById('z-user-list').appendChild(newListItem);
        });
        console.log(results); // eslint-disable-line no-console
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);
})();
