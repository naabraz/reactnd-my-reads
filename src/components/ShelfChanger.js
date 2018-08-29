import React, { Component } from 'react'

import { getOptionName, getShelfOptions } from '../helpers/ShelfHelper'

class ShelfChanger extends Component {

  path = {
    'search': '/search'
  }

  isSearch = window.location.pathname === this.path.search

  getOptions = (book) => {
    const search = getShelfOptions.map((option) => ( <option key={ option } value={option}>{ getOptionName(option) }</option> ))
    const shelf = getShelfOptions.filter((option) => option !== book.shelf)
      .map((option) => ( <option key={option} value={option}>{ getOptionName(option)} </option> ))

    return this.isSearch ? search : shelf
  }

  render() {
    const { changeShelfBook, addToShelf, book } = this.props

    return (
      <div className="book-shelf-changer">
        <select value={ this.isSearch ? (book.shelf ? book.shelf : 'none') : 'move' } 
          onChange={ (event) => this.isSearch ? addToShelf(event.target.value, book) : changeShelfBook(event.target.value, book) }>
          <option value="move" disabled>Move to...</option>
          { this.getOptions(book) }
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default ShelfChanger
