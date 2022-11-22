import { showPopup } from './showPopup';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

const LIKES_COUNT = 5;

const renderMainList = (ebookList) => {
  console.log("Render Main List", ebookList);
  const ebookListDiv = document.querySelector('#ebook-list');
  ebookList.results.forEach(ebook => {
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

    const ebookContentLeft = document.createElement('div')
    ebookContentLeft.className = "content-left";
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

    const contactButtonDiv = document.createElement('div');
    contactButtonDiv.className = 'contact-button-div';
    contentDiv.appendChild(contactButtonDiv);

    const contactButton = document.createElement('button');
    contactButton.classList = "contact-button";
    contactButton.onclick = () => {
      showPopup(ebook);
    }
    contactButton.textContent = 'Comments';
    contactButtonDiv.appendChild(contactButton);
  });
}

export { renderMainList };