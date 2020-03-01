import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import ProductListPage from '../../routes/ProductListPage/ProductListPage'
import ProductPage from '../../routes/ProductPage/ProductPage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import ProfilePage from '../../routes/ProfilePage/ProfilePage'
import './App.css'
import LandingPage from '../../routes/LandingPage/LandingPage'
import WishlistListPage from '../../routes/WishlistListPage/WishlistListPage'
import WishlistPage from '../../routes/WishlistPage/WishlistPage'
import ProductAddWishlist from '../../routes/ProductAddWishlist/ProductAddWishlist'

class App extends Component {
  state = { 
    hasError: false, 
    isLoggedIn: null, 
    userId: null ,
    user: {}
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  
  handleLogout = () => {
    this.setState({ isLoggedIn: false })
  }
  setUser = user => {
    this.setState({ user: user})
  }
  handleLogin = (userId) => {
    this.setState({ isLoggedIn: true, userId: userId })
  }
  render() {
    return (
      <div className='App'>
        <header className='App__header'>
          <Header logout={this.handleLogout} userId={this.state.userId} setUser={this.setUser}/>
        </header>
        <main className='App__main'>
          <div role='alert'>
          {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
          </div>
          <Switch>
            <Route exact path={'/'} component={LandingPage}/>
            <Route path={'/products'} component={ProductListPage}/>
            <Route path={'/login'} render={(props)=>{
              return <LoginPage login={this.handleLogin} {...props} />
            }}/>
            <Route path={'/register'} component={RegistrationPage}/>
            <Route path={'/product/:productId'} component={ProductPage}/>
            <Route path={'/profile'} component={ProfilePage}/>
            <Route path={'/wishlists'} component={WishlistListPage}/>
            <Route path={'/wishlist/:wishlistId'} component={WishlistPage}/>
            <Route path={'/productAdd'} component={ProductAddWishlist}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </main>
      </div>
    )
  }
}

export default App