import React from 'react';
import Strategies from './index';
import { renderWithRouter, testSteup } from '../../test-helper';

beforeAll(() => {
    testSteup()
})

test('renders covid strategy', () => {
  window.scrollTo = function(){ }
  const { getByText } = renderWithRouter(<Strategies />);
  const covidStrategyElement = getByText(/COVID-19/i);
  expect(covidStrategyElement).toBeInTheDocument();
});
