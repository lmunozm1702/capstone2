const showPopup = (ebook) => {
  const popup = `<div class="item-details">
  <div class="cross-icon">
    <img src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/cross-24-512.png" alt="">
  </div>
  <img src="${ebook.artworkUrl100}" class="book-img" alt="">
  <div class="book-title text-center">
    <h2>${ebook.trackName}</h2>
  </div>
  <div class="book-detail">
    <p><b>Author:</b> ${ebook.artistName}</p>
    <p><b>Price:</b> ${ebook.price}$</p>
  </div>
  <div class="description">
    <p><b>Description:</b> ${ebook.description}</p>
  </div>
</div>`
return popup
};

export default showPopup;