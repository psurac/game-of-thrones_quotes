import { ajaxRequest } from '../ajaxRequest.js';

// High level variable, who holds after definition, the supage div
let subpageTag;

const addSubpageContainer = (containerTag) => {
    subpageTag = document.createElement('div');
    subpageTag.className = 'subpage-content-div';
    containerTag.appendChild(subpageTag);
}

function showSubpage(subpageContainer) {
    if(subpageContainer) {
        subpageContainer.style.display = "block";
        document.querySelector('#main').style.filter = 'blur(4px)';
        document.querySelector('nav').style.filter = 'blur(4px)';
    }
};

function hideSubpage(subpageContainer) {
    if(subpageContainer) {
        subpageContainer.style.display = "none";
        document.querySelector('#main').style.filter = 'none';
        document.querySelector('nav').style.filter = 'none';
    }
};

const displayMembers = async (content) => {
    let htmlString = `<h2>The members of ${content.name}</h2>`;
    content.members.map(member => {
        htmlString += `
            <h4 class='characters' id='${member.slug}'>${member.name}</h4>
        `
    });
    subpageTag.innerHTML += htmlString;
}

const diplayQuote = async (content) => {
    const quotes = content.quotes;
    const length = quotes.length;
    const quoteDiv = subpageTag.querySelector('.quote');
    // Checking if ther is only one quote
    if (length === 1) {
        subpageTag.querySelector('#quote-change').disabled = true;
        subpageTag.querySelector('#quote-show-all').disabled = true;
        subpageTag.querySelector('#quote-change-text').innerHtml = `This Character has only one Quote yet.`;
    }
    // Inserting all Quots into the quote div
    let htmlString = '';
    quotes.forEach((quote, i) => {
        htmlString += `
            <p id='quote-${i}' style='display: none;'>${quote}</p>
        `;
    })
    quoteDiv.innerHTML += htmlString;
    // show only one random quote
    await showSingleQuote();
}

const showSingleQuote = async () => {
    const quotes = subpageTag.querySelectorAll('.quote p');
    const length = quotes.length;
    const index = Math.floor(Math.random() * length);
    quotes.forEach(quote => {
        quote.style.display = quote.id.includes(index) ? 'inline-block' : 'none';
    });
}

const showAllQuotes = () => {
    subpageTag.querySelectorAll('.quote p').forEach(quote => {
        quote.style.display = 'inline-block';
    })
}

const displayCharacter = async (content) => {
    let htmlString = `
        <h2>${content.name}</h2>
    `;
    if (content.house) {
        htmlString += `
            <p class='houses' id='${content.house.slug}'>Member of ${content.house.name}</p>
        `;
    } else {
        htmlString += `
            <p class='no-house'>No Member of a big House</p>
        `;
    }
    htmlString += `
        <div class='quote'></div>
        <button type='button' id='quote-change'>Change Quote</button>
        <button type='button' id='quote-show-all'>Show all Quotes</button>
        <p id='quote-change-text'>First button will change the quote randomly.
        If there is more than one Quote.
        With the second one You will see all Quotes</p>
    `;
    subpageTag.innerHTML += htmlString;
    await diplayQuote(content);
}

const handleClick = (e, subpageContainer) => {
    const className = e.target.className;
    const id = e.target.id;
    if (className === 'houses' || className === 'characters') {
        subpage(id, className, subpageContainer);
    } else {
        if (id === 'close-subpage') {
            hideSubpage(subpageContainer);
        }
        if (id === 'quote-change') {
            showSingleQuote();
        }
        if (id === 'quote-show-all') {
            showAllQuotes();
        }
    }
}

export const subpage = async (slug, value, subpageContainer) => {
    subpageContainer.innerHTML = '';
    addSubpageContainer(subpageContainer)
    // Fetche data from API
    const contentList = await ajaxRequest(`https://api.gameofthronesquotes.xyz/v1/${value}`);
    // Search for the slug in the List
    const content = contentList.find(item => item.slug === slug)
    // Display the html tag and set it up with a close button
    subpageTag.innerHTML = `<button type="button" id="close-subpage">x</button>`;
    subpageTag.addEventListener('click', (e) => handleClick(e, subpageContainer));
    showSubpage(subpageContainer);
    // Call different functions for differnent values
    value === 'houses' && await displayMembers(content);
    value === 'characters' && await displayCharacter(content);
}
