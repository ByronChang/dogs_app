import React from 'react';
import PropTypes from 'prop-types';

const AlbumPager = props => {
    return (
        <nav className="navbar fixed-bottom navbar-dark bg-dark d-flex justify-content-between"  >
            <div className="p-2 bd-highlight">
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={props.back} disabled={props.page === 0}>
                    Back
                </button>
            </div>
            <div className="p-2 bd-highlight text-white">Page {props.page + 1} / {props.totalPages + 1}</div>
            <div className="p-2 bd-highlight">
                <button className="btn btn-primary" type="button"
                    onClick={props.next}
                    disabled={!(props.page < props.totalPages)}>
                    Next
                </button>
            </div>
        </nav>
    );
};

AlbumPager.propTypes = {
    page: PropTypes.number,
    totalPages: PropTypes.number,
    back: PropTypes.func,
    next: PropTypes.func
};

export default AlbumPager;