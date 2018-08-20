import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'

class ListShelves extends Component {

  state = {
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
    BooksAPI.update(book, shelf).then(() => this.componentDidMount())
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelf shelfName="Currently Reading" shelfOptions={this.state.shelfOptions} books={this.state.currentlyReading} changeShelfBook={this.changeShelfBook} />
          <Shelf shelfName="Want To Read" shelfOptions={this.state.shelfOptions} books={this.state.wantToRead} changeShelfBook={this.changeShelfBook} />
          <Shelf shelfName="Read" shelfOptions={this.state.shelfOptions} books={this.state.read} changeShelfBook={this.changeShelfBook} />
        </div>
        <div className="open-search">
          <Link to='/search' className='open-search'>Search</Link>
        </div>
      </div>
    )
  }
}

export default ListShelves
