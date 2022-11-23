class CommentUI {

  static commentsContainer = (commentData) => {
    const comments = `<div class="comment-list">${this.showComments(commentData)}</div>`;
  return comments;
  };

  static showComments = (commentData) => {
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

  static commentSection = () => {
    let comments = `<div class="comments">
      <h2 class="comments-heading">Comments</h2>
      <h2 class="comments-num">(<span class="comments-count">0</span>)</h2>
    </div>`;
    return comments;
  };

  static addComment = () => {
    const comment = `<div class="add-comment">
    <h2 class="text-center">Add a comment</h2>
    <form action="" id="comment-form">
      <input type="text" id="user-name" placeholder="Your name" required>
      <textarea name="comment" id="user-comment" cols="30" rows="10" placeholder="Your insights" required></textarea>
      <button type="submit" class="btn-comment">Comment</button>
    </form>
  </div>`
  return comment;
  };

  
}

export default CommentUI;