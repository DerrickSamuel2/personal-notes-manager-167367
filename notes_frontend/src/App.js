import React from 'react';
import './App.css';
import NotesApp from './components/NotesApp';

/**
 * Root App that hosts the NotesApp.
 * Applies the Ocean Professional theme via CSS variables.
 */
// PUBLIC_INTERFACE
function App() {
  /** This is the root component for the Notes application. */
  return (
    <div className="App" data-theme="light">
      <NotesApp />
    </div>
  );
}

export default App;
