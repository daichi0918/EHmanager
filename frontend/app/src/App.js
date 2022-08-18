import { React } from 'react';
import './App.css';
import {
  BrowserRouter
} from "react-router-dom";

// components
import { Router } from './router/Router'

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
