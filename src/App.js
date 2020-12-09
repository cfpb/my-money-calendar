import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core';
import { theme, useStyles } from './theme';
import AppRouter from './components/app-router/app-router';
import { configure as configureMobX } from 'mobx';
import { dayjs } from './lib/calendar-helpers';
import { Categories } from './stores/models/categories';
import { StoreProvider } from './stores';
import './css/main.less'
configureMobX({ enforceActions: 'observed' });

// In development mode, expose global functions to seed and clear the local IDB database:
/* eslint-disable-next-line */
if (process.env.NODE_ENV === 'development') {
  window.dayjs = dayjs;
  window.Categories = Categories;
}

async function loadSeeders() {
  window.seed = await import('./seed-data.js');
}

window.developer = {
  async seedTestData() {
    if (!window.seed) await loadSeeders();

    console.info('Imported seed data script');
    const results = await window.seed.seedData();
    console.info('Seeding complete %O', results);
  },
  async clearTestData() {
    if (!window.seed) await loadSeeders();

    await window.seed.clearData();
    console.info('Cleared all data');
  }
};

function App() {
  const classes = useStyles()
  return (
    <div className="App">
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <div className={classes['content_wrapper']}>
           <AppRouter></AppRouter>
          </div>
        </ThemeProvider>
      </StoreProvider>
    </div>
  );
}

export default App;

