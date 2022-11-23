import './style.css';
import getEbooksList from './modules/itunes-api.js';
import renderMainList from './modules/render.js';
import Likes from './modules/likes.js';

const likesList = new Likes();

window.addEventListener('load', async () => {
  await likesList.getLikes();
  const ebookList = await getEbooksList();
  if (ebookList) {
    renderMainList(ebookList, likesList);
    return true;
  }
  return false;
});