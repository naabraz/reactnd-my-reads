import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import Shelf from './Shelf'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    read: [],
    currentlyReading: [],
    wantToRead: [],
    shelfOptions: []
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
    })
  }

  changeShelfBook = (shelf, book) => {
    this.setState((state) => (state[shelf].push(book)))

    this.setState((state) => {
      const currentShelf = book.shelf
      state[currentShelf] = state[currentShelf].filter((b) => b.id !== book.id)
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf shelfName="Currently Reading" shelfOptions={this.state.shelfOptions} books={this.state.currentlyReading} changeShelfBook={this.changeShelfBook} />
                <Shelf shelfName="Want To Read" shelfOptions={this.state.shelfOptions} books={this.state.wantToRead} changeShelfBook={this.changeShelfBook} />
                <Shelf shelfName="Read" shelfOptions={this.state.shelfOptions} books={this.state.read} changeShelfBook={this.changeShelfBook} />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
