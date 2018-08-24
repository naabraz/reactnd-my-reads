import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import './App.css'
import Search from './Search'
import ListShelves from './ListShelves'

import BookTreatment from './lib/BookTreatment'

import * as BooksAPI from './BooksAPI'

class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      BookTreatment.treatNoAuthor(books)
      BookTreatment.treatNoThumb(books)

      this.setState({books})
    })
  }

  changeShelfBook = (shelf, book) => {
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
        <Route exact path='/' render={() => (
          <ListShelves books={this.state.books}
            changeShelfBook={this.changeShelfBook} />
        )}/>
        <Route path='/search' render={() => (
          <Search books={this.state.books}
          changeShelfBook={this.changeShelfBook} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
