const API_URL = 'https://itunes.apple.com/search?';

const getEbooksList = async () => {
  console.log(`${API_URL}?term=null&entity=ebook`);
  const response = await fetch(`${API_URL}term=null&entity=ebook`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-control-allow-origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
  if (response.ok) {
    const result = await response.json();
    return (result);
  }
  console.error('GET: [ /scores/ ]', response);
  return (false);
};

export { getEbooksList };