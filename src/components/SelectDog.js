import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../actions";
import { capitalize, setCache, getCache } from "../helpers/utils";
import { PencilIcon } from '@primer/octicons-react'

const SelectDog = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [curBreed, setCurBreed] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const allBreedsObj = useSelector(({ breeds }) => breeds.all || []);
  const ranDog = useSelector(({ breeds }) => breeds.randomDog || "");
  const curBreedPicture = useSelector(({ breeds }) => breeds.random || "");

  useEffect(() => {
    setLoading(true)
    let currentBreed = getCache("currentBreed");
    setCurBreed(currentBreed);
    currentBreed !== null ?
      randomByBreedPic(currentBreed)
      :
      randomPic()
    // eslint-disable-next-line
  }, []);

  const randomByBreedPic = (breed) => {
    setError(null)
    setImgLoaded(false);
    dispatch(Actions.getRandomByBreed(1, breed)).then(() => {
      setCache("currentBreed", breed)
      setCurBreed(breed);
      setLoading(false);
    })
      .catch((error) => {
        console.log(error);
        setError("Error loading Dog Breed")
        setLoading(false);
      })
  }

  const randomPic = () => {
    setError(null)
    dispatch(Actions.getRandomDog()).then((newDog) => {
      setLoading(false);
    })
      .catch((error) => {
        console.log(error);
        setError("Error loading Dog Image")
        setLoading(false);
      });
  }

  const updateCurrentBreed = (breed) => {
    setLoading(true);
    setError(null);
    randomByBreedPic(breed);
    setIsEditing(false)
  }

  const handleLoadImage = event => {
    event.preventDefault();
    setImgLoaded(true);
  };

  const fullList = (breedsObject) => {
    const object = breedsObject;
    let arr = [];
    for (const property in object) {
      arr.push(property)
    }

    return (
      <div className="d-flex flex-column justify-content-center container-fluid">
        {error !== null ?
          <div className="alert alert-danger align-self-center p-2" role="alert">
            {error}
          </div>
          :
          null
        }
        <div
          className="animate__animated animate__fadeIn animate__repeat-1 align-self-center p-2 position-relative"
          height="257"
        >
          {
            loading ? (<span className="spinner-border spinner-border-sm align-self-center"></span>)
              :
              (<>
                <img
                  id="imgDog"
                  name="imgDog"
                  src={curBreedPicture.length > 0 ? curBreedPicture[0] : ranDog}
                  onLoad={handleLoadImage}
                  className={imgLoaded ? "rounded-circle img-thumbnail rounded doggyPicture" : "rounded doggyPicture"}
                  alt="Edit your favorite Breed"
                />
                {(!isEditing && imgLoaded) &&
                  <div className="editButtonDiv">
                    <button
                      type="button"
                      className="btn btn-primary rounded-circle border border-light editButton"
                      onClick={() => setIsEditing(true)}
                    >
                      <PencilIcon size={24} />
                    </button>
                  </div>
                }
              </>)
          }
        </div>
        <div className="align-self-center p-2">
          {curBreed !== null && !isEditing ?
            <div className="breedNameTitle">{capitalize(curBreed)}</div>
            :
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text"
                  htmlFor="DogSelection"
                >
                  Select your favorite Breed
                </label>
              </div>
              <select
                className="form-control"
                name="DogSelection"
                id="DogSelection"
                onChange={(e) => updateCurrentBreed(e.target.value)}
              >
                <option value={-1} key={-1}>
                  NO BREED SELECTION
                </option>
                {arr.map((breed, index) => (
                  <option value={breed} key={index}>
                    {capitalize(breed)}
                  </option>
                ))}
              </select>
            </div>
          }
        </div>
      </div>
    );
  }

  return (
    <>{fullList(allBreedsObj)}</>
  );
};
export default SelectDog;
