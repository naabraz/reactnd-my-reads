import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Search from './Search'

import ListShelves from './ListShelves'

class BooksApp extends Component {

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListShelves />
        )}/>
        <Route path='/search' render={({ history }) => (
          <Search onSearchBook={() => history.push('/')} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
