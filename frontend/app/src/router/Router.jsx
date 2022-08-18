import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import { Users } from '../containers/Users.jsx';
import { Lists } from '../containers/Lists.jsx';

export const Router = () => {
  return (
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
  )
}
