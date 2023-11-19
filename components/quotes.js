import { ajaxRequest } from '../ajaxRequest.js';
import { subpage } from './subpage.js';

const generateQuotes = async (main, value, subpageContainer) => {
    // Fetching data from the API
    let quotesContainer = main.querySelector('.quotes-container');
    quotesContainer.innerHTML = 'Awaiting...';
    let contentList = await ajaxRequest(`https://api.gameofthronesquotes.xyz/v1/${value}/5`);
    // Inserting the quotes into main
    let htmlString = '';
    contentList.forEach(content => {
        htmlString += `
        <div class='quote-div'>
            <p class='${content.character.slug}'>${content.sentence}</p>
            <span class='${content.character.slug}'>${content.character.name}</span>
        </div>
        `;
    });
    quotesContainer.innerHTML = htmlString;
    // Adding a eventlistner to lead from the Character to the subpage
}

const handlClick = (e, subpageContainer) => {
    subpage(e.target.className, 'characters', subpageContainer);
}

export const quotes = async (main, value, subpageContainer) => {
    main.innerHTML = '';
    const quotesDiv = document.createElement('div');
    quotesDiv.className = 'quotes-container';
    main.appendChild(quotesDiv)
    await generateQuotes(main, value, subpageContainer);
    main.innerHTML += `
        <button type="button" id='random-change-quotes'>5 other Quotes</button>
    `;
    main.querySelector('#random-change-quotes').addEventListener('click', () => {
        generateQuotes(main, value, subpageContainer)
    });
    main.addEventListener('click', (e) => {
        handlClick(e, subpageContainer);
    });
}