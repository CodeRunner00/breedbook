import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import BreedView from './BreedView';
import Home from './Home';
import { fetchBreeds } from './actions/index';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
useEffect(() => {
  dispatch(fetchBreeds());
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const breedsArr = useSelector(state => state.breeds);
  return (
    <div className="App">
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
                  render={() => <Home/>} 
            />
            {breedsArr && breedsArr.map((breed, idx) => (
                <Route
                  key={`${breed}${idx}`}
                  path={`/dogs/${breed}`}
                  render={(renderProps) => <BreedView idx={idx} {...renderProps} />} 
                />))}  
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
