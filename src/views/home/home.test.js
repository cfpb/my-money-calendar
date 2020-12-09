import React from 'react';
import { render } from '@testing-library/react';
import Home from './index';
import { StoreProvider } from '../../stores';
import routeData from 'react-router';

const mockLocation = {
    pathname: '/welcome',
    hash: '',
    search: '',
    state: ''
  }

beforeAll(() => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation)

})

test('renders loading text', () => {
  window.scrollTo = function(){ }
  const { getByText } = render(<StoreProvider><Home /></StoreProvider>);
  const loadingElement = getByText(/Loading.../i);
  expect(loadingElement).toBeInTheDocument();
});
