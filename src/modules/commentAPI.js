class Comment {
  constructor() {
    this.commentId = '14opTxC7UrVqlKsev3aJ';
    this.url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
  }

  postComment = async (itemId, name, message) => {
    const response = await fetch(`${this.url + this.commentId}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        item_id: itemId,
        username: name,
        comment: message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseText = await response.text();
    return responseText;
  }

  getComment = async (itemId) => {
    const response = await fetch(`${this.url + this.commentId}/comments?item_id=${itemId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (response.status === 200) {
      const responseJSON = await response.json();
      return responseJSON;
    }
    else {
      return [];
    }
  };
}

export default Comment;