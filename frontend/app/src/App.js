import { React, useCallback } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// components
import { Users } from './containers/Users.jsx';
import { Lists } from './containers/Lists.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/users">
          <Users />
        </Route>
        <Route
          exact
          path="/lists"
        >
          <Lists />
        </Route>
        <Route
          exact
          path="/users/:usersId/lists"
          render={({ match }) =>
            <Lists
              match={match}
            />
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
