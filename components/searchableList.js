import { ajaxRequest } from '../ajaxRequest.js'
import { subpage } from './subpage.js';

const addClickEventListner = (className, value, subpageContainer) => {
    document.querySelectorAll(className).forEach((item) => {
        item.addEventListener('click', (e) => {
            let className = e.target.className;
            let val = value
            if (className.includes('house-')) {
                className = className.substring(className.indexOf('-') + 1);
                val = 'houses';
            }
            if (!e.target.innerHTML.includes('houseless')){
                subpage(className, val, subpageContainer);
            }
        });
    });
}

export const searchableList = async (main, value, subpageContainer) => {
    // Fetching data from api depending on the value
    let contentList = await ajaxRequest(`https://api.gameofthronesquotes.xyz/v1/${value}`);
    // Building the headline and the searchfild
    let htmlSting = `
        <h2>The ${value.charAt(0).toUpperCase()+value.slice(1)} in Game of Thrones</h2>
        <input type="text" id="searchInput" placeholder="Search..." />
        <ul id="item-list">
    `;
    // Generating the list items
    contentList.map((item) => {
        if (value === 'characters') {
            htmlSting += `
                <li class="item-li-multible">
            `
        } else {
            htmlSting += `
                <li class="item-li">
            `
        }
        htmlSting += `
                <h4 class="${item.slug}">${item.name}</h4>
            `;
        if (value === 'characters') {
            htmlSting += `
                <p class="house-${item.house && item.house.slug}">
                    ${item.house ? item.house.name : 'houseless'}
                </p>
            `;
        }
        htmlSting += `</li>`;
    });
    htmlSting += `
        </ul>
    `;
    main.innerHTML = htmlSting;
    // Add the click eventlistener to the list items
    addClickEventListner('.item-li', value, subpageContainer);
    addClickEventListner('.item-li-multible', value, subpageContainer);
    // Add the eventlistner for the searchable list
    document.querySelector('#searchInput').addEventListener('input', function() {
        // Get the search input
        const searchInput = this.value.toLowerCase();
        // Get the Items of the list
        const itemsList = document.querySelectorAll('.item-li');
        // Loop over the items and hide the ones that not contain the search input
        itemsList.forEach((item) => {
            if (item.innerText.toLowerCase().includes(searchInput)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    })
}
