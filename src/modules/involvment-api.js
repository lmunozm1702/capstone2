const API_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
// with content
const APP_ID = 'sSs9ooQfU1W8OFSGcB9V';
// without content
//const APP_ID = 'I9KopyiRu6EGqX9RJk9q';

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
  // console.error('GET: [ /scores/ ]', response);
  return (false);
};

export default getAppLikes;