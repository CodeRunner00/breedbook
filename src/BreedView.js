import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const BreedView = (props) => {
    const { idx, globalStateData, setGlobalStateData, history } = props;
    const breedName = globalStateData?.breeds[idx];
    const nextBreedName = idx === globalStateData?.breeds.length - 1 ? globalStateData?.breeds[0] : globalStateData?.breeds[idx + 1];

    useEffect(() => {
        if (globalStateData[breedName] && globalStateData[nextBreedName]) return;
        const promiseArr = [];
        if (!globalStateData[breedName] && !globalStateData[nextBreedName]) {
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
        // Promise.all([promise1, promise2]).then(results => {
        //     return results.map(res => res.json())
        // }).then(responses => {
        //     return
        // });

        Promise.all(promiseArr)
        .then(resp => Promise.all( resp.map(r => r.json()) ))
        .then(result => {
            // ...
            console.log('restul of promis.all ', result);
            if (!globalStateData[breedName] && !globalStateData[nextBreedName]) {
                setGlobalStateData({...globalStateData, [breedName]: result[0].message, [nextBreedName]: result[1].message}); 
            } else if (!globalStateData[breedName] && globalStateData[nextBreedName]) {
                setGlobalStateData({...globalStateData, [breedName]: result[0].message }); 
            } else {
                setGlobalStateData({...globalStateData, [nextBreedName]: result[0].message }); 
            }
            
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history.location.pathname]);
    const images = globalStateData[breedName];
    const nextImageSrc = globalStateData[nextBreedName] && globalStateData[nextBreedName][0];
    return (
    <React.Fragment>
        <div>
            {images && images.length && images.map(src => <img src={src} alt={breedName} />)}
        </div>
        <Link to={`/dogs/${nextBreedName}`}>
            <p>Check out the next breed, {nextBreedName}</p>
            {nextImageSrc && <img src={nextImageSrc} alt={nextBreedName} />}
        </Link>
        <Link to={'/'}>Go back</Link>
    </React.Fragment> 
    );
};

export default BreedView;
