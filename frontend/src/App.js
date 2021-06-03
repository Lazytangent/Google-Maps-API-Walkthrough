import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { restoreUser } from './store/session';
import LoginFormPage from './components/LoginFormPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(restoreUser());
      setIsLoaded(true);
    })();
  }, [dispatch]);

  return isLoaded && (
    <>
      <h1>Hello from App</h1>
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
