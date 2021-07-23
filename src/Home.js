import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const BreedView = (props) => {
    const { globalStateData } = props;

    return (
        <div>
            {globalStateData?.breeds.length === 0 && <p>Loading...</p>}
            <LinksWrapper>
                {globalStateData?.breeds.map((breed, index) => (
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


