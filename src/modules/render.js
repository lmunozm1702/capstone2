import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';
import commentsCounter from './commentsCounter.js';
import { postComment, getComment } from './involvment-api.js';

const showComments = (commentData) => {
  const comment = `<div class="comment-container">
  <p>
    <span class="comment-date">${commentData.creation_date}</span>
    <span class="comment-name">${commentData.username}: </span>
    <span class="comment-content">${commentData.comment}</span>
  </p>
</div>`;
return comment;
};

const showPopup = async (ebook) => {
  const popupSection = document.querySelector('.popup-section');
  const popup = document.querySelector('.popup');

  popupSection.classList.toggle('hide');
  const bookDetails = `<div class="cross-icon">
  <img src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/cross-24-512.png" alt="">
  </div>
  <div class="item-details">
  <img src="${ebook.artworkUrl100.replace('100x100', '250x250')}" class="book-img" alt="">
  <div class="book-title text-center">
  <h3>${ebook.trackName}</h3>
  </div>
  <div class="book-detail">
    <p><b>Author:</b> ${ebook.artistName}</p>
    <p><b>Price:</b> ${ebook.price}$</p>
    <p id="popup-desc"><b>Description:</b> ${ebook.description}</p>
  </div>
  </div>`;
  popup.insertAdjacentHTML('beforeend', bookDetails);

  const crossIcon = document.querySelector('.cross-icon');
  crossIcon.addEventListener('click', () => {
    popupSection.classList.toggle('hide');
    popup.innerHTML = '';
  });

  // comments section
  const commentsHeader = `<div class="comments">
    <h4 class="comments-heading">Comments</h4>
    <h4 class="comments-num"><span class="comments-count">0</span></h4>
  </div>`;
  popup.insertAdjacentHTML('beforeend', commentsHeader);

  // getting comments
  const commentsArray = await getComment(ebook.trackId);
  commentsArray.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));

  // displaying comments
  let allComments = '<div class="comment-list">';
  commentsArray.forEach((x) => {
    allComments += showComments(x);
  });
  allComments += '</div>';
  popup.insertAdjacentHTML('beforeend', allComments);

  // add comments
  const addCommentBox = `<div class="add-comment">
  <h4 class="text-center">Add a comment</h4>
  <form action="" id="comment-form">
    <input type="text" id="user-name" placeholder="Your name" required>
    <textarea name="comment" id="user-comment" cols="30" rows="10" placeholder="Your insights" required></textarea>
    <button type="submit" class="btn-comment">Comment</button>
  </form>
  </div>`;
  popup.insertAdjacentHTML('beforeend', addCommentBox);

  const commentList = document.querySelector('.comment-list');
  const counterElement = document.querySelector('.comments-count');
  counterElement.innerHTML = commentsCounter();

  const userName = document.getElementById('user-name');
  const userComment = document.getElementById('user-comment');
  const form = document.getElementById('comment-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    postComment(ebook.trackId, userName.value, userComment.value);
    
    const commentObject = {};
    const date = new Date();
    commentObject.creation_date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    commentObject.username = userName.value;
    commentObject.comment = userComment.value;

    commentList.insertAdjacentHTML('beforeend', showComments(commentObject));
    counterElement.innerHTML = commentsCounter();
    userName.value = '';
    userComment.value = '';
  });
};

const renderMainList = (ebookList, likesList) => {
  const ebookListDiv = document.querySelector('#ebook-list');

  ebookListDiv.textContent = '';

  ebookList.forEach((ebook) => {
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

    const trackId = ebook.trackId.toString();
    const likesCount = likesList.getEbookLikes(trackId);

    const ebookLikeIcon = document.createElement('div');
    if (likesCount > 0) {
      ebookLikeIcon.className = 'heart-icon';
    } else {
      ebookLikeIcon.className = 'heart-icon-grey';
    }
    ebookLikeIcon.onclick = () => {
      likesList.addLike(trackId);
    };
    ebookLikeIcon.id = `ebook-like-${trackId}`;
    ebookContentRight.appendChild(ebookLikeIcon);

    const heartIcon = document.createElement('i');
    heartIcon.className = ' fa-solid fa-heart';
    heartIcon.id = `heart-icon-${trackId}`;
    ebookLikeIcon.appendChild(heartIcon);

    const ebookLikeCount = document.createElement('div');
    let likesLabel = 'likes.';
    if (likesCount === '1') {
      likesLabel = 'like.';
    }
    ebookLikeCount.className = 'ebook-like-count';
    ebookLikeCount.id = `like-count-${trackId}`;
    ebookLikeCount.textContent = `${likesCount} ${likesLabel}`;
    ebookContentRight.appendChild(ebookLikeCount);

    const commentButtonDiv = document.createElement('div');
    commentButtonDiv.className = 'contact-button-div';
    contentDiv.appendChild(commentButtonDiv);

    const commentButton = document.createElement('button');
    commentButton.classList = 'contact-button';
    commentButton.onclick = () => {
      showPopup(ebook);
    };
    commentButton.textContent = 'Comments';
    commentButtonDiv.appendChild(commentButton);
  });
  return true;
};

const renderNewLike = (trackId) => {
  const likeCount = document.querySelector(`#like-count-${trackId}`);
  const heartIcon = document.querySelector(`#ebook-like-${trackId}`);
  let likeCountValue = '0';
  let likesText;
  [likeCountValue, likesText] = likeCount.textContent.split(' ');

  likesText = 'likes.';
  if (Number(likeCountValue) === '0') {
    heartIcon.className = 'heart-icon-grey';
  } else {
    heartIcon.className = 'heart-icon';
    if (likeCountValue === '0') {
      likesText = 'like.';
    }
  }
  likeCount.textContent = `${Number(likeCountValue) + 1} ${likesText}`;
};

const hideBadges = () => {
  let allBadges = document.querySelectorAll('.nav-item');
  allBadges.forEach((badge) => {
    badge.className = 'nav-item nav-unselected';
  });

  allBadges = document.querySelectorAll('.nav-span');
  allBadges.forEach((badge) => {
    badge.className = 'nav-span hide';
  });
};

const markAsSelected = (tagId, count) => {
  const tagSpan = document.querySelector(`${tagId}-span`);
  const tagLi = document.querySelector(`${tagId}-li`);
  hideBadges();

  tagSpan.textContent = count;
  tagSpan.className = 'nav-span show badge';

  tagLi.className = 'nav-item nav-selected';
};

export { renderMainList, renderNewLike, markAsSelected };