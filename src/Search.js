import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BookTreatment from './lib/BookTreatment'
import ShelfOptions from './lib/ShelfOptions'

import Book from './Book'

import * as BooksAPI from './BooksAPI'

class Search extends Component {

  state = {
    booksResult: [],
    query: ''
  }

  searchBook (query) {
    return this.theresQuery(query) ? this.fetchBooks(query) : this.clearBooksResult()
  }

  updateQuery = (query) => {
    this.setState({ query })
    this.searchBook(query)
  }

  theresQuery (query) {
    return query || query !== ''
  }

  theresBooksResult (response) {
    return response && !response.error
  }

  clearBooksResult () {
    const booksResult = []
    this.setState({booksResult})
  }

  fetchBooks (query) {
    BooksAPI.search(query).then((booksResult) => {
      this.theresBooksResult(booksResult) ? this.makeBookObject(booksResult) : this.setState({booksResult: []})
      if (!this.theresQuery(this.state.query)) this.clearBooksResult()
    })
  }

  makeBookObject (booksResult) {
    this.getShelf(booksResult)
    BookTreatment.treatNoThumb(booksResult)
    BookTreatment.treatNoAuthor(booksResult)
    this.setState({booksResult})
  }

  getShelf (searchBooks) {
    return this.props.books.map((shelfBooks) => {
      return searchBooks.map((searchBooks) => {
        return shelfBooks.id === searchBooks.id ? Object.assign(searchBooks, {shelf: shelfBooks.shelf}) : Object.assign({}, searchBooks)
      })
    })
  }

  render () {
    const { books, changeShelfBook } = this.props
    const shelfOptions = ShelfOptions.getShelfOptions(books)

    const addToShelf = (shelf, book) => {
      this.props.changeShelfBook(shelf, book)
      this.setState((state) =>  {
        state.booksResult[state.booksResult.indexOf(book)].shelf = shelf
      })
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.booksResult.length > 0 && (
              this.state.booksResult.map((book) => (
                <Book key={book.id}
                  book={book}
                  options={shelfOptions}
                  changeShelfBook={changeShelfBook}
                  addToShelf={addToShelf}
                  from={'search'}
                />
              ))
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
