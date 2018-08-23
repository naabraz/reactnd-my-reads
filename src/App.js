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
    BooksAPI.update(book, shelf).then((response) => {
      const books = []

      Object.keys(response).map((shelf) => {
        response[shelf].map((id) => {
          this.state.books.filter((book) => book.id === id).map((book) => {
            book.shelf = shelf
            books.push(book)
          })
        })
      })

      this.setState({books: books})
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListShelves books={this.state.books}
            changeShelfBook={this.changeShelfBook} />
        )}/>
        <Route path='/search' render={({ history }) => (
          <Search onSearchBook={() => history.push('/')}
            books={this.state.books}
            changeShelfBook={this.changeShelfBook} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
