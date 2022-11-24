import commentsCounter from "./commentsCounter.js";

describe('Tests for presence of comments', () => {
  test('Should be 0 if no comment is present', () => {
    document.body.innerHTML = "<div class='comment-list'> </div>";
    expect(commentsCounter()).toBe(0);
  });

  test('Should not be 0 if any comment is present', () => {
    document.body.innerHTML = '<div class="comment-list"><div class="comment-container"><p><span class="comment-date">2022-11-24</span><span class="comment-name">Test name: </span><span class="comment-content">Test comment</span></p></div></div>';
    expect(commentsCounter()).not.toBe(0);
  });

  test('Count number of comments', () => {
    document.body.innerHTML = '<div class="comment-list"><div class="comment-container"><p><span class="comment-date">2022-11-24</span><span class="comment-name">Test name 1: </span><span class="comment-content">Test comment 2</span></p></div><div class="comment-container"><p><span class="comment-date">2022-11-24</span><span class="comment-name">Test name 2: </span><span class="comment-content">Test comment 2</span></p></div></div>';
    expect(commentsCounter()).toBe(2);
  });
});