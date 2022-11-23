import _ from 'lodash';
import { getAppLikes, setAppLike } from './involvment-api.js';
import { renderNewLike } from './render';

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
    await setAppLike(trackId);
    renderNewLike(trackId);
  }
}

export default Likes;