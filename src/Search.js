import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BookTreatment from './lib/BookTreatment'
import ShelfOptions from './lib/ShelfOptions'

import Book from './Book'

import * as BooksAPI from './BooksAPI'

class Search extends Component {

  state = {
    booksResult: [],
    error: false,
    emptyResult: false,
    query: ''
  }

  searchBooks (query) {
    this.setState({ query: query })
    query.length > 0 ? this.fetchBooks(query) : this.clearSearch()
  }

  fetchBooks (query) {
    BooksAPI.search(query).then((booksResult) => {
      booksResult && !booksResult.error ? this.formatBook(booksResult) : this.setState({ booksResult: [], error: true, emptyResult: true })
    })
  }

  clearSearch () {
    this.setState({ booksResult: [], emptyResult: true })
  }

  formatBook (booksResult) {
    BookTreatment.getCurrentShelf(booksResult, this.props.books)
    BookTreatment.treatNoThumb(booksResult)
    BookTreatment.treatNoAuthor(booksResult)
    this.setState({booksResult, error: false, emptyResult: false})
  }

  render () {
    const { books, changeShelfBook } = this.props
    const { booksResult, error, emptyResult, query } = this.state

    const shelfOptions = ShelfOptions.getShelfOptions(books)

    const addToShelf = (shelf, book) => {
      changeShelfBook(shelf, book)
      this.setState((state) =>  {
        state.booksResult[state.booksResult.indexOf(book)].shelf = shelf
      })
    }

    const showResult = () => {
      return query.length > 0 && booksResult.length > 0 && !error
    }

    const bookComponent = (book) =>
      <Book key={book.id}
        book={book}
        options={shelfOptions}
        changeShelfBook={changeShelfBook}
        addToShelf={addToShelf}
        from={'search'} />

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" 
              onChange={(event) => this.searchBooks(event.target.value)}
              value={this.state.query} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showResult() && ( booksResult.map((book) => ( bookComponent(book) )) )}
            {emptyResult && query && ( <p>Empty Result</p> )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
