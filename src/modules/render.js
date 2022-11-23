import showPopup from './showPopup.js';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';

const renderMainList = (ebookList, likesList) => {
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

    const contactButtonDiv = document.createElement('div');
    contactButtonDiv.className = 'contact-button-div';
    contentDiv.appendChild(contactButtonDiv);

    const popupSection = document.querySelector('.popup-section');
    const popup = document.querySelector('.popup');

    const contactButton = document.createElement('button');
    contactButton.classList = 'contact-button';
    contactButton.addEventListener('click', async (e) => {
      e.preventDefault();
      popupSection.classList.toggle('hide');
      popup.insertAdjacentHTML('beforeend', showPopup(ebook));
      const crossIcon = document.querySelector('.cross-icon');
      crossIcon.addEventListener('click', () => {
        popupSection.classList.toggle('hide');
        popup.innerHTML = '';
      });
    });
    contactButton.textContent = 'Comments';
    contactButtonDiv.appendChild(contactButton);
  });
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

export { renderMainList, renderNewLike };