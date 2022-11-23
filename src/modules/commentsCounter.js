const commentsCounter = () => {
  const commentList = document.querySelector('.comment-list');
  if (commentList) {
    return commentList.children.length;
  }
  return 0;
};

export default commentsCounter;