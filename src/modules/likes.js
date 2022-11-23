import getAppLikes from './involvment-api.js';

class Likes {
  constructor(likesList = []) {
    this.likesList = likesList;
  }

  async getLikes() {
    const likesFromApi = await getAppLikes();
    console.log('getLikes:', likesFromApi);
    return this.likesList;
  }
}

export default Likes;