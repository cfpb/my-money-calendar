import { render } from '@testing-library/react';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import { StoreProvider, useStore } from './stores';
import { createMemoryHistory } from 'history';
import routeData from 'react-router';
import UIStore from './stores/ui-store';
import RootStore from './stores/root-store';

const uiStore = new UIStore()

async function loadSeeders() {
  window.seed = await import('./seed-data.js');
}

async function seedTestData() {
  if (!window.seed) await loadSeeders();

  // console.info('Imported seed data script');
  const results = await window.seed.seedData();
  // console.info('Seeding complete %O', results);
}

async function clearTestData() {
  if (!window.seed) await loadSeeders();

  await window.seed.clearData();
  // console.info('Cleared all data');
}

const mockLocation = {
    pathname: '/welcome',
    hash: '',
    search: '',
    state: ''
  }
  

export async function testSteup(){
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation)
    window.scrollTo = function(){ }
    clearTestData()
    seedTestData()
    uiStore.gotoDate(new Date())
}


export const renderWithRouter = (component, store) => {
  if(!store) {
    store = new RootStore()
  }
    const history = createMemoryHistory({
      initialEntries: ["/part1/idValue1/part2/idValue2/part3"],
    });
    const Wrapper = ({ children }) => (
      <StoreProvider storeOverride={store}>
        <Router history={history}>
            <Route path="/part1/:id1/part2/:id2/part3">{children}</Route>
        </Router>
      </StoreProvider>
    );
    return {
      ...render(component, { wrapper: Wrapper }),
      history,
    };
};