import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BookTreatment from './lib/BookTreatment'
import ShelfOptions from './lib/ShelfOptions'

import Book from './Book'

import * as BooksAPI from './BooksAPI'

class Search extends Component {

  state = {
    booksResult: []  
  }

  searchBooks (query) {
    query.length > 0 ? this.fetchBooks(query) : this.setState({booksResult: []})
  }

  fetchBooks (query) {
    BooksAPI.search(query).then((booksResult) => {
      booksResult && !booksResult.error ? this.formatBook(booksResult) : this.setState({booksResult: []})
    })
  }

  formatBook (booksResult) {
    BookTreatment.getCurrentShelf(booksResult, this.props.books)
    BookTreatment.treatNoThumb(booksResult)
    BookTreatment.treatNoAuthor(booksResult)
    this.setState({booksResult})
  }

  render () {
    const { books, changeShelfBook } = this.props
    const shelfOptions = ShelfOptions.getShelfOptions(books)

    const addToShelf = (shelf, book) => {
      changeShelfBook(shelf, book)
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
              onChange={(event) => this.searchBooks(event.target.value)}
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
