import React from "react";
import { useParams } from "react-router-dom";
import Gallery from "../components/Gallery";
import { useHistory } from "react-router-dom";

const CoverAlbum = (props) => {
    const params = useParams();
    const { breed, subbreed } = params;
    let history = useHistory();

    function handleClick(inAlbum, pos) {
        !inAlbum ?
            history.push("/" + pos)
            :
            history.push("/album/" + pos);
    }

    return (
        <React.Fragment>
            <nav aria-label="breadcrumb" className="mt-5">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <button type="button"
                            className="btn btn-link"
                            onClick={() => handleClick(false, "home")}>Home</button>
                    </li>
                    <li className="breadcrumb-item">
                        <button type="button"
                            className="btn btn-link"
                            onClick={() => handleClick(false, "album")}>Album</button>
                    </li>
                    <li className="breadcrumb-item">
                        <button type="button"
                            className="btn btn-link"
                            onClick={() => handleClick(true, breed)}>{breed}</button>
                    </li>
                </ol>
            </nav>
            <Gallery
                title="Breeds Gallery"
                breed={breed !== undefined ? breed : "all"}
                subbreed={subbreed !== undefined ? subbreed : "none"}
            />
        </React.Fragment>
    );
}

export default CoverAlbum;