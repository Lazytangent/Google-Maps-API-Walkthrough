import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { restoreUser } from './store/session';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import MapContainer from './components/Maps';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(restoreUser());
      setIsLoaded(true);
    })();
  }, [dispatch]);

  return (
    <>
      <h1>Hello from App</h1>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <>
          <Switch>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/maps">
              <MapContainer />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
