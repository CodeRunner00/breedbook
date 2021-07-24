import { FETCH_BREEDS, FETCH_BREED_IMAGES } from '../actions/types';

 const initialState = { breeds: [] };
 function breedsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BREEDS:
      const breedsArr = action.payload;
      return { ...state, breeds: breedsArr };
    case FETCH_BREED_IMAGES:
      const imageObj = action.payload;
      return { ...state, ...imageObj };
    default:
      return state;
  }
}

export default breedsReducer;
