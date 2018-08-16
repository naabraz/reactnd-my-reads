import React, { Component } from 'react'

class Shelf extends Component {

  render() {
    const { changeShelfBook, shelfName, books, shelfOptions } = this.props
    
    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelfName}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book) => (
                <li key={book.title}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                      <div className="book-shelf-changer">
                        <select value="move" onChange={(event) => changeShelfBook(event.target.value, book)}>
                          <option value="move" disabled>Move to...</option>
                          {shelfOptions.filter((option) => option !== book.shelf)
                              .map((option) => ( <option key={option} value={option}>{option}</option> ))}
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors.map((author) => ( <div key={author} className="book-authors">{author}</div>))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
      </div>
    )
  }
}

export default Shelf