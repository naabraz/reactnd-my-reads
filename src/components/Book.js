import React, { Component } from 'react'

import ShelfChanger from './ShelfChanger'

class Book extends Component {

  render() {
    const { changeShelfBook, book, addToShelf} = this.props

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
            <ShelfChanger
              changeShelfBook={changeShelfBook}
              book={book}
              addToShelf={addToShelf}
            />
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors.map((author) => ( <div key={author} className="book-authors">{author}</div>))}
        </div>
      </li>
    )
  }
}

export default Book
