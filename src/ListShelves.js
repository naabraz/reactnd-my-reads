import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Shelf from './Shelf'
import ShelfOptions from './lib/ShelfOptions'

class ListShelves extends Component {

  render() {
    const { books } = this.props
    const shelfOptions = ShelfOptions.getShelfOptions(books)

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelf title="Currently Reading"
            options={shelfOptions}
            books={books.filter((book) => book.shelf === 'currentlyReading')}
            changeShelfBook={this.props.changeShelfBook} />
          <Shelf title="Want To Read"
            options={shelfOptions}
            books={books.filter((book) => book.shelf === 'wantToRead')}
            changeShelfBook={this.props.changeShelfBook} />
          <Shelf title="Read"
            options={shelfOptions}
            books={books.filter((book) => book.shelf === 'read')}
            changeShelfBook={this.props.changeShelfBook} />
        </div>
        <div className="open-search">
          <Link to='/search' className='open-search'>Search</Link>
        </div>
      </div>
    )
  }
}

export default ListShelves
