import { render, screen } from '@testing-library/react';
import App from './App';


describe("Initial render", () => {
  test('renders Breedbook header', () => {
    render(<App />);
    expect(screen.getByText('Breedbook')).toBeInTheDocument();
  });
  
  it("shows Loading and Data in Homepage", async () => {
    render(<App />);
    expect(await screen.findByText("Loading...", {}, { timeout: 3000 })).toBeInTheDocument();
    expect(await screen.findByText("Check out beagle pics!", {}, { timeout: 3000 })).toBeInTheDocument();
  });
});
