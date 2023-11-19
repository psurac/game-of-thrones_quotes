import './style.scss'
import { ajaxRequest } from './ajaxRequest.js'
import { navigation } from './components/navigation.js'
import { subpage } from './components/subpage.js';


document.querySelector('#app').innerHTML = `
<div class='app-container'>
  <nav>
    <h1>Game of Thrones</h1>
    <div class='nav-button-container'>
      <button class='nav-button' value='houses'>Houses</button>
      <button class='nav-button' value='persons'>Persons</button>
      <button class='nav-button' value='quotes'>Quotes</button>
    </div>
  </nav>
  <main id='main'>
    Awaiting...
  </main>
  <div id='subpage-container' style='display:none;'></div>
</div>
`;
await request();

async function request() {
  let quote = await ajaxRequest('https://api.gameofthronesquotes.xyz/v1/random');
  document.querySelector('#main').innerHTML = `
    <div class='quote-div'>
      <p class='${quote.character.slug}'>${quote.sentence}</p>
      <span class='${quote.character.slug}'>${quote.character.name}</span>
    </div>
  `;
  document.querySelector('.quote-div').addEventListener('click', (e) => {
        subpage(e.target.className, 'characters', document.querySelector('#subpage-container'));
  });
}
navigation(
  document.querySelector('#main'),
  document.querySelectorAll('.nav-button'),
  document.querySelector('#subpage-container')
)
