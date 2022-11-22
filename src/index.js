import './style.css';
import { getEbooksList } from './itunes-api.js';
import { renderMainList } from './render.js';

window.addEventListener('load', async () => {
  let ebookList = await getEbooksList();
  if (ebookList) {
    console.log("main List:", ebookList);
    renderMainList(ebookList);
  }
  else {
    console.error("Main List:", ebookList);
  }
})