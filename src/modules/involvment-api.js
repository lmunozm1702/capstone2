const API_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const APP_ID = 'I9KopyiRu6EGqX9RJk9q';

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
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'false',
      Accept: '*',
    },
    mode: 'no-cors',
    body: {
      item_id: `${trackId.toString()}`,
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

export { getAppLikes, setAppLike };