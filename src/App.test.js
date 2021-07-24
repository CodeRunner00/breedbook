import React from "react";
import { Provider } from "react-redux";
import { render, screen } from '@testing-library/react';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducer  from "./reducer";

function renderWithProviders(ui, { reduxState } = { breeds: [] }) {
  const store = createStore(reducer, reduxState, applyMiddleware(reduxThunk));
  return render(<Provider store={store}>{ui}</Provider>);
}


describe("Initial render", () => {
  test('renders Breedbook header', () => {
    renderWithProviders(<App />);
    expect(screen.getByText('Breedbook')).toBeInTheDocument();
  });
  
  it("shows Data in Homepage", async () => {
    renderWithProviders(<App />);
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByText("Check out chihuahua pics!", {}, { timeout: 3000 })).toBeInTheDocument();
  });
});


// import React from "react";
// import { Provider } from "react-redux";
// import { Header } from "./Header";
// import { createStore } from "redux";
// import { initialState, reducer } from "./reducer";
// import { render } from "@testing-library/react";

// function renderWithProviders(ui, { reduxState } = {}) {
//   const store = createStore(reducer, reduxState || initialState);
//   return render(<Provider store={store}>{ui}</Provider>);
// }

// test("header not logged in", () => {
//   const { getByText } = renderWithProviders(<Header />, {
//     store: { user: null }
//   });
//   getByText("login");
//   getByText("register");
// });

// test("header logged in", () => {
//   const { getByText } = renderWithProviders(<Header />, {
//     reduxState: {
//       user: {
//         name: "bob"
//       }
//     }
//   });

//   getByText("bob");
// });