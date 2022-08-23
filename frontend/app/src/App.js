import { React } from 'react';
import './App.css';
import {
  BrowserRouter
} from "react-router-dom";

// components
import { Router } from './router/Router'
import { UserProvider } from './providers/UserProvider';

function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>

  );
}

export default App;
