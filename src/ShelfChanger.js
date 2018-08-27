import React, { Component } from 'react'

import { getOptionName, getShelfOptions } from './lib/ShelfOptions'

class ShelfChanger extends Component {

  render() {
    const { changeShelfBook, book, from, addToShelf } = this.props

    const search =
      <select value={book.shelf ? book.shelf : 'none'} onChange={(event) => addToShelf(event.target.value, book)}>
        <option value="move" disabled>Move to...</option>
        {getShelfOptions.map((option) => ( <option key={option} value={option}>{getOptionName(option)}</option> ))}
        <option value="none">None</option>
      </select>

    const shelf =
      <select value="move" onChange={(event) => changeShelfBook(event.target.value, book)}>
        <option value="move" disabled>Move to...</option>
        {getShelfOptions.filter((option) => option !== book.shelf)
            .map((option) => ( <option key={option} value={option}>{getOptionName(option)}</option> ))}
        <option value="none">None</option>
      </select>

    return (
      <div className="book-shelf-changer">
        {from === 'shelf' ? shelf : search}
      </div>
    )
  }
}

export default ShelfChanger
