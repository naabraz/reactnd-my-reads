import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'

import BookFormatter from '../helpers/BookFormatter'
import ShelfHelper from '../helpers/ShelfHelper'
import Book from './Book'

import * as BooksAPI from '../api/BooksAPI'

class Search extends Component {

  state = {
    booksResult: [],
    error: false,
    emptyResult: false,
    query: ''
  }

  handleChange (event) {
    const { value } = event.target
    this.setState({ query: value })

    this.searchBooks(value)
  }

  searchBooks (query) {
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
    ShelfHelper.getCurrentShelf(booksResult, this.props.books)
    BookFormatter.noThumb(booksResult)
    BookFormatter.noAuthor(booksResult)
    this.setState({booksResult, error: false, emptyResult: false})
  }

  render () {
    const { changeShelfBook } = this.props
    const { booksResult, error, emptyResult, query } = this.state

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
        changeShelfBook={changeShelfBook}
        addToShelf={addToShelf}
        from={'search'} />

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              className="search-input"
              type="text" 
              placeholder="Search by title or author" 
              minLength={2}
              debounceTimeout={300}
              onChange={this.handleChange.bind(this)}
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
