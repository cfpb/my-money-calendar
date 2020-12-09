import React from 'react';
import { fireEvent } from '@testing-library/react';
import Calendar from './index/index';
import { renderWithRouter, testSteup } from '../../test-helper';

describe('Calendar', () => {
  beforeEach(async () => {
    await testSteup()
  })

  test('renders date month and year', () => {
      const { getByText } = renderWithRouter(<Calendar />);
      const month = (new Date()).toLocaleString('default', { month: 'long' })
      const year = (new Date()).toLocaleString('default', { year: 'numeric'})
      const calendarMonth = getByText(`${month} ${year}`);
      expect(calendarMonth).toBeInTheDocument();
  });

  test('clicking back button changes calendar month to previous', () => {
      const { queryAllByText, getByText } = renderWithRouter(<Calendar />);
      const monthBackButton = queryAllByText(`arrow-left.svg`)[0];
      fireEvent.click(monthBackButton, { button: 1 })
      let date = new Date()
      date.setMonth(date.getMonth() - 1)
      const month = (date).toLocaleString('default', { month: 'long' })
      const year = (date).toLocaleString('default', { year: 'numeric'})
      const calendarMonth = getByText(`${month} ${year}`);
      expect(calendarMonth).toBeInTheDocument();
  })

  test('clicking forward button changes calendar month to next', () => {
    const { queryAllByText, getByText } = renderWithRouter(<Calendar />);
    const monthForwardButton = queryAllByText(`arrow-right.svg`)[0];
    fireEvent.click(monthForwardButton, { button: 1 })
    let date = new Date()
    date.setMonth(date.getMonth() + 1)
    const month = (date).toLocaleString('default', { month: 'long' })
    const year = (date).toLocaleString('default', { year: 'numeric'})
    const calendarMonth = getByText(`${month} ${year}`);
    expect(calendarMonth).toBeInTheDocument();
  })

})
