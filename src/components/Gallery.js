import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../actions";
import { allBreeds, capitalize, hasSubBreed, subBreedSlash } from "../helpers/utils";
import CoverPicture from "./CoverPicture";
import AlbumPager from "./AlbumPager";

const Gallery = (props) => {
    const dispatch = useDispatch();
    const [view, setView] = useState([]);
    const [page, setPage] = useState(0);

    const allBreedsObj = useSelector(({ breeds }) => breeds.all || []);
    const subBreedsObj = useSelector(({ breeds }) => breeds.subbreeds || []);
    const coversObj = useSelector(({ breeds }) => breeds.albumsCoverImage || []);
    const imagesObj = useSelector(({ breeds }) => breeds.images || []);

    const totalPages = Math.ceil(coversObj.length / 8) - 1;

    useEffect(() => {
        const haSubBreed = props.breed !== undefined && hasSubBreed(allBreedsObj, props.breed);
        const fullBreedArr = allBreeds(allBreedsObj);
        haSubBreed ?
            dispatch(Actions.getSubBreeds(props.breed))
            :
            dispatch(Actions.getAlbumCoverImages(fullBreedArr, 1));
    }, [dispatch, props.breed, allBreedsObj]);

    useEffect(() => {
        subBreedsObj.length !== 0 &&
            dispatch(Actions.getAlbumCoverImages(subBreedSlash(subBreedsObj, props.breed), 1))
    }, [dispatch, props.breed, subBreedsObj]);

    useEffect(() => {
        (props.subbreed !== "none") ?
            dispatch(Actions.getImagesByBreed(3, props.breed + "/" + props.subbreed))
            :
            (props.breed !== "all") &&
            dispatch(Actions.getImagesByBreed(3, props.breed))
    }, [dispatch, props.breed, props.subbreed]);

    useEffect(() => {
        if (props.breed !== "all") {
            if (props.subbreed !== "none") {
                var imgsSubBreedObj = [imagesObj][0].map(img => {
                    return { breed: props.breed + "/" + props.subbreed, pictures: [img] }
                });
                setView(pagination(imgsSubBreedObj, 3, page))
            } else {
                const havSubBreed = hasSubBreed(allBreedsObj, props.breed);
                if (havSubBreed) {
                    setView(pagination(coversObj, 8, page))
                } else {
                    var imgsBreedObj = [imagesObj][0].map(img => {
                        return { breed: props.breed, pictures: [img] }
                    });
                    setView(pagination(imgsBreedObj, 3, page))
                }
            }
        } else {
            setView(pagination(coversObj, 8, page))
        }
        // eslint-disable-next-line
    }, [coversObj, page]);


    const pagination = (array, page_size, page_number) => {
        return array.slice(page_number * page_size, page_number * page_size + page_size);
    };

    const next = (event) => {
        event.preventDefault();
        (page < totalPages) && setPage(page + 1);
    }

    const back = (event) => {
        event.preventDefault();
        (page > 0) && setPage(page - 1);
    }

    return (
        <div className="container">
            <h1 className="font-weight-light text-center text-lg-left mt-4 mb-0">
                {props.breed !== "all" ?
                    'Sub-Breed: "' + capitalize(props.breed) + '" Gallery'
                    :
                    props.title
                }
            </h1>
            <hr className="mt-2" />
            <div className="row text-center text-lg-left">
                {view.map((breed, index) => {
                    return (
                        <CoverPicture
                            key={index}
                            index={index}
                            url={breed.subbreed !== "none" ? "/album/" + breed.breed : "/album/" + breed.breed + "/" + breed.subbreed}
                            source={breed.pictures[0]}
                            text={breed.breed}
                        />
                    )
                })
                }
            </div>
            <AlbumPager page={page} totalPages={totalPages} back={back} next={next} />
        </div>
    );
}

export default Gallery;