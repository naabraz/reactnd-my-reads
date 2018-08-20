import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'

class Search extends Component {

  state = {
    booksResult: []
  }

  searchBook(query) {
    BooksAPI.search(query).then((response) => {
      const booksResult = response
      this.setState({booksResult})
    })
  }

  render() {
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
          {this.state.booksResult.map((book) => (<li key={book.id} className="books-grid">{book.title}</li>) )}
        </ol>
        </div>
      </div>
    )
  }
}

export default Search
