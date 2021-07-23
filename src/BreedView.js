import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const BreedView = (props) => {
    const { idx, globalStateData, setGlobalStateData, history } = props;
    const breedName = globalStateData?.breeds[idx]; // use the ordinal property of array to always grab the same breed
    const nextBreedName = idx === globalStateData?.breeds.length - 1 ? globalStateData?.breeds[0] : globalStateData?.breeds[idx + 1]; // if last breed in list, then next is first

    useEffect(() => {
        if (globalStateData[breedName] && globalStateData[nextBreedName]) return;
        const promiseArr = [];
        if (!globalStateData[breedName] && !globalStateData[nextBreedName]) { // logic for handling two separate calls and receiving response at same time 
            const promise1 = fetch(`https://dog.ceo/api/breed/${breedName}/images/random/4`);
            const promise2 = fetch(`https://dog.ceo/api/breed/${nextBreedName}/images/random/4`);
            promiseArr.push(promise1);
            promiseArr.push(promise2);
        } else if (!globalStateData[breedName] && globalStateData[nextBreedName]) {
            const promise = fetch(`https://dog.ceo/api/breed/${breedName}/images/random/4`);
            promiseArr.push(promise);
        } else {
            const promise = fetch(`https://dog.ceo/api/breed/${nextBreedName}/images/random/4`);
            promiseArr.push(promise);
        }

        Promise.all(promiseArr)
        .then(resp => Promise.all( resp.map(r => r.json()) ))
        .then(result => {
            if (!globalStateData[breedName] && !globalStateData[nextBreedName]) { // only set state where necessary
                setGlobalStateData({...globalStateData, [breedName]: result[0].message, [nextBreedName]: result[1].message});  // dynamically add image caching to global state as key value pair
            } else if (!globalStateData[breedName] && globalStateData[nextBreedName]) {
                setGlobalStateData({...globalStateData, [breedName]: result[0].message }); 
            } else {
                setGlobalStateData({...globalStateData, [nextBreedName]: result[0].message }); 
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history.location.pathname]); // this effect listens for route changes to make calls for particular route
    const images = globalStateData[breedName];
    const nextImageSrc = globalStateData[nextBreedName] && globalStateData[nextBreedName][0]; // checks when the nextBreedName is undefined in global state
    return (
    <React.Fragment>
        <ContentWrapper>
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
