import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import AuthRoute from './components/Route/AuthRoute'
import useCheckLogin from './hooks/useCheckLogin'
import FeedPage from './pages/FeedPage'
import LandingPage from './pages/LandingPage'

const Routes = () => {
  const authenticated = useCheckLogin()
  return (
    <Switch>
      <AuthRoute
        exact
        path={['/', 'landing']}
        authenticated={authenticated}
        component={LandingPage}
      />
      <Route exact path="/feed" component={FeedPage} />
    </Switch>
  )
}

export default Routes
