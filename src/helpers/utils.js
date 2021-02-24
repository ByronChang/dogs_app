export const capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1);
}

export const setCache = (key, value) => {    
    localStorage.setItem(key, JSON.stringify(value))
}

export const getCache = (key) => {
    let content = localStorage.getItem(key);
    return content !== null ? localStorage.getItem(key).replace(/['"]+/g, '') : null
}

export const allBreeds = (breedsObject) => {
  const object = breedsObject;
  let arr = [];
  for (const property in object) {
    arr.push(property)
  }
  return arr;
}    

export const breedsAndSubBreeds = (breedsObject) => {
    const object = breedsObject;
    let arr = [];
    for (const property in object) {      
      if(object[property].length >= 1){
        object[property].map(newBreed =>{
          return arr.push(property+"/"+newBreed)
        })
      }else{        
        arr.push(property)
      }
    }
    return arr;
}    

export const hasSubBreed = (breedsObject, breedName) => {
  const object = breedsObject; 
    let has=false;
    for (const property in object) {      
      if(object[property].length >= 1){
        if(property === breedName)
        return has=true
      }
    }   
    return has;
}

export const subBreedSlash = (subBreadsArr, breed) => {
  return subBreadsArr.map(item => (breed+"/"+item));  
}