import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBreedImages } from './actions';

const BreedView = (props) => {
    const { idx, history } = props;
    const breedName = useSelector(state => state?.breeds[idx]); // use the ordinal property of array to always grab the same breed
    const breedsArr = useSelector(state => state.breeds);
    const nextBreedName = idx === breedsArr.length - 1 ? breedsArr[0] : breedsArr[idx + 1]; // if last breed in list, then next is first
    const breedNameImages = useSelector(state => state[breedName]);
    const nextBreedNameImages = useSelector(state => state[nextBreedName]);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!breedNameImages) dispatch(fetchBreedImages(breedName));
        if (!nextBreedNameImages) dispatch(fetchBreedImages(nextBreedName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history.location.pathname]); // this effect listens for route changes to make calls for particular route
    const images = breedNameImages;
    const nextImageSrc = nextBreedNameImages && nextBreedNameImages[0]; // checks when the nextBreedName is undefined in global state
    return (
    <React.Fragment>
        <ContentWrapper>
            <h2>{breedName}</h2>
            <div className="images-container">{images && images.length && images.map((src, i) => <img className="main-img" src={src} alt={breedName} key={i} />)}</div>
            <div className="next-breed-container">
                <div className="link-wrapper-back"><Link to={'/'}>Go Home</Link></div>
                <div className="link-wrapper-next"><Link to={`/dogs/${nextBreedName}`}>Check out the next breed, {nextBreedName}</Link></div>
                {nextImageSrc && <div className="link-wrapper-next-img"><Link to={`/dogs/${nextBreedName}`}><img className="preview-img" src={nextImageSrc} alt={nextBreedName} /></Link></div>}
            </div>
            
        </ContentWrapper>
    </React.Fragment> 
    );
};

const ContentWrapper = styled.div`
    .images-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        img {
            width: 22%;
            align-self: center;
        }
    }
    .preview-img {
        width: 200px;
        height: auto;
    }
    .next-breed-container {
        width: 95%;
        margin: 0 auto;
        margin-top: 10%;
        display: flex;
        align-items: center;
        .preview-img {
            padding-left: 30px;
            width: 120px;
        }
        .link-wrapper-next {
            margin-left: auto;
        }
    }
`;

export default BreedView;
