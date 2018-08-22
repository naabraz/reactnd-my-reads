import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
    this.searchBook(this.state.query)
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
    this.props.treatNoThumb(booksResult)
    this.props.treatNoAuthor(booksResult)
    this.setState({booksResult})
  }

  getShelf (searchBooks) {
    return this.props.books.map((shelfBooks) => {
      return searchBooks.map((searchBooks) => {
        return shelfBooks.id === searchBooks.id ? Object.assign(searchBooks, {shelf: shelfBooks.shelf}) : Object.assign({}, searchBooks)
      })
    })
  }

  addToShelf (shelf, book) {
    this.props.changeShelfBook(shelf, book)
    this.setState((state) =>  {
      state.booksResult[state.booksResult.indexOf(book)].shelf = shelf
    })
  }

  render () {
    const { shelfOptions, getOptionName } = this.props

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
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                      <div className="book-shelf-changer">
                        <select value={book.shelf ? book.shelf : 'none'} onChange={(event) => this.addToShelf(event.target.value, book)}>
                          <option value="move" disabled>Move to...</option>
                          {shelfOptions.map((option) => ( <option key={option} value={option}>{getOptionName(option)}</option> ))}
                          <option value="none">None</option>
                        </select>
                      </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  {book.authors.map((author) => ( <div key={author} className="book-authors">{author}</div>))}
                </div>
              </li>
            ))
          )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
