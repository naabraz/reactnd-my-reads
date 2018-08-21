import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'

class Search extends Component {

  state = {
    booksResult: []
  }

  searchBook (query) {
    BooksAPI.search(query).then((booksResult) => {
      if (!booksResult.error) {
        this.getShelf(booksResult)
        this.setState({booksResult})
      }
    })
  }

  getShelf (searchBooks) {
    return this.props.books.map((shelfBooks) => {
      return searchBooks.map((searchBooks) => {
        return shelfBooks.id === searchBooks.id ? Object.assign(searchBooks, {shelf: shelfBooks.shelf}) : Object.assign({}, searchBooks)
      })
    })
  }

  render () {
    const { shelfOptions, changeShelfBook, getOptionName } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(event) => this.searchBook(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
        <ol className="books-grid">
          {this.state.booksResult.length && (
            this.state.booksResult.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                      <div className="book-shelf-changer">
                        <select value={book.shelf ? book.shelf : 'none'} onChange={(event) => changeShelfBook(event.target.value, book)}>
                          <option value="move" disabled>Move to...</option>
                          {shelfOptions.map((option) => ( <option key={option} value={option}>{getOptionName(option)}</option> ))}
                          <option value="none">None</option>
                        </select>
                      </div>
                  </div>
                  <div className="book-title">{book.title}</div>
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
