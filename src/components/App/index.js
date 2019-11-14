import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header';

const LinkList = lazy(() => import('../LinkList'));
const CreateLink = lazy(() => import('../CreateLink'));
const Login = lazy(() => import('../Login'));

function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Suspense fallback={null}>
          <Switch>
            <Route exact path="/" component={LinkList} />
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
