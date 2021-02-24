import { GET_ALL_BREEDS,   
  GET_SUB_BREEDS, 
  GET_RANDOM, 
  GET_RANDOM_DOG, 
  GET_FULL_ALBUM, 
  GET_IMAGES,
  CLEAR_ALL_BREEDS  } from "../actions/types";
import {breedsInterface} from "../models";

const initialState = new breedsInterface();

export default function (state = initialState, action) {
  const { type, payload } = action;  
  switch (type) {
    case GET_ALL_BREEDS:
      return {        
        ...state,
        all:payload
      };
    case GET_SUB_BREEDS:
      return {        
        ...state,
        subbreeds:payload
      };  
    case GET_RANDOM_DOG:
      return {        
        ...state,
        randomDog:payload
      };        
    case GET_RANDOM:
      return {        
        ...state,
        random:payload
      };
    case GET_IMAGES:
      return {        
        ...state,
        images:payload
      };  
    case GET_FULL_ALBUM:
      return {
        ...state,
        albumsCoverImage:payload
      };       
    case CLEAR_ALL_BREEDS:
      return initialState
    default:
      return state;
  }
}