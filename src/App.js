import React from 'react';
import './App.css';
import { Button, ThemeProvider } from '@material-ui/core';
import { theme } from './theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Button color="primary" variant="contained">TEST</Button>
      </ThemeProvider>
    </div>
  );
}

export default App;
