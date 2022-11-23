import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import commentsCounter from './commentsCounter.js';
import { postComment, getComment } from './involvment-api.js';

const LIKES_COUNT = 5;

const renderMainList = (ebookList) => {
  const ebookListDiv = document.querySelector('#ebook-list');
  ebookList.results.forEach((ebook) => {
    const ebookItem = document.createElement('div');
    ebookItem.className = 'ebook-item';
    ebookListDiv.appendChild(ebookItem);

    const ebookImageDiv = document.createElement('div');
    ebookImageDiv.className = 'ebook-image-div';

    const ebookImage = document.createElement('img');
    const imageResized = ebook.artworkUrl100.replace('100x100', '250x250');
    ebookImage.src = imageResized;
    ebookImage.className = 'ebook-image';
    ebookImageDiv.appendChild(ebookImage);
    ebookItem.appendChild(ebookImageDiv);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'content-div';
    ebookItem.appendChild(contentDiv);

    const ebookContentLeft = document.createElement('div');
    ebookContentLeft.className = 'content-left';
    contentDiv.appendChild(ebookContentLeft);

    const ebookListTitle = document.createElement('div');
    ebookListTitle.className = 'ebook-list-title';
    ebookListTitle.textContent = ebook.trackName;
    ebookContentLeft.appendChild(ebookListTitle);

    const ebookListAuthor = document.createElement('div');
    ebookListAuthor.className = 'ebook-list-author';
    ebookListAuthor.textContent = `by ${ebook.artistName}`;
    ebookContentLeft.appendChild(ebookListAuthor);

    const ebookContentRight = document.createElement('div');
    ebookContentRight.className = 'content-right';
    contentDiv.appendChild(ebookContentRight);

    const ebookLikeIcon = document.createElement('div');
    ebookLikeIcon.className = 'ebook-like-icon';
    ebookContentRight.appendChild(ebookLikeIcon);

    const heartIcon = document.createElement('i');
    heartIcon.className = 'heart-icon';
    heartIcon.className = 'fa-solid fa-heart ';
    ebookLikeIcon.appendChild(heartIcon);

    const ebookLikeCount = document.createElement('div');
    ebookLikeCount.className = 'ebook-like-count';
    ebookLikeCount.textContent = `${LIKES_COUNT} likes`;
    ebookContentRight.appendChild(ebookLikeCount);

    const commentButtonDiv = document.createElement('div');
    commentButtonDiv.className = 'contact-button-div';
    contentDiv.appendChild(commentButtonDiv);

    const popupSection = document.querySelector('.popup-section');

    const commentButton = document.createElement('button');
    commentButton.classList = 'contact-button';

    commentButton.addEventListener('click', async (e) => {
      e.preventDefault();
      popupSection.classList.toggle('hide');
      const popup = document.querySelector('.popup');

      const bookDetails = `<div class="item-details">
      <div class="cross-icon">
        <img src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/cross-24-512.png" alt="">
      </div>
      <img src="${ebook.artworkUrl100.replace('100x100', '300x300')}" class="book-img" alt="">
      <div class="book-title text-center">
        <h2>${ebook.trackName}</h2>
      </div>
      <div class="book-detail">
        <p><b>Author:</b> ${ebook.artistName}</p>
        <p><b>Price:</b> ${ebook.price}$</p>
        <p><b>Description:</b> ${ebook.description}</p>
      </div>
      </div>`;
      popup.insertAdjacentHTML('beforeend', bookDetails);

      const crossIcon = document.querySelector('.cross-icon');
      crossIcon.addEventListener('click', () => {
      popupSection.classList.toggle('hide');
      popup.innerHTML = '';
      });

      // comments section
      let commentSection = `<div class="comments">
        <h2 class="comments-heading">Comments</h2>
        <h2 class="comments-num">(<span class="comments-count">0</span>)</h2>
      </div>`;
      const commentsArray = await getComment(ebook.trackId);
      commentSection += `<div class="comment-list">${showComments(commentsArray)}</div>
      <div class="add-comment">
      <h2 class="text-center">Add a comment</h2>
      <form action="" id="comment-form">
        <input type="text" id="user-name" placeholder="Your name" required>
        <textarea name="comment" id="user-comment" cols="30" rows="10" placeholder="Your insights" required></textarea>
        <button type="submit" class="btn-comment">Comment</button>
      </form>
      </div>`;
      popup.insertAdjacentHTML('beforeend', commentSection);

      const commentList = document.querySelector('.comment-list');
      const counterElement = document.querySelector('.comments-count');
      counterElement.innerHTML = commentsCounter();

      const userName = document.getElementById('user-name');
      const userComment = document.getElementById('user-comment');
      const form = document.getElementById('comment-form');

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await postComment(ebook.trackId, userName.value, userComment.value);
        const commentsArray = await getComment(ebook.trackId);
        commentList.innerHTML = showComments(commentsArray);
        counterElement.innerHTML = commentsCounter();
        userName.value = '';
        userComment.value = '';
      });
    });
    commentButton.textContent = 'Comments';
    commentButtonDiv.appendChild(commentButton);
  });
};

const showComments = (commentData) => {
  let comments = '';
  commentData.forEach((element) => {
    comments += `<div class="comment-container">
    <p class="comment-date">${element.creation_date}</p>
    <p class="comment-name">${element.username}: </p>
    <p class="comment-content">${element.comment}</p>
  </div>`;
  });
  return comments;
};

export default renderMainList;