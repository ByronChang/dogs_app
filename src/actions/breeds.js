import {
    GET_ALL_BREEDS,
    GET_ALL_BREEDS_ERROR,
    GET_SUB_BREEDS,
    GET_SUB_BREEDS_ERROR,
    GET_RANDOM,
    GET_RANDOM_ERROR,
    GET_RANDOM_DOG,
    GET_RANDOM_DOG_ERROR,
    GET_FULL_ALBUM,
    GET_FULL_ALBUM_ERROR,
    GET_IMAGES,
    GET_IMAGES_ERROR,
    CLEAR_ALL_BREEDS
} from "./types";
import BreedsService from "../services/breeds/breeds.service";

export function getAlbumCoverImages(arrBreeds, qty) {
    return function (dispatch) {
        try {
            return BreedsService.reqAlbumCoverImages(arrBreeds, qty)
                .then((data) => {
                    dispatch(
                        {
                            type: GET_FULL_ALBUM,
                            payload: data
                        })
                });
        }
        catch (error) {
            return (dispatch) => {
                dispatch({
                    type: GET_FULL_ALBUM_ERROR,
                });
            }
        }
    };
}

export function getAllBreeds() {
    return function (dispatch) {
        try {
            return BreedsService.reqAllBreeds()
                .then((data) => {
                    dispatch(
                        {
                            type: GET_ALL_BREEDS,
                            payload: data.message
                        })
                });
        }
        catch (error) {
            return (dispatch) => {
                dispatch({
                    type: GET_ALL_BREEDS_ERROR,
                });
            }
        }
    };
}


export function getSubBreeds(breed) {
    return function (dispatch) {
        try {
            return BreedsService.reqSubBreeds(breed)
                .then((data) => {
                    dispatch(
                        {
                            type: GET_SUB_BREEDS,
                            payload: data.message
                        })
                });
        }
        catch (error) {
            return (dispatch) => {
                dispatch({
                    type: GET_SUB_BREEDS_ERROR,
                });
            }
        }
    };
}

export function getRandomByBreed(qty, breed) {
    return function (dispatch) {
        try {
            return BreedsService.reqRandomByBreed(qty, breed)
                .then((data) => {
                    dispatch(
                        {
                            type: GET_RANDOM,
                            payload: data.message
                        })
                });
        }
        catch (error) {
            return (dispatch) => {
                dispatch({
                    type: GET_RANDOM_ERROR,
                });
            }
        }
    };
}

export function getImagesByBreed(qty, breed) {
    return function (dispatch) {
        try {
            return BreedsService.reqRandomByBreed(qty, breed)
                .then((data) => {
                    dispatch(
                        {
                            type: GET_IMAGES,
                            payload: data.message
                        })
                });
        }
        catch (error) {
            return (dispatch) => {
                dispatch({
                    type: GET_IMAGES_ERROR,
                });
            }
        }
    };
}


export function getRandomDog() {
    return function (dispatch) {
        try {
            return BreedsService.reqImgRandomDog()
                .then((data) => {
                    dispatch(
                        {
                            type: GET_RANDOM_DOG,
                            payload: data.message
                        })
                });
        }
        catch (error) {
            return (dispatch) => {
                dispatch({
                    type: GET_RANDOM_DOG_ERROR,
                });
            }
        }
    };
}

export function clearAllBreeds() {
    return (dispatch) => {
        dispatch({
            type: CLEAR_ALL_BREEDS,
        });
    }
};
