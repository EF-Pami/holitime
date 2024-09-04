import React from 'react';
import Router from './Router';
import { ThemeProvider } from './components/Theme';

function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
