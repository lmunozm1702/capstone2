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

const commentsContainer = (commentData) => {
  const comments = `<div class="comment-list">${showComments(commentData)}</div>`;
return comments;
};

export {showComments, commentsContainer};