import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import './App.css'
import Search from './Search'
import ListShelves from './ListShelves'

import * as BooksAPI from './BooksAPI'


class BooksApp extends Component {

  state = {
    read: [],
    currentlyReading: [],
    wantToRead: [],
    shelfOptions: [],
    books: []
  }

  bookTypes = {
    read: 'read',
    currentlyReading: 'currentlyReading',
    wantToRead: 'wantToRead'
  }

  getShelfBooks = (books, shelf) => books.filter((book) => book.shelf === shelf)
  getShelfOptions = (books) => books.map((book) => book.shelf).filter((elem, pos, arr) => arr.indexOf(elem) === pos)

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const read = this.getShelfBooks(books, this.bookTypes.read)
      const currentlyReading = this.getShelfBooks(books, this.bookTypes.currentlyReading)
      const wantToRead = this.getShelfBooks(books, this.bookTypes.wantToRead)
      const shelfOptions = this.getShelfOptions(books)

      this.setState({read})
      this.setState({currentlyReading})
      this.setState({wantToRead})
      this.setState({shelfOptions})
      this.setState({books})
    })
  }

  changeShelfBook = (shelf, book) => {
    BooksAPI.update(book, shelf).then(() => this.componentDidMount())
  }

  getOptionName = (option) => {
    return {
      'currentlyReading': 'Currently Reading',
      'read': 'Read',
      'wantToRead': 'Want To Read'
    }[option]
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListShelves shelfOptions={this.state.shelfOptions} 
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}
            changeShelfBook={this.changeShelfBook}
            getOptionName={this.getOptionName}
          />
        )}/>
        <Route path='/search' render={({ history }) => (
          <Search onSearchBook={() => history.push('/')} 
            shelfOptions={this.state.shelfOptions}
            changeShelfBook={this.changeShelfBook}
            getOptionName={this.getOptionName}
            books={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
