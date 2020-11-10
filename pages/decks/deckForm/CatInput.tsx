import React from 'react';
import PropTypes from 'prop-types';

const CatInputs = ({ idx, catState, handleCatChange }) => {
    const catId = `name-${idx}`;
    return (
        <div key={`cat-${idx}`}>
            <label htmlFor={catId}>{`Cat #${idx + 1}`}</label>
            <input
                type="text"
                name={catId}
                data-idx={idx}
                id={catId}
                className="name"
                value={catState[idx].name}
                onChange={handleCatChange}
            />

        </div>
    );
};

CatInputs.propTypes = {
    idx: PropTypes.number,
    catState: PropTypes.array,
    handleCatChange: PropTypes.func,
};

export default CatInputs;