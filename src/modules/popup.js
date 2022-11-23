import bookDetails from './bookDetails.js';
import Comment from './comments/commentAPI.js'; 
import addComment from './comments/addComment.js';
import {showComments, commentsContainer} from './comments/commentsBox.js'
import commentHeader from './comments/commentHeader.js';
import commentsCounter from './comments/commentsCounter.js';

const comment = new Comment();

const showPopup = async (ebook) => {
  const popupSection = document.querySelector('.popup-section');
  const popup = document.querySelector('.popup');

  popup.insertAdjacentHTML('beforeend', bookDetails(ebook));
  const crossIcon = document.querySelector('.cross-icon');
  crossIcon.addEventListener('click', () => {
  popupSection.classList.toggle('hide');
  popup.innerHTML = '';
  });

  // display comments
  const commentsArray = await comment.getComment(ebook.trackId);
  popup.insertAdjacentHTML('beforeend', commentHeader());
  popup.insertAdjacentHTML('beforeend', commentsContainer(commentsArray)); // displaying comments list

  const commentList = document.querySelector('.comment-list');
  const counterElement = document.querySelector('.comments-count');
  counterElement.innerHTML = commentsCounter();

  // add comments
  popup.insertAdjacentHTML('beforeend', addComment());

  const userName = document.getElementById('user-name');
  const userComment = document.getElementById('user-comment');
  const form = document.getElementById('comment-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await comment.postComment(ebook.trackId, userName.value, userComment.value);
    const commentsArray = await comment.getComment(ebook.trackId);
    commentList.innerHTML = showComments(commentsArray);
    counterElement.innerHTML = commentsCounter();
    userName.value = '';
    userComment.value = '';
  });
};

export default showPopup;