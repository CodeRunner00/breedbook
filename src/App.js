import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import BreedView from './BreedView';
import Home from './Home';

function App() {
  //  build initial state with async await
  // initial state = { breeds: []}
  // header Breedbook
  // // react router
  // app component initializes breeds
  // child components take index, look up whether images have loaded from breed, make request if not loaded yet
    // same thing with preview of next breed
  const initialState = { breeds: [] };
  const [globalStateData, setGlobalStateData] = useState(initialState);

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch(
                `https://dog.ceo/api/breeds/list/all`
            );
            const json = await response.json();
            const breeds = json?.message;
            console.log('breeds ', breeds);
            const breedsArr = Array.from(Object.keys(breeds)).map(breed => breed);
            //   if (breeds[key].length) {
            //     breeds[key].forEach(name => {
            //       breedsArr.push(`${key}-${name}`)
            //     });
            //   } else {
            //     breedsArr.push(`${key}`);
            //   }
            // });
            console.log('Dog data ', breedsArr);
            setGlobalStateData({...globalStateData, breeds: breedsArr});
        } catch (e) {
            console.error(e);
        }
    }
    fetchData();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  return (
    <div className="App">
      {/* <div>
        {initialState.breeds.length === 0 && <p>Loading...</p>}
        {initialState.breeds.map((breed, index) => (
        <p>Check out {breed} pics!</p>
        ))}
      </div> */}
      <div className="container">
        <BrowserRouter>
          <div>
            <header className="App-header">
              <h2
                rel="noopener noreferrer"
              >
                Breedbook
              </h2>
            </header>
            <Switch>
            <Route
                  exact
                  path={`/`}
                  render={() => <Home globalStateData={globalStateData} />} 
            />
            {globalStateData?.breeds.map((breed, idx) => (
                <Route
                  path={`/dogs/${breed}`}
                  render={(renderProps) => <BreedView idx={idx} globalStateData={globalStateData} setGlobalStateData={setGlobalStateData} {...renderProps} />} 
                />))}  
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
