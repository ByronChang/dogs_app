export function breedsInterface(item){
    const data = item || {};
    return {
        all: data.all || {},
        random: data.random || [],
        randomDog:data.randomDog || ""
    }
}