const addComment = () => {
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

export default addComment;