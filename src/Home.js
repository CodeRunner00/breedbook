import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

const BreedView = (props) => {
    const breedsArr = useSelector(state => state.breeds);
    return (
        <div>
            {breedsArr.length === 0 && <p>Loading...</p>}
            <LinksWrapper>
                {breedsArr && breedsArr.map((breed, index) => (
                    <div className="link-wrapper" key={index}><Link to={`/dogs/${breed}`} key={`${breed}${index}`}><p>Check out {breed} pics!</p></Link></div>
                ))}
            </LinksWrapper>
        </div>
    );
};

const LinksWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    .link-wrapper {
        width: 12.5%;
        p {
            padding: 4%;
        }
    }
`;

export default BreedView;


