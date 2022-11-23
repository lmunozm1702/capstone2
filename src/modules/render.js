import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import showPopup from './popup';

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
      showPopup(ebook);
    });
    commentButton.textContent = 'Comments';
    commentButtonDiv.appendChild(commentButton);
  });
};

export default renderMainList;