import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from "../helpers/utils";

const CoverPicture = props => {
    return (
        <div className="col-lg-3 col-md-4 col-6 ">
            <a href={props.url !== null ? props.url : "#"} className="d-block mb-4 h-100" style={{ textDecoration: "none" }}>
                <img 
                    className="animate__animated animate__fadeIn animate__repeat-1 img-fluid img-thumbnail" 
                    src={props.source} 
                    style={{ width: "400px", height: "200px" }} alt="" />
                <div align="center">
                    {capitalize(props.text.replace("/", "-"))}
                </div>
            </a>
        </div>
    );
};

CoverPicture.defaultProps = {
    url: "#",
    source: "../assets/dogPicture.png",
    text: ""
}

CoverPicture.propTypes = {
    index: PropTypes.number,
    url: PropTypes.string,
    source: PropTypes.string,
    text: PropTypes.string
};

export default CoverPicture;