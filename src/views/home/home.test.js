import React from 'react';
import Home from './index';
import { renderWithRouter, testSteup } from '../../test-helper';

describe('Home',() => {
  beforeEach(async () => {
    await testSteup()
  })
  
  test('renders loading text', () => {
    window.scrollTo = function(){ }
    const { getByText } = renderWithRouter(<Home />);
    const loadingElement = getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });
})

