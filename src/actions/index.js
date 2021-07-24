import axios from 'axios';
import { FETCH_BREEDS, FETCH_BREED_IMAGES } from './types';

export const fetchBreeds = () => async dispatch => {
  const res = await axios.get('https://dog.ceo/api/breeds/list/all');
  const breeds = res?.data?.message;
  const breedsArr = Array.from(Object.keys(breeds)).map(breed => breed);
  dispatch({ type: FETCH_BREEDS, payload: breedsArr });
};

export const fetchBreedImages = breedName => async dispatch => {
  const res = await axios.get(`https://dog.ceo/api/breed/${breedName}/images/random/4`);
  const images = res?.data?.message;
  dispatch({ type: FETCH_BREED_IMAGES, payload: { [breedName]: images } });
};

