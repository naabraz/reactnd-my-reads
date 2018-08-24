import React, { Component } from 'react'

import Book from './Book'

class Shelf extends Component {

  render() {
    const { changeShelfBook, title, books, options} = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <Book key={book.id}
                book={book}
                options={options}
                changeShelfBook={changeShelfBook}
                from={'shelf'}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf
