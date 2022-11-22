import './style.css';
import getEbooksList from './modules/itunes-api.js';
import renderMainList from './modules/render.js';

window.addEventListener('load', async () => {
  const ebookList = await getEbooksList();
  if (ebookList) {
    renderMainList(ebookList);
    return true;
  }
  // console.error('Main List:', ebookList);
  return false;
});