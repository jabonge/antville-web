import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import AuthRoute from './components/Route/AuthRoute'
import useCheckLogin from './hooks/useCheckLogin'
import FeedDetailPage from './pages/FeedDetailPage'
import FeedPage from './pages/FeedPage'
import LandingPage from './pages/LandingPage'
import StockDetailPage from './pages/StockDetailPage'
import UserProfilePage from './pages/UserProfilePage'

const Routes = () => {
  const authenticated = useCheckLogin()
  return (
    <Switch>
      <AuthRoute
        exact
        path={['/', '/landing']}
        authenticated={authenticated}
        component={LandingPage}
      />
      <Route exact path="/feed" component={FeedPage} />
      <Route exact path="/feed/detail/:id" component={FeedDetailPage} />
      <Route exact path="/user/:id/profile" component={UserProfilePage} />
      <Route exact path="/stock/:id" component={StockDetailPage} />
    </Switch>
  )
}

export default Routes
