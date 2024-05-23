import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Jokes from './Jokes';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
          <Link to='/jokes'>Jokes</Link>
        </nav>
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/jokes' component={Jokes} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
