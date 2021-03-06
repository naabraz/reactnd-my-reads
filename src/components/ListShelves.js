import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Shelf from './Shelf'

class ListShelves extends Component {

  render() {
    const { books, changeShelfBook } = this.props

    const shelves = {
      currentlyReading: ['Currently Reading', 'currentlyReading'],
      wantToRead: ['Want to Read', 'wantToRead'],
      read: ['Read', 'read']
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {Object.keys(shelves).map((shelf) =>
            <Shelf key={shelf}
              title={shelves[shelf][0]}
              books={books.filter((book) => book.shelf === shelves[shelf][1])}
              changeShelfBook={changeShelfBook}
            />
          )}
        </div>
        <div className="open-search">
          <Link to='/search' className='open-search'>Search</Link>
        </div>
      </div>
    )
  }
}

export default ListShelves
