import { searchableList } from './searchableList.js'
import { quotes } from './quotes.js'

export const navigation = (main, buttons, subpageContainer) => {
    main.innerHtml = '';
    const navClickHandler = (e) => {
        const value = e.target.value;
        value === 'houses' && searchableList(main, 'houses', subpageContainer);
        value === 'persons' && searchableList(main, 'characters', subpageContainer);
        value === 'quotes' && quotes(main, 'random', subpageContainer);
    }

    for (const btn of buttons) {
        btn.addEventListener('click', (e) => navClickHandler(e));
    }
}