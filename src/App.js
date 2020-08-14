import React, { useEffect } from "react";
import { PublicRoute, PrivateRoute } from "helper";
import { Switch, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { DefaultLayout } from "layout";
import Routes from "config/Route";
import "./assets/scss/pages/index.scss";
//import { requestNotification } from 'helper/Notification'

const history = createBrowserHistory();

function App() {

  useEffect(() => {
    //requestNotification()
  }, [])

  return (
    <Router basename="/" history={history}>
      <Switch>
        {Routes.public.map((route, idx) => {
          return route.component ? (
            <PublicRoute
              key={idx}
              path={route.path}
              exact={route.exact}
              name={route.name}
              component={props => {
                return <route.component {...props} title={route.name} />;
              }}
            />
          ) : null;
        })}
        <PrivateRoute path="/" component={DefaultLayout} />
      </Switch>
    </Router>
  );
}

export default App;
