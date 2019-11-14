import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../Header';

const LinkList = lazy(() => import('../LinkList'));
const CreateLink = lazy(() => import('../CreateLink'));
const Login = lazy(() => import('../Login'));
const Search = lazy(() => import('../Search'));

function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Suspense fallback={null}>
          <Switch>
            <Redirect exact from="/" to="/new/1" />
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/top" component={LinkList} />
            <Route exact path="/new/:page" component={LinkList} />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
