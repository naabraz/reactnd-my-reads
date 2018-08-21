import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Shelf from './Shelf'

class ListShelves extends Component {

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelf shelfName="Currently Reading" 
            shelfOptions={this.props.shelfOptions} 
            books={this.props.currentlyReading} 
            changeShelfBook={this.props.changeShelfBook}
            getOptionName={this.props.getOptionName} />
          <Shelf shelfName="Want To Read" 
            shelfOptions={this.props.shelfOptions} 
            books={this.props.wantToRead} 
            changeShelfBook={this.props.changeShelfBook}
            getOptionName={this.props.getOptionName} />
          <Shelf shelfName="Read" 
            shelfOptions={this.props.shelfOptions} 
            books={this.props.read} 
            changeShelfBook={this.props.changeShelfBook}
            getOptionName={this.props.getOptionName} />
        </div>
        <div className="open-search">
          <Link to='/search' className='open-search'>Search</Link>
        </div>
      </div>
    )
  }
}

export default ListShelves
