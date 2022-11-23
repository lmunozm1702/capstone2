import _ from 'lodash';
import { getAppLikes, setAppLike } from './involvment-api.js';

class Likes {
  constructor(likesList = []) {
    this.likesList = likesList;
  }

  async getLikes() {
    this.likesList = await getAppLikes();
  }

  getEbookLikes = (ebookId) => {
    const result = (_.find(this.likesList, ['item_id', ebookId]));
    if (!result) {
      return 0;
    }
    return result.likes;
  }

  addLike = async (trackId) => {
    console.log(trackId);
    await setAppLike(trackId);
  }
}

export default Likes;