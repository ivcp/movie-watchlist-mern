import { fetchData } from '../helpers/fetchData';

const getImdbRating = async imdbId => {
  return await fetchData(`https://search.imdbot.workers.dev/?tt=${imdbId}`);
};

export default getImdbRating;
