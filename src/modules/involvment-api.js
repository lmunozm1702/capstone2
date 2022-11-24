const API_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const APP_ID = 'I9KopyiRu6EGqX9RJk9q';

const postComment = async (itemId, name, message) => {
  const response = await fetch(`${API_URL}/apps/${APP_ID}/comments`, {
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
};

const getComment = async (itemId) => {
  const response = await fetch(`${API_URL}/apps/${APP_ID}/comments?item_id=${itemId}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (response.status === 200) {
    const responseJSON = await response.json();
    return responseJSON;
  }
  return [];
};

const getAppLikes = async () => {
  const response = await fetch(`${API_URL}/apps/${APP_ID}/likes/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-control-allow-origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
  if (response.ok) {
    try {
      const result = await response.json();
      return (result);
    } catch (e) {
      const result = [];
      return (result);
    }
  }
  return (false);
};

const setAppLike = async (trackId) => {
  const response = await fetch(`${API_URL}/apps/${APP_ID}/likes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'ORIGIN',
      'Access-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify({
      item_id: `${trackId.toString()}`,
    }),
  });
  if (response.ok) {
    try {
      const result = await response.json();
      return (result);
    } catch (e) {
      const result = [];
      return (result);
    }
  }
  return (false);
};

export {
  getAppLikes, setAppLike, postComment, getComment,
};
