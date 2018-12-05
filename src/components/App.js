import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Search from './Search'
import ListShelves from './ListShelves'
import NotFound from './NotFound'

import * as BooksAPI from '../api/BooksAPI'

import BookFormatter from '../helpers/BookFormatter'

import '../css/App.css'

class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      BookFormatter.noAuthor(books)
      BookFormatter.noThumb(books)

      this.setState({books})
    })
  }

  changeShelfBook (shelf, book) {
    BooksAPI.update(book, shelf)
    const bookExist = this.state.books.map((books) => books.id === book.id).indexOf(true)

    if (bookExist >= 0) {
      this.setState(state => state.books[bookExist].shelf = shelf) 
    } else {
      this.setState(state => state.books.push(book))
    }
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={() => (
            <ListShelves books={this.state.books}
              changeShelfBook={this.changeShelfBook} />
          )}/>
          <Route path='/search' render={() => (
            <Search books={this.state.books}
            changeShelfBook={this.changeShelfBook} />
          )}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
