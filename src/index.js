import './style.css';
import getEbooksList from './modules/itunes-api.js';
import { renderMainList, markAsSelected } from './modules/render.js';
import Likes from './modules/likes.js';
import filterResults from './modules/mainViewCounters.js';

const likesList = new Likes();
const allMenuItem = document.querySelector('#all');
const historyMenuItem = document.querySelector('#history');
const literatureMenuItem = document.querySelector('#literature');
const businessMenuItem = document.querySelector('#business');

window.addEventListener('load', async () => {
  await likesList.getLikes();
  const ebookList = await getEbooksList();
  if (ebookList) {
    renderMainList(ebookList.results, likesList);

    allMenuItem.addEventListener('click', () => {
      renderMainList(ebookList.results, likesList);
      markAsSelected('#all', ebookList.results.length);
    });

    historyMenuItem.addEventListener('click', () => {
      const newArray = filterResults(ebookList.results, '9031');
      renderMainList(newArray, likesList, []);
      markAsSelected('#history', newArray.length);
    });

    literatureMenuItem.addEventListener('click', () => {
      const newArray = filterResults(ebookList.results, '9020');
      renderMainList(newArray, likesList, []);
      markAsSelected('#literature', newArray.length);
    });

    businessMenuItem.addEventListener('click', () => {
      const newArray = filterResults(ebookList.results, '9003');
      renderMainList(newArray, likesList);
      markAsSelected('#business', newArray.length);
    });

    return ebookList;
  }
  return [];
});
