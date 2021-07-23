import React from 'react';
import { Link } from 'react-router-dom';

const BreedView = (props) => {
    const { globalStateData } = props;

    return (
        <div>
            {globalStateData.breeds.length === 0 && <p>Loading...</p>}
            {globalStateData.breeds.map((breed, index) => (
            <Link to={`/dogs/${breed}`} key={`${breed}${index}`}><p>Check out {breed} pics!</p></Link>
            ))}
        </div>
    );
};

export default BreedView;


