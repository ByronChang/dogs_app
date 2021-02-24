import axios from "axios";

async function reqAllBreeds(){
  const API_URI_ALL = "https://dog.ceo/api/breeds/list/all";
  try {
    const response = await axios.get(API_URI_ALL);
    return response.data;
  } catch (error) {      
    console.error(error);
    return error
  }
}

async function reqSubBreeds(breed){
  const API_URI_SUB_BREED = "https://dog.ceo/api/breed/"+breed+"/list";
  try {
    const response = await axios.get(API_URI_SUB_BREED);
    return response.data;
  } catch (error) {      
    console.error(error);
    return error
  }
}

async function reqImgRandomDog(){
  const API_DOG_RANDOM="https://dog.ceo/api/breeds/image/random"
  try {
    const response = await axios.get(API_DOG_RANDOM);
    return response.data;
  } catch (error) {      
    console.error(error);
    return error
  }
}

async function reqRandomByBreed(qty, breed){
  const API_RANDOM="https://dog.ceo/api/breed/"+breed+"/images/random/"+qty
  try {
    const response = await axios.get(API_RANDOM);
    return response.data;
  } catch (error) {      
    console.error(error);
    return error
  }
}

async function reqAlbumCoverImages(allBreeds, qty){
  const uris=allBreeds.map((breed) => {
    return {breed:breed, uri:"https://dog.ceo/api/breed/"+breed+"/images/random/"+qty}
  });

  let data = await axios.all(
    uris.map(async (req, index) => {      
      const allResp = {breed:req.breed, pictures: (await axios.get([index]=req.uri)).data.message}
      return allResp;
    })
  )  
  
  return data 
}

export default {
  reqAllBreeds,
  reqSubBreeds,
  reqImgRandomDog,
  reqRandomByBreed,
  reqAlbumCoverImages
};